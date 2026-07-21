<script setup lang="ts">
import type { ActiveTag } from "../data/tags";

defineProps<{
  tags: ActiveTag[];
}>();
</script>

<template>
  <div v-if="tags.length" class="flex flex-wrap justify-center gap-2 px-4 mt-3">
    <span
      v-for="tag in tags"
      :key="tag.id"
      class="font-display text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border"
      :title="tag.note"
      :style="{
        color: tag.tone === 'good' ? 'var(--accent-green)' : 'var(--accent-red)',
        borderColor: tag.tone === 'good' ? 'var(--accent-green)' : 'var(--accent-red)',
        backgroundColor: tag.tone === 'good' ? 'rgba(47,158,106,0.10)' : 'rgba(216,30,75,0.10)',
      }"
    >
      {{ tag.label }} · {{ tag.remaining }}w
    </span>
  </div>
</template>
