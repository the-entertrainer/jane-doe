import type { StatKey, Stats } from "../types/game";

export interface TagDef {
  id: string;
  label: string;
  note: string;
  /** Weeks the tag stays active once granted. */
  duration: number;
  /** Passive stat drift applied each week while active. Kept small and honest —
   *  it's shown to the player and is separate from card effects so the drag
   *  preview never lies. */
  perWeek: Partial<Stats>;
  /** Granted the moment this predicate first goes true after a decision. */
  when: (stats: Stats) => boolean;
  /** Accent for the banner. */
  tone: "good" | "bad";
}

/*
 * Status tags turn stat *extremes* into lingering consequences instead of a
 * cliff you only hit at 100/0. Push a stat near the edge and you pick up a tag
 * that drifts you for a few weeks — even after you pull back. That's the memory
 * the stateless card pool was missing.
 */
export const TAGS: TagDef[] = [
  {
    id: "golden_child",
    label: "Golden Child",
    note: "Leadership loves you — for now. +Board, but the spotlight isolates you.",
    duration: 5,
    perWeek: { Board: 2, Culture: -2 },
    when: (s) => s.Board >= 80,
    tone: "good",
  },
  {
    id: "on_pip",
    label: "On PIP",
    note: "Performance plan open. The clock is ticking on your delivery.",
    duration: 6,
    perWeek: { Velocity: -3 },
    when: (s) => s.Velocity <= 22,
    tone: "bad",
  },
  {
    id: "team_burnout",
    label: "Team Burnout",
    note: "You shipped the team into the ground. Morale bleeds until it recovers.",
    duration: 5,
    perWeek: { Culture: -3 },
    when: (s) => s.Velocity >= 82,
    tone: "bad",
  },
  {
    id: "under_audit",
    label: "Under Audit",
    note: "Finance is reviewing your spend. Budget quietly erodes.",
    duration: 6,
    perWeek: { Ledger: -3 },
    when: (s) => s.Ledger >= 82,
    tone: "bad",
  },
  {
    id: "the_villain",
    label: "The Villain",
    note: "The team turned on you. Standing with leadership slips as the story spreads.",
    duration: 5,
    perWeek: { Board: -2 },
    when: (s) => s.Culture <= 22,
    tone: "bad",
  },
];

export interface ActiveTag {
  id: string;
  label: string;
  note: string;
  perWeek: Partial<Stats>;
  tone: "good" | "bad";
  remaining: number;
}

export type { StatKey };
