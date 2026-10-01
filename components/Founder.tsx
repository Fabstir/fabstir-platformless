'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Briefcase, GraduationCap, HardDrive } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

const credentials: { icon: LucideIcon; org: string; detail: string }[] = [
  { icon: Briefcase, org: 'Deloitte', detail: 'Lead software architect, capital markets research' },
  { icon: GraduationCap, org: 'Imperial College London', detail: 'BSc in Computing' },
  { icon: GraduationCap, org: 'London Metropolitan University', detail: 'MSc in Mathematics and Derivatives' },
  { icon: HardDrive, org: 'Sia Foundation', detail: 'Grant for Enhanced S5.js, the storage SDK behind Platformless AI' },
];

export function Founder() {
  return (
    <section id="founder" className="relative isolate py-20 px-4 overflow-hidden bg-primary-dark/20">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-30" />
      <div className="container max-w-6xl mx-auto space-y-12">
        <SectionHeader eyebrow="Who is building it" title="Meet the founder" />

        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
          <motion.figure
            className="mx-auto w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden rounded-2xl border border-primary/30 shadow-2xl shadow-primary/20">
              <Image
                src="/images/jules-lai.webp"
                alt="Jules Lai, founder and CTO of Fabstir"
                width={800}
                height={1000}
                sizes="(min-width: 768px) 384px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <p className="text-xl font-bold text-foreground">Jules Lai</p>
              <p className="text-sm text-neutrals-copy">Founder and CTO, Fabstir</p>
            </figcaption>
          </motion.figure>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-4 text-base leading-relaxed text-neutrals-copy-light">
              <p className="text-lg text-foreground">
                At Deloitte, Jules was lead software architect in the capital markets research
                department, building industrial-strength stochastic modelling and economics software
                used by the Bank of England, Lloyd&apos;s of London and AXA, among others.
              </p>
              <p>
                Platformless AI applies the same standard to AI: infrastructure that a regulated
                institution can verify rather than take on trust. Jules leads its design and
                development at Fabstir, and also develops Enhanced S5.js, the decentralised storage
                SDK behind it, under a Sia Foundation grant.
              </p>
              <p>
                Jules also brings over 20 years in the film business, having established two of the
                UK&apos;s largest film industry networks, Non-Multiplex Cinema and Film Means Business.
                Fabstir began as decentralised
                infrastructure for film and music before it grew into Platformless AI.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {credentials.map((item) => (
                <li
                  key={item.org}
                  className="flex items-start gap-3 rounded-xl border border-neutrals-border/40 bg-card/60 p-4 backdrop-blur"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.org}</p>
                    <p className="text-sm text-neutrals-copy">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
