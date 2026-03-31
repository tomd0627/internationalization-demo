'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { isRtl, type Locale } from '@/i18n/routing';

export function DirSync() {
  const params = useParams();
  const locale = params.locale as Locale;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
