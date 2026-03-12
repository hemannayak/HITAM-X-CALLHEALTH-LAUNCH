import { useEffect, useRef } from 'react'
import { createParticles, drawParticles, drawConnections } from '../animations/particles'
import styles from './FinalReveal.module.css'

export default function FinalReveal() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId, W, H, pts

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      pts = createParticles(W, H, 100)
    }
    window.addEventListener('resize', resize)
    resize()

    const tick = () => {
      animId = requestAnimationFrame(tick)
      // Light SaaS background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)
      
      const cg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*0.6)
      cg.addColorStop(0,   'rgba(14,165,233,0.06)')
      cg.addColorStop(0.4, 'rgba(59,130,246,0.03)')
      cg.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = cg
      ctx.fillRect(0, 0, W, H)

      drawConnections(ctx, pts)
      drawParticles(ctx, W, H, pts)
    }
    tick()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  return (
    <div className={styles.screen}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />

      {/* TOP LEFT LIVE INDICATOR */}
      <div className={styles.topLiveIndicator}>
        <span className={styles.liveDot} />
        PROJECT LIVE
      </div>

      <div className={styles.hero}>
        
        <div className={styles.logoCard}>
          <img src="/HITAM LOGO .JPG" alt="HITAM" className={styles.logoHitam} />
          <div className={styles.divider}>
            <span className={styles.divLine} />
            <span className={styles.divX}>×</span>
            <span className={styles.divLine} />
          </div>
          <div className={styles.chBg}>
            <img src="/callhealth logo.png" alt="CallHealth" className={styles.logoCH} />
          </div>
        </div>

        <h1 className={styles.title}>INDUSTRY PROJECT IS <span className={styles.liveWord}>LIVE</span> NOW</h1>
        <h2 className={styles.tagline}>Unified Healthcare Software Initiative</h2>
        <p className={styles.subTagline}>Bridging Academia and Healthcare Innovation — Creating Real-World Impact from the Campus</p>

        <div className={styles.credits}>
          <span className={styles.creditName}>Hyderabad Institute of Technology &amp; Management</span>
          <span className={styles.creditSep}>in official partnership with</span>
          <span className={styles.creditName}>CallHealth Services Pvt. Ltd.</span>
        </div>
      </div>

      <div className={styles.botBar}>
        <span className={styles.botItem}>Official Inauguration Record</span>
        <span className={styles.botItem}>HITAM × CallHealth &nbsp;·&nbsp; Enterprise Collaboration</span>
        <span className={styles.botItem}>SYSTEM v2.0</span>
      </div>
    </div>
  )
}
