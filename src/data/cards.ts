import type { Card } from "../types/game";

export const cards: Card[] = [
  {
    id: "card_001",
    speaker: "David Chen",
    role: "Your Manager",
    text: "Mid-year review time. How would you describe your impact this cycle?",
    left: {
      label: "Be honest about the load",
      effects: { Culture: 12, Velocity: -6, Board: -5 },
    },
    right: {
      label: "Crushing it — ready for more",
      effects: { Board: 14, Velocity: 10, Culture: -8, Ledger: -5 },
    },
  },
  {
    id: "card_002",
    speaker: "Priya Kapoor",
    role: "VP of Product",
    text: "Enterprise client is threatening to churn unless we deliver three new features by end of month. The squad is already at capacity.",
    left: {
      label: "Negotiate a phased roadmap",
      effects: { Culture: 14, Velocity: -9, Board: -4 },
    },
    right: {
      label: "We'll make it happen",
      effects: { Velocity: 13, Board: 9, Culture: -12, Ledger: -6 },
    },
  },
  {
    id: "card_003",
    speaker: "The CTO",
    role: "All-Hands",
    text: "We're piloting an internal AI agent for ticket triage. It could replace two or three junior roles. Thoughts on rollout speed?",
    left: {
      label: "Go slow and stay transparent",
      effects: { Culture: 11, Board: -8, Velocity: -4 },
    },
    right: {
      label: "Full speed — this is the future",
      effects: { Board: 13, Velocity: 7, Culture: -14, Ledger: 4 },
    },
  },
  {
    id: "card_004",
    speaker: "Marcus Hale",
    role: "Finance Director",
    text: "Your team's SaaS spend is up 40% year-over-year. Can you justify it or start cutting?",
    left: {
      label: "Defend with impact data",
      effects: { Ledger: 9, Velocity: 5, Board: -7 },
    },
    right: {
      label: "Cut two tools immediately",
      effects: { Ledger: 14, Culture: -9, Velocity: -7 },
    },
  },
  {
    id: "card_005",
    speaker: "Anonymous",
    role: "#general Slack thread",
    text: "Someone just posted a passive-aggressive message about 'people who take credit in meetings.' Your name wasn't mentioned, but the timing is suspicious.",
    left: {
      label: "Stay completely silent",
      effects: { Culture: -5, Board: 3 },
    },
    right: {
      label: "Address it calmly in private",
      effects: { Culture: 8, Board: -4 },
    },
  },
  {
    id: "card_006",
    speaker: "David Chen",
    role: "Your Manager",
    text: "There's an open Senior role on the Platform team. They asked if you'd be interested. It would mean leaving this squad.",
    left: {
      label: "Stay loyal to the current team",
      effects: { Culture: 13, Board: -6, Velocity: -3 },
    },
    right: {
      label: "Pursue the promotion",
      effects: { Board: 12, Ledger: 6, Culture: -10 },
    },
  },
  {
    id: "card_007",
    speaker: "HR Business Partner",
    role: "Company-wide email",
    text: "Starting next month, hybrid is no longer optional. Three days in office minimum. Feedback is welcome but the decision is final.",
    left: {
      label: "Push back with data on productivity",
      effects: { Culture: 9, Board: -11 },
    },
    right: {
      label: "Publicly support the policy",
      effects: { Board: 10, Culture: -12 },
    },
  },
  {
    id: "card_008",
    speaker: "Client Success Lead",
    role: "Escalation call",
    text: "The client is asking who dropped the ball on the integration timeline. They're looking for a name.",
    left: {
      label: "Own it as the team lead",
      effects: { Culture: 11, Board: -8, Velocity: -5 },
    },
    right: {
      label: "Point to the dependency that slipped",
      effects: { Board: 6, Culture: -13 },
    },
  },
  {
    id: "card_009",
    speaker: "Your Manager",
    role: "Planning meeting",
    text: "We can ask for one more headcount in the next cycle. Do you want to fight for it, or keep the team lean and high-performing?",
    left: {
      label: "Fight hard for the headcount",
      effects: { Ledger: 12, Culture: 6, Board: -5 },
    },
    right: {
      label: "Keep the team lean",
      effects: { Board: 7, Velocity: 5, Culture: -8, Ledger: -4 },
    },
  },
  {
    id: "card_010",
    speaker: "CEO",
    role: "Live all-hands",
    text: "\"Any questions from the floor about the recent restructuring?\" The chat is silent. Everyone is looking at you.",
    left: {
      label: "Ask a carefully worded question",
      effects: { Board: 5, Culture: 6 },
    },
    right: {
      label: "Stay quiet like everyone else",
      effects: { Board: -2, Culture: -3 },
    },
  },
  {
    id: "card_011",
    speaker: "Junior Engineer",
    role: "Direct report",
    text: "I've been struggling with the new architecture. Could you spend a few hours pairing with me this week?",
    left: {
      label: "Block time and help thoroughly",
      effects: { Culture: 14, Velocity: -8 },
    },
    right: {
      label: "Point them to the docs and move on",
      effects: { Velocity: 6, Culture: -11 },
    },
  },
  {
    id: "card_012",
    speaker: "Colleague",
    role: "Coffee chat",
    text: "I heard Finance is looking at a 15% cut across all product teams. Have you heard anything?",
    left: {
      label: "Share what you know (or speculate)",
      effects: { Culture: 5, Board: -6 },
    },
    right: {
      label: "Stay professional and non-committal",
      effects: { Board: 4, Culture: -3 },
    },
  },
  {
    id: "card_013",
    speaker: "Product Manager",
    role: "Sprint planning",
    text: "The stakeholder just added three more requirements to the epic. We either cut something else or slip the date.",
    left: {
      label: "Protect the date — cut scope",
      effects: { Velocity: 9, Board: -7, Culture: 4 },
    },
    right: {
      label: "Protect the features — slip the date",
      effects: { Board: 8, Velocity: -10, Culture: -5 },
    },
  },
  {
    id: "card_014",
    speaker: "Skip-level Manager",
    role: "Calibration meeting",
    text: "We're calibrating ratings. Your manager is advocating for 'Exceeds.' One peer manager is pushing back. Anything you want me to know?",
    left: {
      label: "Stay silent and trust the process",
      effects: { Board: -4, Culture: 3 },
    },
    right: {
      label: "Provide quiet supporting context",
      effects: { Board: 9, Culture: -6 },
    },
  },
  {
    id: "card_015",
    speaker: "Your Manager",
    role: "Slack DM at 11:47 pm",
    text: "Hey, quick question about the deck for tomorrow. Are you still up?",
    left: {
      label: "Answer and stay online",
      effects: { Board: 8, Velocity: 4, Culture: -7 },
    },
    right: {
      label: "Reply in the morning",
      effects: { Culture: 6, Board: -5 },
    },
  },
  {
    id: "card_016",
    speaker: "ERG Lead",
    role: "Volunteer request",
    text: "We're looking for executive sponsors and active members for the new Belonging council. It would look good on your internal brand.",
    left: {
      label: "Join and contribute real time",
      effects: { Culture: 10, Board: 6, Velocity: -6 },
    },
    right: {
      label: "Politely decline for capacity reasons",
      effects: { Velocity: 5, Culture: -8, Board: -3 },
    },
  },
  {
    id: "card_017",
    speaker: "Recruiter",
    role: "LinkedIn message",
    text: "A well-funded competitor is very interested in talking. They asked me to reach out discreetly. Interested in a conversation?",
    left: {
      label: "Take the exploratory call",
      effects: { Board: -5, Ledger: 4 },
    },
    right: {
      label: "Decline and stay focused",
      effects: { Board: 6, Culture: 3 },
    },
  },
  {
    id: "card_018",
    speaker: "VP of Product",
    role: "Company Slack",
    text: "\"Huge win on the launch! Special shout-out to the usual suspects.\" Your name is not mentioned even though you drove half the work.",
    left: {
      label: "Let it go",
      effects: { Culture: -6, Board: 2 },
    },
    right: {
      label: "Quietly correct the record later",
      effects: { Board: 7, Culture: -5 },
    },
  },
  {
    id: "card_019",
    speaker: "Engineering Manager",
    role: "Team meeting",
    text: "We need someone senior to take the primary on-call slot for the next two weeks. The junior rotation is already overloaded.",
    left: {
      label: "Volunteer yourself",
      effects: { Culture: 12, Velocity: -9, Board: 4 },
    },
    right: {
      label: "Suggest a different senior",
      effects: { Culture: -10, Velocity: 5 },
    },
  },
  {
    id: "card_020",
    speaker: "Chief of Staff",
    role: "Calendar invite",
    text: "You're invited to the leadership strategy offsite next month. Attendance is optional but highly encouraged for high-potentials.",
    left: {
      label: "Attend and engage fully",
      effects: { Board: 13, Velocity: -7, Ledger: -3 },
    },
    right: {
      label: "Skip and protect delivery time",
      effects: { Velocity: 8, Board: -9 },
    },
  },
  {
    id: "card_021",
    speaker: "Peer Manager",
    role: "1:1",
    text: "Half my team has checked out since the last reorg. How is your squad holding up? Any tips?",
    left: {
      label: "Be honest about the morale dip",
      effects: { Culture: 7, Board: -6 },
    },
    right: {
      label: "Project confidence and control",
      effects: { Board: 8, Culture: -5 },
    },
  },
  {
    id: "card_022",
    speaker: "Procurement",
    role: "Email thread",
    text: "The vendor is offering a 20% discount if we sign a three-year commitment this quarter. Your call.",
    left: {
      label: "Sign the multi-year deal",
      effects: { Ledger: 11, Board: 4, Velocity: -3 },
    },
    right: {
      label: "Keep flexibility — go year-to-year",
      effects: { Ledger: -6, Velocity: 5, Board: -3 },
    },
  },
  {
    id: "card_023",
    speaker: "Skip-level",
    role: "Unexpected 1:1",
    text: "I've heard some mixed signals about how decisions are being made on your team. Anything I should know?",
    left: {
      label: "Be transparent about friction",
      effects: { Culture: 6, Board: -9 },
    },
    right: {
      label: "Protect the team narrative",
      effects: { Board: 7, Culture: -4 },
    },
  },
  {
    id: "card_024",
    speaker: "Innovation Lead",
    role: "Company event",
    text: "We're strongly encouraging every team to enter a project in the internal hackathon. It will be visible to the exec team.",
    left: {
      label: "Commit the team to a strong entry",
      effects: { Board: 10, Velocity: -11, Culture: -4 },
    },
    right: {
      label: "Opt out citing delivery priorities",
      effects: { Velocity: 7, Board: -8, Culture: 5 },
    },
  },
  {
    id: "card_025",
    speaker: "Trusted Peer",
    role: "Private message",
    text: "It's confirmed. A reduction in force is coming in three weeks. They're still deciding the lists.",
    left: {
      label: "Focus on making yourself indispensable",
      effects: { Velocity: 9, Board: 5, Culture: -6 },
    },
    right: {
      label: "Help the team prepare and share info",
      effects: { Culture: 12, Board: -7, Velocity: -4 },
    },
  },
  {
    id: "card_026",
    speaker: "Yourself (internal conflict)",
    role: "",
    text: "You just finished a major win. Do you post a thoughtful LinkedIn thread about the lessons, or stay quiet and let the work speak?",
    left: {
      label: "Post and build external brand",
      effects: { Board: 8, Culture: -5 },
    },
    right: {
      label: "Stay quiet and keep heads down",
      effects: { Culture: 4, Board: -3 },
    },
  },
  {
    id: "card_027",
    speaker: "Finance Partner",
    role: "Quarterly review",
    text: "We need to move 30% of your tool budget to a different initiative this quarter. How do you want to handle the cut?",
    left: {
      label: "Fight to keep the full budget",
      effects: { Ledger: 8, Board: -9 },
    },
    right: {
      label: "Accept and re-prioritize ruthlessly",
      effects: { Board: 6, Ledger: -10, Velocity: -5 },
    },
  },
  {
    id: "card_028",
    speaker: "Your Manager",
    role: "Friday afternoon",
    text: "Leadership just moved the launch up by ten days. We're going to need some extra hours. Are you in?",
    left: {
      label: "Commit to the crunch",
      effects: { Velocity: 14, Board: 8, Culture: -11, Ledger: -4 },
    },
    right: {
      label: "Push back on the new date",
      effects: { Culture: 9, Board: -12, Velocity: -6 },
    },
  },
];
