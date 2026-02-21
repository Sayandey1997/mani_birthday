import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const CANDLE_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff']

function Flame({ delay = 0 }) {
  return (
    <motion.div
      className="flame-wrap"
      animate={{ scaleX: [1, 0.88, 1.1, 0.9, 1], scaleY: [1, 1.06, 0.94, 1.08, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <div className="flame-outer" />
      <div className="flame-inner" />
      <div className="flame-core" />
    </motion.div>
  )
}

function Candle({ color, i }) {
  return (
    <div className="candle-unit">
      <Flame delay={i * 0.11} />
      <div className="candle-body" style={{ background: `linear-gradient(to bottom, #fff 0%, ${color} 30%, ${color}cc 100%)` }}>
        <div className="candle-stripe" style={{ background: `${color}44` }} />
      </div>
    </div>
  )
}

function BirthdayCake() {
  return (
    <div className="cake-wrap">
      {/* Candles row */}
      <div className="candles-row">
        {CANDLE_COLORS.map((c, i) => <Candle key={i} color={c} i={i} />)}
      </div>

      {/* Tier 1 — top */}
      <div className="cake-tier tier-top">
        <div className="tier-frosting tier-frosting--top" />
        <div className="tier-body" style={{ background: 'linear-gradient(135deg, #ffb3c6, #ff6b9d)' }}>
          <span className="tier-deco">💖</span>
        </div>
      </div>

      {/* Tier 2 — middle */}
      <div className="cake-tier tier-mid">
        <div className="tier-frosting" />
        <div className="tier-body" style={{ background: 'linear-gradient(135deg, #a8edea, #fed6e3)' }}>
          <span className="tier-deco">✨ Mani ✨</span>
        </div>
        <div className="tier-dots">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="dot-deco" style={{ background: CANDLE_COLORS[i % 5] }} />
          ))}
        </div>
      </div>

      {/* Tier 3 — bottom */}
      <div className="cake-tier tier-bottom">
        <div className="tier-frosting" />
        <div className="tier-body" style={{ background: 'linear-gradient(135deg, #ffd6a5, #ffb347)' }}>
          <span className="tier-deco">🌸 Happy Birthday 🌸</span>
        </div>
        <div className="tier-dots">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="dot-deco" style={{ background: CANDLE_COLORS[i % 5] }} />
          ))}
        </div>
      </div>

      {/* Plate */}
      <div className="cake-plate" />
    </div>
  )
}

export default function CakeScene({ onNext }) {
  const [wished, setWished] = useState(false)

  const handleWish = () => {
    setWished(true)
    const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff','#ff9ff3']
    const fire = (o) => confetti({ particleCount: 80, spread: 120, origin: o, colors, scalar: 1.3 })
    fire({ x: 0.3, y: 0.5 }); setTimeout(() => fire({ x: 0.7, y: 0.5 }), 300)
    setTimeout(() => fire({ x: 0.5, y: 0.3 }), 600)
    setTimeout(onNext, 1600)
  }

  // Sparkles around cake
  const SPARKLES = Array.from({ length: 16 }, (_, i) => ({
    angle: (i / 16) * 360,
    dist: 180 + (i % 3) * 30,
    size: `${0.8 + (i % 4) * 0.3}rem`,
    delay: i * 0.15,
  }))

  return (
    <div className="cake-scene">
      {/* Floating sparkles around the cake area */}
      <div className="sparkle-ring">
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className="ring-sparkle"
            style={{
              fontSize: s.size,
              transform: `rotate(${s.angle}deg) translateX(${s.dist}px)`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <motion.div
        className="cake-scene__content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="cake-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎂 The Most Delicious Cake 🎂
        </motion.p>

        <BirthdayCake />

        <AnimatePresence>
          {!wished && (
            <motion.button
              className="btn-cake"
              onClick={handleWish}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              🎉 Happy Birthday!
            </motion.button>
          )}
        </AnimatePresence>

        {wished && (
          <motion.p
            className="cake-wish-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
          >
            🎉 Wooohooo! 🎉
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
