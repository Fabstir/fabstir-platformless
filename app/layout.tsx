import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Platformless AI - AI Without the Platform',
  description: 'Trustless. Private. Censorship-Resistant. A peer-to-peer marketplace of independent GPU hosts for encrypted chat, coding agents, image and video generation, streaming and private fine-tuning, settled by smart contracts.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Platformless AI - AI Without the Platform',
    description: 'Trustless. Private. Censorship-Resistant.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a14',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
