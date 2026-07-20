<script setup lang="ts">
import { computed, ref } from "vue";
import type { Card } from "../types/game";

const props = defineProps<{
  card: Card;
  locked: boolean;
}>();

const emit = defineEmits<{
  choose: [direction: "left" | "right"];
}>();

const THRESHOLD = 100;

const dragging = ref(false);
const startX = ref(0);
const deltaX = ref(0);
const exiting = ref<"left" | "right" | null>(null);

const rotation = computed(() => deltaX.value / 18);
const activeDirection = computed<"left" | "right" | null>(() => {
  if (Math.abs(deltaX.value) < 24) return null;
  return deltaX.value > 0 ? "right" : "left";
});

const cardStyle = computed(() => {
  if (exiting.value) {
    const flyX = exiting.value === "right" ? 700 : -700;
    return {
      transform: `translateX(${flyX}px) rotate(${exiting.value === "right" ? 30 : -30}deg)`,
      opacity: "0",
      transition: "transform 400ms ease-in, opacity 400ms ease-in",
    };
  }
  return {
    transform: `translateX(${deltaX.value}px) rotate(${rotation.value}deg)`,
    transition: dragging.value ? "none" : "transform 300ms ease-out",
  };
});

function onPointerDown(event: PointerEvent) {
  if (props.locked || exiting.value) return;
  dragging.value = true;
  startX.value = event.clientX;
  (event.target as HTMLElement).setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return;
  deltaX.value = event.clientX - startX.value;
}

function onPointerUp() {
  if (!dragging.value) return;
  dragging.value = false;

  if (Math.abs(deltaX.value) >= THRESHOLD) {
    commit(deltaX.value > 0 ? "right" : "left");
  } else {
    deltaX.value = 0;
  }
}

function commit(direction: "left" | "right") {
  if (props.locked || exiting.value) return;
  exiting.value = direction;
  window.setTimeout(() => {
    emit("choose", direction);
    exiting.value = null;
    deltaX.value = 0;
  }, 380);
}
</script>

<template>
  <div class="relative w-full max-w-[420px] select-none">
    <div
      class="relative rounded-2xl bg-white text-slate-900 shadow-2xl p-6 flex flex-col gap-4 min-h-[320px] touch-none cursor-grab active:cursor-grabbing"
      :style="cardStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div
        class="absolute top-4 left-4 rounded-md border-2 px-2 py-1 text-xs font-bold uppercase tracking-wide transition-opacity"
        :class="[
          activeDirection === 'left' ? 'opacity-100' : 'opacity-0',
          'border-red-500 text-red-500 -rotate-12',
        ]"
      >
        {{ card.left.label }}
      </div>
      <div
        class="absolute top-4 right-4 rounded-md border-2 px-2 py-1 text-xs font-bold uppercase tracking-wide transition-opacity"
        :class="[
          activeDirection === 'right' ? 'opacity-100' : 'opacity-0',
          'border-emerald-500 text-emerald-500 rotate-12',
        ]"
      >
        {{ card.right.label }}
      </div>

      <div class="flex items-center gap-3 mt-6">
        <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl shrink-0" aria-hidden="true">
          🧑‍💼
        </div>
        <div>
          <div class="font-bold leading-tight">{{ card.speaker }}</div>
          <div class="text-sm text-slate-500 leading-tight">{{ card.role }}</div>
        </div>
      </div>

      <p class="text-lg leading-relaxed flex-1">{{ card.text }}</p>
    </div>

    <div class="mt-5 grid grid-cols-2 gap-3">
      <button
        type="button"
        class="rounded-xl border border-red-500/50 bg-red-500/10 text-red-300 font-semibold py-3 px-3 text-sm hover:bg-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 transition-colors disabled:opacity-40"
        :disabled="locked"
        @click="commit('left')"
      >
        ← {{ card.left.label }}
      </button>
      <button
        type="button"
        class="rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-semibold py-3 px-3 text-sm hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-colors disabled:opacity-40"
        :disabled="locked"
        @click="commit('right')"
      >
        {{ card.right.label }} →
      </button>
    </div>
  </div>
</template>
