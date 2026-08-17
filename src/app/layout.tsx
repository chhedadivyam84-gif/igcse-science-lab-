import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/**
 * Type system.
 *
 * A grotesque for the interface and a high-contrast serif for display sizes.
 * The pairing is what stops the page reading as a generic dashboard: the serif
 * carries the editorial weight, Inter keeps the dense UI legible, and a real
 * mono makes formulae look like physics rather than code comments.
 *
 * All three are `display: 'swap'` and self-hosted by next/font, so there is no
 * layout shift and no third-party request at runtime.
 */
const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-loaded',
  // Variable axes let headings tighten optically without a second file.
  axes: ['opsz'],
});

const display = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display-loaded',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-loaded',
});

import { AppChrome } from '@/components/layout/AppChrome';
import { ThemeProvider, themeScript } from '@/components/theme';
import { getSessionUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: {
    default: 'IGCSE Science Lab — Master Physics 0625 & Chemistry 0620',
    template: '%s · IGCSE Science Lab',
  },
  description:
    'Understand the concept. Visualise it. Practise it. Master it. An AI-assisted learning platform built around Cambridge IGCSE Physics 0625 and Chemistry 0620.',
  applicationName: 'IGCSE Science Lab',
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#080b13' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionUser();

  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        {/* Applies the stored theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <AppChrome
            user={
              session
                ? {
                    name: session.name,
                    email: session.email,
                    role: session.role,
                    owner: session.owner,
                  }
                : null
            }
          >
            <div id="content">{children}</div>
          </AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
