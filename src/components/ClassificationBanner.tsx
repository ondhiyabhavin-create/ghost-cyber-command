import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Globe, MapPin } from 'lucide-react'

interface ClassificationBannerProps {
  level: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET'
  authority: 'FEDERAL' | 'STATE' | 'ALLIED' | 'JOINT'
  mission?: string
  regionOfResponsibility?: string
}

export default function ClassificationBanner({ 
  level, 
  authority, 
  mission,
  regionOfResponsibility = 'CONTINENTAL UNITED STATES'
}: ClassificationBannerProps) {
  const levelColors = {
    UNCLASSIFIED: 'text-gray-400',
    CONFIDENTIAL: 'text-blue-400',
    SECRET: 'text-orange-400',
    'TOP SECRET': 'text-red-400',
  }

  const [currentRoR, setCurrentRoR] = useState(regionOfResponsibility)

  useEffect(() => {
    // Simulate region changes (in real app, this would come from route/context)
    const regions = [
      'CONTINENTAL UNITED STATES',
      'PACIFIC THEATER',
      'ATLANTIC THEATER',
      'EUROPEAN THEATER',
    ]
    const interval = setInterval(() => {
      // Only change occasionally for demo
      if (Math.random() > 0.95) {
        const newRegion = regions[Math.floor(Math.random() * regions.length)]
        setCurrentRoR(newRegion)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-ghost-blue/95 glass border-b-2 border-ghost-neon-blue/30 px-6 py-2.5 relative overflow-hidden"
    >
      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-ghost-neon-blue/20 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative z-10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-ghost-neon-blue animate-pulse-slow" />
            <span className={`font-bold uppercase ${levelColors[level]}`}>
              CLASSIFIED // CYBER COMMAND
            </span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-ghost-neon-green" />
            <span className="text-gray-300 uppercase">AUTHORITY: {authority}</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoR}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-ghost-neon-yellow" />
              <span className="text-gray-300 uppercase">RoR: {currentRoR}</span>
            </motion.div>
          </AnimatePresence>
          {mission && (
            <>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-gray-400">MISSION: {mission}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <span>US CYBER COMMAND</span>
          <span className="text-white/30">|</span>
          <span>DHS CISA</span>
          <span className="text-white/30">|</span>
          <span>NSA AUTHORIZED</span>
        </div>
      </div>
    </motion.div>
  )
}
