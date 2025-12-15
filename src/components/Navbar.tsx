import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Activity } from 'lucide-react'
import { initialIncidents } from '../data/mockData'

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [openIncidentsCount, setOpenIncidentsCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const count = initialIncidents.filter(
      (inc) => inc.status !== 'neutralized'
    ).length
    setOpenIncidentsCount(count)
  }, [])

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="h-16 bg-ghost-blue/90 glass border-b border-ghost-neon-blue/20 flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-ghost-neon-green" />
          <span className="text-sm font-medium">SYSTEM STATUS: OPERATIONAL</span>
        </div>
        
        <Link
          to="/incidents"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ghost-neon-red/20 border border-ghost-neon-red/50 hover:bg-ghost-neon-red/30 transition-all"
        >
          <AlertTriangle className="w-5 h-5 text-ghost-neon-red" />
          <span className="text-sm font-bold neon-red">
            OPEN INCIDENTS: {openIncidentsCount}
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-ghost-neon-blue" />
          <span className="font-mono">
            {currentTime.toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
        </div>
        
        <div className="px-4 py-2 rounded-lg bg-ghost-neon-green/10 border border-ghost-neon-green/30">
          <span className="text-xs font-bold text-ghost-neon-green">SECURE</span>
        </div>
      </div>
    </motion.nav>
  )
}
