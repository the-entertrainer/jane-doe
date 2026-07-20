<script setup lang="ts">
import { onMounted } from 'vue';
import AdaptiveCanvas from './components/AdaptiveCanvas.vue';
import VisualEditor from './components/VisualEditor.vue';
import { useCanvasStore } from './stores/canvasStore';

const canvasStore = useCanvasStore();

onMounted(() => {
  canvasStore.initializeSession('default-canvas-document');
});
</script>

<template>
  <AdaptiveCanvas>
    <VisualEditor />
  </AdaptiveCanvas>
</template>
