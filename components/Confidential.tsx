'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Building2,
  Clapperboard,
  Database,
  Eye,
  FileKey2,
  ImageIcon,
  Lock,
  MessageSquareLock,
  ServerCog,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

interface Row {
  icon: LucideIcon;
  party: string;
  cloud: string;
  platformless: string;
}

// The Platformless column is scoped to confidential-computing hosts. GPU memory is stated as
// sealed by NVIDIA's design ("sealed" or "blocked", never "cannot"): gap G-6a is closed on
// NVIDIA's documented design, with written confirmation pending (whitepaper v1.10, 8.6).
const rows: Row[] = [
  {
    icon: Building2,
    party: 'The AI company',
    cloud: 'Receives every prompt, file and answer, and can read them on its own servers.',
    platformless: 'There is no platform in between, Fabstir included. Your device talks straight to the host.',
  },
  {
    icon: Database,
    party: 'Storage',
    cloud: "Your history sits on the provider's servers, under the provider's keys.",
    platformless: 'Encrypted on your device before upload. Storage nodes hold only ciphertext.',
  },
  {
    icon: ServerCog,
    party: 'The machine operator',
    cloud: 'Runs the servers where your data is handled unencrypted.',
    platformless: "Your prompts and data are decrypted only inside a confidential VM whose memory the operator cannot read, and by NVIDIA's design the GPU memory they run in is sealed from the operator.",
  },
  {
    icon: Sparkles,
    party: 'Your training data',
    cloud: 'Uploaded to the provider, which decrypts it to train.',
    platformless: 'Decrypted only inside a confidential VM. The adapter comes back encrypted, and only you hold its key.',
  },
  {
    icon: FileKey2,
    party: 'The model',
    cloud: "A proprietary model lives on the provider's infrastructure.",
    platformless: 'Ships encrypted. Its key is released only against hardware-signed proof of the machine, then checked against its on-chain hash.',
  },
];

const ranOnOneMachine = [
  { icon: MessageSquareLock, label: 'Encrypted chat' },
  { icon: ImageIcon, label: 'FLUX.2 images' },
  { icon: Sparkles, label: 'A fine-tune, served back' },
  { icon: Clapperboard, label: 'Six video modes from Blender' },
];

const proofPoints = [
  'Three boots, three attested key releases, each against a fresh CPU quote and fresh GPU evidence',
  'Every job settled on-chain',
  'Two independent fine-tunes produced byte-identical adapters',
];

export function Confidential() {
  return (
    <section id="confidential" className="relative isolate py-20 px-4 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-secondary rounded-full filter blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <Lock className="h-3.5 w-3.5" /> Confidential by design
            </>
          }
          title="Who can see your data?"
          description="Platformless means no company stands between you and the computer that runs your AI, so there is no one in the middle to read your data, Fabstir included. On confidential-computing hosts, even the computer doing the work decrypts your data only inside a confidential VM whose memory the operator cannot read, and by NVIDIA's design the GPU memory it runs in is sealed from the operator."
        />

        {/* Who can see it: a typical AI cloud against a confidential-computing host */}
        <motion.div
          className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-neutrals-border/50 bg-card/70 backdrop-blur-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="hidden md:grid md:grid-cols-[minmax(11rem,0.7fr)_1fr_1.25fr] border-b border-neutrals-border/50 text-sm font-semibold">
            <div className="px-6 py-4 text-neutrals-copy">Who could read it</div>
            <div className="flex items-center gap-2 px-6 py-4 text-neutrals-copy-light">
              <Eye className="h-4 w-4 text-error" /> Typical AI cloud
            </div>
            <div className="flex items-center gap-2 border-l border-success/30 bg-success/10 px-6 py-4 text-foreground">
              <ShieldCheck className="h-4 w-4 text-success" /> Platformless AI, confidential-computing host
            </div>
          </div>

          <ul>
            {rows.map((row, index) => (
              <motion.li
                key={row.party}
                className="grid md:grid-cols-[minmax(11rem,0.7fr)_1fr_1.25fr] border-b border-neutrals-border/30 last:border-b-0"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              >
                <div className="flex items-center gap-3 px-6 pt-5 md:py-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/15 text-primary-light">
                    <row.icon className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-foreground">{row.party}</span>
                </div>
                <div className="px-6 pt-3 md:py-5">
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-neutrals-copy md:hidden">
                    <Eye className="h-3.5 w-3.5 text-error" /> Typical AI cloud
                  </span>
                  <p className="text-sm leading-relaxed text-neutrals-copy">{row.cloud}</p>
                </div>
                <div className="mx-4 mb-4 mt-3 rounded-xl bg-success/10 px-4 py-3 md:m-0 md:rounded-none md:border-l md:border-success/30 md:px-6 md:py-5">
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-success md:hidden">
                    <ShieldCheck className="h-3.5 w-3.5" /> Platformless AI
                  </span>
                  <p className="text-sm leading-relaxed text-neutrals-copy-light">{row.platformless}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* The proof: the whole product on one attested machine */}
        <motion.div
          className="mx-auto max-w-6xl rounded-2xl border border-success/30 bg-card/70 p-6 sm:p-8 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                <ShieldCheck className="h-3.5 w-3.5" /> Proven on 30 September 2026
              </span>
              <h3 className="text-2xl font-bold text-foreground">The whole product, on one attested machine</h3>
              <p className="text-sm leading-relaxed text-neutrals-copy">
                Every service was deployed in one confidential VM on Intel TDX with an NVIDIA H200, and the
                model key was released only after a key broker verified both the CPU quote and the
                GPU&apos;s attestation under one challenge.
              </p>
              <ul className="space-y-2 pt-1">
                {proofPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-neutrals-copy-light">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {ranOnOneMachine.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-neutrals-border/40 bg-background/50 px-4 py-3"
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-secondary-light" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a
                  href="#security"
                  className="inline-flex items-center gap-1 font-medium text-primary-light hover:text-secondary-light transition-colors"
                >
                  What the hardware proves, and what is still open <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/files/PLATFORMLESS_AI_WHITEPAPER.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary-light hover:text-secondary-light transition-colors"
                >
                  Read the whitepaper <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
