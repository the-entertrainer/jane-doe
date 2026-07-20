<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  seed: string;
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

/* Two-tone skin pairs: a base shade and a slightly darker half, echoing the
   mirrored split-shading Reigns uses on every portrait. */
const SKIN_PAIRS: [string, string][] = [
  ["#f0c48f", "#d9a86f"],
  ["#e8a877", "#cf8a58"],
  ["#c98a5e", "#ab6f47"],
  ["#8c5a38", "#734727"],
  ["#5f3c26", "#4a2e1c"],
];

type Topper = "cap" | "hood" | "side" | "bald" | "peak";
const TOPPERS: Topper[] = ["cap", "hood", "side", "bald", "peak"];
const TOPPER_COLORS = ["#241708", "#3a2a17", "#2f3a4d", "#4a1f1f", "#1f2e24"];

const skin = computed(() => pick(SKIN_PAIRS, 1));
const topper = computed<Topper>(() => pick(TOPPERS, 3));
const topperColor = computed(() => pick(TOPPER_COLORS, 5));
const accessory = computed(() => pick(["none", "collar", "glasses"], 7));
</script>

<template>
  <svg viewBox="0 0 64 64" class="w-full h-full" role="img" :aria-label="seed">
    <!-- hood/cloak silhouette sits behind the head -->
    <path v-if="topper === 'hood'" d="M32 6 C16 6 12 26 14 46 L22 46 C20 30 22 16 32 16 C42 16 44 30 42 46 L50 46 C52 26 48 6 32 6 Z" :fill="topperColor" />

    <!-- shoulders / torso -->
    <path d="M10 60 L21 40 L43 40 L54 60 Z" :fill="topper === 'hood' ? topperColor : '#1f2937'" />

    <!-- neck -->
    <rect x="26" y="34" width="12" height="10" :fill="skin[1]" />

    <!-- head: two-tone vertical split, diamond silhouette -->
    <polygon points="32,8 47,26 32,46 17,26" :fill="skin[1]" />
    <polygon points="32,8 47,26 32,46" :fill="skin[0]" />

    <!-- toppers -->
    <path v-if="topper === 'cap'" d="M17 26 C17 12 47 12 47 26 C40 19 24 19 17 26 Z" :fill="topperColor" />
    <path
      v-else-if="topper === 'side'"
      d="M17 26 C16 13 30 9 47 20 C38 15 21 16 17 30 Z"
      :fill="topperColor"
    />
    <path
      v-else-if="topper === 'peak'"
      d="M32 4 L44 22 L32 18 L20 22 Z"
      :fill="topperColor"
    />

    <!-- eyes: bold vertical bars -->
    <rect x="23" y="24" width="3.4" height="7" :fill="topperColor" />
    <rect x="37.6" y="24" width="3.4" height="7" :fill="topperColor" />

    <template v-if="accessory === 'glasses'">
      <rect x="21" y="23" width="8" height="9" fill="none" :stroke="topperColor" stroke-width="1.4" />
      <rect x="35" y="23" width="8" height="9" fill="none" :stroke="topperColor" stroke-width="1.4" />
      <line x1="29" y1="27" x2="35" y2="27" :stroke="topperColor" stroke-width="1.4" />
    </template>

    <path v-if="accessory === 'collar'" d="M18 40 L32 48 L46 40 L46 46 L32 54 L18 46 Z" fill="#0f172a" opacity="0.5" />
  </svg>
</template>
