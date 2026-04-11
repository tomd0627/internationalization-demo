import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import styles from './RtlComparison.module.css';

interface RtlComparisonProps {
  locale: Locale;
}

interface MiniLayoutProps {
  dir: 'ltr' | 'rtl';
  label: string;
}

function MiniLayout({ dir, label }: MiniLayoutProps) {
  const isRtl = dir === 'rtl';

  return (
    <div className={styles.panel}>
      <p className={styles.panelLabel}>{label}</p>

      {/* Visual schematic — forced dir so it renders independent of the page locale */}
      <div className={styles.miniPage} dir={dir} aria-hidden="true">
        {/* Nav bar: logo + links swap sides with dir */}
        <div className={styles.miniNav}>
          <div className={styles.miniLogo} />
          <div className={styles.miniNavLinks}>
            <div className={styles.miniNavPill} />
            <div className={styles.miniNavPill} />
            <div className={`${styles.miniNavPill} ${styles.miniNavPillActive}`} />
          </div>
        </div>

        {/* Content: border-inline-start, text-align: start, and directional button */}
        <div className={styles.miniContent}>
          <div className={styles.miniHeading} />
          <div className={styles.miniLine} />
          <div className={`${styles.miniLine} ${styles.miniLineMed}`} />
          <div className={`${styles.miniLine} ${styles.miniLineShort}`} />
          <div className={styles.miniBtn}>
            <span className={styles.miniBtnArrow}>{isRtl ? '←' : '→'}</span>
            <div className={styles.miniBtnBar} />
          </div>
        </div>
      </div>

      {/* Annotation chips — always LTR, these are CSS property names */}
      <ul className={styles.chips} aria-label="What changes in this layout">
        <li className={`${styles.chip} ${styles.chipNav}`}>nav direction</li>
        <li className={`${styles.chip} ${styles.chipBorder}`}>border-inline-start</li>
        <li className={`${styles.chip} ${styles.chipText}`}>text-align: start</li>
        <li className={`${styles.chip} ${styles.chipIcon}`}>icon flips</li>
      </ul>
    </div>
  );
}

export async function RtlComparison({ locale }: RtlComparisonProps) {
  const t = await getTranslations({ locale, namespace: 'rtlComparison' });

  return (
    <details className={styles.disclosure}>
      <summary className={styles.summary}>
        <ChevronRight size={15} className={styles.chevron} aria-hidden="true" />
        {t('disclosure')}
      </summary>
      <div className={styles.grid}>
        <MiniLayout dir="ltr" label={t('ltrLabel')} />
        <MiniLayout dir="rtl" label={t('rtlLabel')} />
      </div>
    </details>
  );
}
