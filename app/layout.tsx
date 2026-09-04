import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

// ─────────────────────────────────────────
// Fonts
// ─────────────────────────────────────────

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

// ─────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'Viswa — Product Designer',
    template: '%s | Viswa',
  },
  description:
    'Product Designer specializing in enterprise software, FinTech, AI, and digital products. Based in Bengaluru with 2+ years of experience crafting premium user experiences.',
  keywords: [
    'Product Designer',
    'UX Designer',
    'UI Designer',
    'Portfolio',
    'FinTech Design',
    'Enterprise UX',
    'AI Products',
    'Bengaluru',
  ],
  authors: [{ name: 'Viswa' }],
  creator: 'Viswa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Viswa — Product Designer',
    description:
      'Product Designer specializing in enterprise software, FinTech, AI, and digital products.',
    siteName: 'Viswa Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viswa — Product Designer',
    description:
      'Product Designer specializing in enterprise software, FinTech, AI, and digital products.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F9F9F8',
};

// ─────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={manrope.variable}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
