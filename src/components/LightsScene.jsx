import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// String light bulb colours
const BULB_COLORS = [
  '#ff4444','#ff8c00','#ffd700','#44cc44',
  '#00bfff','#8844ff','#ff44bb','#ff6622',
  '#00e5ff','#ff4444','#44ee44','#ffaa00',
]

// Balloon config
const BALLOONS = [
  { color: '#ff4d4d', x: '4%',  delay: 0,    dur: 5.5 },
  { color: '#ff9900', x: '14%', delay: 0.3,  dur: 6.5 },
  { color: '#ffe600', x: '24%', delay: 0.6,  dur: 5 },
  { color: '#44dd44', x: '34%', delay: 0.1,  dur: 7 },
  { color: '#00c8ff', x: '46%', delay: 0.8,  dur: 6 },
  { color: '#9944ff', x: '56%', delay: 0.4,  dur: 5.5 },
  { color: '#ff44bb', x: '66%', delay: 1.0,  dur: 6.5 },
  { color: '#ff6622', x: '76%', delay: 0.2,  dur: 5 },
  { color: '#ff4488', x: '87%', delay: 0.7,  dur: 7 },
]

const BANNER_CHARS = 'Happiiee Birthday Mani !! '.split('')
const CHAR_COLORS  = ['#ff2222','#ff6600','#ffcc00','#22bb44','#0099ff','#9944ff','#ff44aa']

// Background sparkle stars
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 3.5) % 98}%`,
  top:  `${(i * 7.3) % 92}%`,
  size: `${8 + (i % 4) * 3}px`,
  delay: (i % 6) * 0.5,
  dur: 2 + (i % 5) * 0.4,
}))

function StringLights() {
  return (
    <div className="lights-row">
      <div className="lights-wire" />
      {BULB_COLORS.map((color, i) => (
        <div key={i} className="bulb-wrap">
          <div className="bulb-cap" />
          <div
            className="bulb-body"
            style={{
              background: color,
              boxShadow: `0 0 8px 3px ${color}88, 0 0 16px 6px ${color}44`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

function Balloon({ color, x, delay, dur }) {
  return (
    <motion.div
      className="balloon-unit"
      style={{ left: x }}
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ y: '-10vh', opacity: [0, 1, 1, 0.9] }}
      transition={{ duration: dur + 3, delay, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <div className="balloon-body" style={{ background: color, boxShadow: `0 0 18px ${color}66` }}>
          <div className="balloon-shine" />
          <div className="balloon-knot" style={{ borderTop: `10px solid ${color}` }} />
        </div>
        <div className="balloon-string" />
      </motion.div>
    </motion.div>
  )
}

export default function LightsScene({ onNext }) {
  const firedRef = useRef(false)

  // Fire confetti once when scene mounts
  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    const colors = ['#ff4444','#ffd700','#44cc44','#00bfff','#ff44bb','#8844ff']
    const fire = (o, pc = 80) => confetti({ particleCount: pc, spread: 130, origin: o, colors })
    setTimeout(() => {
      fire({ x: 0.5, y: 0.35 }, 110)
      setTimeout(() => { fire({ x: 0.2, y: 0.5 }); fire({ x: 0.8, y: 0.5 }) }, 350)
    }, 500)
  }, [])

  return (
    <div className="lights-scene">

      {/* Twinkling background stars */}
      {STARS.map(s => (
        <span
          key={s.id}
          className="pink-star"
          style={{
            left: s.left, top: s.top,
            fontSize: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        >
          ✦
        </span>
      ))}

      {/* String lights */}
      <StringLights />

      {/* Balloons — all fly immediately */}
      {BALLOONS.map((b, i) => <Balloon key={i} {...b} />)}

      {/* Happy Birthday Banner — shown immediately */}
      <motion.div
        className="banner-wrap"
        initial={{ opacity: 0, y: -50, scaleY: 0.4 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 110 }}
      >
        <div className="banner-text">
          {BANNER_CHARS.map((ch, i) => (
            <motion.span
              key={i}
              className={ch === ' ' ? 'banner-space' : 'banner-char'}
              style={{ color: ch === ' ' ? 'transparent' : CHAR_COLORS[i % CHAR_COLORS.length] }}
              initial={{ opacity: 0, y: -24, rotate: -8 }}
              animate={{
                opacity: 1, y: 0, rotate: 0,
                translateY: [0, -8, 0],
              }}
              transition={{
                opacity:    { delay: 0.4 + i * 0.04, duration: 0.35 },
                y:          { delay: 0.4 + i * 0.04, duration: 0.35 },
                rotate:     { delay: 0.4 + i * 0.04, duration: 0.35 },
                translateY: { delay: 0.9 + i * 0.04, duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        {/* Streamers */}
        <div className="streamers">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="streamer"
              style={{
                left: `${i * 11}%`,
                background: CHAR_COLORS[i % CHAR_COLORS.length],
                animationDelay: `${i * 0.1}s`,
                height: `${60 + (i % 3) * 20}px`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Single action button at the bottom */}
      <motion.div
        className="lights-action"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <motion.button
          className="btn-pink btn-pink--red"
          onClick={onNext}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
        >
          <span>🎂</span> Taste the celebration
        </motion.button>
      </motion.div>

    </div>
  )
}
