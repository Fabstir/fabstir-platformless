import { IONOS_PARTNER_BADGE_HREF, IONOS_PARTNER_BADGE_SRC } from '@/lib/links';
import { cn } from '@/lib/utils';

interface IonosPartnerBadgeProps {
  /** Rendered width in px; height follows the badge's 166x81 aspect ratio. */
  width: number;
  className?: string;
}

/** The IONOS CLOUD Partner Portal badge snippet, kept as IONOS supplies it (link, nofollow, image). */
export function IonosPartnerBadge({ width, className }: IonosPartnerBadgeProps) {
  return (
    <a
      href={IONOS_PARTNER_BADGE_HREF}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={cn('inline-block transition-opacity hover:opacity-80', className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote badge served by IONOS as-is */}
      <img
        src={IONOS_PARTNER_BADGE_SRC}
        alt="IONOS CLOUD - Official Partner"
        width={width}
        height={Math.round((width * 81) / 166)}
      />
    </a>
  );
}
