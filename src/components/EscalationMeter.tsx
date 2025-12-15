import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp } from 'lucide-react'
import { Threat } from '../data/mockData'

interface EscalationMeterProps {
  threat: Threat
}

const escalationLabels = {
  1: 'LOCALIZED',
  2: 'COORDINATED',
  3: 'NATIONAL',
  4: 'STRATEGIC',
}

export default function EscalationMeter({ threat }: EscalationMeterProps) {
  const level = threat.escalationState
  const isNationalAlert = level >= 3

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Escalation Level
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${
          level === 1 ? 'bg-orange-500/20 text-orange-400' :
          level === 2 ? 'bg-red-500/20 text-red-400' :
          level === 3 ? 'bg-purple-500/20 text-purple-400' :
          'bg-purple-500/30 text-purple-300'
        }`}>
          LEVEL {level}: {escalationLabels[level]}
        </span>
      </div>

      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            level === 1 ? 'bg-orange-500' :
            level === 2 ? 'bg-red-500' :
            level === 3 ? 'bg-purple-500' :
            'bg-purple-600'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${(level / 4) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
        {isNationalAlert && (
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </div>

      {isNationalAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-2 bg-purple-500/20 border border-purple-500/50 rounded text-xs"
        >
          <AlertTriangle className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="font-bold text-purple-300">NATIONAL ALERT ACTIVE</span>
        </motion.div>
      )}

      {threat.isStateActor && (
        <div className="flex items-center gap-2 p-2 bg-red-500/20 border border-red-500/50 rounded text-xs">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="font-bold text-red-300">STATE-LEVEL ACTOR DETECTED</span>
        </div>
      )}
    </div>
  )
}
