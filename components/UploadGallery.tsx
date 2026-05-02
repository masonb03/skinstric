"use client"

import { useRef } from 'react'
import styles from '../styles/result.module.css'
import Image from 'next/image'
import gallery from '../public/gallery-icon.webp'

type Props = {
  onImageSelect: (
    base64: string,
    preview: string
  ) => void;
}

const UploadGallery = ({ onImageSelect }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file)

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const result = reader.result as string

      const base64 = result.split(',')[1]

      onImageSelect(base64, previewUrl)
    }
  }

  return (
    <>
      <button
        className={styles.btn}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={gallery}
          alt=""
          className={styles.section__icon}
        />
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]

          if (file) {
            handleFileChange(file)
          }
        }}
      />
    </>
  )
}

export default UploadGallery