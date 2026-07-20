<script setup lang="ts">
import { STAT_KEYS, type DeathInfo, type Stats } from "../types/game";

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

const STAT_LABEL: Record<string, string> = {
  Board: "Board",
  Culture: "Culture",
  Velocity: "Velocity",
  Ledger: "Ledger",
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center gap-6">
    <div>
      <p class="uppercase tracking-widest text-red-400 text-sm font-semibold mb-2">
        {{ STAT_LABEL[deathInfo.stat] }} {{ deathInfo.extreme === "low" ? "bottomed out" : "maxed out" }}
      </p>
      <h1 class="text-2xl sm:text-3xl font-bold text-white">Career Over</h1>
    </div>

    <p class="max-w-md text-slate-300 text-lg leading-relaxed italic">
      "{{ deathInfo.epitaph }}"
    </p>

    <div class="flex flex-col items-center gap-1">
      <div class="text-5xl font-black text-white tabular-nums">{{ week }}</div>
      <div class="text-slate-400 text-sm">weeks survived</div>
      <div v-if="isNewHighScore" class="mt-1 text-amber-400 font-semibold text-sm">🏆 New personal best!</div>
      <div v-else class="mt-1 text-slate-500 text-sm">Personal best: {{ highScore }} weeks</div>
    </div>

    <div class="grid grid-cols-4 gap-4 w-full max-w-sm text-sm">
      <div v-for="key in STAT_KEYS" :key="key" class="flex flex-col items-center gap-0.5">
        <span class="text-slate-500">{{ STAT_LABEL[key] }}</span>
        <span class="tabular-nums font-semibold text-slate-200">{{ stats[key] }}</span>
      </div>
    </div>

    <div class="flex gap-3 mt-4">
      <button
        type="button"
        class="rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-colors"
        @click="emit('restart')"
      >
        Try Again
      </button>
      <button
        type="button"
        class="rounded-xl border border-slate-600 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition-colors"
        @click="emit('menu')"
      >
        Main Menu
      </button>
    </div>
  </div>
</template>
