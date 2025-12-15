import { motion } from 'framer-motion'

export default function LogoCompact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex items-center justify-center"
    >
      <img
        src="/ghost-logo.png"
        alt="GHOST Logo"
        className="h-16 w-auto object-contain"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(255, 0, 64, 0.4))',
        }}
      />
    </motion.div>
  )
}

