// ── Offer letter style assets ─────────────────────────────────────────────────
// This file is the single import point for all offer-letter thumbnails and
// background images. Add an entry here whenever a new template is created.
//
// Asset placement rules:
//   Thumbnail   →  thumbnails/{template-id}.png
//   Background  →  {template-id}/bg.png  (or .svg / .webp)

// ── Thumbnails ────────────────────────────────────────────────────────────────
import corporateWaveThumbnail from "./template-thumbnails/corporate-wave.png";

// ── Background images ─────────────────────────────────────────────────────────
import corporateWaveBg from "./corporate-wave/bg.png";

export { corporateWaveThumbnail, corporateWaveBg };
