export type StatKey = "Board" | "Culture" | "Velocity" | "Ledger";

export const STAT_KEYS: StatKey[] = ["Board", "Culture", "Velocity", "Ledger"];

export type Stats = Record<StatKey, number>;

export interface CardChoice {
  label: string;
  effects: Partial<Record<StatKey, number>>;
}

export interface Card {
  id: string;
  speaker: string;
  role: string;
  text: string;
  left: CardChoice;
  right: CardChoice;
  category?: string;
  weight?: number;
  minWeek?: number;
  tags?: string[];
}

export interface DeathInfo {
  stat: StatKey;
  extreme: "low" | "high";
  epitaph: string;
}
