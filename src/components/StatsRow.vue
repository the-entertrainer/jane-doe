<script setup lang="ts">
import { STAT_KEYS, type Stats } from "../types/game";

const props = defineProps<{
  stats: Stats;
  effects?: Partial<Stats> | null;
  pulseId?: number;
}>();

function delta(key: (typeof STAT_KEYS)[number]) {
  return props.effects?.[key];
}

const STAT_META: Record<string, { icon: string; label: string; bar: string; barWarn: string; text: string }> = {
  Board: {
    icon: "💼",
    label: "Board",
    bar: "bg-indigo-500",
    barWarn: "bg-red-500",
    text: "text-indigo-300",
  },
  Culture: {
    icon: "👥",
    label: "Culture",
    bar: "bg-teal-500",
    barWarn: "bg-red-500",
    text: "text-teal-300",
  },
  Velocity: {
    icon: "📈",
    label: "Velocity",
    bar: "bg-amber-500",
    barWarn: "bg-red-500",
    text: "text-amber-300",
  },
  Ledger: {
    icon: "💰",
    label: "Ledger",
    bar: "bg-yellow-500",
    barWarn: "bg-red-500",
    text: "text-yellow-300",
  },
};

function isWarn(value: number) {
  return value <= 20 || value >= 80;
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
    <div v-for="key in STAT_KEYS" :key="key" class="relative flex flex-col gap-1">
      <span
        v-if="delta(key)"
        :key="`${key}-${pulseId}`"
        class="pointer-events-none absolute -top-1 right-0 z-10 text-sm font-bold animate-float-up"
        :class="(delta(key) ?? 0) > 0 ? 'text-emerald-400' : 'text-red-400'"
      >
        {{ (delta(key) ?? 0) > 0 ? "+" : "" }}{{ delta(key) }}
      </span>
      <div class="flex items-center justify-between text-xs sm:text-sm font-medium" :class="STAT_META[key].text">
        <span class="flex items-center gap-1">
          <span aria-hidden="true">{{ STAT_META[key].icon }}</span>
          <span>{{ STAT_META[key].label }}</span>
        </span>
        <span class="tabular-nums text-slate-400">{{ stats[key] }}</span>
      </div>
      <div
        class="h-2.5 rounded-full bg-slate-800 overflow-hidden"
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
</template>
