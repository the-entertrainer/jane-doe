/*
 * Procedural portrait generator.
 *
 * Deterministic from a seed string (speaker + role), so a given character
 * always looks the same. Composes a flat, poster-style face — Reigns' signature
 * two-tone split shading — out of ~11 independently randomized feature layers:
 * head shape, skin, attire, hair (back + front), headwear, brows, eyes, nose,
 * mouth, facial hair, glasses, and an accessory. That's tens of thousands of
 * combinations, generated as one self-contained SVG string (no external assets,
 * works offline). Output is injected via v-html — safe here because every byte
 * is produced by this module; no external input reaches it.
 */

/* ---- seeded RNG (mulberry32) --------------------------------------------- */

function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---- palettes ------------------------------------------------------------ */

// [lit half, shadow half] — the vertical split gives every face its facets.
const SKIN: [string, string][] = [
  ["#f4d0a4", "#e0b285"],
  ["#eab381", "#d29760"],
  ["#d69b6a", "#b87c4d"],
  ["#b3794c", "#976036"],
  ["#8a5a34", "#6f4626"],
  ["#5f3c22", "#4a2e19"],
];

const HAIR = ["#1c140c", "#33241a", "#5a3a22", "#8a6a3a", "#b8b0a4", "#d9d2c4", "#7a2f2f", "#2f3f5a"];

const ATTIRE = [
  "#26324a", // navy blazer
  "#3a3f47", // charcoal
  "#5a4a3a", // brown
  "#6b3030", // maroon
  "#2f5040", // forest
  "#8a8f96", // grey suit
];

/* ---- helpers ------------------------------------------------------------- */

function pickIndex(r: () => number, len: number): number {
  return Math.floor(r() * len) % len;
}
function pick<T>(r: () => number, arr: T[]): T {
  return arr[pickIndex(r, arr.length)];
}

/* ---- layer geometry (64x64 viewBox, face centered near x=32) ------------- */

const HEADS: string[] = [
  "M32,10 L48,28 L32,48 L16,28 Z", // diamond
  "M20,20 Q20,10 32,10 Q44,10 44,20 L44,34 Q44,46 32,47 Q20,46 20,34 Z", // round-tall
  "M19,15 L45,15 L45,42 Q45,48 32,48 Q19,48 19,42 Z", // square-jaw
  "M22,11 L42,11 Q46,11 45,22 L42,44 Q41,48 32,48 Q23,48 22,44 L19,22 Q18,11 22,11 Z", // long
];

// hair drawn OVER the crown/forehead
const HAIR_FRONT: (string | null)[] = [
  "M17,26 C16,11 48,11 47,26 C41,18 23,18 17,26 Z", // short cap
  "M17,27 C16,12 30,8 47,20 C39,15 22,16 17,30 Z", // side part
  "M18,24 C18,10 46,10 46,24 C44,16 40,20 38,15 C34,21 30,21 26,15 C24,20 20,16 18,24 Z", // curly/textured
  "M32,7 L45,22 L32,17 L19,22 Z", // widow's peak
  null, // bald / none
  "M18,26 C17,12 47,12 46,26 L44,26 C44,16 20,16 20,26 Z", // receding
  "M16,30 C14,10 50,10 48,30 L48,20 C48,14 16,14 16,20 Z", // bouffant
];

// long hair that sits BEHIND the head
const HAIR_BACK: (string | null)[] = [null, null, null, "M15,20 C13,44 18,52 24,52 L24,30 C22,20 20,18 20,18 Z M49,20 C51,44 46,52 40,52 L40,30 C42,20 44,18 44,18 Z"];

const HEADWEAR: ({ path: string; fill: string } | null)[] = [
  null,
  null,
  { path: "M15,24 L49,24 L46,18 Q32,10 18,18 Z M13,24 L51,24 L51,27 L13,27 Z", fill: "#1f2937" }, // cap
  { path: "M17,22 C17,12 47,12 47,22 L47,25 L17,25 Z", fill: "#b3312c" }, // beanie
  { path: "M20,15 L44,15 L40,7 L36,13 L32,5 L28,13 L24,7 Z", fill: "#d6a52c" }, // little crown (exec)
];

const BROWS: string[] = [
  "M24,23 h6 M34,23 h6", // flat
  "M24,24 l6,-2 M34,22 l6,2", // raised-inner (worried)
  "M24,22 l6,2 M34,24 l6,-2", // furrowed (angry)
  "M24,23 q3,-2 6,0 M34,23 q3,-2 6,0", // arched
];

type EyeKind = "dot" | "bar" | "wide" | "tired" | "side";
const EYE_KINDS: EyeKind[] = ["dot", "bar", "wide", "tired", "side"];

const MOUTHS: string[] = [
  "M27,39 h10", // neutral line
  "M27,38 q5,5 10,0", // smile
  "M27,41 q5,-5 10,0", // frown
  "M27,39 q5,3 10,-1", // smirk
  "M28,38 a4,3 0 0 0 8,0 Z", // open (fill)
];

const FACIAL: ({ path: string; fill?: boolean } | null)[] = [
  null,
  null,
  { path: "M28,41 q4,3 8,0 M31,41 v2 M33,41 v2" }, // mustache (stroke)
  { path: "M26,38 Q32,52 38,38 Q36,44 32,44 Q28,44 26,38 Z", fill: true }, // goatee/beard
  { path: "M24,36 Q32,54 40,36 Q40,48 32,49 Q24,48 24,36 Z", fill: true }, // full beard
];

const GLASSES: ("none" | "round" | "square" | "shades")[] = ["none", "none", "round", "square", "shades"];

const ACCESSORY: ("none" | "earrings" | "headset" | "airpods" | "lanyard")[] = [
  "none",
  "none",
  "earrings",
  "headset",
  "airpods",
  "lanyard",
];

/* ---- eye rendering ------------------------------------------------------- */

function renderEyes(kind: EyeKind, ink: string): string {
  switch (kind) {
    case "dot":
      return `<circle cx="26" cy="29" r="2" fill="${ink}"/><circle cx="38" cy="29" r="2" fill="${ink}"/>`;
    case "bar":
      return `<rect x="24" y="26" width="4" height="6" fill="${ink}"/><rect x="36" y="26" width="4" height="6" fill="${ink}"/>`;
    case "wide":
      return `<circle cx="26" cy="29" r="3.2" fill="#fff"/><circle cx="26" cy="29" r="1.5" fill="${ink}"/><circle cx="38" cy="29" r="3.2" fill="#fff"/><circle cx="38" cy="29" r="1.5" fill="${ink}"/>`;
    case "tired":
      return `<path d="M23,29 h6 M35,29 h6" stroke="${ink}" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M23,31 q3,2 6,0 M35,31 q3,2 6,0" stroke="${ink}" stroke-width="1" fill="none" opacity="0.5"/>`;
    case "side":
      return `<circle cx="28" cy="29" r="2" fill="${ink}"/><circle cx="40" cy="29" r="2" fill="${ink}"/>`;
  }
}

function renderGlasses(kind: "none" | "round" | "square" | "shades", ink: string): string {
  if (kind === "none") return "";
  if (kind === "round")
    return `<g fill="none" stroke="${ink}" stroke-width="1.4"><circle cx="26" cy="29" r="4.5"/><circle cx="38" cy="29" r="4.5"/><path d="M30.5,29 h3"/></g>`;
  if (kind === "square")
    return `<g fill="none" stroke="${ink}" stroke-width="1.4"><rect x="21" y="25" width="9" height="8" rx="1"/><rect x="34" y="25" width="9" height="8" rx="1"/><path d="M30,28 h4"/></g>`;
  // shades
  return `<g fill="${ink}"><rect x="21" y="25" width="9" height="7" rx="1"/><rect x="34" y="25" width="9" height="7" rx="1"/></g><path d="M30,27 h4" stroke="${ink}" stroke-width="1.4"/>`;
}

function renderAccessory(kind: "none" | "earrings" | "headset" | "airpods" | "lanyard", ink: string): string {
  switch (kind) {
    case "none":
      return "";
    case "earrings":
      return `<circle cx="18" cy="34" r="1.6" fill="#e6c34a"/><circle cx="46" cy="34" r="1.6" fill="#e6c34a"/>`;
    case "headset":
      return `<path d="M16,30 Q16,14 32,14 Q48,14 48,30" fill="none" stroke="${ink}" stroke-width="2"/><rect x="13" y="29" width="5" height="7" rx="2" fill="${ink}"/><rect x="46" y="29" width="5" height="7" rx="2" fill="${ink}"/><path d="M18,34 Q24,40 27,39" fill="none" stroke="${ink}" stroke-width="1.6"/>`;
    case "airpods":
      return `<rect x="17" y="30" width="2.4" height="6" rx="1" fill="#f2f2f2"/><rect x="44.6" y="30" width="2.4" height="6" rx="1" fill="#f2f2f2"/>`;
    case "lanyard":
      return `<path d="M27,48 L30,56 M37,48 L34,56" stroke="#b3312c" stroke-width="2" fill="none"/><rect x="28" y="55" width="8" height="6" rx="1" fill="#f2ecd8" stroke="${ink}" stroke-width="0.6"/>`;
  }
}

/* ---- main ---------------------------------------------------------------- */

export function buildPortraitSVG(seed: string): string {
  const r = mulberry32(hashSeed(seed));

  const skin = pick(r, SKIN);
  const attire = pick(r, ATTIRE);
  const head = pick(r, HEADS);
  const hairColor = pick(r, HAIR);
  const hairFront = pick(r, HAIR_FRONT);
  const hairBack = pick(r, HAIR_BACK);
  const headwear = pick(r, HEADWEAR);
  const brow = pick(r, BROWS);
  const eyeKind = pick(r, EYE_KINDS);
  const mouth = pick(r, MOUTHS);
  const facial = pick(r, FACIAL);
  const glasses = pick(r, GLASSES);
  const accessory = pick(r, ACCESSORY);

  const ink = "#20160d";
  const openMouth = mouth === MOUTHS[4];

  const layers: string[] = [];

  // shoulders / attire
  layers.push(`<path d="M8,60 L22,42 L42,42 L56,60 Z" fill="${attire}"/>`);
  // subtle collar
  layers.push(`<path d="M27,42 L32,48 L37,42 Z" fill="rgba(255,255,255,0.14)"/>`);

  // hair behind head
  if (hairBack) layers.push(`<path d="${hairBack}" fill="${hairColor}"/>`);

  // neck
  layers.push(`<rect x="27" y="34" width="10" height="10" fill="${skin[1]}"/>`);

  // head: two-tone split (shadow full, lit right half over it)
  const clipId = "hc" + hashSeed(seed).toString(36);
  layers.push(`<path d="${head}" fill="${skin[1]}"/>`);
  layers.push(`<clipPath id="${clipId}"><path d="${head}"/></clipPath>`);
  layers.push(`<rect x="32" y="8" width="18" height="42" fill="${skin[0]}" clip-path="url(#${clipId})"/>`);

  // brows
  layers.push(`<path d="${brow}" stroke="${ink}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);

  // eyes + glasses
  layers.push(renderEyes(eyeKind, ink));
  layers.push(renderGlasses(glasses, ink));

  // nose (simple)
  layers.push(`<path d="M32,31 l-2,4 h4 Z" fill="${skin[1]}" opacity="0.7"/>`);

  // mouth
  if (openMouth) {
    layers.push(`<path d="${mouth}" fill="#7a2f2f"/>`);
  } else {
    layers.push(`<path d="${mouth}" stroke="${ink}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);
  }

  // facial hair
  if (facial) {
    if (facial.fill) layers.push(`<path d="${facial.path}" fill="${hairColor}"/>`);
    else layers.push(`<path d="${facial.path}" stroke="${hairColor}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);
  }

  // hair over forehead
  if (hairFront) layers.push(`<path d="${hairFront}" fill="${hairColor}"/>`);

  // headwear on top
  if (headwear) layers.push(`<path d="${headwear.path}" fill="${headwear.fill}"/>`);

  // accessory
  layers.push(renderAccessory(accessory, ink));

  return `<svg viewBox="0 0 64 64" width="100%" height="100%" role="img" aria-label="${seed.replace(/"/g, "")}" xmlns="http://www.w3.org/2000/svg">${layers.join("")}</svg>`;
}
