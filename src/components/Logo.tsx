import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <img
        src="/ghost-logo.svg"
        alt="GHOST Logo"
        className="h-32 w-auto object-contain"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.6))',
        }}
      />
    </motion.div>
  )
}

