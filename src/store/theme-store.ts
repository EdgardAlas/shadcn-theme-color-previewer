'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeVars, SavedTheme } from '@/types/theme';
import { DEFAULT_LIGHT, DEFAULT_DARK } from '@/lib/theme-defaults';

interface ThemeStore {
  light: ThemeVars;
  dark: ThemeVars;
  editMode: 'light' | 'dark';
  previewMode: 'light' | 'dark';
  savedThemes: SavedTheme[];
  setVar: (mode: 'light' | 'dark', key: keyof ThemeVars, value: string) => void;
  setEditMode: (mode: 'light' | 'dark') => void;
  setPreviewMode: (mode: 'light' | 'dark') => void;
  saveTheme: (name: string) => SavedTheme;
  loadTheme: (id: string) => void;
  deleteTheme: (id: string) => void;
  duplicateTheme: (id: string, newName: string) => void;
  resetToDefaults: () => void;
  importTheme: (partial: {
    light?: Partial<ThemeVars>;
    dark?: Partial<ThemeVars>;
  }) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      light: { ...DEFAULT_LIGHT },
      dark: { ...DEFAULT_DARK },
      editMode: 'light',
      previewMode: 'light',
      savedThemes: [],

      setVar: (mode, key, value) =>
        set((state) => ({
          [mode]: { ...state[mode], [key]: value },
        })),

      setEditMode: (mode) => set({ editMode: mode }),
      setPreviewMode: (mode) => set({ previewMode: mode }),

      saveTheme: (name) => {
        const { light, dark } = get();
        const newTheme: SavedTheme = {
          id: crypto.randomUUID(),
          name,
          light: { ...light },
          dark: { ...dark },
        };
        set((state) => ({ savedThemes: [...state.savedThemes, newTheme] }));
        return newTheme;
      },

      loadTheme: (id) => {
        const theme = get().savedThemes.find((t) => t.id === id);
        if (theme) {
          set({ light: { ...theme.light }, dark: { ...theme.dark } });
        }
      },

      deleteTheme: (id) =>
        set((state) => ({
          savedThemes: state.savedThemes.filter((t) => t.id !== id),
        })),

      duplicateTheme: (id, newName) => {
        const theme = get().savedThemes.find((t) => t.id === id);
        if (theme) {
          const dup: SavedTheme = {
            ...theme,
            id: crypto.randomUUID(),
            name: newName,
          };
          set((state) => ({ savedThemes: [...state.savedThemes, dup] }));
        }
      },

      resetToDefaults: () =>
        set({ light: { ...DEFAULT_LIGHT }, dark: { ...DEFAULT_DARK } }),

      importTheme: (partial) =>
        set((state) => ({
          light: { ...state.light, ...partial.light },
          dark: { ...state.dark, ...partial.dark },
        })),
    }),
    {
      name: 'shadcn-theme-store',
      partialize: (state) => ({
        light: state.light,
        dark: state.dark,
        savedThemes: state.savedThemes,
      }),
    },
  ),
);
