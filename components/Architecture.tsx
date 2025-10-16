'use client';

import Image from 'next/image';

export function Architecture() {
  return (
    <section className="py-16 px-4 bg-primary-dark/30">
      <div className="container max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How Platformless AI Works
          </h2>
          <p className="text-lg text-neutrals-copy max-w-3xl mx-auto">
            A decentralized architecture powered by smart contracts, cryptographic proofs, and peer-to-peer networking
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-background/50 backdrop-blur border border-neutrals-border rounded-lg overflow-hidden hover:border-primary-light/50 transition-colors p-4 md:p-8">
            <Image
              src="/Fabstir LLM Marketplace Architecture 20250815b.png"
              alt="Platformless AI Architecture Diagram - showing the flow from user request through GPU processing to settlement"
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Key Technologies */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-background/50 border border-primary/30 hover:border-primary/50 transition-colors text-center">
              <div className="font-semibold text-primary-content mb-1">Base L2</div>
              <div className="text-neutrals-copy text-xs">Blockchain</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-primary/30 hover:border-primary/50 transition-colors text-center">
              <div className="font-semibold text-primary-content mb-1">STARK Proofs</div>
              <div className="text-neutrals-copy text-xs">Risc0 zkVM</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-primary/30 hover:border-primary/50 transition-colors text-center">
              <div className="font-semibold text-primary-content mb-1">S5 Storage</div>
              <div className="text-neutrals-copy text-xs">Decentralized</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-primary/30 hover:border-primary/50 transition-colors text-center">
              <div className="font-semibold text-primary-content mb-1">E2E Encryption</div>
              <div className="text-neutrals-copy text-xs">XChaCha20</div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-neutrals-copy">
          Open source • Verifiable • Trustless
        </p>
      </div>
    </section>
  );
}
