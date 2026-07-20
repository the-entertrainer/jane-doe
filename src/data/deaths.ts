import type { StatKey } from "../types/game";

export const deathMessages: Record<StatKey, { low: string; high: string }> = {
  Board: {
    low: "Strategic Realignment. Your role was eliminated in the latest reorg. Your desk plant was the only one who noticed.",
    high: "Too Visible. You became the face of a high-profile initiative that went sideways. Leadership needed a scapegoat. Congratulations.",
  },
  Culture: {
    low: "Thrown Under the Bus. In the next all-hands, three different people mentioned your name in the context of 'lessons learned.' You were not in the room.",
    high: "Empire Builder. HR opened a quiet investigation into favoritism and 'cult of personality' concerns. Your team liked you too much.",
  },
  Velocity: {
    low: "Performance Improvement Plan. You missed enough commitments that the PIP paperwork wrote itself. Ninety days later you were gone.",
    high: "Hero Mode Collapse. You shipped so hard the servers melted, the client sued, and the next quarter's failure was pinned entirely on you. Classic overachiever.",
  },
  Ledger: {
    low: "Cost Optimization. Your entire function was marked as non-critical. The spreadsheet did not even have your name on it.",
    high: "Audit Flag. Procurement and Finance opened a review into your team's spending. The phrase 'unjustified headcount and tools' appeared in the final report.",
  },
};
