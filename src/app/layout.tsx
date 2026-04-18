import type { Metadata } from 'next';
import './globals.css';
import { Geist } from 'next/font/google';
import { IBM_Plex_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Shadcn Theme Color Previewer',
    template: '%s | Shadcn Theme Color Previewer',
  },
  description:
    'Visual editor for all Shadcn UI CSS variables. Customize light and dark mode tokens in OKLCH, preview live on a real dashboard, and export production-ready CSS.',
  keywords: [
    'shadcn',
    'shadcn/ui',
    'theme',
    'css variables',
    'oklch',
    'tailwind',
    'color editor',
    'dark mode',
    'design tokens',
  ],
  openGraph: {
    title: 'Shadcn Theme Color Previewer',
    description:
      'Visual editor for Shadcn UI CSS variables. Live dashboard preview, OKLCH editing, and one-click CSS export.',
    type: 'website',
    siteName: 'Shadcn Theme Color Previewer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shadcn Theme Color Previewer',
    description:
      'Visual editor for Shadcn UI CSS variables. Live dashboard preview, OKLCH editing, and one-click CSS export.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn('font-sans', geist.variable, ibmPlexMono.variable)}
    >
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
