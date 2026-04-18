# Shadcn Theme Generator

A visual editor for all Shadcn UI CSS variables. Customize both light and dark mode tokens, preview changes live, save themes locally, and export production-ready CSS.

## Features

- Split-screen layout: live dashboard preview on the left, variable controls on the right
- Real-time OKLCH color editing with visual swatches
- Independent light and dark mode editing
- Scoped CSS variable injection — preview is isolated from the app chrome
- Theme persistence via localStorage (save, load, duplicate, delete)
- One-click CSS export in the exact Shadcn v4 format

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Shadcn UI (base-nova style, Base UI primitives)
- Zustand (state + localStorage persistence)
- Recharts (charts in the preview dashboard)
- TypeScript

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    _components/
      config-pane.tsx      # Right panel: variable inputs, theme manager, export
      preview-pane.tsx     # Left panel: live dashboard mockup
      theme-manager.tsx    # Save/load/duplicate/delete themes
      variable-input.tsx   # Single CSS variable row (swatch + name + input)
    globals.css            # Tailwind + Shadcn base styles
    layout.tsx             # Root layout with fonts and TooltipProvider
    page.tsx               # Split-screen shell
  lib/
    theme-defaults.ts      # Default OKLCH values for light and dark modes
    theme-export.ts        # CSS generation function
  store/
    theme-store.ts         # Zustand store with localStorage persistence
  types/
    theme.ts               # ThemeVars and SavedTheme types
```

## Exported CSS Format

Clicking "Copy CSS to clipboard" produces:

```css
@theme inline {
  --color-background: var(--background);
  /* ... all color and radius mappings ... */
}

:root {
  --background: oklch(1 0 0);
  /* ... all light mode variables ... */
}

.dark {
  --background: oklch(0.145 0 0);
  /* ... all dark mode variables ... */
}
```

Paste this directly into your project's `globals.css`, replacing the existing theme block.

## Variables Covered

33 CSS variables across: base colors, card, popover, primary, secondary, muted, accent, destructive, border/input/ring, chart-1 through chart-5, radius, and all 8 sidebar tokens.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
