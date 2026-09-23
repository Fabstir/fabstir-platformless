'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Lock,
  Layers,
  KeyRound,
  Calculator,
  ShieldCheck,
  FileLock2,
  Coins,
  Film,
} from 'lucide-react';

const steps = [
  {
    icon: Lock,
    title: '1. Encrypt & upload',
    body: 'Your dataset is sharded and each shard encrypted under its own fresh key on your device, then uploaded to decentralised S5 storage. The pointer is the authorisation, and the storage network never holds a key.',
  },
  {
    icon: Layers,
    title: '2. Train in slices',
    body: 'The host verifies every shard against its manifest hash, re-counts your tokens and scans the content before a single GPU cycle is spent. It then trains in slices, delivering each encrypted checkpoint to you before it claims payment on-chain.',
  },
  {
    icon: KeyRound,
    title: '3. Decrypt your adapter',
    body: 'The finished LoRA adapter comes back sharded and encrypted, its manifest hash bound into the final on-chain attestation. You alone hold the keys. Attach it to a chat session and the model answers in your voice, on your domain.',
  },
];

const features = [
  {
    icon: Coins,
    title: 'Pay per slice, not per job',
    body: 'A run that dies halfway bills only for the slices that finished. Cancel and you are billed the same way. A job rejected before any GPU work settles to zero and frees your deposit.',
  },
  {
    icon: Calculator,
    title: 'Counting you can check',
    body: 'Your client and the host count tokens in two languages and must agree exactly, pinned by a frozen fixture generated from the exact tokenizer bytes the template names. A false declaration is rejected instead of quietly resizing your escrow.',
  },
  {
    icon: ShieldCheck,
    title: 'Session-isolated serve-back',
    body: 'An adapter is staged private to one session, applied only to the requests in that session, and removed when it ends. It is never visible to another session on the same base model, and its key is minted host-side, never taken from the wire.',
  },
  {
    icon: FileLock2,
    title: 'Told when it fails',
    body: 'If the adapter cannot be staged, the chat says so and names the base model it is answering from. You never silently pay for a fine-tune you are not getting.',
  },
];

export function Training() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="fine-tuning" ref={ref} className="py-16 px-4 bg-primary-dark/20">
      <div className="container max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-secondary/20 text-secondary-light border border-secondary/40">
            New
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight bg-gradient-to-r from-primary-light via-secondary to-primary bg-clip-text text-transparent pb-[0.12em]">
            Private Fine-Tuning
          </h2>
          <p className="text-lg text-neutrals-copy-light max-w-4xl mx-auto">
            Every other capability here <em>consumes</em> a model. Fine-tuning{' '}
            <em>produces</em> one. Train a LoRA adapter on your own encrypted
            dataset (support transcripts, a house style, a proprietary domain)
            on a rented GPU you don&apos;t own, and walk away with a model only you
            can decrypt.
          </p>
        </motion.div>

        {/* Three-step flow */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
            >
              <Card className="p-6 h-full bg-card/80 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <step.icon className="h-8 w-8 text-primary-light mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutrals-copy-light leading-relaxed">
                  {step.body}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="p-6 h-full bg-background/50 backdrop-blur border-neutrals-border hover:border-secondary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <feature.icon className="h-6 w-6 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary-content mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutrals-copy leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footnotes: no new contracts, video LoRA, honest status */}
        <motion.div
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="p-6 bg-background/50 backdrop-blur border-success/30">
            <div className="flex items-start gap-4">
              <Film className="h-6 w-6 text-success shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary-content mb-1">
                  Zero new smart contracts
                </h3>
                <p className="text-sm text-neutrals-copy leading-relaxed">
                  Fine-tuning rides the same escrow, per-slice proofs, dispute
                  window and 90/10 split as inference. It is just a session with
                  its own registered model id. Because a slice is a token budget
                  rather than anything language-specific, video LoRA training sits
                  on the identical rails.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-background/50 backdrop-blur border-warning/30">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-warning shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary-content mb-1">
                  Where the trust boundary sits
                </h3>
                <p className="text-sm text-neutrals-copy leading-relaxed">
                  Your corpus is encrypted in transit and at rest, staged files are
                  wiped on every exit path, and the adapter is re-encrypted before
                  it leaves. But the host must decrypt your dataset to train on it.
                  Confidential computing is the route that closes that window,
                  rather than something already in place.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
