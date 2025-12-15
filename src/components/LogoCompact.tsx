import { motion } from 'framer-motion'

export default function LogoCompact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex items-center gap-3"
    >
      {/* Mini Phone Icon */}
      <div className="relative w-8 h-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600">
          <div className="absolute inset-[2px] bg-white rounded-md flex items-center justify-center overflow-hidden">
            {/* Mini halftone */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, #000 0.5px, transparent 0.5px)`,
                backgroundSize: '4px 4px',
              }}
            />
            <div 
              className="text-black font-black text-[6px] leading-none"
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 900,
                transform: 'skewX(-2deg)',
              }}
            >
              GO
            </div>
          </div>
        </div>
      </div>
      
      {/* Text Logo */}
      <div className="relative">
        <div 
          className="text-xl font-black text-white neon-blue"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            transform: 'skewX(-2deg)',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          }}
        >
          GO GHOST
        </div>
      </div>
    </motion.div>
  )
}

