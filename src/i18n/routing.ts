import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'ar', 'he'] as const,
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];

export const RTL_LOCALES: readonly Locale[] = ['ar', 'he'];

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}
