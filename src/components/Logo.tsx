import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <img
        src="/ghost-logo.png"
        alt="GHOST Logo"
        className="h-32 w-auto object-contain drop-shadow-lg"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255, 0, 64, 0.3))',
        }}
      />
    </motion.div>
  )
}

