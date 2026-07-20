<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  seed: string;
  accent: string;
}>();

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(list: T[], salt: number): T {
  return list[(hash(props.seed) + salt) % list.length];
}

const SKIN_TONES = ["#f4c9a2", "#e0a877", "#c98a5e", "#9c6242", "#6b3f2b"];
const HAIR_COLORS = ["#2b2320", "#4a3527", "#6b4a2f", "#8a8a8a", "#c9a876", "#1a1a1a"];

type HairStyle = "cap" | "side" | "bun" | "bald" | "curly";
const HAIR_STYLES: HairStyle[] = ["cap", "side", "bun", "bald", "curly"];

const skin = computed(() => pick(SKIN_TONES, 1));
const hairColor = computed(() => pick(HAIR_COLORS, 2));
const hairStyle = computed<HairStyle>(() => pick(HAIR_STYLES, 3));
const collarStyle = computed(() => pick(["tie", "blouse", "open"], 4));
</script>

<template>
  <svg viewBox="0 0 64 64" class="w-full h-full" role="img" :aria-label="seed">
    <circle cx="32" cy="32" r="31" :fill="accent" opacity="0.14" />
    <circle cx="32" cy="32" r="31" fill="none" :stroke="accent" stroke-width="1.5" opacity="0.5" />

    <!-- shoulders / blazer -->
    <path d="M14 58 L24 40 L40 40 L50 58 Z" fill="#2b3348" />
    <path v-if="collarStyle === 'tie'" d="M30 40 L34 40 L33 52 L32 56 L31 52 Z" fill="#b91c1c" />
    <path v-if="collarStyle === 'blouse'" d="M27 40 L32 46 L37 40 Z" fill="#f8fafc" />

    <!-- neck -->
    <rect x="27" y="34" width="10" height="10" :fill="skin" />

    <!-- diamond head -->
    <polygon points="32,10 46,26 32,44 18,26" :fill="skin" />

    <!-- hair -->
    <path
      v-if="hairStyle === 'cap'"
      d="M18 26 C18 14 46 14 46 26 C40 20 24 20 18 26 Z"
      :fill="hairColor"
    />
    <path
      v-else-if="hairStyle === 'side'"
      d="M18 26 C17 15 30 12 46 22 C38 18 22 18 18 30 Z"
      :fill="hairColor"
    />
    <template v-else-if="hairStyle === 'bun'">
      <path d="M18 26 C18 15 46 15 46 26 C40 19 24 19 18 26 Z" :fill="hairColor" />
      <circle cx="32" cy="9" r="4.5" :fill="hairColor" />
    </template>
    <path
      v-else-if="hairStyle === 'curly'"
      d="M17 27 c-2-6 3-13 15-13 s17 7 15 13 c-3-4-8-2-9-6 c-2 4-9 4-11 0 c-1 4-7 2-10 6 Z"
      :fill="hairColor"
    />

    <!-- eyes -->
    <rect x="24" y="25" width="3" height="3.5" rx="1" fill="#1f2430" />
    <rect x="37" y="25" width="3" height="3.5" rx="1" fill="#1f2430" />

    <!-- mouth -->
    <line x1="27" y1="34" x2="37" y2="34" stroke="#1f2430" stroke-width="1.4" stroke-linecap="round" />
  </svg>
</template>
