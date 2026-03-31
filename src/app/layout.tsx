import { getLocale } from 'next-intl/server';
import { Outfit, Cairo, Frank_Ruhl_Libre, Fira_Code } from 'next/font/google';
import { isRtl, routing, type Locale } from '@/i18n/routing';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

// Runs before React hydration — sets data-theme to avoid flash of wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));}catch(e){}})();`;

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-frank-ruhl-libre',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

const fontClasses = [
  outfit.variable,
  cairo.variable,
  frankRuhlLibre.variable,
  firaCode.variable,
].join(' ');

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const typedLocale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return (
    <html lang={typedLocale} dir={isRtl(typedLocale) ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={fontClasses}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
