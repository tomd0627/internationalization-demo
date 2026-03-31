'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Calendar } from 'lucide-react';
import styles from './RtlDemo.module.css';

interface RtlDemoCardProps {
  labels: {
    toggleLabel: string;
    ltrLabel: string;
    rtlLabel: string;
    exampleHeading: string;
    exampleBody: string;
    exampleMeta: string;
    exampleButton: string;
  };
  initialDir: 'ltr' | 'rtl';
}

export function RtlDemoCard({ labels, initialDir }: RtlDemoCardProps) {
  const [dir, setDir] = useState<'ltr' | 'rtl'>(initialDir);
  const isRtl = dir === 'rtl';

  return (
    <div className={styles.demoWidget}>
      <div className={styles.demoControls} role="group" aria-label={labels.toggleLabel}>
        <button
          className={`${styles.toggleBtn} ${!isRtl ? styles.toggleActive : ''}`}
          onClick={() => setDir('ltr')}
          aria-pressed={!isRtl}
        >
          <ArrowRight size={14} aria-hidden="true" />
          {labels.ltrLabel}
        </button>
        <button
          className={`${styles.toggleBtn} ${isRtl ? styles.toggleActiveRtl : ''}`}
          onClick={() => setDir('rtl')}
          aria-pressed={isRtl}
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {labels.rtlLabel}
        </button>
      </div>

      <div dir={dir} className={styles.exampleCard} aria-live="polite" aria-label="Direction preview">
        <div className={styles.exampleHeader}>
          <div className={styles.exampleAvatar} aria-hidden="true">
            <User size={16} />
          </div>
          <div className={styles.exampleMeta}>
            <span className={styles.exampleAuthor}>Jane Smith</span>
            <span className={styles.exampleDate}>
              <Calendar size={12} aria-hidden="true" />
              {labels.exampleMeta}
            </span>
          </div>
        </div>

        <h4 className={styles.exampleTitle}>{labels.exampleHeading}</h4>
        <p className={styles.exampleBody}>{labels.exampleBody}</p>

        <button className={styles.exampleButton}>
          {labels.exampleButton}
          {isRtl ? (
            <ArrowLeft size={14} aria-hidden="true" />
          ) : (
            <ArrowRight size={14} aria-hidden="true" className="icon-directional" />
          )}
        </button>
      </div>
    </div>
  );
}
