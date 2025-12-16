import { motion } from 'framer-motion'
import { ServiceHealth } from '../data/mockData'
import { Activity, Shield, Zap } from 'lucide-react'

interface ServiceHealthCardProps {
  service: ServiceHealth
  delay?: number
}

export default function ServiceHealthCard({ service, delay = 0 }: ServiceHealthCardProps) {
  const statusColors = {
    healthy: 'text-ghost-neon-green border-ghost-neon-green',
    degraded: 'text-ghost-neon-yellow border-ghost-neon-yellow',
    under_attack: 'text-ghost-neon-red border-ghost-neon-red',
  }

  const statusBg = {
    healthy: 'bg-ghost-neon-green/10',
    degraded: 'bg-ghost-neon-yellow/10',
    under_attack: 'bg-ghost-neon-red/10',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg glass border-2 ${statusColors[service.status]} ${statusBg[service.status]} relative overflow-hidden`}
    >
      {service.status === 'under_attack' && (
        <motion.div
          className="absolute inset-0 bg-ghost-neon-red/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">{service.name}</h3>
          <div className="flex items-center gap-2">
            {service.status === 'under_attack' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Activity className="w-5 h-5 text-ghost-neon-red" />
              </motion.div>
            )}
            <div
              className={`w-3 h-3 rounded-full ${
                service.status === 'healthy'
                  ? 'bg-ghost-neon-green'
                  : service.status === 'degraded'
                  ? 'bg-ghost-neon-yellow'
                  : 'bg-ghost-neon-red'
              } animate-pulse`}
            />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Latency
            </span>
            <span className="font-mono">{service.latency}ms</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Threat Level
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    service.threatLevel < 3
                      ? 'bg-ghost-neon-green'
                      : service.threatLevel < 6
                      ? 'bg-ghost-neon-yellow'
                      : 'bg-ghost-neon-red'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(service.threatLevel / 10) * 100}%` }}
                  transition={{ delay: delay + 0.2 }}
                />
              </div>
              <span className="font-mono text-xs">{service.threatLevel}/10</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400">AI Confidence</span>
            <span className="font-mono text-ghost-neon-blue">{service.aiConfidence}%</span>
          </div>

          <div className="pt-2 border-t border-white/10">
            <span className="text-xs text-gray-500">Region: {service.region}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

