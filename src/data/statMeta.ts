import type { StatKey } from "../types/game";

export interface StatMeta {
  icon: string;
  label: string;
  hex: string;
  bar: string;
  barWarn: string;
  text: string;
}

export const STAT_META: Record<StatKey, StatMeta> = {
  Board: {
    icon: "💼",
    label: "Board",
    hex: "#6366f1",
    bar: "bg-indigo-500",
    barWarn: "bg-red-500",
    text: "text-indigo-300",
  },
  Culture: {
    icon: "👥",
    label: "Culture",
    hex: "#14b8a6",
    bar: "bg-teal-500",
    barWarn: "bg-red-500",
    text: "text-teal-300",
  },
  Velocity: {
    icon: "📈",
    label: "Velocity",
    hex: "#f59e0b",
    bar: "bg-amber-500",
    barWarn: "bg-red-500",
    text: "text-amber-300",
  },
  Ledger: {
    icon: "💰",
    label: "Ledger",
    hex: "#eab308",
    bar: "bg-yellow-500",
    barWarn: "bg-red-500",
    text: "text-yellow-300",
  },
};
