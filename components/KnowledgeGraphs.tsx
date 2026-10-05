'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  FileCheck2,
  Gauge,
  Laptop,
  Lock,
  Receipt,
  RefreshCw,
  ScanSearch,
  Share2,
  ShieldCheck,
  Waypoints,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

const IMG = '/images/knowledge-graphs';

// The screenshots' own background, so a letterboxed screenshot shows no edge.
const SCREENSHOT_BG = 'bg-[#0c0a09]';

interface Screenshot {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

const steps: { title: string; body: string; shot: Screenshot }[] = [
  {
    title: 'Build',
    body: 'Choose your databases. The graph is computed in your browser from embeddings you already have: passages that follow one another, passages that say similar things, and the topics they cluster into. No host sees your documents to build it.',
    shot: {
      src: `${IMG}/graph-overview.webp`,
      width: 1121,
      height: 1294,
      alt: 'Knowledge graph of two document collections: blue and green passages joined by grey and amber links, with a separate cluster of baking notes',
      caption: 'Two collections, one map. Amber links cross from one collection to the other; an unrelated file sits on its own.',
    },
  },
  {
    title: 'Explore',
    body: 'Zoom from collections and topics down to single passages. Amber lines mark the connections between collections, and one switch hides everything else.',
    shot: {
      src: `${IMG}/cross-database-links.webp`,
      width: 1121,
      height: 1465,
      alt: 'Close-up of the graph: passages from an annual report and a warehouse case study joined by amber cross-collection links',
      caption: 'Zoom in and every passage is labelled. Amber marks a link between collections.',
    },
  },
  {
    title: 'Ask',
    body: 'Type a question to preview exactly which passages chat would find. Then link the graph to a project: chat takes its best matches and follows the graph to the related passages a similarity search alone would miss, often in another collection.',
    shot: {
      src: `${IMG}/search-preview.webp`,
      width: 1248,
      height: 1069,
      alt: "A question typed into the graph's search box, with matching passages highlighted in orange and graph-related passages in blue",
      caption: 'Ask a question and see what chat would use: search matches in orange, passages the graph adds in blue.',
    },
  },
];

const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Laptop,
    title: 'Free to build',
    body: 'Computed in your browser from embeddings you already hold. Nothing to pay, no host involved.',
  },
  {
    icon: Lock,
    title: 'Sealed like everything else',
    body: 'Encrypted with a key derived from your vault, graph names and file names included. A graph never stores your text.',
  },
  {
    icon: Share2,
    title: 'Across collections',
    body: 'The links between databases are the point. See them in amber, or on their own.',
  },
  {
    icon: ScanSearch,
    title: 'Preview before you ask',
    body: 'See which passages chat would use for any question, before you spend a credit.',
  },
  {
    icon: Gauge,
    title: 'Never in the way',
    body: 'Related passages never displace a search result, and a slow graph never delays an answer.',
  },
  {
    icon: RefreshCw,
    title: 'Keeps up with you',
    body: 'Add a document and the graph catches up the next time you open it. Add or remove databases at any time.',
  },
];

const extractionPoints: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Receipt,
    title: 'You approve every cost',
    body: 'See the estimate before anything starts. The run pauses for your approval if it reaches 130% of it, and never resumes on its own. It is an ordinary pay-per-session job: unused deposit is refunded.',
  },
  {
    icon: FileCheck2,
    title: 'Grounded, not invented',
    body: 'An entity is kept only if the passage it came from actually names it.',
  },
  {
    icon: ShieldCheck,
    title: "Your documents can't take the wheel",
    body: 'Text inside your files cannot pose as you, start a web search or trigger image generation.',
  },
];

export function KnowledgeGraphs() {
  const [activeStep, setActiveStep] = useState(0);
  const { shot } = steps[activeStep];

  return (
    <section id="knowledge-graphs" className="relative isolate py-20 px-4 overflow-hidden">
      <div className="absolute -z-10 top-32 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -z-10 bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/15 blur-3xl" />

      <div className="container max-w-7xl mx-auto space-y-16">
        <SectionHeader
          eyebrow={
            <>
              <Waypoints className="h-3.5 w-3.5" /> Knowledge graphs
              <span className="rounded-full bg-secondary/30 px-2 py-px text-[10px] tracking-wide text-secondary-content">
                New
              </span>
            </>
          }
          title="See how your documents connect"
          description="A private map of everything you've stored, and chat that follows it."
        />

        {/* Intro and the three steps, each driving the screenshot beside it */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-neutrals-copy-light leading-relaxed">
              Search finds the passage closest to your question. It does not see that the robot in one
              file runs on the battery described in another. A knowledge graph does. Point it at your
              vector databases and Platformless AI maps every document, every passage and every link
              between them, across collections, then lets chat follow those links when it answers. It is
              built in your browser, sealed with your key, and costs nothing to make.
            </p>
            <div role="tablist" aria-label="How a knowledge graph works" className="space-y-3">
              {steps.map((step, i) => (
                <button
                  key={step.title}
                  id={`kg-step-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === activeStep}
                  aria-controls="kg-step-panel"
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors',
                    i === activeStep
                      ? 'border-primary/60 bg-primary/10'
                      : 'border-neutrals-border/40 hover:border-primary/40 hover:bg-primary/5'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
                      i === activeStep ? 'bg-secondary text-white' : 'bg-secondary/15 text-secondary-light'
                    )}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">{step.title}</span>
                    <span className="mt-1 block text-sm text-neutrals-copy leading-relaxed">{step.body}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.figure
            id="kg-step-panel"
            role="tabpanel"
            aria-labelledby={`kg-step-${activeStep}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={cn('relative overflow-hidden rounded-2xl border border-primary/30', SCREENSHOT_BG)}
              style={{ aspectRatio: `${steps[0].shot.width} / ${steps[0].shot.height}` }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={shot.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <figcaption className="mt-3 text-sm text-neutrals-copy">{shot.caption}</figcaption>
          </motion.figure>
        </div>

        {/* Graph-aware chat */}
        <motion.figure
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden rounded-2xl border border-primary/30">
            <Image
              src={`${IMG}/graph-aware-chat.webp`}
              alt="A chat answer naming the battery maker, the battery model and the factory, combining facts from both collections"
              width={2266}
              height={998}
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-neutrals-copy">
            One question, answered from two collections: the robot is in one, its battery maker in the other.
          </figcaption>
        </motion.figure>

        {/* What you get */}
        <div className="space-y-6">
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-foreground">What you get</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="rounded-xl border border-neutrals-border/50 bg-background/50 p-5 backdrop-blur transition-colors hover:border-secondary/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <benefit.icon className="h-5 w-5 mt-0.5 shrink-0 text-secondary" />
                  <div>
                    <h4 className="font-semibold text-primary-content">{benefit.title}</h4>
                    <p className="mt-1 text-sm text-neutrals-copy leading-relaxed">{benefit.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Entity extraction */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            className="space-y-6 lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Entity extraction</h3>
              <p className="text-neutrals-copy-light leading-relaxed">
                Go further: extract the people, organisations, products and places in your documents, and
                how they relate. A host you choose reads your collections and returns entities and
                relationships. They appear as a layer on your graph, where one click shows everywhere an
                entity is mentioned, in every collection. Chat receives a short list of known relationships,
                drawn only from the passages in front of it.
              </p>
            </div>
            <ul className="space-y-4">
              {extractionPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary-light">
                    <point.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">{point.title}</span>
                    <span className="mt-0.5 block text-sm text-neutrals-copy leading-relaxed">{point.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* On wider screens the consent dialog floats over the empty foot of the entity panel, as it does in the app. */}
            <div className="relative sm:mb-10 sm:mr-6">
              <figure>
                <div className="overflow-hidden rounded-2xl border border-primary/30">
                  <Image
                    src={`${IMG}/entity-panel.webp`}
                    alt="The entity layer on the graph, with a side panel for a person showing their type, a relationship and mentions in two collections"
                    width={1613}
                    height={1469}
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-neutrals-copy sm:pr-[44%]">
                  Entities on the graph. Click one to see its relationships and every mention, in every
                  collection.
                </figcaption>
              </figure>
              <figure className="mt-6 sm:absolute sm:-bottom-10 sm:-right-6 sm:mt-0 sm:w-[38%]">
                <div className="overflow-hidden rounded-xl border border-secondary/50 shadow-2xl shadow-black/60">
                  <Image
                    src={`${IMG}/extraction-consent.webp`}
                    alt="The extraction dialog: the collections to be sent, the chosen model and host, an agreement checkbox and the expected cost in credits"
                    width={699}
                    height={852}
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 38vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-neutrals-copy sm:text-xs">
                  Nothing is sent until you agree: every collection named, the host chosen, the cost estimated.
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </div>

        {/* Trust boundary */}
        <motion.div
          className="mx-auto max-w-5xl rounded-2xl border border-warning/30 bg-background/50 p-6 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 mt-0.5 shrink-0 text-warning" />
            <div>
              <h3 className="font-semibold text-primary-content mb-1">Where the trust boundary sits</h3>
              <p className="text-sm text-neutrals-copy leading-relaxed">
                Building and exploring a graph never sends your documents anywhere. Entity extraction does:
                the host you choose must read the passages to extract from them, the same boundary as{' '}
                <a href="#fine-tuning" className="text-primary-light underline-offset-4 hover:underline">
                  fine-tuning
                </a>
                . Before anything is sent you see every collection involved and the host it goes to, and you
                agree to it. Extraction prompts are kept out of your conversation history, and web search is
                switched off for the run.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
