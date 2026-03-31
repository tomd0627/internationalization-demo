'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper} role="alert">
      <h2 className={styles.heading}>Something went wrong</h2>
      <p className={styles.message}>
        An unexpected error occurred. Please try again.
      </p>
      <button className={styles.button} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
