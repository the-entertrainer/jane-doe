import type { StatKey } from "../types/game";

export interface StatMeta {
  label: string;
  hex: string;
}

export const STAT_META: Record<StatKey, StatMeta> = {
  Board: {
    label: "Board",
    hex: "#5b6b96",
  },
  Culture: {
    label: "Culture",
    hex: "#2f8f6f",
  },
  Velocity: {
    label: "Velocity",
    hex: "#c26a2b",
  },
  Ledger: {
    label: "Ledger",
    hex: "#c7861f",
  },
};
