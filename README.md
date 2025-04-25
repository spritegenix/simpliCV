bun i prisma @prisma/client @vercel/blob openai @t3-oss/env-nextjs date-fns next-themes react-color react-to-print @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers stripe zustand @clerk/nextjs @clerk/themes --legacy-peer-deps

bun i -D @tailwindcss/typography @types/react-color prettier prettier-plugin-tailwindcss eslint-config-prettier --legacy-peer-deps

bun x shadcn@latest init

bun x shadcn add badge breadcrumb button card dialog dropdown-m enu form input label popover textarea toast

bunx prisma init

bunx prisma db push or bunx prisma migrate dev

bunx prisma studio

bun i @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-color @tiptap/extension-highlight @tiptap/extension-text-align

https://preview.themeforest.net/item/cvland-cv-builder-resume-maker-bootstrap-template/full_screen_preview/51328668?_ga=2.47471535.96159981.1743580716-714647057.1740657963&_gac=1.128634622.1741239477.CjwKCAiAiaC-BhBEEiwAjY99qFBh_1RKnX9O1cMsa8TRYHHu1Nx0ua9JrqIGW5vxSoxSwhlz-nvhKhoCU00QAvD_BwE



<!-- https://github.com/codinginflow/nextjs-15-ai-resume-builder  -->

<!-- prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices  -->


whitespace-pre-line - for textArea
break-inside-avoid


https://www.figma.com/design/0ZZNHmvaw3hlHTQmBQBQmR/Untitled-(Copy)?node-id=394-2


<!-- ---------JEST ----------- -->
bun install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest jest-environment-jsdom @types/jest ts-node @testing-library/react-hooks

bunx ts-jest config:init                                                                                                               

// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // if you use @/ alias for imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
<!-- ------------------- -->
./jest.setup.ts:
import '@testing-library/jest-dom'

package.json:
    "test": "jest",
    "test:watch": "jest --watch"

bun i -D eslint-plugin-jest-dom eslint-plugin-testing-library

.eslintrc.json:
  "extends": ["next/core-web-vitals", "next/typescript", "prettier", "plugin:testing-library/react", "plugin:jest-dom/recommended"],


__tests__\Wrappers.test.tsx:


<!-- https://www.canva.com/p/visualvibes/collections/AYrqwST6NIaoB4DkNOIKfw  -->


<!-- -------------------------- -->
pwa
