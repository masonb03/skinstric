"use client"
import { IoTriangle } from 'react-icons/io5'
import styles from "../../styles/result.module.css"
import Image from 'next/image'
import gallery from "../../public/gallery-icon.webp"
import camera from "../../public/camera-icon.webp"
import TopSection from '@/components/TopSection'
import Link from 'next/link'
import { useState } from 'react'
import UploadGallery from '@/components/UploadGallery'
import { useRouter } from 'next/navigation'
import { BsDot } from 'react-icons/bs'

const Page = () => {

    const [showAccessBox, setShowAccessBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    
    const handleImageSelect = async (base64: string, preview: string) => {
        setLoading(true);
        try {
            const res = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ image: base64 })
            });

            const data = await res.json();

            localStorage.setItem('demographricData', JSON.stringify(data.data));
            localStorage.setItem('previewImage', preview);

            setTimeout(() => {
                router.push('/select')
            }, 3000);

        } catch(err) {
            console.error('API error', err);
            setLoading(false);
        }
    };

  return (
    <>
    {loading && (
        <div className={styles.loading__overlay}>
            <div className={styles.square__background}>
            <div className={`${styles['dotted__square--lg']}`}></div>
            <div className={`${styles['dotted__square--md']}`}></div>
            <div className={`${styles['dotted__square--sm']}`}></div>
            </div>
            <p className={styles.loading__text}>Preparing your analysis...</p>
            <div className={styles.loading__dots}>
              <BsDot />
              <BsDot />
              <BsDot />
            </div>
        </div>
        )}
         <div className={styles.sections}>
            <div className={styles.sub__section}>
                <div className={styles.square__background}>
                    <div className={`${styles['dotted__square--lg']}`}></div>
                    <div className={`${styles['dotted__square--md']}`}></div>
                    <div className={`${styles['dotted__square--sm']}`}></div>
                </div>
                <button className={styles.btn} onClick={() => setShowAccessBox(true)}>
                    <Image src={camera} alt="" className={styles.section__icon} />
                </button>
                <div className={`${styles["scan__section--caption"]}`}>
                    Allow A.I. to scan your face
                </div>
                <div className={styles.camera__line}></div>
            </div>
            {showAccessBox && (
                <div className={styles.access}>
                    <h2 className={styles.access__caption}>Allow A.i. to access your camera</h2>
                    <div className={styles.split}></div>
                    <div className={styles.options}>
                        <button className={styles.deny} onClick={() => setShowAccessBox(false)}>Deny</button>
                        <Link href="/camera" className={styles.allow}>Allow</Link>
                    </div>
                </div>
            )}
            <div className={styles.sub__section}>
                <div className={styles['dotted__square--lg']}></div>
                <div className={styles['dotted__square--md']}></div>
                <div className={styles['dotted__square--sm']}></div>
                    <UploadGallery onImageSelect={handleImageSelect} />
                    <div className={styles["gallery__section--caption"]}>
                        Allow A.I. access gallery
                    </div>
                    <div className={styles.gallery__line}></div>
            </div>
        </div>
        <div className={styles.back__btn}>
            <Link href="/testing">
                <div className={styles.btn__shape}></div>
                <span className={styles['btn__inner--shape']}><IoTriangle /></span>
                <span className={styles['back__btn--caption']}>Back</span>
            </Link>
        </div>
    </>
  )
}

export default Page