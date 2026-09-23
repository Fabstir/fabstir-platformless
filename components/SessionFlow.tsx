'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Blocks, Database, Laptop, Pause, Play, Server } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

type Actor = 'client' | 'host' | 'chain' | 'storage';

const actors: Record<Actor, { label: string; sublabel: string; icon: LucideIcon; x: number; y: number }> = {
  client: { label: 'You', sublabel: 'SDK in your app', icon: Laptop, x: 14, y: 50 },
  host: { label: 'GPU host', sublabel: 'Independent operator', icon: Server, x: 86, y: 50 },
  chain: { label: 'Base L2', sublabel: 'Smart contracts', icon: Blocks, x: 50, y: 14 },
  storage: { label: 'S5 / Sia', sublabel: 'Decentralised storage', icon: Database, x: 50, y: 86 },
};

const edges: [Actor, Actor][] = [
  ['client', 'host'],
  ['client', 'chain'],
  ['client', 'storage'],
  ['host', 'chain'],
  ['host', 'storage'],
];

interface Step {
  title: string;
  body: string;
  active: Actor[];
  packets: [Actor, Actor][];
}

const steps: Step[] = [
  {
    title: 'Sign in with your wallet',
    body: 'Your storage identity and encryption keys are derived from your wallet, so there is no account to create and nothing for a platform to hold.',
    active: ['client'],
    packets: [],
  },
  {
    title: 'Discover hosts',
    body: 'The SDK reads the NodeRegistry contract for every host serving your model, with its price and stake.',
    active: ['client', 'chain'],
    packets: [['chain', 'client']],
  },
  {
    title: 'Choose a host',
    body: 'Hosts are scored on stake, price, uptime and latency. Or ask for the cheapest, the most reliable, the fastest, or one operator by address.',
    active: ['client', 'host'],
    packets: [],
  },
  {
    title: 'Deposit into escrow',
    body: 'You open a session by depositing USDC or ETH into the JobMarketplace contract. The funds sit in escrow, not with the host.',
    active: ['client', 'chain'],
    packets: [['client', 'chain']],
  },
  {
    title: 'Open an encrypted channel',
    body: 'An ephemeral ECDH key exchange gives the session a fresh key. Past sessions stay private even if a host key leaks later.',
    active: ['client', 'host'],
    packets: [['client', 'host'], ['host', 'client']],
  },
  {
    title: 'Prompt and stream',
    body: 'Prompts go out and tokens stream back, encrypted with XChaCha20-Poly1305. The host decrypts only in memory, only to run your job.',
    active: ['client', 'host'],
    packets: [['client', 'host'], ['host', 'client']],
  },
  {
    title: 'Prove the work',
    body: 'The host submits signed proofs of work on-chain and stores the full proof data on S5, where anyone can check it.',
    active: ['host', 'chain', 'storage'],
    packets: [['host', 'chain'], ['host', 'storage']],
  },
  {
    title: 'Settle automatically',
    body: "When the session ends the contract pays the host 90%, sends 10% to the protocol treasury, and refunds whatever you didn't use.",
    active: ['chain', 'host', 'client'],
    packets: [['chain', 'host'], ['chain', 'client']],
  },
  {
    title: 'Keep your record',
    body: 'Your conversation is encrypted before it is saved to S5. Storage nodes hold only ciphertext, and only your wallet can open it.',
    active: ['client', 'storage'],
    packets: [['client', 'storage']],
  },
];

const STEP_MS = 4200;

const isEdgeActive = (edge: [Actor, Actor], step: Step) =>
  step.packets.some(
    ([from, to]) => (from === edge[0] && to === edge[1]) || (from === edge[1] && to === edge[0])
  );

export function SessionFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-150px' });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const step = steps[index];

  useEffect(() => {
    if (!playing || !isInView || reduceMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % steps.length), STEP_MS);
    return () => clearTimeout(timer);
  }, [index, playing, isInView, reduceMotion]);

  return (
    <section id="how-it-works" className="py-20 px-4 bg-primary-dark/20">
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow="How it works"
          title="Nine steps. No platform."
          description="Every chat, agent call and render follows the same path between four parties: you, an independent host, a smart contract and decentralised storage. Nobody else is in the loop."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Diagram */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl border border-neutrals-border/60 bg-background/60 backdrop-blur overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid opacity-40" />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {edges.map((edge) => {
                  const a = actors[edge[0]];
                  const b = actors[edge[1]];
                  const active = isEdgeActive(edge, step);
                  return (
                    <line
                      key={edge.join('-')}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      vectorEffect="non-scaling-stroke"
                      strokeWidth={active ? 2 : 1}
                      stroke={active ? '#ec4899' : 'rgba(167, 139, 250, 0.25)'}
                      className={cn('transition-all duration-500', active && 'edge-flow')}
                    />
                  );
                })}
              </svg>

              {/* Encrypted packets travelling the active edges */}
              {!reduceMotion &&
                step.packets.map(([from, to], i) => (
                  <motion.span
                    key={`${index}-${from}-${to}`}
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-light shadow-[0_0_14px_4px_rgba(236,72,153,0.7)]"
                    initial={{ left: `${actors[from].x}%`, top: `${actors[from].y}%`, opacity: 0 }}
                    animate={{
                      left: [`${actors[from].x}%`, `${actors[to].x}%`],
                      top: [`${actors[from].y}%`, `${actors[to].y}%`],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
                  />
                ))}

              {(Object.keys(actors) as Actor[]).map((key) => {
                const actor = actors[key];
                const active = step.active.includes(key);
                return (
                  <div
                    key={key}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${actor.x}%`, top: `${actor.y}%` }}
                  >
                    <div
                      className={cn(
                        'flex flex-col items-center gap-1 rounded-xl border px-2 py-2 sm:px-4 sm:py-3 text-center transition-all duration-500 w-[84px] sm:w-[130px]',
                        active
                          ? 'border-secondary/70 bg-card shadow-[0_0_30px_rgba(236,72,153,0.35)] scale-105'
                          : 'border-neutrals-border/60 bg-card/80 opacity-60'
                      )}
                    >
                      <actor.icon className={cn('h-5 w-5 sm:h-6 sm:w-6', active ? 'text-secondary-light' : 'text-primary-light')} />
                      <span className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{actor.label}</span>
                      <span className="hidden sm:block text-[11px] text-neutrals-copy leading-tight">{actor.sublabel}</span>
                    </div>
                  </div>
                );
              })}

              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="rounded-full bg-secondary/20 px-2.5 py-1 text-xs font-semibold text-secondary-light tabular-nums">
                  {index + 1} / {steps.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-neutrals-border/60 bg-background/80 text-neutrals-copy-light hover:text-foreground"
                aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>

              {/* Progress bar for the current step */}
              {playing && isInView && !reduceMotion && (
                <motion.div
                  key={`progress-${index}`}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                />
              )}
            </div>

            <div className="mt-4 min-h-[112px] rounded-xl border border-primary/30 bg-card/70 p-5" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-semibold text-foreground">
                    <span className="mr-2 text-secondary-light">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutrals-copy">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step list */}
          <ol className="lg:col-span-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setPlaying(false);
                  }}
                  aria-current={i === index ? 'step' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors',
                    i === index
                      ? 'border-secondary/60 bg-secondary/10 text-foreground'
                      : 'border-neutrals-border/40 text-neutrals-copy hover:border-primary/50 hover:text-foreground'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums',
                      i === index ? 'bg-secondary text-white' : i < index ? 'bg-primary/40 text-foreground' : 'bg-muted text-neutrals-copy'
                    )}
                  >
                    {i + 1}
                  </span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
