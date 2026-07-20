<script setup lang="ts">
import { STAT_KEYS, type Stats } from "../types/game";
import { STAT_META } from "../data/statMeta";

const props = defineProps<{
  stats: Stats;
  effects?: Partial<Stats> | null;
  pulseId?: number;
}>();

function delta(key: (typeof STAT_KEYS)[number]) {
  return props.effects?.[key];
}

function isWarn(value: number) {
  return value <= 20 || value >= 80;
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
    <div v-for="key in STAT_KEYS" :key="key" class="relative flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2">
      <span
        v-if="delta(key)"
        :key="`${key}-${pulseId}`"
        class="pointer-events-none absolute -top-2 right-1 z-10 font-mono-brand text-sm font-bold animate-float-up"
        :class="(delta(key) ?? 0) > 0 ? 'text-emerald-400' : 'text-red-400'"
      >
        {{ (delta(key) ?? 0) > 0 ? "+" : "" }}{{ delta(key) }}
      </span>

      <div
        class="flex items-center justify-center w-9 h-9 rounded-full border-2 shrink-0"
        :style="{ borderColor: STAT_META[key].hex, backgroundColor: STAT_META[key].hex + '22' }"
        aria-hidden="true"
      >
        <span class="text-base leading-none">{{ STAT_META[key].icon }}</span>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-baseline justify-between">
          <span class="font-mono-brand text-[10px] uppercase tracking-widest" :class="STAT_META[key].text">
            {{ STAT_META[key].label }}
          </span>
          <span class="font-display tabular-nums text-sm font-semibold text-slate-200">{{ stats[key] }}</span>
        </div>
        <div
          class="mt-1 h-1.5 rounded-full bg-slate-800 overflow-hidden"
          role="progressbar"
          :aria-label="`${STAT_META[key].label}: ${stats[key]} out of 100`"
          :aria-valuenow="stats[key]"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="h-full rounded-full transition-all duration-[400ms] ease-out"
            :class="isWarn(stats[key]) ? STAT_META[key].barWarn : STAT_META[key].bar"
            :style="{ width: stats[key] + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
