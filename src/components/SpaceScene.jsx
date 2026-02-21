import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Ships fly from left → right at different rows
const SHIPS = [
  { emoji: '🚀', top: '18%', duration: 13, delay: 0,   size: '2.2rem' },
  { emoji: '🛸', top: '35%', duration: 10, delay: 3,   size: '2.4rem' },
  { emoji: '🚀', top: '55%', duration: 15, delay: 7,   size: '1.8rem' },
  { emoji: '🛸', top: '72%', duration: 11, delay: 1.5, size: '2rem'   },
  { emoji: '⭐', top: '42%', duration: 8,  delay: 5,   size: '1.4rem' },
]

// Gold / silver sparkle particles
const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(i * 2.1) % 100}%`,
  top:  `${(i * 3.7) % 100}%`,
  size: `${Math.random() * 5 + 2}px`,
  color: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#c0c0c0' : '#fff8dc',
  duration: 2 + (i % 5) * 0.5,
  delay: (i % 7) * 0.6,
}))

function StarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let stars = []

    // Build stars in ~12 horizontal bands so they read as rows
    const buildStars = () => {
      stars = []
      const rows = 12
      const rowH = canvas.height / rows
      for (let r = 0; r < rows; r++) {
        const baseY = r * rowH + rowH / 2
        // ~1 star every 45px across the width
        const count = Math.max(10, Math.floor(canvas.width / 45))
        for (let i = 0; i < count; i++) {
          stars.push({
            x: (i / count) * canvas.width + (Math.random() * 28 - 14),
            y: baseY + (Math.random() - 0.5) * rowH * 0.55,
            r: Math.random() * 1.7 + 0.3,
            alpha: Math.random(),
            speed: Math.random() * 0.009 + 0.003,
            dir: Math.random() > 0.5 ? 1 : -1,
          })
        }
      }
    }

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      buildStars()
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.alpha += s.speed * s.dir
        if (s.alpha >= 1 || s.alpha <= 0.08) s.dir *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.shadowBlur = 5
        ctx.shadowColor = 'rgba(210,180,255,0.9)'
        ctx.fill()
        ctx.shadowBlur = 0
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="star-canvas" />
}

export default function SpaceScene({ onNext }) {
  return (
    <div className="space-scene">
      <StarCanvas />

      {/* Nebula glow blobs */}
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />

      {/* Gold / silver sparkle particles */}
      {PARTICLES.map(p => (
        <span
          key={p.id}
          className="sparkle-particle"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Ships flying left → right */}
      {SHIPS.map((ship, i) => (
        <motion.span
          key={i}
          className="spaceship"
          style={{ top: ship.top, fontSize: ship.size }}
          initial={{ x: '-120px', opacity: 0 }}
          animate={{ x: 'calc(100vw + 120px)', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: ship.duration,
            delay: ship.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: { times: [0, 0.06, 0.9, 1] },
          }}
        >
          {ship.emoji}
        </motion.span>
      ))}

      {/* Centre greeting */}
      <div className="space-content">

        {/* Greeting */}
        <motion.p
          className="space-greeting"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Hi Heloooo ! 👋
        </motion.p>

        {/* Question */}
        <motion.h1
          className="space-title"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.1, type: 'spring' }}
        >
          How are you ?
        </motion.h1>

        <motion.p
          className="space-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          
        </motion.p>

        <motion.button
          className="btn-space"
          onClick={onNext}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="btn-icon">💡</span>
          Turn On Lights
        </motion.button>

      </div>
    </div>
  )
}
