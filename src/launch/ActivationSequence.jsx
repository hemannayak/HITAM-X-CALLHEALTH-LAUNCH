import { useEffect, useRef, useState } from 'react'
import { PROJECT_NODES, drawNetwork } from '../animations/network'
import styles from './ActivationSequence.module.css'

export default function ActivationSequence({ advance }) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({
    nodeProgress: PROJECT_NODES.length,
    pulsePhase: 0,
    pulseActive: true,
    activationPct: 0,
    images: {}
  })

  // Flash for dramatic exit into Final Reveal
  const [flash, setFlash] = useState(false)

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

  // 2. Manage Pulse Rendering
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId, W, H
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    resize()
    
    const tick = () => {
      animId = requestAnimationFrame(tick)
      stateRef.current.pulsePhase += 0.08
      
      // Slower 5-second pulse
      if (stateRef.current.activationPct < 1.2) {
        stateRef.current.activationPct += 0.003
      }

      drawNetwork(ctx, W, H, stateRef.current)
    }
    tick()

    async function runFlow() {
      // Extended duration of biological flow after guest clicks
      await new Promise(r => setTimeout(r, 4500))
      setFlash(true) // Clean white flash transition
      await new Promise(r => setTimeout(r, 1000)) // Exact 1 second white flash
      advance()
    }
    runFlow()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [advance])

  return (
    <div className={styles.screen}>
      <div className={styles.bgGrid} />
      <canvas ref={canvasRef} className={styles.canvas} />
      
      <div className={styles.statusWrap}>
        <span className={styles.stext}>Deploying Collaboration Infrastructure…</span>
      </div>

      <div className={`${styles.flash} ${flash ? styles.flashOn : ''}`} />
    </div>
  )
}
