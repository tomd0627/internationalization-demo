'use client';

import { useParams, usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import styles from './LocaleSwitcher.module.css';

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'عر',
  he: 'עב',
};

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  he: 'עברית',
};

interface LocaleSwitcherProps {
  label: string;
}

export function LocaleSwitcher({ label }: LocaleSwitcherProps) {
  const params = useParams();
  const currentLocale = params.locale as string;
  const fullPathname = usePathname();
  // Strip the locale prefix using params and pathname from the same Next.js router state —
  // they update atomically, unlike useLocale() which comes from a separate React context
  // that lags behind after client-side layout reuse.
  const pathname = fullPathname.replace(new RegExp(`^/${currentLocale}`), '') || '/';

  return (
    <nav aria-label={label} className={styles.nav}>
      <div role="list" className={styles.group}>
        {routing.locales.map((locale) => (
          <div key={locale} role="listitem">
            <Link
              href={pathname}
              locale={locale}
              lang={locale}
              className={`${styles.link} ${locale === currentLocale ? styles.active : ''}`}
              aria-label={`${LOCALE_NAMES[locale]}${locale === currentLocale ? ' (current)' : ''}`}
              aria-current={locale === currentLocale ? 'page' : undefined}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
