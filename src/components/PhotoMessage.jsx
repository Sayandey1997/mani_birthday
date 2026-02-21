import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// ─── Put mani.jpg in the public/ folder and it will show here ───
const PHOTO_SRC = '/mani.jpeg'

const MESSAGE_LINES = [
  "Sending you my love and support, always.",
  "Take care of your health, and please take care of your mom too.",
  "You deserve the world, Mani —",
  "and so much more. ",
]


function CatBye() {
  return (
    <motion.div
      className="cat-bye"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <motion.span
        className="cat-face"
        animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        🐱
      </motion.span>
      <motion.div
        className="cat-speech"
        initial={{ opacity: 0, scale: 0.8, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 2.8, duration: 0.6, type: 'spring' }}
      >
        <p>Bye Mani! Take care! 💕</p>
        <p>Stay happy always~ 🌸</p>
        <div className="speech-tail" />
      </motion.div>

      {/* waving paw */}
      <motion.span
        className="paw-wave"
        animate={{ rotate: [0, 30, 0, 30, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
      >
        🐾
      </motion.span>
    </motion.div>
  )
}

export default function PhotoMessage({ onBack }) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    const colors = ['#ff2d55', '#bf5af2', '#ff9f0a', '#30d158', '#0a84ff', '#ffd60a']
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.4 }, colors, shapes: ['star'] })
    }, 800)
  }, [])

  return (
    <div className="photo-scene">

      {/* Close / back button */}
      {onBack && (
        <button
          className="photo-close-btn"
          onClick={onBack}
          aria-label="Go back to start"
        >
          ✕
        </button>
      )}

      {/* Floating sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="photo-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        >
          {['✦', '✧', '⋆', '·', '★'][i % 5]}
        </span>
      ))}

      <div className="photo-scene__inner">

        {/* Photo frame */}
        <motion.div
          className="photo-frame"
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, type: 'spring', stiffness: 80 }}
        >
          <motion.div
            className="photo-ring"
            animate={{
              boxShadow: [
                '0 0 20px 8px rgba(255,45,85,0.5), 0 0 50px 20px rgba(191,90,242,0.3)',
                '0 0 35px 14px rgba(255,45,85,0.8), 0 0 70px 30px rgba(191,90,242,0.5)',
                '0 0 20px 8px rgba(255,45,85,0.5), 0 0 50px 20px rgba(191,90,242,0.3)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <img
              src={PHOTO_SRC}
              alt="Mani"
              className="photo-img"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
            {/* Fallback if image not added yet */}
            <div className="photo-fallback" style={{ display: 'none' }}>
              <span style={{ fontSize: '4rem' }}>🌸</span>
              <span style={{ fontSize: '0.85rem', color: '#f9a8d4', marginTop: 8, textAlign: 'center' }}>
                Add&nbsp;<strong>mani.jpg</strong><br />to&nbsp;public/&nbsp;folder
              </span>
            </div>
          </motion.div>

          {/* Orbiting hearts */}
          {['💖', '💕', '🌸', '💗', '✨'].map((e, i) => (
            <motion.span
              key={i}
              className="orbit-emoji"
              style={{ '--angle': `${i * 72}deg` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: 'linear' }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Message */}
        <motion.div
          className="photo-message"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <h2 className="photo-msg-title">Wishing you,  Mani </h2>

          <div className="photo-msg-lines">
            {MESSAGE_LINES.map((line, i) => (
              <motion.p
                key={i}
                className={line === '' ? 'msg-spacer' : 'msg-line'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.14, duration: 0.6 }}
              >
                {line || '\u00A0'}
              </motion.p>
            ))}
          </div>

          {/* Cat bye */}
          <CatBye />
        </motion.div>

      </div>
    </div>
  )
}
