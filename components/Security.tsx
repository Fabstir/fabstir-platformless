'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  CheckCircle2,
  CircleDashed,
  Cpu,
  ExternalLink,
  Fingerprint,
  KeyRound,
  Landmark,
  ScanEye,
  ShieldCheck,
  ShieldHalf,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

interface Layer {
  id: string;
  icon: LucideIcon;
  name: string;
  summary: string;
  detail: string;
  radius: number;
  dashed?: boolean;
}

// Innermost first: each ring wraps the one inside it.
const layers: Layer[] = [
  {
    id: 'encryption',
    icon: KeyRound,
    name: 'End-to-end encryption',
    summary: 'ECDH session keys, XChaCha20-Poly1305, forward secrecy.',
    detail:
      'Every session gets a fresh ephemeral key, costing around 1 ms per message. No platform, proxy or storage node ever sees plaintext. The host you choose decrypts in memory to run your job, and never persists it.',
    radius: 70,
  },
  {
    id: 'proofs',
    icon: Fingerprint,
    name: 'Signed, STARK-anchored commitments',
    summary: 'The host commits on-chain to the model, input and output it claims.',
    detail:
      'Your client recomputes the input and output hashes from data it already holds, so a substituted prompt or response is caught by arithmetic. The proof is a commitment, not a re-execution of the model. Proof that the committed model actually ran comes from confidential computing, below.',
    radius: 105,
  },
  {
    id: 'stake',
    icon: Landmark,
    name: 'Stake and evidence-based slashing',
    summary: 'At least 1,000 FAB at stake per host, slashable on public evidence.',
    detail:
      'Proofs, deltas and conversations are content-addressed on S5, so misbehaviour leaves signed, durable evidence. Slashing is capped at 50% per action with a 24-hour cooldown, owner-controlled at launch and moving to a DAO.',
    radius: 140,
  },
  {
    id: 'tee',
    icon: Cpu,
    name: 'Confidential computing',
    summary: 'Model keys released only to a verified confidential VM. Proven on Intel TDX with an NVIDIA H200.',
    detail:
      'Models ship encrypted and the host never holds their key. A key broker releases it only against hardware-signed proof, from both the CPU and the GPU, that the machine is genuine and running approved software. The model is then decrypted only inside a confidential VM whose memory the operator cannot read, and checked against its on-chain hash.',
    radius: 175,
    dashed: true,
  },
];

// Whitepaper v1.9, section 8.6 and the confidential computing roadmap.
const teeStatus = [
  { done: true, label: 'Attested-model pipeline built and fail-closed throughout, with 300+ tests' },
  { done: true, label: 'CPU half on real Intel TDX silicon, in the live request path' },
  { done: true, label: 'GPU half on a real NVIDIA H200: both attestations verified under one challenge, then Qwen3.8-27B decrypted inside the confidential VM and served' },
  { done: true, label: 'Paid testnet sessions from the app run on the TEE host and settle on-chain, with a proof on S5 matching the on-chain hash' },
  { done: false, label: 'Route paid sessions to tee-attested hosts automatically (today by hand)' },
  { done: false, label: 'Bring video-generation weights under the same attested release' },
  { done: false, label: 'Open question with NVIDIA: whether signed evidence can show confidential-computing mode is on' },
];
const teeDone = teeStatus.filter((item) => item.done).length;

export function Security() {
  const [activeLayer, setActiveLayer] = useState<string>('encryption');
  const active = layers.find((l) => l.id === activeLayer) ?? layers[0];

  return (
    <section id="security" className="relative isolate py-20 px-4 overflow-hidden bg-primary-dark/20">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-30" />
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <ShieldCheck className="h-3.5 w-3.5" /> Security and trust
            </>
          }
          title="Trust the maths, not a company"
          description="Encryption protects your data in transit and at rest. Signed commitments and stake keep hosts honest. Confidential computing, now proven on real hardware, is the route to hosts that cannot see your data at all. We say plainly where each guarantee ends."
        />

        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Defence-in-depth rings */}
          <motion.div
            className="relative mx-auto aspect-square w-full max-w-[440px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Four security layers wrapped around your data">
              <defs>
                <radialGradient id="core-glow">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="60" fill="url(#core-glow)" />
              {[...layers].reverse().map((layer) => {
                const isActive = layer.id === activeLayer;
                return (
                  <g key={layer.id} className="cursor-pointer" onClick={() => setActiveLayer(layer.id)}>
                    <circle
                      cx="200"
                      cy="200"
                      r={layer.radius}
                      fill={isActive ? 'rgba(139, 92, 246, 0.10)' : 'rgba(139, 92, 246, 0.03)'}
                      stroke={isActive ? '#ec4899' : 'rgba(167, 139, 250, 0.45)'}
                      strokeWidth={isActive ? 2.5 : 1.25}
                      strokeDasharray={layer.dashed ? '6 6' : undefined}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
              <motion.circle
                cx="200"
                cy="200"
                r="190"
                fill="none"
                stroke="rgba(236, 72, 153, 0.35)"
                strokeWidth="1"
                strokeDasharray="2 10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <text x="200" y="196" textAnchor="middle" className="fill-foreground text-[15px] font-bold">
                Your data
              </text>
              <text x="200" y="215" textAnchor="middle" className="fill-neutrals-copy text-[11px]">
                prompts, files, keys
              </text>
            </svg>
            {/* Ring labels, placed on the top edge of each ring */}
            {layers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id)}
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold backdrop-blur transition-colors',
                  layer.id === activeLayer
                    ? 'border-secondary bg-secondary/25 text-foreground'
                    : 'border-primary/40 bg-background/80 text-neutrals-copy-light hover:text-foreground'
                )}
                style={{ top: `${((200 - layer.radius) / 400) * 100}%` }}
              >
                <layer.icon className="h-3 w-3" />
                {layer.name}
              </button>
            ))}
          </motion.div>

          {/* Layer detail */}
          <div className="space-y-4">
            <ul className="space-y-2">
              {layers.map((layer) => (
                <li key={layer.id}>
                  <button
                    type="button"
                    onClick={() => setActiveLayer(layer.id)}
                    aria-expanded={layer.id === activeLayer}
                    className={cn(
                      'w-full rounded-xl border p-4 text-left transition-colors',
                      layer.id === activeLayer
                        ? 'border-secondary/60 bg-secondary/10'
                        : 'border-neutrals-border/40 bg-background/40 hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <layer.icon className={cn('h-5 w-5 mt-0.5 shrink-0', layer.id === activeLayer ? 'text-secondary-light' : 'text-primary-light')} />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-foreground">{layer.name}</h3>
                          {layer.dashed && (
                            <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                              Proven on hardware, pre-production
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutrals-copy">{layer.summary}</p>
                        {layer.id === active.id && (
                          <motion.p
                            className="mt-2 text-sm leading-relaxed text-neutrals-copy-light"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.25 }}
                          >
                            {layer.detail}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TEE status + moderation + audit */}
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            className="rounded-2xl border border-success/30 bg-card/70 p-6 backdrop-blur lg:col-span-2 lg:row-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground">Confidential computing: proven on hardware</h3>
              <span className="whitespace-nowrap text-xs text-neutrals-copy tabular-nums">
                {teeDone} of {teeStatus.length}
              </span>
            </div>
            <p className="mb-4 text-sm text-neutrals-copy leading-relaxed">
              On 23 September 2026 the whole path ran on a Phala Cloud confidential VM pairing Intel
              TDX with an NVIDIA H200. Measurements were recomputed independently before pinning,
              and a replayed key request was refused.
            </p>
            <div className="mb-5 flex gap-0.5" aria-hidden="true">
              {teeStatus.map((item, i) => (
                <motion.span
                  key={item.label}
                  className={cn('h-2 flex-1 first:rounded-l-[4px] last:rounded-r-[4px]', item.done ? 'bg-success' : 'bg-muted')}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                  style={{ originX: 0 }}
                />
              ))}
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {teeStatus.map((item) => (
                <li key={item.label} className="flex items-start gap-2 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-success" aria-label="Done" />
                  ) : (
                    <CircleDashed className="h-4 w-4 mt-0.5 shrink-0 text-warning" aria-label="Remaining" />
                  )}
                  <span className={item.done ? 'text-neutrals-copy-light' : 'text-foreground font-medium'}>{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-neutrals-copy leading-relaxed">
              Until NVIDIA confirms whether its signed evidence can tell confidential-computing mode
              on from off, we do not claim a root operator cannot read GPU memory. Confidential
              inference is proven on the target hardware, but it is not yet the default path or a
              production guarantee.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-neutrals-border/50 bg-card/60 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ScanEye className="mb-3 h-6 w-6 text-secondary" />
            <h3 className="font-semibold text-foreground">Moderation that fails closed</h3>
            <p className="mt-2 text-sm text-neutrals-copy leading-relaxed">
              Known illegal content is kept off the media pipeline by deterministic hash matching
              (SHA-256 on files, PDQ on frames), with no AI judging your content. Three independent
              gates hold on any match or outage, and a human reviews every case before anything is
              reported. It reads only what the host already sees to do its job.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-success/30 bg-card/60 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ShieldHalf className="mb-3 h-6 w-6 text-success" />
            <h3 className="font-semibold text-foreground">Audited and open</h3>
            <p className="mt-2 text-sm text-neutrals-copy leading-relaxed">
              The smart contracts were audited by Hacken. The contracts are UUPS-upgradeable, every
              admin action is public on-chain, and the code is open for you to verify.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                href="https://hacken.io/audits/fabstir/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-light hover:text-secondary transition-colors"
              >
                Hacken report <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="https://github.com/Fabstir"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-light hover:text-secondary transition-colors"
              >
                Source on GitHub <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
