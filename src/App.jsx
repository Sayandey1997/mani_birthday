import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SpaceScene   from './components/SpaceScene'
import LightsScene  from './components/LightsScene'
import CakeScene    from './components/CakeScene'
import PhotoMessage from './components/PhotoMessage'
import MusicPlayer  from './components/MusicPlayer'

const MUSIC_URL = '/backgroundmusicforvideos-happy-birthday-334876.mp3'

const fade = {
  initial:    { opacity: 0, scale: 0.97 },
  animate:    { opacity: 1, scale: 1 },
  exit:       { opacity: 0, scale: 1.03 },
  transition: { duration: 0.7, ease: 'easeInOut' },
}

export default function App() {
  const [phase, setPhase] = useState('space')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  // Called the first time user interacts (Turn On Lights click)
  const startMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().catch(() => {})
    setMusicPlaying(true)
  }, [])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
    } else {
      audio.play().catch(() => {})
      setMusicPlaying(true)
    }
  }, [musicPlaying])

  // When user clicks Turn On Lights → auto-start music
  const goLights = useCallback(() => {
    setPhase('lights')
    startMusic()
  }, [startMusic])

  return (
    <div className="app">
      {/* Persistent audio element — survives phase changes */}
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />

      {/* Music toggle button — always visible after first phase */}
      {phase !== 'space' && (
        <MusicPlayer playing={musicPlaying} onToggle={toggleMusic} />
      )}

      <AnimatePresence mode="wait">

        {phase === 'space' && (
          <motion.div key="space" className="phase-wrap" {...fade}>
            <SpaceScene onNext={goLights} />
          </motion.div>
        )}

        {phase === 'lights' && (
          <motion.div key="lights" className="phase-wrap" {...fade}>
            <LightsScene onNext={() => setPhase('cake')} />
          </motion.div>
        )}

        {phase === 'cake' && (
          <motion.div key="cake" className="phase-wrap" {...fade}>
            {/* "Happy Birthday!" button → goes straight to final message */}
            <CakeScene onNext={() => setPhase('message')} />
          </motion.div>
        )}

        {phase === 'message' && (
          <motion.div key="message" className="phase-wrap" {...fade}>
            <PhotoMessage />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
