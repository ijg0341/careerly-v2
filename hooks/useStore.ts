import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchQuery {
  id: string;
  query: string;
  timestamp: number;
}

interface AppStore {
  theme: 'light' | 'dark';
  recentQueries: SearchQuery[];
  addRecentQuery: (query: string) => void;
  clearRecentQueries: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'light',
      recentQueries: [],
      addRecentQuery: (query: string) =>
        set((state) => {
          const newQuery: SearchQuery = {
            id: Date.now().toString(),
            query,
            timestamp: Date.now(),
          };
          // Keep only last 10 queries
          const updated = [newQuery, ...state.recentQueries].slice(0, 10);
          return { recentQueries: updated };
        }),
      clearRecentQueries: () => set({ recentQueries: [] }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'careerly-storage',
    }
  )
);
