<script setup lang="ts">
import type { StatKey } from "../types/game";

defineProps<{
  stat: StatKey;
}>();
</script>

<template>
  <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor" aria-hidden="true">
    <template v-if="stat === 'Board'">
      <rect x="3" y="9" width="18" height="11" rx="1" />
      <path d="M9 9V6.5C9 5.7 9.7 5 10.5 5h3c.8 0 1.5.7 1.5 1.5V9h-2V7h-2v2H9Z" />
    </template>
    <template v-else-if="stat === 'Culture'">
      <circle cx="12" cy="6.5" r="3.2" />
      <path d="M5 20c0-4.4 3.1-7 7-7s7 2.6 7 7v1H5v-1Z" />
    </template>
    <template v-else-if="stat === 'Velocity'">
      <path d="M12 3 20 13h-5v8H9v-8H4Z" />
    </template>
    <template v-else>
      <text x="12" y="18" text-anchor="middle" font-size="17" font-family="var(--font-display)">$</text>
    </template>
  </svg>
</template>
