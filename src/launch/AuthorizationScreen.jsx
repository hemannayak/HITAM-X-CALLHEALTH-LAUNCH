import { useState } from 'react'
import styles from './AuthorizationScreen.module.css'

export default function AuthorizationScreen({ advance }) {
  const [pressed, setPressed]   = useState(false)
  const [accepted, setAccepted] = useState(false)

  const handlePress = async () => {
    if (pressed) return
    setPressed(true)
    await new Promise(r => setTimeout(r, 600))
    setAccepted(true)
    await new Promise(r => setTimeout(r, 2200))
    advance()
  }

  return (
    <div className={styles.screen}>
      <div className={styles.ambient} />

      <div className={styles.topBar}>
        <span className={styles.barText}>Project Authorization Interface</span>
      </div>

      <div className={styles.center}>
        <div className={styles.logoCard}>
          <div className={styles.logoCol}>
            <img src="/HITAM LOGO .JPG" alt="HITAM" className={styles.logoHitam} />
            <span className={styles.logoLabel}>HITAM</span>
          </div>
          <div className={styles.logoSep}>
            <span className={styles.sepLine} />
            <span className={styles.sepX}>×</span>
            <span className={styles.sepLine} />
          </div>
          <div className={styles.logoCol}>
            <div className={styles.chWrap}>
              <img src="/callhealth logo.png" alt="CallHealth" className={styles.logoCH} />
            </div>
            <span className={styles.logoLabel}>CallHealth</span>
          </div>
        </div>

        <div className={styles.statusRow}>
          <span className={styles.sline} />
          <span className={`${styles.stext} ${accepted ? styles.stAccepted : ''}`}>
            {accepted ? 'Inauguration Accepted' : 'System Synchronized'}
          </span>
          <span className={styles.sline} />
        </div>

        <p className={`${styles.subText} ${accepted ? styles.subAccepted : ''}`}>
          {accepted ? 'Activating Ecosystem…' : 'Awaiting Leadership Authorization'}
        </p>

        <div className={styles.btnWrap}>
          <div className={`${styles.ring} ${styles.r1} ${accepted ? styles.ringOk : ''}`} />
          <div className={`${styles.ring} ${styles.r2} ${accepted ? styles.ringOk : ''}`} />

          <button
            className={`${styles.ceoBtn} ${pressed ? styles.pressed : ''} ${accepted ? styles.ok : ''}`}
            onClick={handlePress} disabled={pressed}
          >
            {accepted ? <span className={styles.check}>✓</span> : <div className={styles.fingerprint} />}
          </button>
        </div>

        {!pressed && <p className={styles.hint}>Press to Activate Collaboration</p>}

        {accepted && (
          <div className={styles.logBox}>
            <div className={styles.logRow}>
              <span className={styles.logTag}>AUTH</span>
              <span className={styles.logMsg}>Partnership Inauguration Confirmed</span>
            </div>
            <div className={styles.logRow}>
              <span className={styles.logTag}>SYS</span>
              <span className={styles.logMsg}>Initiating Collaboration Sequence</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.botBar}>
        <span className={styles.barText}>Stage 03 / 05 &nbsp;·&nbsp; Authorization</span>
      </div>
    </div>
  )
}
