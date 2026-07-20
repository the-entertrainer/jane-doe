<!-- src/components/VisualEditor.vue -->
<template>
  <div class="w-full h-full bg-base-100 flex flex-col rounded-xl overflow-hidden border border-base-200" ref="editorContainer">
    <!-- Core Editing Control Ribbon -->
    <div class="bg-base-200 px-4 py-2 flex items-center space-x-2 border-b border-base-300">
      <button
        class="btn btn-xs btn-ghost"
        @click="editor?.chain().focus().toggleBold().run()"
        :class="{ 'btn-active': editor?.isActive('bold') }"
      >
        Bold
      </button>
      <button
        class="btn btn-xs btn-ghost"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'btn-active': editor?.isActive('heading', { level: 3 }) }"
      >
        Heading
      </button>
    </div>

    <!-- Scrollable Canvas Area -->
    <div class="flex-1 p-6 overflow-y-auto">
      <editor-content :editor="editor" class="prose max-w-none focus:outline-none min-h-[400px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const editorContainer = ref<HTMLElement | null>(null);

const editor = useEditor({
  content: `
    <h3>Start Designing</h3>
    <p>Drag content cards from the toolbar and place them onto the canvas.</p>
  `,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'focus:outline-none min-h-[400px] text-sm'
    }
  }
});

let cleanupDraggable: (() => void) | undefined;

onMounted(() => {
  if (editorContainer.value) {
    // Attach Pragmatic Drag and Drop hooks to the editor block container
    cleanupDraggable = draggable({
      element: editorContainer.value,
      getInitialData: () => ({ type: 'editor-canvas', id: 'main-canvas' })
    });
  }
});

onBeforeUnmount(() => {
  // Clear the active Tiptap instance to prevent memory leaks
  cleanupDraggable?.();
  editor.value?.destroy();
});
</script>
