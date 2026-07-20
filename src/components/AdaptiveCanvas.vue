<!-- src/components/AdaptiveCanvas.vue -->
<template>
  <div class="flex h-screen w-screen overflow-hidden bg-base-300 text-base-content select-none">
    <!-- Left-Side Toolkit Pane -->
    <aside class="w-[260px] h-full flex flex-col bg-base-100 border-r border-base-200 shrink-0 transition-all duration-300">
      <div class="p-4 border-b border-base-200">
        <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-content">Blocks Toolbar</h2>
      </div>
      <div class="flex-1 p-4 overflow-y-auto space-y-3">
        <div
          v-for="block in blocks"
          :key="block.id"
          class="card bg-base-200 hover:bg-primary hover:text-primary-content p-3 border border-base-300 shadow-sm cursor-grab transition-all active:cursor-grabbing"
          draggable="true"
          @dragstart="handleDragStart($event, block)"
        >
          <span class="text-xs font-semibold uppercase">{{ block.label }}</span>
        </div>
      </div>
    </aside>

    <!-- Main Workspace Area -->
    <main class="flex-1 h-full flex flex-col overflow-hidden">
      <!-- Top Workspace Menu Bar -->
      <header class="h-14 bg-base-100 border-b border-base-200 px-6 flex items-center justify-between shrink-0">
        <div class="flex items-center space-x-3">
          <span class="badge badge-success badge-sm uppercase tracking-wide">Sync Connected</span>
        </div>
        <div class="flex items-center space-x-4">
          <select class="select select-xs select-bordered font-bold text-xs" @change="changeTheme">
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="pastel">Pastel Theme</option>
            <option value="luxury">Luxury Theme</option>
          </select>
        </div>
      </header>

      <!-- Central Canvas with Named Container Queries -->
      <div class="flex-1 p-8 overflow-auto flex justify-center items-start">
        <div class="w-full max-w-4xl bg-base-100 min-h-[600px] rounded-xl shadow-2xl border border-base-200 p-8 @container/canvas relative">
          <!-- Adaptive Layout Grid using Container Suffixes -->
          <div class="grid grid-cols-1 gap-6 @md/canvas:grid-cols-2 @xl/canvas:grid-cols-3">
            <slot></slot>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface CanvasBlock {
  id: string;
  label: string;
  type: string;
}

const blocks = ref<CanvasBlock[]>([
  { id: '1', label: 'Rich Text Block', type: 'text' },
  { id: '2', label: 'Interactive Embed', type: 'embed' },
  { id: '3', label: 'LMS Assessment Module', type: 'scorm' }
]);

const handleDragStart = (event: DragEvent, block: CanvasBlock) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(block));
    event.dataTransfer.effectAllowed = 'move';
  }
};

const changeTheme = (event: Event) => {
  const select = event.target as HTMLSelectElement;
  document.documentElement.setAttribute('data-theme', select.value);
};
</script>
