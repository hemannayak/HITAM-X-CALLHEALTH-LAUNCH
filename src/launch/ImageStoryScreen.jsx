import { useEffect, useState } from 'react'
import styles from './ImageStoryScreen.module.css'

const STORY_NODES = [
  { id: 'abdm',       label: 'ABDM',        icon: 'ID',  img: '/Phase2/ABDM.png' },
  { id: 'ocr',        label: 'OCR',         icon: '◰',   img: '/Phase2/OCR.png' },
  { id: 'mirth',      label: 'Mirth',       icon: '⇄',  img: '/Phase2/MIRTH_CONNECT.png' },
  { id: 'fhir',       label: 'FHIR',        icon: '{}',  img: '/Phase2/FHIR.png' },
  { id: 'digiyatra',  label: 'DigiYatra',   icon: '◎',   img: '/Phase2/Digiyatra.png' },
  { id: 'chatbot',    label: 'Chatbot',     icon: '💬',  img: '/Phase2/Chatbot.png' },
  { id: 'hospitals',  label: 'Hospitals',   icon: '+',   img: '/Phase2/Hospitals.png' },
  { id: 'patients',   label: 'Patients',    icon: '👤',  img: '/Phase2/Patients.png' },
]

export default function ImageStoryScreen({ advance }) {
  const [currentIdx, setCurrentIdx] = useState(-1)
  const [showLogos, setShowLogos] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  // 1. Manage the automated presentation flow
  useEffect(() => {
    let i = 0

    // Dismiss the intro instantly right as first card appears (1.5s)
    const introTimer = setTimeout(() => setShowIntro(false), 1500)

    // Start module cards after 1.5s (same moment intro dismisses)
    const timer = setTimeout(() => {
      
      const interval = setInterval(() => {
        setCurrentIdx(i)
        i++
        
        // Once all modules have cycled
        if (i === STORY_NODES.length) {
          clearInterval(interval)
          
          // Let the last item shrink into the grid, then show the Collaboration Reveal
          setTimeout(() => {
             setCurrentIdx(i) // forces idx out of bounds -> pushes last item to grid
             setShowLogos(true)
          }, 1800)
          
          // Hold on the large logos for 4 seconds, then move to Phase 3 (Auth)
          setTimeout(() => {
            advance()
          }, 6000) // 1.8s + 4.2s holding on logos
        }
      }, 1500) // 1.5s per module card
      
      return () => clearInterval(interval)
    }, 1500) // 1.5s gap from phase start → first card (ABDM)
    
    return () => { clearTimeout(introTimer); clearTimeout(timer) }
  }, [advance])

  // 2. Compute dynamic CSS positioning
  const getStyle = (idx) => {
    // Hidden (yet to appear)
    if (idx > currentIdx) {
      return {
        transform: 'translate(-50%, -50%) translate(50vw, 40vh) scale(0.8)',
        opacity: 0
      }
    }
    
    // Large Center Focus
    if (idx === currentIdx && !showLogos) {
      return {
        transform: 'translate(-50%, -50%) translate(50vw, 40vh) scale(1)',
        opacity: 1,
        zIndex: 10
      }
    }
    
    // Grid alignment below
    // Shift slightly down/faded when logos appear to make space
    const shiftScale = showLogos ? 0.3 : 0.4 
    const yTarget = showLogos ? '100vh - 80px' : '100vh - 160px'
    const opacity = showLogos ? 0.3 : 1
    
    // Spread them out more since they are bigger
    const xBase = (idx - 3.5) * 110 
    
    return {
      transform: `translate(-50%, -50%) translate(calc(50vw + ${xBase}px), calc(${yTarget})) scale(${shiftScale})`,
      opacity: opacity,
      zIndex: 5
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.bgGrid} />

      {/* INTRO CONTEXT OVERLAY */}
      <div className={`${styles.introOverlay} ${!showIntro ? styles.introGone : ''}`}>
        <p className={styles.introEyebrow}>HITAM × CallHealth — Industry Live Project</p>
        <h2 className={styles.introHeading}>Built on <span className={styles.introAccent}>8 Core Technologies</span></h2>
        <p className={styles.introSub}>Explore the modules powering India's next-generation healthcare platform</p>
        <div className={styles.introDots}>
          {STORY_NODES.map(n => <span key={n.id} className={styles.introDot} />)}
        </div>
      </div>

      {/* Dynamic Module Node Roster */}
      {STORY_NODES.map((node, idx) => (
        <div key={node.id} className={styles.nodeWrapper} style={getStyle(idx)}>
          <div className={styles.nodeSquare}>
            {/* Fallback Icon */}
            <div className={styles.nodeIcon}>{node.icon}</div>
            
            {/* Actual Image (Placeholder path) - Hides on error so icon shows instead */}
            <img 
              src={node.img} 
              className={styles.nodeImg} 
              alt={node.label}
              onError={(e) => { e.target.style.opacity = '0' }}
            />
          </div>
          <div className={styles.nodeLabel}>{node.label}</div>
        </div>
      ))}

      {/* FINAL COLLABORATION REVEAL (LOGOS) */}
      <div className={`${styles.revealOverlay} ${showLogos ? styles.revealActive : ''}`}>
        <h2 className={styles.revealTitle}>Official Collaboration Blueprint</h2>
        
        <div className={styles.logoRow}>
          {/* HITAM Logo - Preserved Proportions */}
          <div className={styles.logoContainer}>
            <img src="/HITAM LOGO .JPG" alt="HITAM" className={styles.brandHitam} />
          </div>
          
          <div className={`${styles.connectionLine} ${showLogos ? styles.lineActive : ''}`} />
          
          {/* CallHealth Logo - Preserved Proportions */}
          <div className={styles.logoContainer}>
            <div className={styles.chInner}>
              <img src="/callhealth logo.png" alt="CallHealth" className={styles.brandCH} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
