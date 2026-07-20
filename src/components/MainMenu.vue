<script setup lang="ts">
import { STAT_KEYS } from "../types/game";
import StatIcon from "./StatIcon.vue";

defineProps<{
  highScore: number;
}>();

const emit = defineEmits<{
  start: [];
}>();
</script>

<template>
  <div class="app-backdrop flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center gap-8">
    <div class="flex flex-col items-center gap-4">
      <div class="card-manila flex items-center justify-center gap-5 px-6 py-3 rounded">
        <div v-for="key in STAT_KEYS" :key="key" class="w-7 h-7" style="color: var(--ink)">
          <StatIcon :stat="key" />
        </div>
      </div>

      <h1
        class="font-display text-5xl sm:text-6xl font-bold tracking-wide"
        style="color: var(--cream); text-shadow: 4px 4px 0 var(--ink)"
      >
        JANE DOE
      </h1>

      <p class="font-display max-w-sm mx-auto leading-relaxed mt-2" style="color: var(--cream); opacity: 0.75">
        A corporate swipe-to-survive game. Keep Board, Culture, Velocity, and Ledger balanced.
        Let any one hit zero or one hundred, and your career ends.
      </p>
    </div>

    <button
      type="button"
      class="rounded px-10 py-4 font-display font-semibold text-lg tracking-wide focus:outline-none focus-visible:ring-2 transition-opacity hover:opacity-90"
      style="background-color: var(--accent-red); color: var(--cream); --tw-ring-color: var(--cream)"
      @click="emit('start')"
    >
      Start Week 1
    </button>

    <div v-if="highScore > 0" class="font-display text-xs uppercase tracking-widest" style="color: var(--cream); opacity: 0.6">
      Personal best: <span class="font-semibold">{{ highScore }}</span> weeks survived
    </div>

    <p
      class="font-display text-xs max-w-xs leading-relaxed px-4 py-3 rounded"
      style="color: var(--cream); opacity: 0.55; background-color: var(--ink-panel)"
    >
      Swipe or drag the card left/right, or use the buttons below it. Every decision moves four stats — balance is everything.
    </p>
  </div>
</template>
