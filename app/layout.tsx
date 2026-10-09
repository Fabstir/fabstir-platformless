import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Platformless AI - Confidential AI Without the Platform',
  description: 'No platform can see your data, because there is not one. On confidential-computing hosts, your prompts, data and the model are decrypted only inside a confidential VM whose memory the operator cannot read. Chat, coding agents, images, video and private fine-tuning on independent GPU hosts, settled by smart contracts.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Platformless AI - Confidential AI Without the Platform',
    description: 'No platform can see your data. There is not one.',
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
