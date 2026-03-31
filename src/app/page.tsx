import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Fallback: next-intl middleware handles this redirect automatically,
// but this ensures / always resolves even without middleware.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
