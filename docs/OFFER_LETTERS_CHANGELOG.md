# Offer Letters + Prisma changes (Jan 2026)

This document summarizes the uncommitted work added around Offer Letters and the related Prisma schema/migration.

## What changed

### Database (Prisma)

- Added `OfferLetter` model:
  - Fields: `id`, `userId`, `status`, `content`, `design?`, `styleId?`, timestamps
  - Index: `userId`
- Added `OfferStatus` enum: `DRAFT`, `FINALIZED`, `ARCHIVED`
- Migration also includes a few resume-related schema changes:
  - `resumes`: added layout/typography/config fields (`columnLayout`, `fontFamily`, `letterSpacing`, `lineHeight`, `margins`, `photoShape`, `sectionConfigs`, `showPhoto`, `titleAlign`)
  - `educations.isPresent`: relaxed/changed to text (nullable)

Relevant files:

- prisma/schema.prisma
- prisma/migrations/20260108184143_add_offer_letter_and_user_subscription/migration.sql

### App (Offer Letters)

- Added server actions for OfferLetter lifecycle:
  - Create draft
  - Save draft
  - Finalize draft
  - Archive (soft delete) offer letter
- Added Offer Letter editor route skeleton:
  - Loads/creates an OfferLetter record
  - Transforms DB row into a typed document
  - Basic state sync with URL params (`offerId`, optional `styleId`)

Relevant files:

- src/app/(main)/offer-letters/actions.ts
- src/app/(main)/offer-letters/editor/page.tsx
- src/app/(main)/offer-letters/editor/offerLetterEditor.tsx
- src/lib/offer-letter/\*
- src/types/offerLetter.ts

## How to run the migration

Local/dev:

```bash
npx prisma migrate dev
```

If you want to inspect SQL before applying:

```bash
npx prisma migrate dev --create-only
```

CI/Production:

```bash
npx prisma migrate deploy
```

## Notes / guardrails

- Offer letters are intended to be editable only while `status = DRAFT`.
- Your repo ignores env files via `.gitignore` (`.env*`). Avoid committing secrets; keep sample values in a separate `.env.example` if you need to share configuration.
