import { getTranslations } from 'next-intl/server';
import { Globe } from 'lucide-react';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import styles from './NavBar.module.css';

interface NavBarProps {
  locale: string;
}

export async function NavBar({ locale }: NavBarProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        <div className={styles.logo}>
          <Globe size={20} aria-hidden="true" strokeWidth={1.75} />
          <span>{t('logo')}</span>
        </div>

        <div className={styles.controls}>
          <ThemeToggle label={t('toggleTheme')} />
          <LocaleSwitcher label={t('switchLocale')} />
        </div>
      </div>
    </header>
  );
}
