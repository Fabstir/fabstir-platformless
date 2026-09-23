'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  BookOpenText,
  Clapperboard,
  Cpu,
  HandCoins,
  ImageIcon,
  MessageSquareLock,
  Network,
  Sparkles,
  Terminal,
  Tv,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { SpotlightCard } from '@/components/SpotlightCard';
import { cn } from '@/lib/utils';

interface Capability {
  icon: LucideIcon;
  title: string;
  body: string;
  tag?: string;
  href?: string;
  className?: string;
  image?: string;
}

const capabilities: Capability[] = [
  {
    icon: Clapperboard,
    title: 'AI video generation',
    body: 'Thirteen LTX 2.3 modes, from text-to-video to restyle, outpaint and SDR-to-HDR. SD to 4K, priced per clip, with provenance your own client verifies. Now driven from inside Blender.',
    tag: 'New',
    href: '#video',
    className: 'lg:col-span-2',
    image: '/images/video-modes/ingredients.webp',
  },
  {
    icon: MessageSquareLock,
    title: 'Private chat and inference',
    body: 'Prompts and responses are encrypted on your device. Conversations are saved to decentralised storage under an identity derived from your wallet, so only you can read them back.',
    href: '#how-it-works',
  },
  {
    icon: Terminal,
    title: 'Agentic coding',
    body: 'Point Claude Code, Cursor, OpenCode or Continue at a local bridge and they run on decentralised GPUs, tool calls and all.',
    href: '#agents',
  },
  {
    icon: Network,
    title: 'Multi-agent orchestration',
    body: "Break a goal into a task graph, route each step to the right model, and delegate to outside agents over Google's A2A protocol, paying them per request with x402.",
    tag: 'Experimental',
    href: '#orchestration',
  },
  {
    icon: ImageIcon,
    title: 'Image generation',
    body: 'FLUX.2 diffusion on host GPUs, reachable through the standard OpenAI images endpoint. Your prompt never passes through a platform.',
  },
  {
    icon: Tv,
    title: 'Transcoding and streaming',
    body: 'H.264, HEVC and AV1 on NVENC, plus HLS streaming where the free preview is public and every paid segment stays encrypted.',
    href: '#streaming',
  },
  {
    icon: Sparkles,
    title: 'Private fine-tuning',
    body: 'Train a LoRA adapter on your own encrypted dataset and pay only for the slices of training that actually complete.',
    tag: 'New',
    href: '#fine-tuning',
  },
  {
    icon: BookOpenText,
    title: 'Knowledge and tools',
    body: 'Retrieval over your own documents with host-side embeddings, web search, vision with Florence-2, and OCR, all inside an encrypted session.',
  },
  {
    icon: Cpu,
    title: 'Confidential computing',
    body: 'The route to host-blind inference. Model keys are released only to a verified confidential VM, and the model is decrypted only inside it. Now proven end to end on Intel TDX with an NVIDIA H200, with paid testnet sessions run on it.',
    tag: 'Proven on hardware',
    href: '#security',
    className: 'lg:col-span-2',
  },
  {
    icon: HandCoins,
    title: 'Sponsored sessions',
    body: 'Pay for your users or your agents from one account. Delegates spend from your allowance but never hold the funds, and the on-chain cap cannot be exceeded.',
  },
];

const tagStyles: Record<string, string> = {
  New: 'bg-secondary/20 text-secondary-light border-secondary/40',
  Experimental: 'bg-warning/15 text-warning border-warning/40',
  'Proven on hardware': 'bg-success/15 text-success border-success/40',
};

export function Capabilities() {
  return (
    <section id="features" className="relative isolate py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow="Capabilities"
          title="One protocol. Every AI workload."
          description="The same encrypted, pay-per-use rails carry everything below. An independent host does the work, a smart contract settles the bill, and no platform sits in between."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => {
            const content = (
              <SpotlightCard className="h-full">
                {capability.image && (
                  <>
                    <Image
                      src={capability.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover object-right opacity-35 transition-opacity duration-500 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-transparent" />
                  </>
                )}
                <div className={cn('relative flex h-full flex-col p-6', capability.image && 'lg:max-w-[62%] lg:py-10')}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary-light">
                      <capability.icon className="h-5 w-5" />
                    </span>
                    {capability.tag && (
                      <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-semibold', tagStyles[capability.tag])}>
                        {capability.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{capability.title}</h3>
                  <p className="text-sm leading-relaxed text-neutrals-copy">{capability.body}</p>
                  {capability.href && (
                    <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary-light transition-colors group-hover:text-secondary-light">
                      Explore
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </SpotlightCard>
            );

            return (
              <motion.div
                key={capability.title}
                className={cn(capability.className)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              >
                {capability.href ? (
                  <a href={capability.href} className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
