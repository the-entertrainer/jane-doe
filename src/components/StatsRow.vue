<script setup lang="ts">
import { STAT_KEYS, type Stats } from "../types/game";
import { STAT_META } from "../data/statMeta";
import StatIcon from "./StatIcon.vue";

const props = defineProps<{
  stats: Stats;
  effects?: Partial<Stats> | null;
  pulseId?: number;
}>();

function delta(key: (typeof STAT_KEYS)[number]) {
  return props.effects?.[key];
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

        <div class="w-6 h-6 sm:w-7 sm:h-7" style="color: var(--cream)">
          <StatIcon :stat="key" />
        </div>

        <div
          class="w-full h-1 rounded-sm overflow-hidden"
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
        </div>

        <span class="font-display text-[10px] tracking-widest uppercase" style="color: var(--cream); opacity: 0.75">
          {{ STAT_META[key].label }}
        </span>
      </div>
    </div>
  </div>
</template>
