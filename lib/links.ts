/** Home page of the Blender extension's own site. Link here directly, not through the /blender redirect. */
export const BLENDER_SITE_URL = 'https://timeline.platformlessai.org/';

/** Sign-up page on the Blender extension's site. */
export const BLENDER_SIGN_UP_URL = `${BLENDER_SITE_URL}sign-up`;

/** Our public listing in the IONOS CLOUD Partner Network. */
export const IONOS_PARTNER_LISTING_URL = 'https://cloud.ionos.co.uk/partner-network/partner/inspira.ltd';

/**
 * Official partner badge snippet from the IONOS CLOUD Partner Portal ("Display partner badge").
 * IONOS hosts the image, so it updates with our partner level and disappears if the listing is
 * deactivated. Its use needs no further approval.
 *
 * Variant: normal_blue ("Default"), chosen over the white "Alternative", which looked too bright on
 * our dark page. IONOS serves only the variant last saved in the portal (select it, then click
 * "generate code"); the other variant's URL returns 403. Keep this URL and the portal in step.
 */
export const IONOS_PARTNER_BADGE_SRC =
  'https://images-1.partnerportal.cloud.ionos.co.uk/items/837515a7-9781-4be0-abc5-b8156d31e2ea/profiles/d881ce81-caea-4bb8-bb30-320bb957d1be/badges/normal_blue';
export const IONOS_PARTNER_BADGE_HREF = `${IONOS_PARTNER_LISTING_URL}?origin=PartnerBadge`;

/** StonesThro, our UK sovereign edge cloud partner. */
export const STONESTHRO_SITE_URL = 'https://www.stonesthro.co.uk/';
