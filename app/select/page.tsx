// app/select/page.tsx
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../../styles/select.module.css'
import { IoTriangle } from 'react-icons/io5'
import { useState } from 'react'

const categories = [
  { label: 'DEMOGRAPHICS', route: '/summary', enabled: true },
  { label: 'COSMETIC CONCERNS', route: null },
  { label: 'SKIN TYPE DETAILS', route: null },
  { label: 'WEATHER', route: null },
]

const Page = () => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.page}>

      {/* Top left text */}
      <div className={styles.header}>
        <h1 className={styles.header__title}>A.I. ANALYSIS</h1>
        <p className={styles.header__sub}>A.I. HAS ESTIMATED THE FOLLOWING.</p>
        <p className={styles.header__sub}>FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </div>

      {/* Diamond grid */}
        <div className={`${styles['diamond__outer']} ${isHovered ? styles['diamond__outer--visible'] : ''}`}>
          <div className={styles.diamond__grid}>
            {categories.map((cat) => (
              <div
                key={cat.label}
                className={styles.diamond__cell}
                style={{ cursor: cat.route ? 'pointer' : 'not-allowed' }}
                onClick={() => cat.route && router.push(cat.route)}
                onMouseEnter={() => cat.route && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className={styles.diamond__content}>
                  <span className={`${styles['diamond__label']} ${!cat.route ? styles['diamond__label--disabled'] : ''}`}>
                    {cat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Back button */}
      <div className={styles.back__btn}>
        <Link href="/result">
          <div className={styles.btn__shape}></div>
          <span className={styles['btn__inner--shape']}><IoTriangle /></span>
          <span className={styles['back__btn--caption']}>Back</span>
        </Link>
      </div>

      {/* Get Summary button */}
      <div className={styles.next__btn} onClick={() => router.push('/summary')}>
        <span className={styles['next__btn--caption']}>Get Summary</span>
        <div className={styles.btn__shape}></div>
        <span className={styles['btn__inner--shape--right']}><IoTriangle /></span>
      </div>
    </div>
  )
}

export default Page