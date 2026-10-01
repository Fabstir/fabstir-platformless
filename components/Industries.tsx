'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Blocks,
  Building2,
  Clapperboard,
  FlaskConical,
  HeartPulse,
  Plane,
  Scale,
  TrendingUp,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { SpotlightCard } from '@/components/SpotlightCard';

interface Industry {
  icon: LucideIcon;
  name: string;
  stake: string;
  workloads: string[];
}

const industries: Industry[] = [
  {
    icon: TrendingUp,
    name: 'Financial services and insurance',
    stake: 'For a trading firm a leaked strategy is an existential risk, and client portfolios and claims carry GDPR, MiFID II and PCI DSS duties. Keep both away from any platform.',
    workloads: ['Algorithmic trading', 'Portfolio analysis', 'Underwriting and claims'],
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    stake: 'Patient data on third-party compute is normally a HIPAA and GDPR minefield. Decryption only inside an attested confidential VM changes the conversation with your DPO.',
    workloads: ['Diagnostics', 'Clinical decision support', 'Claims processing'],
  },
  {
    icon: Scale,
    name: 'Legal',
    stake: 'Privilege has to survive contact with the compute layer. No platform ever holds the contract, the data room or the brief.',
    workloads: ['Contract review', 'Due diligence', 'Case law research'],
  },
  {
    icon: FlaskConical,
    name: 'Pharma and biotech',
    stake: 'The data and the models are both trade secrets. Proprietary models ship encrypted, and their key is released only against hardware-signed proof of the machine.',
    workloads: ['Drug discovery', 'Clinical trial data', 'Proprietary models'],
  },
  {
    icon: Building2,
    name: 'Government and public sector',
    stake: 'Data sovereignty, the EU AI Act and tighter procurement rules all ask who can see the data. Answer with hardware attestation, not a platform policy.',
    workloads: ['Citizen services', 'Sovereign AI', 'Telecoms and critical infrastructure'],
  },
  {
    icon: Plane,
    name: 'Defence and aerospace',
    stake: 'Export-controlled and sensitive programmes are kept off commodity cloud AI. Attested hardware gives your accreditors evidence to examine, not a vendor promise.',
    workloads: ['Export-controlled data', 'Engineering IP', 'Secure R&D'],
  },
  {
    icon: Clapperboard,
    name: 'Media and entertainment',
    stake: 'Unreleased scripts, footage and characters are the business. Write, generate and edit from inside Blender without handing your IP to a platform.',
    workloads: ['Script development', 'Video generation', 'Unreleased IP'],
  },
  {
    icon: Blocks,
    name: 'Web3',
    stake: 'Audit unreleased smart contract code before launch, without first showing a platform the bugs an attacker would pay for.',
    workloads: ['Pre-launch audits', 'DeFi protocol review', 'Agentic coding'],
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative isolate py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow="Who it is for"
          title="Built for data you cannot send to the cloud"
          description="Some of the most valuable AI work never happens, because running it means handing the data to a provider that can read it. Platformless AI takes the platform out, and confidential-computing hosts give your security team hardware evidence to examine instead of a vendor promise."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
            >
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary-light">
                    <industry.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{industry.name}</h3>
                  <p className="text-sm leading-relaxed text-neutrals-copy">{industry.stake}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {industry.workloads.map((workload) => (
                      <li
                        key={workload}
                        className="rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 text-xs text-secondary-light"
                      >
                        {workload}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto max-w-4xl space-y-2 text-center text-sm leading-relaxed text-neutrals-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            Also for journalists and activists, for whom AI that no single company can switch off
            matters as much as AI that no platform can read.
          </p>
          <p>
            Platformless AI does not make a workload compliant on its own. It takes the platform
            out of your data flow and gives your assessors hardware-signed evidence to examine.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
