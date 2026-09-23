'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Bot, Code2, HandCoins, ImageIcon, Wrench } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

type Token = [text: string, className?: string];
type Line = Token[];

const C = {
  comment: 'text-neutrals-copy/70 italic',
  prompt: 'text-secondary',
  keyword: 'text-primary-light',
  string: 'text-success',
  plain: 'text-neutrals-copy-lighter',
};

const snippets: Record<string, { label: string; file: string; lines: Line[] }> = {
  openai: {
    label: 'OpenAI Bridge',
    file: 'terminal',
    lines: [
      [['# Start the bridge. It handles the chain, encryption and sessions.', C.comment]],
      [['$ ', C.prompt], ['npx fabstir-openai-bridge ', C.plain], ['--private-key ', C.keyword], ['$KEY ', C.plain], ['--model ', C.keyword], ['"repo:file"', C.string]],
      [],
      [['# Point any OpenAI-compatible tool or SDK at it', C.comment]],
      [['$ ', C.prompt], ['export ', C.keyword], ['OPENAI_BASE_URL=', C.plain], ['http://localhost:3457/v1', C.string]],
      [],
      [['# Chat, tools, images and the Responses API work unchanged', C.comment]],
      [['POST ', C.keyword], ['/v1/chat/completions   ', C.plain], ['# streaming + tool calls', C.comment]],
      [['POST ', C.keyword], ['/v1/images/generations ', C.plain], ['# FLUX.2 diffusion', C.comment]],
      [['POST ', C.keyword], ['/v1/responses', C.plain]],
      [['GET  ', C.keyword], ['/v1/models', C.plain]],
    ],
  },
  claude: {
    label: 'Claude Bridge',
    file: 'app.ts',
    lines: [
      [['import ', C.keyword], ['Anthropic ', C.plain], ['from ', C.keyword], ['"@anthropic-ai/sdk"', C.string], [';', C.plain]],
      [],
      [['const ', C.keyword], ['client = ', C.plain], ['new ', C.keyword], ['Anthropic({', C.plain]],
      [['  baseURL: ', C.plain], ['"http://bridge.example.com/v1"', C.string], [', ', C.plain], ['// Claude Bridge', C.comment]],
      [['  apiKey: ', C.plain], ['"any-key"', C.string], [', ', C.plain], ['// auth comes from your wallet', C.comment]],
      [['});', C.plain]],
      [],
      [['// Everything else works unchanged: streaming, tool_use, multi-turn', C.comment]],
      [['const ', C.keyword], ['reply = ', C.plain], ['await ', C.keyword], ['client.messages.create({', C.plain]],
      [['  model: ', C.plain], ['"any-model"', C.string], [', ', C.plain], ['// mapped to the host model', C.comment]],
      [['  max_tokens: ', C.plain], ['1024', C.keyword], [',', C.plain]],
      [['  messages: [{ role: ', C.plain], ['"user"', C.string], [', content: ', C.plain], ['"Hello"', C.string], [' }],', C.plain]],
      [['});', C.plain]],
    ],
  },
};

// Whitepaper 5.5: the bridges as a drop-in backend for SaaS products.
const comparison = [
  { feature: 'Your data', central: 'Trust the platform', platformless: 'End-to-end encrypted, no intermediary' },
  { feature: 'Lock-in', central: 'One provider', platformless: 'Any host, any model' },
  { feature: 'Rate limits', central: 'Platform-imposed', platformless: 'No artificial limits' },
  { feature: 'Pricing', central: 'Platform markup', platformless: 'Direct GPU market rates' },
  { feature: 'Availability', central: 'Single point of failure', platformless: 'Many hosts, with failover' },
];

const clients = ['Claude Code', 'Cursor', 'OpenCode', 'Continue', 'LangChain', 'Any Anthropic or OpenAI SDK app'];

const facts: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Wrench,
    title: '23 tools, end to end',
    body: "Claude Code's file, terminal, web, planning and notebook tools all run through the Claude Bridge, with full streaming and multi-turn tool results.",
  },
  {
    icon: Code2,
    title: 'Real apps on real hosts',
    body: 'Claude Code has scaffolded, edited and served a complete React app on decentralised hosts, and OpenCode has built a working app through the OpenAI Bridge.',
  },
  {
    icon: ImageIcon,
    title: 'Images through the same door',
    body: 'OpenAI image quality and size settings map onto FLUX.2 steps and resolution on the host.',
  },
  {
    icon: HandCoins,
    title: 'Sponsored agents',
    body: "A payer funds a fleet of agents through delegate keys. They spend from the payer's allowance, never hold funds, and cannot pass the on-chain cap.",
  },
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<keyof typeof snippets>('openai');
  const [typed, setTyped] = useState(0);
  const snippet = snippets[tab];
  const total = useMemo(
    () => snippet.lines.reduce((sum, line) => sum + line.reduce((n, [text]) => n + text.length, 0) + 1, 0),
    [snippet]
  );

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setTyped(total);
      return;
    }
    setTyped(0);
    const timer = setInterval(() => {
      setTyped((n) => {
        if (n >= total) {
          clearInterval(timer);
          return n;
        }
        return n + 3;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [tab, isInView, reduceMotion, total]);

  // Reveal characters line by line, token by token, up to the typed budget.
  let budget = typed;
  let caretPlaced = false;
  const rendered = snippet.lines.map((line, lineIndex) => {
    const parts = line.map(([text, className], tokenIndex) => {
      const visible = text.slice(0, Math.max(0, budget));
      budget -= text.length;
      return visible ? (
        <span key={tokenIndex} className={className}>
          {visible}
        </span>
      ) : null;
    });
    budget -= 1;
    const showCaret = !caretPlaced && (budget < 0 || lineIndex === snippet.lines.length - 1);
    if (showCaret) caretPlaced = true;
    return (
      <div key={lineIndex} className="min-h-[1.5em] whitespace-pre">
        {parts}
        {showCaret && <span className="caret-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-secondary-light" />}
      </div>
    );
  });

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/60 via-secondary/40 to-transparent blur-sm" />
      <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-[#0d0d1a] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-neutrals-border/40 bg-background/80 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-error/80" />
            <span className="h-3 w-3 rounded-full bg-warning/80" />
            <span className="h-3 w-3 rounded-full bg-success/80" />
          </div>
          <div role="tablist" aria-label="Bridge examples" className="flex gap-1">
            {(Object.keys(snippets) as (keyof typeof snippets)[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                  tab === key ? 'bg-primary/25 text-foreground' : 'text-neutrals-copy hover:text-foreground'
                )}
              >
                {snippets[key].label}
              </button>
            ))}
          </div>
          <span className="ml-auto hidden font-mono text-xs text-neutrals-copy sm:block">{snippet.file}</span>
        </div>
        <div className="min-h-[21rem] overflow-x-auto p-5 font-mono text-[12.5px] leading-6 sm:text-sm">
          {rendered}
        </div>
      </div>
    </div>
  );
}

export function AgenticAI() {
  return (
    <section id="agents" className="py-20 px-4 bg-primary-dark/20">
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <Bot className="h-3.5 w-3.5" /> Agentic AI
            </>
          }
          title="Bring your agents. Keep your code."
          description="The Claude Bridge speaks the Anthropic Messages API. The OpenAI Bridge speaks Chat Completions, Images and Responses. Point an existing tool at either one and it runs on decentralised GPU hosts, with sessions, encryption and payment handled for you."
        />

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <Terminal />

            <div className="mt-8 overflow-x-auto rounded-2xl border border-neutrals-border/50 bg-background/40">
              <table className="w-full text-left text-sm">
                <caption className="border-b border-neutrals-border/40 px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-neutrals-copy">
                  A drop-in backend for your product
                </caption>
                <thead>
                  <tr className="border-b border-neutrals-border/40 text-xs text-neutrals-copy">
                    <th scope="col" className="px-4 py-2 font-medium"><span className="sr-only">Feature</span></th>
                    <th scope="col" className="px-4 py-2 font-medium">Centralised API</th>
                    <th scope="col" className="px-4 py-2 font-medium text-secondary-light">Platformless AI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-neutrals-border/20 last:border-0">
                      <th scope="row" className="px-4 py-2.5 font-medium text-neutrals-copy-light">{row.feature}</th>
                      <td className="px-4 py-2.5 text-neutrals-copy">{row.central}</td>
                      <td className="px-4 py-2.5 text-foreground">{row.platformless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutrals-copy">Works with</p>
              <ul className="flex flex-wrap gap-2">
                {clients.map((client, i) => (
                  <motion.li
                    key={client}
                    className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm text-primary-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    {client}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.title}
                  className="rounded-xl border border-neutrals-border/50 bg-background/50 p-5 backdrop-blur hover:border-secondary/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <fact.icon className="mb-3 h-5 w-5 text-secondary" />
                  <h3 className="font-semibold text-primary-content">{fact.title}</h3>
                  <p className="mt-1 text-sm text-neutrals-copy leading-relaxed">{fact.body}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-neutrals-copy">
              Your source code, prompts and responses travel over encrypted peer-to-peer connections
              to the host you chose. They never touch a centralised platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
