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

## Analytics

The app uses [Umami](https://umami.is) for privacy-friendly, cookieless analytics. It only runs in production.

Add these to `.env.local` with your Umami credentials:

| Variable                           | Description                          |
| ---------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_ANALYTICS_URL`        | URL of your Umami script             |
| `NEXT_PUBLIC_ANALYTICS_WEBSITE_ID` | Website ID from your Umami dashboard |

If either variable is not set, analytics are simply skipped.

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
