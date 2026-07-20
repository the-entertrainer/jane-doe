import { reactive, ref, computed } from "vue";
import { cards } from "../data/cards";
import { deathMessages } from "../data/deaths";
import { STAT_KEYS, type Card, type DeathInfo, type Stats } from "../types/game";

const RECENT_HISTORY_SIZE = 9;
const HIGH_SCORE_KEY = "janeDoe_highScore";
const TOTAL_RUNS_KEY = "janeDoe_totalRuns";
const DEATHS_KEY = "janeDoe_deaths";

type Phase = "menu" | "playing" | "gameover";

type DeathCounts = Record<string, number>;

function loadHighScore(): number {
  const raw = localStorage.getItem(HIGH_SCORE_KEY);
  return raw ? Number(raw) || 0 : 0;
}

function loadTotalRuns(): number {
  const raw = localStorage.getItem(TOTAL_RUNS_KEY);
  return raw ? Number(raw) || 0 : 0;
}

function loadDeaths(): DeathCounts {
  const raw = localStorage.getItem(DEATHS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function freshStats(): Stats {
  return { Board: 50, Culture: 50, Velocity: 50, Ledger: 50 };
}

const phase = ref<Phase>("menu");
const stats = reactive<Stats>(freshStats());
const week = ref(0);
const currentCard = ref<Card | null>(null);
const recentHistory: string[] = [];
const highScore = ref(loadHighScore());
const totalRuns = ref(loadTotalRuns());
const deathCounts = reactive<DeathCounts>(loadDeaths());
const deathInfo = ref<DeathInfo | null>(null);
const lastEffects = ref<Partial<Stats> | null>(null);
const wasNewHighScore = ref(false);

function drawCard(): Card {
  const eligible = cards.filter(
    (c) => (c.minWeek === undefined || week.value >= c.minWeek) && !recentHistory.includes(c.id)
  );
  const pool = eligible.length > 0 ? eligible : cards.filter((c) => c.minWeek === undefined || week.value >= c.minWeek);
  const finalPool = pool.length > 0 ? pool : cards;

  const totalWeight = finalPool.reduce((sum, c) => sum + (c.weight ?? 1), 0);
  let roll = Math.random() * totalWeight;
  for (const card of finalPool) {
    roll -= card.weight ?? 1;
    if (roll <= 0) return card;
  }
  return finalPool[finalPool.length - 1];
}

function pushHistory(id: string) {
  recentHistory.push(id);
  while (recentHistory.length > RECENT_HISTORY_SIZE) {
    recentHistory.shift();
  }
}

function checkDeath(): DeathInfo | null {
  for (const key of STAT_KEYS) {
    if (stats[key] <= 0) {
      return { stat: key, extreme: "low", epitaph: deathMessages[key].low };
    }
    if (stats[key] >= 100) {
      return { stat: key, extreme: "high", epitaph: deathMessages[key].high };
    }
  }
  return null;
}

function recordDeath(info: DeathInfo) {
  const key = `${info.stat}_${info.extreme === "low" ? "low" : "high"}`;
  deathCounts[key] = (deathCounts[key] ?? 0) + 1;
  localStorage.setItem(DEATHS_KEY, JSON.stringify(deathCounts));
}

function startRun() {
  Object.assign(stats, freshStats());
  week.value = 0;
  recentHistory.length = 0;
  deathInfo.value = null;
  lastEffects.value = null;
  currentCard.value = drawCard();
  pushHistory(currentCard.value.id);
  phase.value = "playing";

  totalRuns.value += 1;
  localStorage.setItem(TOTAL_RUNS_KEY, String(totalRuns.value));
}

function choose(direction: "left" | "right") {
  if (phase.value !== "playing" || !currentCard.value) return;

  const choice = currentCard.value[direction];
  lastEffects.value = choice.effects;

  for (const key of STAT_KEYS) {
    const delta = choice.effects[key];
    if (delta === undefined) continue;
    stats[key] = Math.min(100, Math.max(0, stats[key] + delta));
  }

  const death = checkDeath();
  if (death) {
    deathInfo.value = death;
    recordDeath(death);
    wasNewHighScore.value = week.value > highScore.value;
    if (wasNewHighScore.value) {
      highScore.value = week.value;
      localStorage.setItem(HIGH_SCORE_KEY, String(highScore.value));
    }
    phase.value = "gameover";
    return;
  }

  week.value += 1;
  currentCard.value = drawCard();
  pushHistory(currentCard.value.id);
}

function returnToMenu() {
  phase.value = "menu";
}

export function useGame() {
  return {
    phase,
    stats,
    week,
    currentCard,
    highScore,
    totalRuns,
    deathCounts,
    deathInfo,
    lastEffects,
    isNewHighScore: computed(() => wasNewHighScore.value),
    startRun,
    choose,
    returnToMenu,
  };
}
