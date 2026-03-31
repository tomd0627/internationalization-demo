import styles from './error.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>404 — Page Not Found</h2>
      <p className={styles.message}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
