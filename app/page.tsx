'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Showreel } from '@/components/Showreel';
import { ValueProposition } from '@/components/ValueProposition';
import { Capabilities } from '@/components/Capabilities';
import { SessionFlow } from '@/components/SessionFlow';
import { VideoGeneration } from '@/components/VideoGeneration';
import { AgenticAI } from '@/components/AgenticAI';
import { Orchestration } from '@/components/Orchestration';
import { Training } from '@/components/Training';
import { Streaming } from '@/components/Streaming';
import { Security } from '@/components/Security';
import { Hosts } from '@/components/Hosts';
import { FAQ } from '@/components/FAQ';
import { Architecture } from '@/components/Architecture';
import { Roadmap } from '@/components/Roadmap';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { WaitlistModal } from '@/components/WaitlistModal';

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const openWaitlist = () => setIsWaitlistOpen(true);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero onJoinWaitlist={openWaitlist} />
      <Showreel />
      <ValueProposition />
      <Capabilities />
      <SessionFlow />
      <VideoGeneration />
      <AgenticAI />
      <Orchestration />
      <Training />
      <Streaming />
      <Security />
      <Hosts onJoinWaitlist={openWaitlist} />
      <Architecture />
      <Roadmap />
      <FAQ />
      <FinalCTA onJoinWaitlist={openWaitlist} />
      <Footer />
      <WaitlistModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </main>
  );
}
