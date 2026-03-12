import { useEffect, useState } from 'react'
import IntroScreen from './IntroScreen'
import ImageStoryScreen from './ImageStoryScreen'
import HealthNetworkScreen from './HealthNetworkScreen'
import AuthorizationScreen from './AuthorizationScreen'
import ActivationSequence from './ActivationSequence'
import FinalReveal from './FinalReveal'
import styles from './LaunchPage.module.css'


const PHASES = ['intro', 'story', 'auth', 'network', 'pulse', 'reveal']

export default function LaunchPage() {
  const [stage, setStage] = useState('intro') // 'intro', 'network', 'auth', 'pulse', 'reveal'

  const goNext = (target) => {
    setStage(target)
  }

  const currentIndex = PHASES.indexOf(stage)

  const handlePrev = () => {
    if (currentIndex > 0) setStage(PHASES[currentIndex - 1])
  }

  const handleNext = () => {
    if (currentIndex < PHASES.length - 1) setStage(PHASES[currentIndex + 1])
  }

  return (
    <div className={styles.container}>
      {/* Optional Phase Navigation Controls */}
      <div className={styles.navOverlay}>
        <button 
          className={styles.navBtn} 
          onClick={handlePrev} 
          disabled={currentIndex <= 0}
          aria-label="Previous Phase"
        >
          ❮
        </button>
        <button 
          className={styles.navBtn} 
          onClick={handleNext} 
          disabled={currentIndex >= PHASES.length - 1}
          aria-label="Next Phase"
        >
          ❯
        </button>
      </div>

      {stage === 'intro'   && <IntroScreen advance={() => goNext('story')} />}
      {stage === 'story'   && <ImageStoryScreen advance={() => goNext('auth')} />}
      {stage === 'auth'    && <AuthorizationScreen advance={() => goNext('network')} />}
      {stage === 'network' && <HealthNetworkScreen advance={() => goNext('pulse')} />}
      {stage === 'pulse'   && <ActivationSequence advance={() => goNext('reveal')} />}
      {stage === 'reveal'  && <FinalReveal />}
    </div>
  )
}
