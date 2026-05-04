"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from "../../../styles/capture.module.css"
import Link from 'next/link';
import { IoTriangle } from 'react-icons/io5';
import Image from 'next/image';
import shoot from "../../../public/takePictureIcon.webp"
import { useRouter } from 'next/navigation';

const Page = () => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const router = useRouter();

  const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch(err) {
        console.error('Camera access was denied', err)
      }
    };

    const stopCamera = () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };

    const takePicture = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL('image/jpeg');
      stopCamera();
      setPhoto(imageData);
    };

    const retake = () => {
      setPhoto(null);
    };

    const usePhoto = () => {
      if (photo) {
        localStorage.setItem('capturedPhoto', photo);
        router.push(`/select`);
      }
    };
    
    useEffect(() => {
      if (!photo) startCamera();
    }, [photo]);

      if (photo) {
    return (
      <div className={styles.capture__page}>
        <p className={styles.great__shot}>Great Shot!</p>
        <div className={styles.preview__wrapper}>
          <img src={photo} alt="captured" className={styles.preview__photo} />
        </div>
        <div className={styles.preview__buttons}>
          <button className={styles.retake__btn} onClick={retake}>Retake</button>
          <button className={styles.use__btn} onClick={usePhoto}>Use This Photo</button>
        </div>
        <div className={styles.back__btn}>
          <Link href="/result">
            <div className={styles.btn__shape}></div>
            <span className={styles['btn__inner--shape']}><IoTriangle /></span>
            <span className={styles['back__btn--caption']}>Back</span>
          </Link>
        </div>
      </div>
    );
  }

   return (
    <div className={styles.capture__page}>
      <video ref={videoRef} autoPlay playsInline className={styles.video} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className={styles.take__picture}>
        <span className={`${styles['take__picture--caption']}`}>Take Picture</span>
        <button className={`${styles['take__picture--btn']}`} onClick={takePicture}>
          <Image src={shoot} alt="take a photo" className={styles.camera__icon} />
        </button>
      </div>

      <div className={styles.tips}>
        <div className={styles.tips__caption}>To get better results make sure to have</div>
        <div className={styles.tips__list}>
          <p>◇ NEUTRAL EXPRESSION</p>
          <p>◇ Frontal Pose</p>
          <p>◇ Adequate lighting</p>
        </div>
      </div>

      <div className={styles.back__btn}>
        <Link href="/result">
          <div className={styles.btn__shape}></div>
          <span className={styles['btn__inner--shape']}><IoTriangle /></span>
          <span className={styles['back__btn--caption']}>Back</span>
        </Link>
      </div>
    </div>
  );
}

export default Page