import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RewriteHistory {
  id: string;
  originalText: string;
  rewrittenText: string;
  mode: string;
  timestamp: number;
}

interface AppState {
  inputText: string;
  setInputText: (text: string) => void;
  history: RewriteHistory[];
  addToHistory: (entry: Omit<RewriteHistory, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      inputText: '',
      setInputText: (text) => set({ inputText: text }),
      history: [],
      addToHistory: (entry) => set((state) => ({
        history: [
          { ...entry, id: crypto.randomUUID(), timestamp: Date.now() },
          ...state.history,
        ].slice(0, 5), // Keep last 5 entries
      })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'ai-rewrite-storage',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
