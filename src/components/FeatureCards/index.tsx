import { getTranslations } from 'next-intl/server';
import { AlignRight, Calendar, Globe } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import styles from './FeatureCards.module.css';

interface FeatureCardsProps {
  locale: Locale;
}

const ICONS = {
  rtl: AlignRight,
  formatting: Calendar,
  routing: Globe,
} as const;

export async function FeatureCards({ locale }: FeatureCardsProps) {
  const t = await getTranslations({ locale, namespace: 'features' });

  const features = (['rtl', 'formatting', 'routing'] as const).map((key) => ({
    key,
    Icon: ICONS[key],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }));

  return (
    <section className={`section ${styles.section}`} aria-labelledby="features-heading">
      <div className="container">
        <h2 id="features-heading" className={styles.heading}>
          {t('heading')}
        </h2>

        <div className={styles.grid} role="list">
          {features.map(({ key, Icon, title, description }) => (
            <article key={key} role="listitem" className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
