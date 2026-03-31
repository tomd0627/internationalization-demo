import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://i18n-demo.netlify.app'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc}`])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const messages = await getMessages();
  const t = await getTranslations({ locale: typedLocale, namespace: 'skip' });

  return (
    <NextIntlClientProvider messages={messages}>
      <a href="#main-content" className="skip-nav">
        {t('toContent')}
      </a>
      <NavBar locale={typedLocale} />
      <main id="main-content">{children}</main>
      <Footer locale={typedLocale} />
    </NextIntlClientProvider>
  );
}
