<script setup lang="ts">
import { STAT_KEYS, type DeathInfo, type Stats } from "../types/game";
import { STAT_META } from "../data/statMeta";

const props = defineProps<{
  deathInfo: DeathInfo;
  week: number;
  stats: Stats;
  highScore: number;
  isNewHighScore: boolean;
}>();

const emit = defineEmits<{
  restart: [];
  menu: [];
}>();

const CAUSE_FRAME_COLOR: Record<string, string> = {
  Board: "#5b6b96",
  Culture: "#2f8f6f",
  Velocity: "#c26a2b",
  Ledger: "#c7861f",
};
const frameColor = CAUSE_FRAME_COLOR[props.deathInfo.stat];
</script>

<template>
  <div class="app-backdrop flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center gap-6">
    <p class="font-display text-xs uppercase tracking-[0.2em]" style="color: var(--accent-red)">
      {{ STAT_META[deathInfo.stat].label }} {{ deathInfo.extreme === "low" ? "bottomed out" : "maxed out" }}
    </p>

    <p class="font-display text-xl max-w-md leading-relaxed" style="color: var(--cream)">
      "{{ deathInfo.epitaph }}"
    </p>

    <div class="w-36 h-36 rounded flex items-center justify-center" :style="{ backgroundColor: frameColor }">
      <svg viewBox="0 0 64 64" class="w-20 h-20" fill="var(--ink)" aria-hidden="true">
        <rect x="14" y="30" width="36" height="24" rx="1" />
        <rect x="24" y="22" width="16" height="10" rx="1" fill="none" stroke="var(--ink)" stroke-width="2" />
        <line x1="14" y1="40" x2="50" y2="40" stroke="var(--cream)" stroke-width="2" opacity="0.5" />
        <line x1="32" y1="30" x2="32" y2="54" stroke="var(--cream)" stroke-width="2" opacity="0.5" />
      </svg>
    </div>

    <div class="flex flex-col items-center gap-1">
      <div class="font-display text-2xl font-semibold" style="color: var(--cream)">Jane Doe</div>
      <div class="font-display text-xs uppercase tracking-widest" style="color: var(--cream); opacity: 0.6">
        {{ week }} weeks in power
      </div>
      <div v-if="isNewHighScore" class="mt-1 font-display font-semibold text-sm" style="color: var(--manila)">
        New personal best!
      </div>
      <div v-else class="mt-1 font-display text-sm" style="color: var(--cream); opacity: 0.5">
        Personal best: {{ highScore }} weeks
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 w-full max-w-sm text-sm">
      <div v-for="key in STAT_KEYS" :key="key" class="flex flex-col items-center gap-0.5">
        <span class="font-display text-[10px] uppercase tracking-wider" style="color: var(--cream); opacity: 0.5">{{
          STAT_META[key].label
        }}</span>
        <span class="font-display font-semibold" style="color: var(--cream)">{{ stats[key] }}</span>
      </div>
    </div>

    <div class="flex gap-3 mt-4">
      <button
        type="button"
        class="rounded px-6 py-3 font-display font-semibold tracking-wide focus:outline-none focus-visible:ring-2 transition-opacity hover:opacity-90"
        style="background-color: var(--accent-red); color: var(--cream); --tw-ring-color: var(--cream)"
        @click="emit('restart')"
      >
        Try Again
      </button>
      <button
        type="button"
        class="rounded px-6 py-3 font-display font-semibold tracking-wide focus:outline-none focus-visible:ring-2 transition-opacity hover:opacity-90"
        style="background-color: var(--ink-panel); color: var(--cream); --tw-ring-color: var(--cream)"
        @click="emit('menu')"
      >
        Main Menu
      </button>
    </div>
  </div>
</template>
