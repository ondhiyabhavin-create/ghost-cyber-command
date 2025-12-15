import { motion } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'
import { Incident } from '../data/mockData'

interface IncidentAlertProps {
  incident: Incident
  onClose: () => void
}

export default function IncidentAlert({ incident, onClose }: IncidentAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="bg-ghost-neon-red/20 glass border-2 border-ghost-neon-red rounded-lg p-6 mb-6 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-ghost-neon-red/10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <AlertTriangle className="w-8 h-8 text-ghost-neon-red" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold neon-red">INCIDENT DETECTED</h3>
              <p className="text-sm text-gray-400">Auto-triggered by system monitoring</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Incident ID:</span>
            <span className="ml-2 font-mono font-bold">{incident.id}</span>
          </div>
          <div>
            <span className="text-gray-400">Affected Region:</span>
            <span className="ml-2 font-bold">{incident.affectedRegion}</span>
          </div>
          <div>
            <span className="text-gray-400">Attack Type:</span>
            <span className="ml-2 font-bold text-ghost-neon-red">{incident.attackType}</span>
          </div>
          <div>
            <span className="text-gray-400">Status:</span>
            <span className="ml-2 font-bold uppercase">{incident.status}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-300">
            <span className="font-bold">Infrastructure Affected:</span>{' '}
            {incident.affectedInfrastructure.join(', ')}
          </p>
          <p className="text-sm text-gray-300 mt-2">
            <span className="font-bold">Source IPs:</span>{' '}
            {incident.sourceIPs.join(', ')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
