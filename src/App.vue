<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useGame } from "./composables/useGame";
import StatsRow from "./components/StatsRow.vue";
import GameCard from "./components/GameCard.vue";
import GameOver from "./components/GameOver.vue";
import MainMenu from "./components/MainMenu.vue";
import TagBanners from "./components/TagBanners.vue";
import type { Stats } from "./types/game";

const {
  phase,
  stats,
  week,
  currentCard,
  highScore,
  deathInfo,
  lastEffects,
  activeTags,
  isNewHighScore,
  startRun,
  choose,
  returnToMenu,
} = useGame();

const locked = ref(false);
const pulseId = ref(0);
const previewDir = ref<"left" | "right" | null>(null);

/* The stat effects the currently hovered/dragged choice would apply, for the
   live preview on the bars. Cleared while the choice-commit animation runs. */
const previewEffects = computed<Partial<Stats> | null>(() => {
  if (locked.value || !currentCard.value || !previewDir.value) return null;
  return currentCard.value[previewDir.value].effects;
});

watch(lastEffects, () => {
  pulseId.value += 1;
});

function handleChoose(direction: "left" | "right") {
  if (locked.value) return;
  locked.value = true;
  previewDir.value = null;
  choose(direction);
  window.setTimeout(() => {
    locked.value = false;
  }, 700);
}
</script>

<template>
  <div class="app-backdrop min-h-screen">
    <MainMenu v-if="phase === 'menu'" :high-score="highScore" @start="startRun" />

    <div v-else-if="phase === 'playing'" class="flex flex-col items-center min-h-screen">
      <StatsRow :stats="stats" :effects="lastEffects" :preview="previewEffects" :pulse-id="pulseId" />
      <div class="font-display text-xs tracking-[0.2em] uppercase mt-4" style="color: var(--cream); opacity: 0.6">
        Week {{ week }}
      </div>

      <TagBanners :tags="activeTags" />

      <div class="flex-1 flex items-center justify-center w-full px-4 py-6">
        <GameCard
          v-if="currentCard"
          :card="currentCard"
          :locked="locked"
          @choose="handleChoose"
          @preview="previewDir = $event"
        />
      </div>
    </div>

    <GameOver
      v-else-if="phase === 'gameover' && deathInfo"
      :death-info="deathInfo"
      :week="week"
      :stats="stats"
      :high-score="highScore"
      :is-new-high-score="isNewHighScore"
      @restart="startRun"
      @menu="returnToMenu"
    />
  </div>
</template>
