import { getTranslations } from 'next-intl/server';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { isRtl, type Locale } from '@/i18n/routing';
import styles from './Hero.module.css';

interface HeroProps {
  locale: Locale;
}

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tPills = await getTranslations({ locale, namespace: 'pills' });
  const tLocales = await getTranslations({ locale, namespace: 'localeNames' });
  const rtl = isRtl(locale);
  const DirectionIcon = rtl ? ArrowLeft : ArrowRight;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.badges}>
          <span className={styles.eyebrow}>{t('eyebrow')}</span>
          <span className={`${styles.dirBadge} ${rtl ? styles.dirBadgeRtl : styles.dirBadgeLtr}`}>
            <DirectionIcon
              size={13}
              aria-hidden="true"
              className={styles.dirIcon}
            />
            {t('direction')} — {t('directionLabel')}
          </span>
        </div>

        <h1 id="hero-heading" className={styles.heading}>
          {t('heading')}
        </h1>

        <p className={styles.subheading}>{t('subheading')}</p>

        <div className={styles.pills} role="list" aria-label="Key features">
          {(['locales', 'rtl', 'intl', 'logical'] as const).map((key) => (
            <span key={key} role="listitem" className={styles.pill}>
              {tPills(key)}
            </span>
          ))}
        </div>

        <div className={styles.localeRow} aria-label="Available locales">
          <span className={styles.viewingIn}>{t('viewingIn')}:</span>
          {(['en', 'fr', 'ar', 'he'] as const).map((loc) => (
            <span
              key={loc}
              lang={loc}
              className={`${styles.localeName} ${loc === locale ? styles.localeNameActive : ''}`}
              aria-current={loc === locale ? 'true' : undefined}
            >
              {tLocales(loc)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
