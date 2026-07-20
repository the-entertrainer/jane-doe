<script setup lang="ts">
defineProps<{
  highScore: number;
}>();

const emit = defineEmits<{
  start: [];
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center gap-8">
    <div>
      <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight">JANE DOE</h1>
      <p class="mt-3 text-slate-400 max-w-sm mx-auto">
        A corporate swipe-to-survive game. Keep Board, Culture, Velocity, and Ledger balanced.
        Let any one hit zero or one hundred, and your career ends.
      </p>
    </div>

    <button
      type="button"
      class="rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-lg px-10 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-colors"
      @click="emit('start')"
    >
      Start Week 1
    </button>

    <div v-if="highScore > 0" class="text-slate-400 text-sm">
      Personal best: <span class="font-semibold text-slate-200">{{ highScore }}</span> weeks survived
    </div>

    <p class="text-slate-600 text-xs max-w-xs">
      Swipe or drag the card left/right, or use the buttons below it. Every decision moves four stats — balance is everything.
    </p>
  </div>
</template>
