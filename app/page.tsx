import styles from '../styles/home.module.css';
import { IoTriangle } from "react-icons/io5";
import Link from 'next/link';
import TopSection from '@/components/TopSection';

export default function Home() {
  return (
    <div>
      <TopSection />

      <main className={styles.main}>

        <div className={styles.left__side}>
          <div className={`${styles['left__side--shape']}`}></div>
                <Link href="" className={styles.btn}>
                  <div className={styles.btn__shape}></div>
                  <div className={styles.back__btn}> <IoTriangle /></div>
                  <span className={styles.btn__caption}>Discover A.I.</span>
                </Link>
        </div>
        <div className={styles.center}>
          <div className={styles.center__content}>
            <h1 className={styles.center__caption}>Sophisticated skincare</h1>
          </div>
        </div>
            <p className={styles.center__description}>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</p>
        <div className={styles.right__side}>
          <div className={`${styles['right__side--shape']}`}></div>
              <Link href="/testing" className={styles.btn}>
                  <span className={styles.btn__caption}>Take Test</span>
                  <div className={styles.btn__shape}></div>
                <div className={styles.next__btn}> <IoTriangle /> </div>
              </Link>
        </div>

      </main>
    </div>
  );
}