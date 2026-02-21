import { motion } from 'framer-motion'

// Receives playing state + toggle handler from App.jsx
// The actual <audio> element lives in App so it persists across page changes
export default function MusicPlayer({ playing, onToggle }) {
  return (
    <motion.button
      className={`music-btn ${playing ? 'music-btn--playing' : ''}`}
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      title={playing ? 'Pause music' : 'Play music'}
    >
      {playing && (
        <motion.span
          className="music-ring"
          animate={{ scale: [1, 1.65], opacity: [0.6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}
      <span className="music-icon">{playing ? '🎵' : '🎶'}</span>
      <span className="music-label">{playing ? 'Playing ♪' : 'Music'}</span>
    </motion.button>
  )
}
