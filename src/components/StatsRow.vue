<script setup lang="ts">
import { STAT_KEYS, type StatKey, type Stats } from "../types/game";
import { STAT_META } from "../data/statMeta";
import StatIcon from "./StatIcon.vue";

const props = defineProps<{
  stats: Stats;
  effects?: Partial<Stats> | null;
  preview?: Partial<Stats> | null;
  pulseId?: number;
}>();

function delta(key: StatKey) {
  return props.effects?.[key];
}

function previewDelta(key: StatKey): number {
  return props.preview?.[key] ?? 0;
}

function clamp(v: number) {
  return Math.min(100, Math.max(0, v));
}

/* Glanceable magnitude, Reigns-style: 1–3 arrows, no exact numbers. */
function arrows(key: StatKey): string {
  const d = previewDelta(key);
  if (!d) return "";
  const n = Math.abs(d) <= 6 ? 1 : Math.abs(d) <= 12 ? 2 : 3;
  return (d > 0 ? "▲" : "▼").repeat(n);
}

/* The translucent ghost segment overlaid on the bar showing the pending swing:
   for a gain it extends past the current fill; for a loss it marks what leaves. */
function ghostStyle(key: StatKey) {
  const d = previewDelta(key);
  if (!d) return { display: "none" };
  const from = props.stats[key];
  const to = clamp(from + d);
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  return {
    left: lo + "%",
    width: hi - lo + "%",
    backgroundColor: d > 0 ? "rgba(255,255,255,0.55)" : "var(--accent-red)",
  };
}
</script>

<template>
  <div class="panel-ink w-full flex justify-center px-3 py-3">
    <div class="grid grid-cols-4 gap-4 sm:gap-8 w-full max-w-2xl">
      <div v-for="key in STAT_KEYS" :key="key" class="relative flex flex-col items-center gap-1.5">
        <span
          v-if="delta(key)"
          :key="`${key}-${pulseId}`"
          class="pointer-events-none absolute -top-3 font-display text-sm font-bold animate-float-up"
          :style="{ color: (delta(key) ?? 0) > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }"
        >
          {{ (delta(key) ?? 0) > 0 ? "+" : "" }}{{ delta(key) }}
        </span>

        <div class="relative w-6 h-6 sm:w-7 sm:h-7" style="color: var(--cream)">
          <StatIcon :stat="key" />
          <span
            v-if="arrows(key)"
            class="pointer-events-none absolute -right-2.5 top-1/2 -translate-y-1/2 text-[8px] leading-none tracking-tighter"
            :style="{ color: previewDelta(key) > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }"
          >
            {{ arrows(key) }}
          </span>
        </div>

        <div
          class="relative w-full h-1 rounded-sm overflow-hidden"
          style="background-color: rgba(236, 225, 191, 0.15)"
          role="progressbar"
          :aria-label="`${STAT_META[key].label}: ${stats[key]} out of 100`"
          :aria-valuenow="stats[key]"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="h-full transition-all duration-[400ms] ease-out"
            :style="{ width: stats[key] + '%', backgroundColor: STAT_META[key].hex }"
          />
          <div class="absolute inset-y-0 opacity-80" :style="ghostStyle(key)" />
        </div>

        <span class="font-display text-[10px] tracking-widest uppercase" style="color: var(--cream); opacity: 0.75">
          {{ STAT_META[key].label }}
        </span>
      </div>
    </div>
  </div>
</template>
