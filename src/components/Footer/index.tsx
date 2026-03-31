import { getTranslations } from 'next-intl/server';
import { GitBranch } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import styles from './Footer.module.css';

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <p className={styles.built}>{t('built')}</p>

        <div className={styles.meta}>
          <code className={styles.localeCode}>/{locale}</code>
        </div>
      </div>
    </footer>
  );
}
