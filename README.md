# Internationalization (i18n) Demo

A portfolio demo showcasing real-world internationalization in Next.js — RTL layout, locale-aware routing, and native `Intl` formatting across four locales.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://typescriptlang.org)
[![next-intl](https://img.shields.io/badge/next--intl-4-orange)](https://next-intl-docs.vercel.app)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify)](https://i18n-demo.netlify.app)

## What this demonstrates

| Feature | Detail |
|---|---|
| **RTL Layout** | Full right-to-left support for Arabic and Hebrew using CSS logical properties — no duplicated CSS, no `margin-left` anywhere in the codebase |
| **Intl Formatting** | Dates, numbers, and currency formatted per locale via the native `Intl` API (no third-party library) |
| **Locale Routing** | Locale-aware URLs (`/en`, `/fr`, `/ar`, `/he`) via next-intl middleware with Accept-Language detection |
| **CSS Logical Properties** | `padding-inline`, `margin-block-end`, `border-inline-start`, `text-align: start` throughout |
| **Font Strategy** | Per-locale fonts via `:lang()` CSS selectors — Outfit (Latin), Cairo (Arabic), Frank Ruhl Libre (Hebrew) |

## Locales

| Code | Language | Direction | Currency |
|---|---|---|---|
| `en` | English | LTR → | USD |
| `fr` | Français | LTR → | EUR |
| `ar` | العربية | ← RTL | SAR |
| `he` | עברית | ← RTL | ILS |

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript strict)
- **i18n**: [next-intl](https://next-intl-docs.vercel.app) — App Router-native, zero extra client JS
- **Icons**: [Lucide React](https://lucide.dev)
- **Styling**: Vanilla CSS with custom properties — no utility framework, intentional for demonstrating logical properties
- **Deployment**: Netlify (free tier)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` (or your preferred locale via Accept-Language).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Architecture

```
src/
  app/[locale]/       # locale-aware App Router segment
    layout.tsx        # sets <html lang dir>, loads fonts, generateMetadata
    page.tsx          # composes all demo sections
    loading.tsx       # skeleton loader
    error.tsx         # error boundary (client component)
  components/
    NavBar/           # fixed header with LocaleSwitcher
    LocaleSwitcher/   # pill-style locale toggle (client component)
    Hero/             # headline + direction badge + locale row
    FeatureCards/     # 3-column feature grid
    FormattingShowcase/ # Intl API comparison table (all 4 locales)
    RtlDemo/          # CSS logical properties code + live toggle card
    RtlComparison/    # collapsible side-by-side LTR vs RTL layout schematic
    Footer/
  i18n/
    routing.ts        # defineRouting — locale list, default
    request.ts        # getRequestConfig — server-side message loading
    navigation.ts     # createNavigation — typed Link, useRouter, usePathname
  messages/
    en.json  fr.json  ar.json  he.json
  styles/
    globals.css       # CSS custom properties, reset, base
middleware.ts         # locale detection + redirect
```

### How RTL works

The `[locale]/layout.tsx` reads the locale and sets `dir` on the `<html>` element:

```tsx
const RTL_LOCALES = ['ar', 'he'];
<html lang={locale} dir={RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'}>
```

Every CSS rule in the project uses logical properties so the browser handles mirroring automatically:

```css
.card {
  padding-inline: 1.5rem;          /* not padding-left/right */
  border-inline-start: 2px solid;  /* not border-left */
  text-align: start;               /* not text-align: left */
}
```

### How locale routing works

`middleware.ts` uses `createMiddleware(routing)` to:
1. Detect the user's preferred locale via the `Accept-Language` header
2. Redirect `/` → `/en` (or preferred locale)
3. Serve locale-prefixed routes: `/en`, `/fr`, `/ar`, `/he`

### How formatting works

All date, number, and currency formatting uses the native `Intl` API — no third-party library:

```ts
new Intl.DateTimeFormat('ar', { dateStyle: 'long' }).format(date)
// → "١٥ يناير ٢٠٢٤"

new Intl.NumberFormat('fr').format(1234567.89)
// → "1 234 567,89"

new Intl.NumberFormat('he', { style: 'currency', currency: 'ILS' }).format(9999.99)
// → "‏9,999.99 ₪"
```

## Deployment (Netlify)

`netlify.toml` is pre-configured. Connect the repository in Netlify — no additional settings required.

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```
