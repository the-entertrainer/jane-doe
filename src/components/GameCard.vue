<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Card } from "../types/game";
import AvatarBadge from "./AvatarBadge.vue";

const props = defineProps<{
  card: Card;
  locked: boolean;
}>();

const emit = defineEmits<{
  choose: [direction: "left" | "right"];
  preview: [direction: "left" | "right" | null];
}>();

const THRESHOLD = 100;

const dragging = ref(false);
const startX = ref(0);
const deltaX = ref(0);
const exiting = ref<"left" | "right" | null>(null);
const hover = ref<"left" | "right" | null>(null);

const rotation = computed(() => deltaX.value / 18);
const activeDirection = computed<"left" | "right" | null>(() => {
  if (Math.abs(deltaX.value) < 24) return null;
  return deltaX.value > 0 ? "right" : "left";
});

/* Surface the pending choice so the stat bars can preview its effects:
   the drag direction takes priority; otherwise a hovered/focused button. */
const previewDirection = computed<"left" | "right" | null>(() => activeDirection.value ?? hover.value);
watch(previewDirection, (dir) => emit("preview", dir));

/* Flat, saturated portrait-frame backgrounds, picked per card — echoes the
   solid color block behind every Reigns character illustration. */
const PORTRAIT_COLORS = ["#b3312c", "#2f5f8f", "#3a6b52", "#5a3f7a", "#8a5a2b"];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const portraitColor = computed(() => PORTRAIT_COLORS[hash(props.card.id) % PORTRAIT_COLORS.length]);

const cardStyle = computed(() => {
  if (exiting.value) {
    const flyX = exiting.value === "right" ? 700 : -700;
    return {
      transform: `translateX(${flyX}px) rotate(${exiting.value === "right" ? 25 : -25}deg)`,
      opacity: "0",
      transition: "transform 380ms ease-in, opacity 380ms ease-in",
    };
  }
  return {
    transform: `translateX(${deltaX.value}px) rotate(${rotation.value}deg)`,
    transition: dragging.value ? "none" : "transform 260ms ease-out",
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
  hover.value = null;
  exiting.value = direction;
  window.setTimeout(() => {
    emit("choose", direction);
    exiting.value = null;
    deltaX.value = 0;
  }, 340);
}
</script>

<template>
  <div class="relative w-full max-w-[380px] select-none">
    <div
      class="card-manila relative rounded-lg touch-none cursor-grab active:cursor-grabbing"
      :style="cardStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div class="relative px-6 pt-6 pb-7 flex flex-col items-center gap-4 min-h-[380px] overflow-hidden">
        <div
          class="choice-flag absolute top-4 left-4 max-w-[38%] px-2 py-1 text-center text-[11px] leading-tight transition-opacity"
          :class="activeDirection === 'left' ? 'opacity-100 animate-flag-in' : 'opacity-0'"
        >
          {{ card.left.label }}
        </div>
        <div
          class="choice-flag absolute top-4 right-4 max-w-[38%] px-2 py-1 text-center text-[11px] leading-tight transition-opacity"
          :class="activeDirection === 'right' ? 'opacity-100 animate-flag-in' : 'opacity-0'"
        >
          {{ card.right.label }}
        </div>

        <p class="font-display text-lg leading-snug text-center mt-2" style="color: var(--ink)">
          {{ card.text }}
        </p>

        <div class="w-40 h-40 shrink-0 rounded" :style="{ backgroundColor: portraitColor }">
          <AvatarBadge :seed="`${card.speaker}|${card.role}`" />
        </div>

        <div class="text-center">
          <div class="font-display text-base font-semibold leading-tight" style="color: var(--ink)">
            {{ card.speaker }}
          </div>
          <div v-if="card.role" class="font-display text-xs mt-0.5" style="color: var(--ink); opacity: 0.65">
            {{ card.role }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-2 gap-3">
      <button
        type="button"
        class="rounded-md py-3 px-3 text-sm font-display focus:outline-none focus-visible:ring-2 transition-opacity disabled:opacity-40"
        style="background-color: var(--ink-panel); color: var(--accent-red); --tw-ring-color: var(--accent-red)"
        :disabled="locked"
        @click="commit('left')"
        @pointerenter="hover = 'left'"
        @pointerleave="hover = null"
        @focus="hover = 'left'"
        @blur="hover = null"
      >
        ← {{ card.left.label }}
      </button>
      <button
        type="button"
        class="rounded-md py-3 px-3 text-sm font-display focus:outline-none focus-visible:ring-2 transition-opacity disabled:opacity-40"
        style="background-color: var(--ink-panel); color: var(--accent-green); --tw-ring-color: var(--accent-green)"
        :disabled="locked"
        @click="commit('right')"
        @pointerenter="hover = 'right'"
        @pointerleave="hover = null"
        @focus="hover = 'right'"
        @blur="hover = null"
      >
        {{ card.right.label }} →
      </button>
    </div>
  </div>
</template>
