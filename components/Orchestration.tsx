'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  Brain,
  FlaskConical,
  CheckCheck,
  GitFork,
  Globe,
  ListTree,
  Merge,
  Network,
  Search,
  Target,
  Workflow,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

type NodeId = 'goal' | 'planner' | 'research' | 'analysis' | 'external' | 'synth' | 'answer';

const nodes: Record<NodeId, { label: string; sub: string; icon: LucideIcon; wide: [number, number]; tall: [number, number] }> = {
  goal: { label: 'Your goal', sub: 'one request', icon: Target, wide: [7, 50], tall: [50, 7] },
  planner: { label: 'TaskPlanner', sub: 'builds a task graph', icon: ListTree, wide: [27, 50], tall: [50, 26] },
  research: { label: 'Research', sub: 'fast model', icon: Search, wide: [52, 16], tall: [17, 50] },
  analysis: { label: 'Analysis', sub: 'deep model', icon: Brain, wide: [52, 50], tall: [50, 50] },
  external: { label: 'Outside agent', sub: 'A2A, paid by x402', icon: Globe, wide: [52, 84], tall: [83, 50] },
  synth: { label: 'Synthesis', sub: 'merges results', icon: Merge, wide: [76, 50], tall: [50, 74] },
  answer: { label: 'Answer', sub: 'with proof CIDs', icon: CheckCheck, wide: [93, 50], tall: [50, 93] },
};

const phases: [NodeId, NodeId][][] = [
  [['goal', 'planner']],
  [['planner', 'research'], ['planner', 'analysis'], ['planner', 'external']],
  [['research', 'synth'], ['analysis', 'synth'], ['external', 'synth']],
  [['synth', 'answer']],
];

const allEdges = phases.flat();

const patterns: { icon: LucideIcon; name: string; body: string }[] = [
  { icon: GitFork, name: 'FanOut', body: 'Run independent sub-tasks in parallel and collect every result.' },
  { icon: Workflow, name: 'Pipeline', body: 'Run steps in order, each one refining the output of the last.' },
  { icon: Boxes, name: 'MapReduce', body: 'Map across many inputs in parallel, then reduce into one synthesis.' },
];

const facts = [
  { value: 'A2A', label: "The first DePIN project to implement Google's Agent-to-Agent protocol, to our knowledge" },
  { value: 'x402', label: 'Gasless USDC micropayments to outside agents, with a budget you set' },
  { value: '67%', label: 'Fewer deposits in a typical run, by reusing one session per model' },
];

function useIsNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return narrow;
}

function TaskGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const timer = setInterval(() => setPhase((p) => (p + 1) % phases.length), 1500);
    return () => clearInterval(timer);
  }, [isInView, reduceMotion]);

  const pos = (id: NodeId) => (narrow ? nodes[id].tall : nodes[id].wide);
  const activeEdges = phases[phase];
  const activeNodes = new Set(activeEdges.flat());

  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] md:aspect-[21/9] w-full overflow-hidden rounded-2xl border border-neutrals-border/60 bg-background/60 backdrop-blur"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {allEdges.map(([from, to]) => {
          const active = activeEdges.some(([a, b]) => a === from && b === to);
          const [x1, y1] = pos(from);
          const [x2, y2] = pos(to);
          return (
            <line
              key={`${from}-${to}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              vectorEffect="non-scaling-stroke"
              strokeWidth={active ? 2 : 1}
              stroke={active ? (to === 'external' || from === 'external' ? '#f59e0b' : '#ec4899') : 'rgba(167, 139, 250, 0.3)'}
              className={cn('transition-all duration-500', active && 'edge-flow')}
            />
          );
        })}
      </svg>

      {!reduceMotion &&
        activeEdges.map(([from, to]) => (
          <motion.span
            key={`${phase}-${from}-${to}`}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-light shadow-[0_0_12px_4px_rgba(236,72,153,0.6)]"
            initial={{ left: `${pos(from)[0]}%`, top: `${pos(from)[1]}%`, opacity: 0 }}
            animate={{
              left: [`${pos(from)[0]}%`, `${pos(to)[0]}%`],
              top: [`${pos(from)[1]}%`, `${pos(to)[1]}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          />
        ))}

      {(Object.keys(nodes) as NodeId[]).map((id) => {
        const node = nodes[id];
        const [x, y] = pos(id);
        const active = activeNodes.has(id);
        const external = id === 'external';
        return (
          <div
            key={id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-500"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className={cn(
                'flex w-[92px] flex-col items-center gap-1 rounded-xl border px-2 py-2 text-center transition-all duration-500 md:w-[124px] md:py-3',
                external ? 'border-dashed' : '',
                active
                  ? external
                    ? 'border-warning/80 bg-card shadow-[0_0_24px_rgba(245,158,11,0.35)]'
                    : 'border-secondary/70 bg-card shadow-[0_0_24px_rgba(236,72,153,0.35)]'
                  : 'border-neutrals-border/60 bg-card/80'
              )}
            >
              <node.icon className={cn('h-4 w-4 md:h-5 md:w-5', external ? 'text-warning' : active ? 'text-secondary-light' : 'text-primary-light')} />
              <span className="text-xs md:text-sm font-semibold leading-tight text-foreground">{node.label}</span>
              <span className="text-[10px] md:text-[11px] leading-tight text-neutrals-copy">{node.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Orchestration() {
  return (
    <section id="orchestration" className="py-20 px-4">
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <Network className="h-3.5 w-3.5" /> Multi-agent orchestration
              <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[10px] text-warning">Experimental</span>
            </>
          }
          title="Agents that hire agents"
          description="The orchestrator breaks a goal into a task graph, sends each step to the model that suits it, runs the steps in parallel across GPU hosts, and can delegate to outside agents over Google's Agent-to-Agent protocol, paying them per request in USDC."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <TaskGraph />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-3">
            {patterns.map((pattern, i) => (
              <motion.div
                key={pattern.name}
                className="rounded-xl border border-neutrals-border/50 bg-card/60 p-5 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <pattern.icon className="mb-3 h-5 w-5 text-primary-light" />
                <h3 className="font-semibold text-foreground">{pattern.name}</h3>
                <p className="mt-1 text-sm text-neutrals-copy leading-relaxed">{pattern.body}</p>
              </motion.div>
            ))}
          </div>

          <dl className="grid gap-4 sm:grid-cols-3">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.value}
                className="flex flex-col rounded-xl border border-primary/30 bg-primary-dark/20 p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              >
                <dt className="order-last mt-1 text-sm text-neutrals-copy leading-relaxed">{fact.label}</dt>
                <dd className="text-3xl font-extrabold text-foreground">{fact.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <p className="mx-auto max-w-4xl text-center text-sm text-neutrals-copy">
          <FlaskConical className="mr-1 inline h-4 w-4 text-warning" />
          A2A is still a release candidate (v1.0.0-rc), so the orchestrator is marked experimental.
          It is fully tested (351 tests) and will track the specification as it reaches 1.0.
        </p>
      </div>
    </section>
  );
}
