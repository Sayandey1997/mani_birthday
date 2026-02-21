import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// Each word gets its own vivid colour
const WORDS = [
  { text: 'Happy',    color: '#ff2d55' },
  { text: 'Birthday', color: '#ff9f0a' },
  { text: 'Mani',     color: '#bf5af2' },
  { text: '💖',       color: 'inherit'  },
]

const FLOAT_HEARTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 96}%`,
  size: `${Math.random() * 1.4 + 0.8}rem`,
  dur: `${Math.random() * 5 + 6}s`,
  delay: `${Math.random() * 5}s`,
}))

export default function HBDReveal({ onNext }) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    const colors = ['#ff2d55','#ff9f0a','#30d158','#0a84ff','#bf5af2','#ff375f','#ffd60a']
    const fire = (o, pc = 90) =>
      confetti({ particleCount: pc, spread: 150, origin: o, colors, scalar: 1.4, ticks: 100 })
    fire({ x: 0.5, y: 0.6 }, 120)
    setTimeout(() => { fire({ x: 0.1, y: 0.5 }); fire({ x: 0.9, y: 0.5 }) }, 400)
    setTimeout(() => fire({ x: 0.5, y: 0.2 }, 80), 800)
    setTimeout(() => fire({ x: 0.3, y: 0.6 }), 1200)
    setTimeout(() => fire({ x: 0.7, y: 0.6 }), 1600)
  }, [])

  return (
    <div className="hbd-scene">

      {/* Floating hearts background */}
      {FLOAT_HEARTS.map(h => (
        <span
          key={h.id}
          className="hbd-float-heart"
          style={{ left: h.left, fontSize: h.size, animationDuration: h.dur, animationDelay: h.delay }}
        >
          {['💕','💗','💖','💓','💝','🌸'][h.id % 6]}
        </span>
      ))}

      <div className="hbd-content">
        {/* Main title — each word on its own line on mobile, same line on desktop */}
        <motion.div
          className="hbd-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {WORDS.map((w, i) => (
            <motion.span
              key={i}
              className="hbd-word"
              style={{ color: w.color }}
              initial={{ opacity: 0, y: 60, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: i * 0.22,
                duration: 0.7,
                type: 'spring',
                stiffness: 120,
              }}
            >
              {w.text}
            </motion.span>
          ))}
        </motion.div>

        {/* Sub message */}
        <motion.p
          className="hbd-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Today the whole universe celebrates — just for you! 🌟
        </motion.p>

        {/* Animated emoji row */}
        <motion.div
          className="hbd-emojis"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {['🎉','🎈','🎊','🥳','🎁','🌸','🎶','🌟'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.8, delay: i * 0.15, repeat: Infinity }}
              style={{ display: 'inline-block', fontSize: 'clamp(1.4rem, 5vw, 2.2rem)' }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.button
          className="btn-hbd"
          onClick={onNext}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 180 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
        >
          💌 Open Your Surprise
        </motion.button>
      </div>
    </div>
  )
}
