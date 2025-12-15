import { motion } from 'framer-motion'
import LogoCompact from './LogoCompact'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ghost-blue/90 glass border-t border-ghost-neon-blue/20 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-auto">
            <LogoCompact />
          </div>
          <div className="text-xs text-gray-400">
            <div className="font-bold text-white mb-1">GHOST Cyber Command Center</div>
            <div>Tech for the People. Privacy Is Your Right.</div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <div>© 2024 GHOST. All Rights Reserved.</div>
          <div className="mt-1">CLASSIFIED // TOP SECRET</div>
        </div>
      </div>
    </motion.footer>
  )
}

