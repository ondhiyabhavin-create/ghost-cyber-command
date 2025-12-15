import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      {/* Phone Frame */}
      <div className="relative w-32 h-48 mx-auto">
        {/* Phone Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] border-2 border-gray-700 shadow-2xl">
          {/* Screen */}
          <div className="absolute inset-[3px] bg-white rounded-[1.7rem] overflow-hidden">
            {/* Halftone overlay effect */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0',
              }}
            />
            
            {/* GO GHOST Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div 
                  className="text-black font-black text-2xl tracking-tight"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    transform: 'skewX(-2deg)',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                  }}
                >
                  GO GHOST
                </div>
                {/* Drop shadow effect */}
                <div 
                  className="absolute inset-0 text-gray-400 font-black text-2xl tracking-tight -z-10"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    transform: 'skewX(-2deg) translate(2px, 2px)',
                    opacity: 0.3,
                  }}
                >
                  GO GHOST
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Notch */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full"></div>
        </div>
        
        {/* Halftone dots effect on edges */}
        <div 
          className="absolute -left-4 top-0 bottom-0 w-8 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #000 2px, transparent 2px)`,
            backgroundSize: '12px 12px',
          }}
        />
        <div 
          className="absolute -right-4 top-0 bottom-0 w-8 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #000 2px, transparent 2px)`,
            backgroundSize: '12px 12px',
          }}
        />
      </div>
    </motion.div>
  )
}

