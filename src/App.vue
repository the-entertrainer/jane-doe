<script setup lang="ts">
import { ref, watch } from "vue";
import { useGame } from "./composables/useGame";
import StatsRow from "./components/StatsRow.vue";
import GameCard from "./components/GameCard.vue";
import GameOver from "./components/GameOver.vue";
import MainMenu from "./components/MainMenu.vue";

const { phase, stats, week, currentCard, highScore, deathInfo, lastEffects, isNewHighScore, startRun, choose, returnToMenu } =
  useGame();

const locked = ref(false);
const pulseId = ref(0);

watch(lastEffects, () => {
  pulseId.value += 1;
});

function handleChoose(direction: "left" | "right") {
  if (locked.value) return;
  locked.value = true;
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
      <StatsRow :stats="stats" :effects="lastEffects" :pulse-id="pulseId" />
      <div class="font-display text-xs tracking-[0.2em] uppercase mt-4" style="color: var(--cream); opacity: 0.6">
        Week {{ week }}
      </div>

      <div class="flex-1 flex items-center justify-center w-full px-4 py-6">
        <GameCard v-if="currentCard" :card="currentCard" :locked="locked" @choose="handleChoose" />
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
