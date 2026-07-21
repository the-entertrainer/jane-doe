<script setup lang="ts">
import { computed } from "vue";
import { buildPortraitSVG } from "../composables/portrait";

const props = defineProps<{
  seed: string;
}>();

// Fully self-generated markup (no external input) — safe to inject.
const svg = computed(() => buildPortraitSVG(props.seed));
</script>

<template>
  <div class="w-full h-full" v-html="svg" />
</template>
