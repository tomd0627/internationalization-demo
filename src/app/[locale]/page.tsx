import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { Hero } from '@/components/Hero';
import { FeatureCards } from '@/components/FeatureCards';
import { FormattingShowcase } from '@/components/FormattingShowcase';
import { RtlDemo } from '@/components/RtlDemo';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <>
      <Hero locale={typedLocale} />
      <FeatureCards locale={typedLocale} />
      <FormattingShowcase locale={typedLocale} />
      <RtlDemo locale={typedLocale} />
    </>
  );
}
