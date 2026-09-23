'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Clapperboard, Coins, Film, GraduationCap, MessageSquare, Search, Server, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

interface HostsProps {
  onJoinWaitlist: () => void;
}

// Default SDK host-selection weights (whitepaper 7.5).
const weights = [
  { factor: 'Stake', weight: 35, source: 'On-chain stake in NodeRegistry' },
  { factor: 'Price', weight: 30, source: 'Inverse of your advertised price' },
  { factor: 'Uptime', weight: 20, source: 'Placeholder until live metrics ship' },
  { factor: 'Latency', weight: 15, source: 'Placeholder until live metrics ship' },
];

const modes = [
  { name: 'AUTO', note: 'weighted score' },
  { name: 'CHEAPEST', note: '70% price' },
  { name: 'RELIABLE', note: 'stake and uptime' },
  { name: 'FASTEST', note: '60% latency' },
  { name: 'SPECIFIC', note: 'one address' },
];

const earnings: { icon: LucideIcon; label: string }[] = [
  { icon: MessageSquare, label: 'LLM inference and agents' },
  { icon: Clapperboard, label: 'Image generation' },
  { icon: Film, label: 'NVENC transcoding, alongside inference' },
  { icon: GraduationCap, label: 'Fine-tuning runs and adapter serving' },
  { icon: Search, label: 'RAG and web search' },
];

const stakeFacts = [
  { label: 'Minimum stake', value: '1,000 FAB' },
  { label: 'Lock period', value: 'None' },
  { label: 'Max slash per action', value: '50%' },
  { label: 'Gas saved by batched payouts', value: '~80%' },
];

export function Hosts({ onJoinWaitlist }: HostsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="hosts" className="py-20 px-4">
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <Server className="h-3.5 w-3.5" /> For GPU hosts
            </>
          }
          title="Run a host. Keep 90%."
          description="Hosts are independent businesses. You set your own prices, choose the models you serve, and get paid by smart contract, with no platform adding a markup on top."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 90 / 10 split */}
          <motion.figure
            className="rounded-2xl border border-primary/30 bg-card/70 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <figcaption>
              <h3 className="font-semibold text-foreground">Where each payment goes</h3>
              <p className="text-xs text-neutrals-copy">Settled automatically when a session completes</p>
            </figcaption>
            <p className="mt-6 text-6xl font-extrabold text-foreground">90%</p>
            <p className="text-sm text-neutrals-copy-light">to the host that did the work</p>
            <div className="mt-6 flex h-6 gap-0.5" role="img" aria-label="90% to the host, 10% to the protocol treasury">
              <motion.div
                className="h-full rounded-l-[4px] bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: '90%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="h-full rounded-r-[4px] bg-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: '10%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutrals-copy-light">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Host, 90%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-secondary" /> Protocol treasury, 10%
              </span>
            </div>
            <p className="mt-5 text-sm text-neutrals-copy leading-relaxed">
              Unused deposit goes back to the user. Earnings build up in the HostEarnings contract, so
              you withdraw in one transaction when it suits you.
            </p>
          </motion.figure>

          {/* Host selection weights */}
          <motion.figure
            className="rounded-2xl border border-neutrals-border/50 bg-card/60 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <figcaption>
              <h3 className="font-semibold text-foreground">How users pick you</h3>
              <p className="text-xs text-neutrals-copy">Default weights in the SDK&apos;s host scoring</p>
            </figcaption>
            <ul className="mt-6 space-y-4">
              {weights.map((row, i) => (
                <li
                  key={row.factor}
                  className="relative grid grid-cols-[64px_1fr] items-center gap-3"
                  onMouseEnter={() => setHovered(row.factor)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="text-sm text-neutrals-copy-light">{row.factor}</span>
                  <span className="flex items-center gap-2">
                    <motion.span
                      className={cn(
                        'block h-5 rounded-r-[4px] transition-colors',
                        hovered === row.factor ? 'bg-secondary' : 'bg-primary'
                      )}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(row.weight / 35) * 80}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className="text-sm font-semibold text-foreground tabular-nums">{row.weight}%</span>
                  </span>
                  {hovered === row.factor && (
                    <span className="absolute -top-8 left-16 z-10 whitespace-nowrap rounded-md border border-neutrals-border/60 bg-popover px-2 py-1 text-xs text-foreground shadow-lg">
                      {row.source}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {modes.map((mode) => (
                <span
                  key={mode.name}
                  className="rounded-md border border-primary/30 bg-background/50 px-2 py-1 text-[11px] text-neutrals-copy-light"
                  title={mode.note}
                >
                  <span className="font-mono font-semibold text-primary-light">{mode.name}</span> {mode.note}
                </span>
              ))}
            </div>
          </motion.figure>

          {/* Stake + revenue */}
          <motion.div
            className="flex flex-col rounded-2xl border border-neutrals-border/50 bg-card/60 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-foreground">One GPU, several income streams</h3>
            <ul className="mt-4 space-y-2.5">
              {earnings.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-neutrals-copy-light">
                  <item.icon className="h-4 w-4 shrink-0 text-secondary" />
                  {item.label}
                </li>
              ))}
            </ul>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {stakeFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col rounded-lg border border-neutrals-border/40 bg-background/40 p-3">
                  <dt className="order-last text-[11px] text-neutrals-copy leading-tight">{fact.label}</dt>
                  <dd className="text-lg font-bold text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <Button
              onClick={onJoinWaitlist}
              className="mt-6 w-full bg-gradient-animated text-white font-semibold border-0 hover:shadow-xl hover:shadow-primary/40"
            >
              <Wallet />
              Join the waitlist as a host
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center gap-3 rounded-2xl border border-neutrals-border/40 bg-background/40 p-5 text-center sm:flex-row sm:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Coins className="h-8 w-8 shrink-0 text-warning" />
          <p className="text-sm text-neutrals-copy leading-relaxed">
            Prices are set per million tokens, from fractions of a cent to premium rates, and users
            compare hosts directly on-chain. Community hosts running a gaming rig sit in the same
            marketplace as carrier-grade operators.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
