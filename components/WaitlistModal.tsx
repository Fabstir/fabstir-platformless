'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Turnstile } from '@marsidev/react-turnstile';

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type InterestType = 'user' | 'developer' | 'gpu-provider';

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<InterestType>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, interest, turnstileToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit waitlist form');
      }

      setIsSubmitted(true);

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setName('');
        setEmail('');
        setInterest('user');
        setTurnstileToken('');
        setIsSubmitted(false);
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      alert('Failed to submit. Please try again or contact support@fabstir.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-neutrals-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Join the Waitlist
          </DialogTitle>
          <DialogDescription className="text-neutrals-copy">
            Get early access to Platformless AI. We&apos;ll notify you when we launch in Q1 2025.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-success/20 border-2 border-success flex items-center justify-center">
              <svg
                className="w-8 h-8 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground">You&apos;re on the list!</h3>
            <p className="text-neutrals-copy">
              We&apos;ll be in touch soon with updates about the beta launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-primary-dark border-neutrals-border text-foreground placeholder:text-neutrals-copy"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-dark border-neutrals-border text-foreground placeholder:text-neutrals-copy"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">I&apos;m interested as:</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setInterest('user')}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    interest === 'user'
                      ? 'bg-primary border-primary text-primary-content font-semibold'
                      : 'bg-primary-dark border-neutrals-border text-neutrals-copy hover:border-primary-light'
                  }`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setInterest('developer')}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    interest === 'developer'
                      ? 'bg-primary border-primary text-primary-content font-semibold'
                      : 'bg-primary-dark border-neutrals-border text-neutrals-copy hover:border-primary-light'
                  }`}
                >
                  Developer
                </button>
                <button
                  type="button"
                  onClick={() => setInterest('gpu-provider')}
                  className={`px-4 py-3 rounded-lg border transition-all text-sm ${
                    interest === 'gpu-provider'
                      ? 'bg-primary border-primary text-primary-content font-semibold'
                      : 'bg-primary-dark border-neutrals-border text-neutrals-copy hover:border-primary-light'
                  }`}
                >
                  GPU Provider
                </button>
              </div>
            </div>

            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={setTurnstileToken}
              options={{
                theme: 'dark',
                size: 'invisible',
              }}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="w-full bg-primary hover:bg-primary-light text-primary-content font-semibold py-6 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get Early Access'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
