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
    <div class="flex flex-col items-center gap-5">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center border-2 border-indigo-400/60 bg-indigo-500/10"
        aria-hidden="true"
      >
        <span class="text-3xl">💼</span>
      </div>

      <div>
        <h1 class="font-display text-4xl sm:text-5xl font-semibold text-white tracking-[0.08em]">JANE DOE</h1>
        <p class="font-mono-brand text-[11px] uppercase tracking-[0.3em] text-slate-500 mt-1">
          Employee Survival Record
        </p>
      </div>

      <p class="text-slate-400 max-w-sm mx-auto leading-relaxed">
        A corporate swipe-to-survive game. Keep Board, Culture, Velocity, and Ledger balanced.
        Let any one hit zero or one hundred, and your career ends.
      </p>
    </div>

    <button
      type="button"
      class="rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-display font-semibold text-lg tracking-wide px-10 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-colors"
      @click="emit('start')"
    >
      Start Week 1
    </button>

    <div v-if="highScore > 0" class="font-mono-brand text-slate-400 text-xs uppercase tracking-widest">
      Personal best: <span class="font-semibold text-slate-200">{{ highScore }}</span> weeks survived
    </div>

    <p class="border border-dashed border-slate-700 rounded-lg px-4 py-3 text-slate-500 text-xs max-w-xs leading-relaxed">
      Swipe or drag the card left/right, or use the buttons below it. Every decision moves four stats — balance is everything.
    </p>
  </div>
</template>
