import { useEffect } from 'react'
import styles from './IntroScreen.module.css'

export default function IntroScreen({ advance }) {

  // Auto-advance after giving time to read the logos (4 seconds per plan)
  useEffect(() => {
    const timer = setTimeout(() => {
      advance()
    }, 4000)
    return () => clearTimeout(timer)
  }, [advance])

  return (
    <div className={styles.screen}>
      <div className={styles.topNav}>
        <span className={styles.navLabel}>System Initialization</span>
        <span className={styles.navVersion}>v2.0.0</span>
      </div>

      <div className={styles.centerCard}>
        <div className={styles.logos}>
          <img src="/HITAM LOGO .JPG" alt="HITAM" className={styles.logoH} />
          <div className={styles.divider}>
            <span className={styles.divLine} />
            <span className={styles.divX}>×</span>
            <span className={styles.divLine} />
          </div>
          <img src="/callhealth logo.png" alt="CallHealth" className={styles.logoC} />
        </div>

        <h1 className={styles.title}>A NEW ERA IN HEALTHCARE</h1>
        <h2 className={styles.subTitle}>Strategic Industry-Academia Partnership</h2>
        <p className={styles.description}>Preparing Collaboration Infrastructure<br/>Initiating Global Connectivity Protocol...</p>
      </div>

      <div className={styles.loaderWrap}>
        <div className={styles.loaderBar}>
          <div className={styles.loaderFill} />
        </div>
        <span className={styles.loaderText}>Mapping Ecosystem Nodes</span>
      </div>
    </div>
  )
}
