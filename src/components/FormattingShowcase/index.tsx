import { getTranslations } from 'next-intl/server';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { routing, RTL_LOCALES, type Locale } from '@/i18n/routing';
import styles from './FormattingShowcase.module.css';

interface FormattingShowcaseProps {
  locale: Locale;
}

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  he: 'עברית',
};

const DEMO_CURRENCY: Record<string, string> = {
  en: 'USD',
  fr: 'EUR',
  ar: 'SAR',
  he: 'ILS',
};

const DEMO_DATE = new Date(2024, 0, 15);
const DEMO_NUMBER = 1_234_567.89;
const DEMO_CURRENCY_AMOUNT = 9_999.99;

export async function FormattingShowcase({ locale }: FormattingShowcaseProps) {
  const t = await getTranslations({ locale, namespace: 'showcase' });

  const rows = routing.locales.map((loc) => {
    const rtl = RTL_LOCALES.includes(loc);
    return {
      code: loc,
      name: LOCALE_NAMES[loc],
      date: new Intl.DateTimeFormat(loc, { dateStyle: 'long' }).format(DEMO_DATE),
      number: new Intl.NumberFormat(loc).format(DEMO_NUMBER),
      currency: new Intl.NumberFormat(loc, {
        style: 'currency',
        currency: DEMO_CURRENCY[loc],
      }).format(DEMO_CURRENCY_AMOUNT),
      isRtl: rtl,
    };
  });

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="showcase-heading"
    >
      <div className="container">
        <header className={styles.header}>
          <h2 id="showcase-heading" className={styles.heading}>
            {t('heading')}
          </h2>
          <p className={styles.subheading}>{t('subheading')}</p>
        </header>

        <div className={styles.tableWrapper} role="region" aria-label={t('heading')} tabIndex={0}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t('locale')}</th>
                <th scope="col">{t('date')}</th>
                <th scope="col">{t('number')}</th>
                <th scope="col">{t('currency')}</th>
                <th scope="col">{t('direction')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.code} className={row.isRtl ? styles.rowRtl : ''}>
                  <td className={styles.localeCell}>
                    <code className={styles.localeCode}>{row.code}</code>
                    <span lang={row.code} className={styles.localeName}>
                      {row.name}
                    </span>
                  </td>
                  <td lang={row.code} dir={row.isRtl ? 'rtl' : 'ltr'}>
                    {row.date}
                  </td>
                  <td
                    lang={row.code}
                    dir={row.isRtl ? 'rtl' : 'ltr'}
                    className={styles.numericCell}
                  >
                    {row.number}
                  </td>
                  <td
                    lang={row.code}
                    dir={row.isRtl ? 'rtl' : 'ltr'}
                    className={styles.numericCell}
                  >
                    {row.currency}
                  </td>
                  <td>
                    <span
                      className={`${styles.dirBadge} ${row.isRtl ? styles.rtlBadge : styles.ltrBadge}`}
                    >
                      {row.isRtl ? (
                        <ArrowLeft size={12} aria-hidden="true" />
                      ) : (
                        <ArrowRight size={12} aria-hidden="true" />
                      )}
                      {row.isRtl ? t('rtl') : t('ltr')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
