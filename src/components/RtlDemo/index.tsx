import { getTranslations } from 'next-intl/server';
import { Lightbulb } from 'lucide-react';
import { isRtl, type Locale } from '@/i18n/routing';
import { RtlDemoCard } from './RtlDemoCard';
import styles from './RtlDemo.module.css';

interface RtlDemoProps {
  locale: Locale;
}

export async function RtlDemo({ locale }: RtlDemoProps) {
  const t = await getTranslations({ locale, namespace: 'rtlDemo' });
  const rtl = isRtl(locale);

  const cardLabels = {
    toggleLabel: t('toggleLabel'),
    ltrLabel: t('ltrLabel'),
    rtlLabel: t('rtlLabel'),
    exampleHeading: t('exampleHeading'),
    exampleBody: t('exampleBody'),
    exampleMeta: t('exampleMeta'),
    exampleButton: t('exampleButton'),
  };

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="rtl-heading"
    >
      <div className="container">
        <header className={styles.header}>
          <h2 id="rtl-heading" className={styles.heading}>
            {t('heading')}
          </h2>
          <p className={styles.subheading}>{t('subheading')}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.codeBlock} aria-label="CSS logical properties example">
            <div className={styles.codeHeader}>
              <span className={styles.codeFilename}>card.module.css</span>
              <div className={styles.codeTrafficLights} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
            <pre className={styles.code}>
              <code>
                <span className={styles.codeSelector}>{'.card'}</span>{' '}
                <span className={styles.codePunct}>{'{'}</span>{'\n'}
                {'  '}
                <span className={styles.codeProp}>{'padding-inline'}</span>
                <span className={styles.codePunct}>{': '}</span>
                <span className={styles.codeVal}>{'1.5rem'}</span>
                <span className={styles.codePunct}>{';'}</span>
                {'  '}
                <span className={styles.codeComment}>
                  {'/* ≠ padding-left/right */'}
                </span>
                {'\n'}
                {'  '}
                <span className={styles.codeProp}>{'margin-block-end'}</span>
                <span className={styles.codePunct}>{': '}</span>
                <span className={styles.codeVal}>{'1rem'}</span>
                <span className={styles.codePunct}>{';'}</span>
                {'  '}
                <span className={styles.codeComment}>
                  {'/* ≠ margin-bottom */'}
                </span>
                {'\n'}
                {'  '}
                <span className={styles.codeProp}>{'border-inline-start'}</span>
                <span className={styles.codePunct}>{': '}</span>
                <span className={styles.codeVal}>
                  {'2px solid var(--color-accent)'}
                </span>
                <span className={styles.codePunct}>{';'}</span>
                {'  '}
                <span className={styles.codeComment}>
                  {'/* ≠ border-left */'}
                </span>
                {'\n'}
                {'  '}
                <span className={styles.codeProp}>{'text-align'}</span>
                <span className={styles.codePunct}>{': '}</span>
                <span className={styles.codeVal}>{'start'}</span>
                <span className={styles.codePunct}>{';'}</span>
                {'  '}
                <span className={styles.codeComment}>
                  {'/* ≠ text-align: left */'}
                </span>
                {'\n'}
                {'  '}
                <span className={styles.codeProp}>{'inset-inline-start'}</span>
                <span className={styles.codePunct}>{': '}</span>
                <span className={styles.codeVal}>{'0'}</span>
                <span className={styles.codePunct}>{';'}</span>
                {'  '}
                <span className={styles.codeComment}>{'/* ≠ left: 0 */'}</span>
                {'\n'}
                <span className={styles.codePunct}>{'}'}</span>
                {'\n\n'}
                <span className={styles.codeComment}>
                  {'/* No margin-left. No margin-right.'}
                  {'\n'}
                  {'   Direction is handled by the browser. */'}
                </span>
              </code>
            </pre>
          </div>

          <RtlDemoCard
            labels={cardLabels}
            initialDir={rtl ? 'rtl' : 'ltr'}
          />
        </div>

        <div className={styles.callout} role="note">
          <Lightbulb
            size={18}
            aria-hidden="true"
            className={styles.calloutIcon}
          />
          <p>{t('callout')}</p>
        </div>
      </div>
    </section>
  );
}
