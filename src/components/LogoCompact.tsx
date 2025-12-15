import { motion } from 'framer-motion'

export default function LogoCompact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex items-center justify-center"
    >
      <img
        src="/ghost-logo.svg"
        alt="GHOST Logo"
        className="h-16 w-auto object-contain"
        style={{
          filter: 'drop-shadow(0 0 12px rgba(0, 212, 255, 0.7))',
        }}
      />
    </motion.div>
  )
}

