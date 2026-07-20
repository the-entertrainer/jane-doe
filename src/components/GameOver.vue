<script setup lang="ts">
import { STAT_KEYS, type DeathInfo, type Stats } from "../types/game";
import { STAT_META } from "../data/statMeta";

defineProps<{
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
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center gap-6">
    <div class="relative rounded-2xl p-[3px] w-full max-w-md" style="background: linear-gradient(155deg, #c9a668, #8a6d3b, #c9a668)">
      <div class="card-parchment relative rounded-[14px] text-slate-900 px-6 pt-14 pb-8 overflow-hidden">
        <div
          class="ink-stamp absolute top-4 right-4 rotate-[10deg] rounded-lg border-red-700 text-red-700 px-3 py-1.5 text-sm animate-stamp-in"
        >
          Terminated
        </div>

        <p class="font-mono-brand text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-1 pr-8">
          {{ STAT_META[deathInfo.stat].label }} {{ deathInfo.extreme === "low" ? "bottomed out" : "maxed out" }}
        </p>
        <h1 class="font-display text-2xl sm:text-3xl font-semibold tracking-wide">Exit Interview</h1>

        <p class="mt-4 text-slate-700 text-lg leading-relaxed italic">"{{ deathInfo.epitaph }}"</p>
      </div>
    </div>

    <div class="flex flex-col items-center gap-1">
      <div class="font-display text-5xl font-semibold text-white tabular-nums">{{ week }}</div>
      <div class="font-mono-brand text-slate-400 text-xs uppercase tracking-widest">weeks survived</div>
      <div v-if="isNewHighScore" class="mt-1 text-amber-400 font-semibold text-sm">🏆 New personal best!</div>
      <div v-else class="mt-1 text-slate-500 text-sm">Personal best: {{ highScore }} weeks</div>
    </div>

    <div class="grid grid-cols-4 gap-4 w-full max-w-sm text-sm">
      <div v-for="key in STAT_KEYS" :key="key" class="flex flex-col items-center gap-0.5">
        <span class="font-mono-brand text-[10px] uppercase tracking-wider" :class="STAT_META[key].text">{{ STAT_META[key].label }}</span>
        <span class="font-display tabular-nums font-semibold text-slate-200">{{ stats[key] }}</span>
      </div>
    </div>

    <div class="flex gap-3 mt-4">
      <button
        type="button"
        class="rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-display font-semibold tracking-wide px-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-colors"
        @click="emit('restart')"
      >
        Try Again
      </button>
      <button
        type="button"
        class="rounded-xl border border-slate-600 hover:bg-slate-800 text-slate-200 font-display font-semibold tracking-wide px-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition-colors"
        @click="emit('menu')"
      >
        Main Menu
      </button>
    </div>
  </div>
</template>
