import Image from 'next/image';
import Link from 'next/link';
import { STONESTHRO_SITE_URL } from '@/lib/links';
import { cn } from '@/lib/utils';

// Official StonesThro white logo for dark backgrounds, supplied by StonesThro as SVG
// (StonesThro_White_TM.svg). Use as-is: no recolouring or edits.
const LOGO_WIDTH = 249;
const LOGO_HEIGHT = 59;

export function StonesThroLogo({ width, className }: { width: number; className?: string }) {
  return (
    <Link
      href={STONESTHRO_SITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-block transition-opacity hover:opacity-80', className)}
    >
      <Image
        src="/images/partners/stonesthro-logo-white.svg"
        alt="StonesThro"
        width={width}
        height={Math.round((width * LOGO_HEIGHT) / LOGO_WIDTH)}
        unoptimized
        className="h-auto max-w-full"
      />
    </Link>
  );
}
