'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <motion.div
      className={cn('text-center space-y-4', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-light">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-primary-light via-secondary to-primary bg-clip-text text-transparent pb-[0.12em]">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-neutrals-copy-light max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
