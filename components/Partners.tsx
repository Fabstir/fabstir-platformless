'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Handshake } from 'lucide-react';
import { IonosPartnerBadge } from '@/components/IonosPartnerBadge';
import { SectionHeader } from '@/components/SectionHeader';
import { StonesThroLogo } from '@/components/StonesThroLogo';
import { IONOS_PARTNER_LISTING_URL, STONESTHRO_SITE_URL } from '@/lib/links';

// IONOS CLOUD Partner Program Style Guide v2 (2026-05-13): the standalone logo may only appear
// where the partnership is explained, must keep clear space (3/4 of its height left and right,
// 1/2 above and below), must be at least 12px tall on screen, and must not be recoloured or
// combined with our own design elements (each partner keeps its own card). "IONOS CLOUD" is
// always written in caps.
const IONOS_LOGO_HEIGHT = 40;

// The standalone logo needs IONOS's written approval (style guide: "record every approval in
// writing"); the portal partner badge does not. Show the badge until approval arrives, then set
// this to true to show the logo instead.
const IONOS_LOGO_APPROVED = false;

const linkClass =
  'inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors hover:text-secondary';

function PartnerCard({ logo, children }: { logo: ReactNode; children: ReactNode }) {
  return (
    <motion.div
      className="grid items-center gap-8 rounded-2xl border border-neutrals-border/40 bg-background/40 p-6 sm:p-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-center px-8 py-6">{logo}</div>
      <div className="space-y-4 text-base leading-relaxed text-neutrals-copy-light">{children}</div>
    </motion.div>
  );
}

export function Partners() {
  return (
    <section id="partners" className="py-20 px-4">
      <div className="container max-w-5xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <Handshake className="h-3.5 w-3.5" /> Partners
            </>
          }
          title="Partners in sovereign AI"
          description="Sovereign infrastructure partners, from European cloud to UK edge."
        />

        <div className="space-y-6">
          <PartnerCard
            logo={
              IONOS_LOGO_APPROVED ? (
                // Padding exceeds the style guide's minimum clear space; nothing else sits inside it.
                <Link
                  href="https://cloud.ionos.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/images/partners/ionos-cloud-logo-white.svg"
                    alt="IONOS CLOUD"
                    width={(912 / 120) * IONOS_LOGO_HEIGHT}
                    height={IONOS_LOGO_HEIGHT}
                    unoptimized
                    className="h-auto w-full max-w-[304px]"
                  />
                </Link>
              ) : (
                <IonosPartnerBadge width={200} />
              )
            }
          >
            <p className="text-lg font-semibold text-foreground">
              Silver partner in the IONOS CLOUD ISV Partner Program
            </p>
            {/* Both sentences are verbatim from the official IONOS CLOUD Boilerplate 2026. */}
            <p>
              IONOS CLOUD is a sovereign European cloud infrastructure provider serving businesses
              of all sizes and the public sector. With headquarters in Germany, all services are
              operated under European jurisdiction.
            </p>
            <p>
              As an ISV Partner, we are working with the IONOS CLOUD team to bring Platformless AI
              to IONOS CLOUD servers in confidential computing mode: private AI on sovereign
              European infrastructure, where hardware-signed proof replaces trust in the operator.
            </p>
            <Link href={IONOS_PARTNER_LISTING_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              See our listing in the IONOS CLOUD Partner Network
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </PartnerCard>

          <PartnerCard
            logo={<StonesThroLogo width={249} />}
          >
            <p className="text-lg font-semibold text-foreground">Certified StonesThro partner</p>
            <p>
              StonesThro is a UK-based sovereign neutral edge cloud provider, running compute close
              to where data is generated.
            </p>
            <p>
              Our semantic content search, content moderation and video transcoding run on
              StonesThro&apos;s micro-edge cloud.
            </p>
            <Link href={STONESTHRO_SITE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Visit StonesThro
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </PartnerCard>
        </div>

        <p className="text-center text-sm text-neutrals-copy">
          The network itself stays decentralised. Hosts are independent businesses, and no single
          cloud runs Platformless AI.
        </p>
      </div>
    </section>
  );
}
