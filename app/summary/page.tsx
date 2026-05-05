'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/summary.module.css'
import Link from 'next/link'
import { IoTriangle } from 'react-icons/io5'

type CategoryKey = 'race' | 'age' | 'gender'

interface DemographicData {
  race: Record<string, number>
  age: Record<string, number>
  gender: Record<string, number>
}

const Page = () => {
  const router = useRouter()
  const [rawData, setRawData] = useState<DemographicData | null>(() => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('demographicData')
  return stored ? JSON.parse(stored) : null
})
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('race')
const [selected, setSelected] = useState<Record<CategoryKey, string>>(() => {
  if (typeof window === 'undefined') return { race: '', age: '', gender: '' }
  const stored = localStorage.getItem('demographicData')
  if (!stored) return { race: '', age: '', gender: '' }
  const parsed = JSON.parse(stored)
  const getTop = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])[0][0]
  return {
    race: getTop(parsed.race),
    age: getTop(parsed.age),
    gender: getTop(parsed.gender)
  }
})

useEffect(() => {
  const stored = localStorage.getItem('demographicData')
  if (stored) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRawData(JSON.parse(stored))
  }
}, [])

    const defaultSelected = useMemo(() => {
    if (!rawData) return { race: '', age: '', gender: '' }
    const getTop = (obj: Record<string, number>) =>
        Object.entries(obj).sort((a, b) => b[1] - a[1])[0][0]
    return {
        race: getTop(rawData.race),
        age: getTop(rawData.age),
        gender: getTop(rawData.gender)
    }
    }, [rawData])

useEffect(() => {
  if (defaultSelected.race) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(defaultSelected)
  }
}, [defaultSelected.race])

  if (!rawData) return <div className={styles.loading}>Loading...</div>

  const currentEntries = Object.entries(rawData[activeCategory])
    .sort((a, b) => b[1] - a[1])

  const selectedValue = rawData[activeCategory][selected[activeCategory]] || 0
  const percentage = Math.round(selectedValue * 100)

  const categoryLabels: Record<CategoryKey, string> = {
    race: 'RACE',
    age: 'AGE',
    gender: 'SEX'
  }

  const handleSelectItem = (key: string) => {
    setSelected(prev => ({ ...prev, [activeCategory]: key }))
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <p className={styles.header__sub}>A.I. ANALYSIS</p>
        <h1 className={styles.header__title}>DEMOGRAPHICS</h1>
        <p className={styles.header__sub}>PREDICTED RACE & AGE</p>
      </div>

      {/* Main content */}
      <div className={styles.content}>

        {/* Left sidebar */}
        <div className={styles.sidebar}>
          {(Object.keys(categoryLabels) as CategoryKey[]).map((cat) => (
            <div
              key={cat}
              className={`${styles.sidebar__item} ${activeCategory === cat ? styles['sidebar__item--active'] : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <p className={styles.sidebar__value}>
                {selected[cat]
                  ? selected[cat].charAt(0).toUpperCase() + selected[cat].slice(1)
                  : ''}
              </p>
              <p className={styles.sidebar__label}>{categoryLabels[cat]}</p>
            </div>
          ))}
        </div>

        {/* Center donut chart */}
        <div className={styles.chart__section}>
          <p className={styles.chart__label}>
            {selected[activeCategory]?.charAt(0).toUpperCase() + selected[activeCategory]?.slice(1)}
            {activeCategory === 'age' ? ' y.o.' : ''}
          </p>
          <div className={styles.chart__wrapper}>
            <div
              className={styles.donut}
              style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
            >
              <span className={styles.donut__text}>{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Right scores list */}
        <div className={styles.scores}>
          <div className={styles.scores__header}>
            <span>{categoryLabels[activeCategory]}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          {currentEntries.map(([key, value]) => {
            const pct = (value * 100).toFixed(0)
            const isSelected = selected[activeCategory] === key
            return (
              <div
                key={key}
                className={`${styles.score__item} ${isSelected ? styles['score__item--active'] : ''}`}
                onClick={() => handleSelectItem(key)}
              >
                <div className={styles.score__left}>
                  <span className={styles.score__diamond}>◇</span>
                  <span className={styles.score__label}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
                <span className={styles.score__value}>{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom hint */}
      <p className={styles.hint}>If A.I. estimate is wrong, select the correct one.</p>

      {/* Back button */}
      <div className={styles.back__btn}>
        <Link href="/select">
          <div className={styles.btn__shape}></div>
          <span className={styles['back__inner--shape']}><IoTriangle /></span>
          <span className={styles['back__btn--caption']}>Back</span>
        </Link>
      </div>

      {/* Home button */}
      <div className={styles.next__btn} onClick={() => router.push('/')}>
        <span className={styles['next__inner--shape']}><IoTriangle /></span>
        <span className={styles['next__btn--caption']}>Home</span>
        <div className={styles.btn__shape__right}></div>
      </div>
    </div>
  )
}

export default Page