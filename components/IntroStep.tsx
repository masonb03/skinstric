'use client'

import Link from 'next/link';
import styles from '../styles/testing.module.css';
import { IoTriangle } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import TopSection from './TopSection';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IntroStepProps {
  direction: string;
  placeholder: string;
  nextRoute: string;
  field: 'name' | 'location';
  isLastStep?: boolean;
}

const IntroStep = ({ direction, placeholder, nextRoute, field, isLastStep }: IntroStepProps) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const validate = (val: string) => {
    if (!val.trim()) return 'This field cannot be empty';
    if (/\d/.test(val)) return 'No numbers allowed';
    if (!/^[a-zA-Z\s]+$/.test(val)) return 'No special characters allowed';
    return '';
  }

  const handleNext = async () => {
    if (status === 'loading') return;

    const err = validate(value);
    if (err) { setError(err); return; }

    localStorage.setItem(field, value);

    if (isLastStep) {
      setStatus('loading');

      const name = localStorage.getItem('name');
      const location = value;

      try {
        await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, location })
        });

        setTimeout(() => {
          setStatus('success');
        }, 2000);

      } catch (err) {
        setError('Something went wrong. Try again.');
        setStatus('idle');
      }

      return;
    }

    router.push(nextRoute);
  }

  return (
    <div className={styles.page}>
  <TopSection />

    <div className={`${styles['dotted__square--lg']}`}></div>
    <div className={`${styles['dotted__square--md']}`}></div>
    <div className={`${styles['dotted__square--sm']}`}></div>
  <div className={styles.intro__name}>
         {status === 'idle' && (
           <>
             <div className={styles.intro__directions}>{direction}</div>
             <input
               type="text"
               className={styles.intro__input}
               placeholder={placeholder}
               value={value}
               disabled={status === 'loading'}
               onChange={(e) => {
                 setValue(e.target.value);
                 setError('');
               }}
               onKeyDown={(e) => e.key === 'Enter' && handleNext()}
             />
             {error && <p className={styles.error}>{error}</p>}
           </>
         )}

         {status === 'loading' && (
          <div className={styles.loading}>
            <p>Processing Submission</p>

            <div className={styles.loading__dots}>
              <BsDot />
              <BsDot />
              <BsDot />
            </div>

            <div className={styles.spinner}></div>
          </div>
         )}

         {status === 'success' && (
           <div className={styles.success}>
             <h2 className={styles.success__title}>Thank you!</h2>
             <p className={styles.success__message}>Proceed for next step</p>
           </div>
         )}
  </div>
      {(status === 'idle' || status === 'success' || status === 'loading') && (
        <div className={styles.back__btn}>
          <Link href="/">
            <div className={styles.btn__shape}></div>
            <span className={styles['btn__inner--shape']}><IoTriangle /></span>
            <span className={styles['back__btn--caption']}>Back</span>
          </Link>
        </div>
      )}

      {status === 'success' && (
        <div className={styles.next__btn} onClick={() => router.push(nextRoute)}>
          <span className={styles['next__inner--shape']}><IoTriangle /></span>
          <span className={styles['next__btn--caption']}>Proceed</span>
          <div className={styles.btn__shape}></div>
        </div>
      )}
</div>
  );
}

export default IntroStep;