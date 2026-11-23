import Image from 'next/image';
import Link from 'next/link';
import { STONESTHRO_SITE_URL } from '@/lib/links';
import { cn } from '@/lib/utils';

// "Certified for StonesThro" partner badge supplied by StonesThro
// (docs/archive/StonesThro/images/Stonesthro Certified.png). Its black text and icon lines are
// recoloured white so it reads on our dark page, as in StonesThro's own white logo; the green
// and the see-through inside are unchanged.
const BADGE_WIDTH = 670;
const BADGE_HEIGHT = 246;

export function StonesThroCertifiedBadge({ width, className }: { width: number; className?: string }) {
  return (
    <Link
      href={STONESTHRO_SITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-block transition-opacity hover:opacity-80', className)}
    >
      <Image
        src="/images/partners/stonesthro-certified-partner.png"
        alt="Certified for StonesThro"
        width={width}
        height={Math.round((width * BADGE_HEIGHT) / BADGE_WIDTH)}
        unoptimized
        className="h-auto max-w-full"
      />
    </Link>
  );
}
