'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutrals-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <Image
            src="/android-chrome-192x192.png"
            alt="Platformless AI Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-foreground">Platformless AI</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="https://github.com/Fabstir"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-primary-light hover:text-secondary transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-neutrals-copy text-sm">Docs</span>
            <Badge variant="secondary" className="bg-neutrals-border text-neutrals-copy-light text-xs">
              Coming Soon
            </Badge>
          </div>
        </nav>
      </div>
    </header>
  );
}
