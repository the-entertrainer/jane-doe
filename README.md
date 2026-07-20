# Jane Doe

A sharp, addictive, swipe-based corporate survival game. Keep Board, Culture, Velocity, and Ledger balanced — let any one hit zero or one hundred and your career ends. Inspired by *Reigns*.

Built with Vue 3 (Composition API, `<script setup>`) + Tailwind CSS + Vite. No backend; high scores are stored in `localStorage`.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL in a browser. Drag/swipe the card left or right, or use the buttons underneath it.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Static build, no backend or env vars required. Import this repo on [Vercel](https://vercel.com/new) and it deploys as-is — `vercel.json` pins the build command (`npm run build`) and output directory (`dist`).

See `Jane Doe Game Design Document v1.0` for the full spec this implementation follows.
