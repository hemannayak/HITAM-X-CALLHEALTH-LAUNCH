import { useEffect, useState } from 'react'
import IntroScreen from './IntroScreen'
import ImageStoryScreen from './ImageStoryScreen'
import HealthNetworkScreen from './HealthNetworkScreen'
import AuthorizationScreen from './AuthorizationScreen'
import ActivationSequence from './ActivationSequence'
import FinalReveal from './FinalReveal'
import styles from './LaunchPage.module.css'

export default function LaunchPage() {
  const [stage, setStage] = useState('intro') // 'intro', 'network', 'auth', 'pulse', 'reveal'

  const goNext = (target) => {
    setStage(target)
  }

  return (
    <div className={styles.container}>
      {stage === 'intro'   && <IntroScreen advance={() => goNext('story')} />}
      {stage === 'story'   && <ImageStoryScreen advance={() => goNext('auth')} />}
      {stage === 'auth'    && <AuthorizationScreen advance={() => goNext('network')} />}
      {stage === 'network' && <HealthNetworkScreen advance={() => goNext('pulse')} />}
      {stage === 'pulse'   && <ActivationSequence advance={() => goNext('reveal')} />}
      {stage === 'reveal'  && <FinalReveal />}
    </div>
  )
}
