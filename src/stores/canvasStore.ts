// src/stores/canvasStore.ts
import { defineStore } from 'pinia';
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';

export interface SyncStoreState {
  currentTitle: string;
  syncConnected: boolean;
  activeUsers: string[];
}

export const useCanvasStore = defineStore('canvas-store', {
  state: (): SyncStoreState => ({
    currentTitle: 'Draft Canvas File',
    syncConnected: false,
    activeUsers: []
  }),

  actions: {
    initializeSession(documentId: string) {
      // 1. Initialize the Yjs memory document
      const yDoc = new Y.Doc();

      // 2. Set up IndexedDB database connection for offline capabilities
      const localPersistence = new IndexeddbPersistence(documentId, yDoc);

      // 3. Set up the Websocket connection to coordinate real-time sync
      const networkProvider = new WebsocketProvider(
        'wss://sync.canvas-platform.internal/realtime',
        documentId,
        yDoc
      );

      // Define a shared text type container
      const sharedMap = yDoc.getMap('canvas-metadata');

      // Update the local state when the shared map changes
      sharedMap.observe(() => {
        const titleUpdate = sharedMap.get('title') as string;
        if (titleUpdate && titleUpdate !== this.currentTitle) {
          this.currentTitle = titleUpdate;
        }
      });

      networkProvider.on('status', (event: { status: string }) => {
        this.syncConnected = event.status === 'connected';
      });

      // Synchronize presence and pointer metadata
      networkProvider.awareness.on('change', () => {
        const states = Array.from(networkProvider.awareness.getStates().values());
        this.activeUsers = states.map((s: any) => s.user?.name || 'Anonymous User');
      });

      localPersistence.on('synced', () => {
        console.log('Local client state merged with local IndexedDB instance.');
      });

      return { yDoc, localPersistence, networkProvider };
    },

    updateTitle(newTitle: string, yDocInstance: Y.Doc) {
      this.currentTitle = newTitle;
      const sharedMap = yDocInstance.getMap('canvas-metadata');
      sharedMap.set('title', newTitle); // Broadcasts key updates automatically
    }
  }
});
