'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ValueProposition } from '@/components/ValueProposition';
import { FAQ } from '@/components/FAQ';
import { Architecture } from '@/components/Architecture';
import { Footer } from '@/components/Footer';
import { WaitlistModal } from '@/components/WaitlistModal';

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero onJoinWaitlist={() => setIsWaitlistOpen(true)} />
      <ValueProposition />
      <FAQ />
      <Architecture />
      <Footer />
      <WaitlistModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </main>
  );
}
