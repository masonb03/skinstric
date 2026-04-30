import React from 'react'
import styles from "../styles/top.module.css"

const TopSection = () => {
  return (
    <div>
        <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <a className={styles.logo}>sKINsTRIC</a>
          <p className={styles.intro}>[ INTRO ]</p>
        </div>
        <div className={styles.enterCode}>Enter Code</div>
      </nav>
    </div>
  )
}

export default TopSection