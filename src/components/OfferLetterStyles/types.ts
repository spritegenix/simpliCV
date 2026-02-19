import type { OfferLetterDocument } from "@/lib/offer-letter/offerLetterDocument";

/**
 * Props every offer-letter template component must accept.
 *
 * - `document`       — full document (content + design + styleId)
 * - `includePadding` — when false the template should NOT apply its own outer
 *                      padding; the paginator injects it via CSS positioning.
 *                      Background / decorative layers should always fill the
 *                      full page regardless of this flag.
 */
export interface OfferLetterTemplateProps {
  document: OfferLetterDocument;
  includePadding?: boolean;
}
