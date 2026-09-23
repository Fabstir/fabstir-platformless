'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NetworkCanvas } from '@/components/NetworkCanvas';

interface FinalCTAProps {
  onJoinWaitlist: () => void;
}

export function FinalCTA({ onJoinWaitlist }: FinalCTAProps) {
  return (
    <section className="px-4 py-20">
      <motion.div
        className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/40 px-6 py-16 text-center sm:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-dark/60 via-background to-secondary-dark/40" />
        <NetworkCanvas className="-z-10 opacity-50" />

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-gradient">Become platformless.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-neutrals-copy-light">
          Use AI without handing your data to a platform, host models and keep 90% of what you earn,
          or build your product on infrastructure no single company can switch off.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className="bg-gradient-animated text-white font-semibold text-lg px-8 py-6 border-0 hover:shadow-2xl hover:shadow-primary/50"
            >
              Join Waitlist
            </Button>
          </motion.div>
          <Link
            href="/files/PLATFORMLESS_AI_WHITEPAPER.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-primary-light/40 bg-background/50 px-6 py-3 font-semibold text-foreground backdrop-blur transition-colors hover:border-secondary hover:bg-secondary/10"
          >
            <FileText className="h-5 w-5 text-primary-light" />
            Read the whitepaper
          </Link>
          <Link
            href="https://github.com/Fabstir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-primary-light/40 bg-background/50 px-6 py-3 font-semibold text-foreground backdrop-blur transition-colors hover:border-secondary hover:bg-secondary/10"
          >
            <Github className="h-5 w-5 text-primary-light" />
            View the source
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
