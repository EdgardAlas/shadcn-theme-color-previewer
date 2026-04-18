# Shadcn Theme Color Previewer

Visual editor for all Shadcn UI CSS variables. Customize light/dark tokens, preview live on a real dashboard, save locally, export production-ready CSS.

## Features

- Split-screen: live dashboard preview + variable controls
- Real-time OKLCH editing with color swatches
- Independent light and dark mode editing
- Scoped CSS injection — preview isolated from app chrome
- Theme persistence via localStorage (save, load, duplicate, delete)
- CSS export in exact Shadcn v4 format

## Stack

Next.js 16 · React 19 · Tailwind CSS v4 · Shadcn UI · Zustand · Recharts · TypeScript

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/
    _components/
      config-pane.tsx      # Right panel: variable inputs, theme manager, export
      preview-pane.tsx     # Left panel: live dashboard mockup
      theme-manager.tsx    # Save/load/duplicate/delete themes
      variable-input.tsx   # Single CSS variable row (swatch + input)
      preview/
        dashboard.tsx      # Dashboard shell with stat cards, charts, tabs
        components-tab.tsx # Interactive elements, skeletons, inputs, alerts
        form-tab.tsx       # Form controls and progress metrics
        activity-tab.tsx   # User table and activity feed
        colors-tab.tsx     # Token-by-token color reference
    globals.css
    layout.tsx
    page.tsx
  lib/
    theme-defaults.ts
    theme-export.ts
    theme-import.ts
    color-utils.ts
  store/
    theme-store.ts
  types/
    theme.ts
```

## Export Format

```css
@theme inline {
  --color-background: var(--background);
  /* ... */
}

:root {
  --background: oklch(1 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  /* ... */
}
```

Paste into `globals.css`, replacing the existing theme block.

## Variables

33 tokens: base colors, card, popover, primary, secondary, muted, accent, destructive, border/input/ring, chart-1–5, radius, 8 sidebar tokens.
