<script setup lang="ts">
import { computed, ref } from "vue";
import type { Card } from "../types/game";
import { STAT_KEYS } from "../types/game";
import { STAT_META } from "../data/statMeta";
import AvatarBadge from "./AvatarBadge.vue";

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

const dominantStat = computed(() => {
  let best: (typeof STAT_KEYS)[number] = "Board";
  let bestMagnitude = -1;
  for (const key of STAT_KEYS) {
    const magnitude = Math.abs(props.card.left.effects[key] ?? 0) + Math.abs(props.card.right.effects[key] ?? 0);
    if (magnitude > bestMagnitude) {
      bestMagnitude = magnitude;
      best = key;
    }
  }
  return best;
});

const accentHex = computed(() => STAT_META[dominantStat.value].hex);

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
      class="relative rounded-2xl p-[3px] shadow-2xl touch-none cursor-grab active:cursor-grabbing"
      style="background: linear-gradient(155deg, #c9a668, #8a6d3b, #c9a668)"
      :style="cardStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div class="card-parchment relative rounded-[14px] text-slate-900 p-6 flex flex-col gap-4 min-h-[320px] overflow-hidden">
        <span class="absolute top-3 left-3 font-mono-brand text-[10px] tracking-widest text-slate-500/70">
          FILE {{ card.id.replace("card_", "#") }}
        </span>

        <div
          class="ink-stamp ink-stamp--left absolute top-10 left-3 max-w-[42%] rounded-lg px-2 py-1 text-center text-[10px] leading-tight transition-opacity"
          :class="[activeDirection === 'left' ? 'opacity-90 animate-stamp-in' : 'opacity-0', '-rotate-[10deg]']"
        >
          {{ card.left.label }}
        </div>
        <div
          class="ink-stamp ink-stamp--right absolute top-10 right-3 max-w-[42%] rounded-lg px-2 py-1 text-center text-[10px] leading-tight transition-opacity"
          :class="[activeDirection === 'right' ? 'opacity-90 animate-stamp-in' : 'opacity-0', 'rotate-[8deg]']"
        >
          {{ card.right.label }}
        </div>

        <div class="flex items-center gap-3 mt-9">
          <div
            class="w-14 h-14 rounded-full shrink-0 bg-white/40"
            :style="{ boxShadow: `0 0 0 2px ${accentHex}` }"
          >
            <AvatarBadge :seed="`${card.speaker}|${card.role}`" :accent="accentHex" />
          </div>
          <div class="min-w-0">
            <div class="font-display text-lg font-semibold leading-tight tracking-wide truncate">{{ card.speaker }}</div>
            <div class="font-mono-brand text-[11px] uppercase tracking-wider text-slate-500 leading-tight truncate">
              {{ card.role }}
            </div>
          </div>
        </div>

        <p class="text-lg leading-relaxed flex-1">{{ card.text }}</p>
      </div>
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
