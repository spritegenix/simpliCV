import React from "react";
import type { OfferLetterTemplateProps } from "./types";

// ── Template imports ──────────────────────────────────────────────────────────
// Naming rule: import name = PascalCase of the template id.
//   id: "corporate-wave"  →  import CorporateWave from "./templates/CorporateWave"

import Default from "./templates/Default";
import CorporateWave, {
  CorporateWaveBackground,
} from "./templates/CorporateWave";

export { Default, CorporateWave };

/**
 * Central dispatch map  —  template id (DB slug) → React component.
 *
 * To register a new template:
 *   1. Build the component at  templates/{PascalCaseId}/index.tsx
 *   2. Import it above.
 *   3. Add one entry in this map  (key = template id from OfferLetterStyles.ts)
 *   4. Add one entry in offerLetterStyles[] in OfferLetterStyles.ts
 *   5. Place bg assets in  assets/offer-letter-styles/{template-id}/
 *   6. Place thumbnail in  assets/offer-letter-styles/thumbnails/{template-id}.png
 *   7. If the template has a full-page background, add an entry in offerLetterBgMap
 */
export const offerLetterTemplateMap: Record<
  string,
  React.ComponentType<OfferLetterTemplateProps>
> = {
  default: Default,
  "corporate-wave": CorporateWave,
};

/**
 * Background component map  —  template id → page-level background element.
 *
 * These are rendered directly inside .offer-page by the paginator,
 * BEFORE the padded/clipped content layer — so they fill the entire page.
 * Templates without a background are simply absent from this map.
 */
export const offerLetterBgMap: Record<string, React.ComponentType> = {
  "corporate-wave": CorporateWaveBackground,
};
