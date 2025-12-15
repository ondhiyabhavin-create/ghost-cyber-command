import { motion } from 'framer-motion'
import { MapPin, Truck, Wrench, CheckCircle, Clock } from 'lucide-react'
import { FieldResponse } from '../data/mockData'

interface FieldResponseCardProps {
  fieldResponse: FieldResponse
}

const statusConfig = {
  dispatched: { icon: Truck, color: 'text-ghost-neon-blue', label: 'DISPATCHED' },
  en_route: { icon: Truck, color: 'text-ghost-neon-yellow', label: 'EN ROUTE' },
  on_site: { icon: MapPin, color: 'text-ghost-neon-yellow', label: 'ON SITE' },
  repairing: { icon: Wrench, color: 'text-ghost-neon-blue', label: 'REPAIRING' },
  completed: { icon: CheckCircle, color: 'text-ghost-neon-green', label: 'COMPLETED' },
}

export default function FieldResponseCard({ fieldResponse }: FieldResponseCardProps) {
  const config = statusConfig[fieldResponse.status]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-ghost-neon-blue flex items-center gap-2">
          <Icon className={`w-6 h-6 ${config.color}`} />
          Field Response Team
        </h3>
        <span className={`text-xs px-3 py-1 rounded font-bold ${config.color} bg-opacity-20`}>
          {config.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-gray-400">Team</span>
          <p className="font-bold">{fieldResponse.teamName}</p>
        </div>
        <div>
          <span className="text-sm text-gray-400">Location</span>
          <p className="font-bold flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {fieldResponse.location}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-400">Response Type</span>
          <p className="font-bold">
            {fieldResponse.responseType === 'on_site' ? 'On-Site Repair' : 'Remote Fix'}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-400">ETA</span>
          <p className="font-bold flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {new Date(fieldResponse.eta).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {fieldResponse.status === 'repairing' || fieldResponse.status === 'on_site' ? (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Repair Progress</span>
            <span className="font-bold">{fieldResponse.repairProgress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-ghost-neon-blue to-ghost-neon-green"
              initial={{ width: 0 }}
              animate={{ width: `${fieldResponse.repairProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      ) : null}

      {/* Vehicle Movement Visualization */}
      {(fieldResponse.status === 'en_route' || fieldResponse.status === 'on_site') && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="relative h-24 bg-ghost-dark rounded-lg border border-white/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs text-gray-500">Route Visualization</div>
            </div>
            {fieldResponse.status === 'en_route' && (
              <motion.div
                className="absolute top-1/2 left-0"
                animate={{
                  x: ['0%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Truck className="w-6 h-6 text-ghost-neon-yellow" />
              </motion.div>
            )}
            {fieldResponse.status === 'on_site' && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <MapPin className="w-8 h-8 text-ghost-neon-green" />
              </motion.div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-gray-400">
          Dispatched: {new Date(fieldResponse.dispatchTime).toLocaleString()}
        </div>
      </div>
    </motion.div>
  )
}
