import { useEffect, useRef, useState } from 'react'
import { PROJECT_NODES, drawNetwork } from '../animations/network'
import styles from './HealthNetworkScreen.module.css'

export default function HealthNetworkScreen({ advance }) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({
    nodeProgress: 0,
    pulsePhase: 0,
    pulseActive: false,
    activationPct: 0,
    images: {} // Store loaded images
  })
  const [complete, setComplete] = useState(false)

  // 1. Preload images
  useEffect(() => {
    const loadImg = (id, src) => {
      const img = new Image()
      img.src = src
      img.onload = () => { stateRef.current.images[id] = img }
    }
    loadImg('hitam', '/HITAM LOGO .JPG')
    loadImg('callhealth', '/callhealth logo.png')
  }, [])

  // 2. Manage Canvas Render
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId, W, H

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const tick = () => {
      animId = requestAnimationFrame(tick)
      stateRef.current.pulsePhase += 0.05
      drawNetwork(ctx, W, H, stateRef.current)
    }
    tick()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  // 3. Sequential Node Reveal & Auto-Advance
  useEffect(() => {
    let active = true

    async function popNodes() {
      await new Promise(r => setTimeout(r, 600))
      
      for (let i = 1; i <= PROJECT_NODES.length; i++) {
        if (!active) return
        stateRef.current.nodeProgress = i
        await new Promise(r => setTimeout(r, Math.random() * 200 + 150))
      }
      
      await new Promise(r => setTimeout(r, 800))
      if (!active) return
      setComplete(true)
      
      // Auto-advance immediately to the Pulse sequence so the guest's click feels responsive
      await new Promise(r => setTimeout(r, 800))
      if (active) advance()
    }
    popNodes()
    
    return () => { active = false }
  }, [advance])

  return (
    <div className={styles.screen}>
      <div className={styles.bgGrid} />
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.topBar}>
        <span className={styles.topLabel}>Project Architecture Topology</span>
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <span className={styles.btTitle}>Ecosystem Nodes Verified</span>
          <span className={styles.btSub}>Biological structural mapping successful</span>
        </div>
      </div>

      <div className={styles.statusWrap}>
        <span className={`${styles.sdot} ${complete ? styles.sdotReady : ''}`} />
        <span className={`${styles.stext} ${complete ? styles.stextReady : ''}`}>
          {complete ? 'Transitioning to Authorization...' : 'Mapping Nodes...'}
        </span>
      </div>

      <div className={styles.botBar}>
        <span className={styles.barText}>Phase 02 / 05 &nbsp;·&nbsp; Architecture Visualization</span>
      </div>
    </div>
  )
}
