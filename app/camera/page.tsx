"use client"
import React, { useEffect } from 'react'
import styles from "../../styles/camera.module.css"
import Image from 'next/image'
import camera from "../../public/camera-icon.webp"
import { useRouter } from 'next/navigation'

const Page = () => {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/camera/capture`);
    }, 3000)

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className={styles.page}>
        <div className={styles.square__background}>
          <div className={`${styles['dotted__square--lg']}`}></div>
          <div className={`${styles['dotted__square--md']}`}></div>
          <div className={`${styles['dotted__square--sm']}`}></div>
        </div>
        <div className={styles.center__content}>
            <div className={styles.img__wrapper}>
              <Image src={camera} alt="camera" />
              <div className={styles.loading__caption}>Setting up camera ...</div>
            </div>
        </div>
        <div className={styles.tips}>
          <div className={styles.tips__caption}>
            To get better results make sure to have
          </div>
          <div className={styles.tip__wrapper}>
            <div className={styles.tips__list}>
              <p>◇ NEUTRAL EXPRESSION</p>
              <p>◇ Frontal Pose</p>
              <p>◇ Adequate lighting</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Page