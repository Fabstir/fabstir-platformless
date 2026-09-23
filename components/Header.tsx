'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Github, Menu, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#video', label: 'AI Video' },
  { href: '#agents', label: 'Agents' },
  { href: '#fine-tuning', label: 'Fine-Tuning' },
  { href: '#security', label: 'Security' },
  { href: '#hosts', label: 'Hosts' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Highlight the nav item for the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
          <span className="whitespace-nowrap text-xl font-bold text-foreground">Platformless AI</span>
        </Link>

        <nav aria-label="Sections" className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors',
                activeId === item.href.slice(1)
                  ? 'bg-primary/15 text-foreground'
                  : 'text-neutrals-copy hover:text-foreground'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <a
            href="#showreel"
            className="hidden sm:flex xl:hidden items-center gap-2 rounded-full border border-secondary/40 px-3 py-1 text-sm text-secondary-light hover:bg-secondary/10 transition-colors"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Watch
          </a>

          <Link
            href="https://github.com/Fabstir"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-primary-light hover:text-secondary transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 whitespace-nowrap">
            <span className="text-neutrals-copy text-sm">Docs</span>
            <Badge variant="secondary" className="bg-neutrals-border text-neutrals-copy-light text-xs">
              Coming Soon
            </Badge>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="xl:hidden rounded-md p-1.5 text-neutrals-copy-light hover:bg-muted hover:text-foreground"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="xl:hidden border-t border-neutrals-border/60 bg-background/95 backdrop-blur"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-4">
            {[{ href: '#showreel', label: 'Watch the film' }, ...navItems].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-neutrals-copy-light hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Reading progress */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-primary via-secondary to-primary-light"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
