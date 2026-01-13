import type { Metadata, Viewport } from 'next';
import { Caveat, Playfair_Display, Special_Elite } from 'next/font/google';
import './globals.css';

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-special-elite',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hand Ledger - A Junk Journal Experience',
  description:
    'An immersive digital junk journal - explore pages, discover hidden pockets, and experience the art of curated chaos.',
  keywords: ['junk journal', 'art', 'visual experience', 'interactive', 'handmade', 'vintage'],
  authors: [{ name: 'Hand Ledger' }],
  openGraph: {
    title: 'Hand Ledger - A Junk Journal Experience',
    description: 'An immersive digital junk journal experience',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} ${playfair.variable} ${specialElite.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
