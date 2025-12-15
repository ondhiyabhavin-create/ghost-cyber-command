import { useState } from 'react'
import { motion } from 'framer-motion'
import { initialIncidents } from '../data/mockData'
import { Clock, Shield, Zap, CheckCircle, AlertCircle, Wifi, Truck } from 'lucide-react'
import { Incident } from '../data/mockData'
import FieldResponseCard from '../components/FieldResponseCard'

const statusIcons = {
  detected: AlertCircle,
  contained: Shield,
  counter_attack: Zap,
  neutralized: CheckCircle,
}

const statusColors = {
  detected: 'text-ghost-neon-red',
  contained: 'text-ghost-neon-yellow',
  counter_attack: 'text-ghost-neon-blue',
  neutralized: 'text-ghost-neon-green',
}

export default function OpenIncidents() {
  const [incidents] = useState(initialIncidents)
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    incidents[0] || null
  )
  const [responseMode, setResponseMode] = useState<'remote' | 'hardware'>('remote')

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Open Incidents</h1>
        <p className="text-gray-400">Incident Response & Management System</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h2 className="text-lg font-bold mb-4 text-ghost-neon-blue">
              Active Incidents ({incidents.filter((i) => i.status !== 'neutralized').length})
            </h2>
            <div className="space-y-2">
              {incidents.map((incident) => (
                <motion.button
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedIncident?.id === incident.id
                      ? 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50'
                      : 'bg-ghost-blue/30 border-white/10 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold">{incident.id}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        incident.status === 'detected'
                          ? 'bg-ghost-neon-red/20 text-ghost-neon-red'
                          : incident.status === 'contained'
                          ? 'bg-ghost-neon-yellow/20 text-ghost-neon-yellow'
                          : incident.status === 'counter_attack'
                          ? 'bg-ghost-neon-blue/20 text-ghost-neon-blue'
                          : 'bg-ghost-neon-green/20 text-ghost-neon-green'
                      }`}
                    >
                      {incident.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {incident.affectedRegion} • {incident.attackType}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {selectedIncident && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedIncident.id}</h2>
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = statusIcons[selectedIncident.status]
                    return (
                      <Icon
                        className={`w-6 h-6 ${statusColors[selectedIncident.status]}`}
                      />
                    )
                  })()}
                  <span className={`font-bold ${statusColors[selectedIncident.status]}`}>
                    {selectedIncident.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Response Mode Tabs */}
              {selectedIncident.requiresHardware && (
                <div className="mb-6">
                  <div className="flex gap-2 border-b border-white/10">
                    <button
                      onClick={() => setResponseMode('remote')}
                      className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                        responseMode === 'remote'
                          ? 'text-ghost-neon-blue border-b-2 border-ghost-neon-blue'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Wifi className="w-4 h-4" />
                      Remote Cyber Mitigation
                    </button>
                    <button
                      onClick={() => setResponseMode('hardware')}
                      className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                        responseMode === 'hardware'
                          ? 'text-ghost-neon-blue border-b-2 border-ghost-neon-blue'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      Hardware Dispatch
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-400 text-sm">Affected Region</span>
                  <p className="font-bold">{selectedIncident.affectedRegion}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Attack Type</span>
                  <p className="font-bold text-ghost-neon-red">{selectedIncident.attackType}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Department</span>
                  <p className="font-bold">{selectedIncident.assignedDepartment}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Response Team</span>
                  <p className="font-bold">{selectedIncident.assignedTeam}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-ghost-neon-blue">
                  Affected Infrastructure
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIncident.affectedInfrastructure.map((infra) => (
                    <span
                      key={infra}
                      className="px-3 py-1 bg-ghost-neon-red/20 border border-ghost-neon-red/50 rounded text-sm"
                    >
                      {infra}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-ghost-neon-blue">Source IPs</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIncident.sourceIPs.map((ip) => (
                    <span
                      key={ip}
                      className="px-3 py-1 bg-ghost-blue/50 border border-ghost-neon-blue/50 rounded font-mono text-sm"
                    >
                      {ip}
                    </span>
                  ))}
                </div>
              </div>

              {responseMode === 'hardware' && selectedIncident.requiresHardware && selectedIncident.fieldResponse ? (
                <div className="mb-6">
                  <FieldResponseCard fieldResponse={selectedIncident.fieldResponse} />
                </div>
              ) : responseMode === 'remote' ? (
                <div className="mb-6 p-4 bg-ghost-blue/30 rounded-lg border border-white/10">
                  <h3 className="text-lg font-bold mb-3 text-ghost-neon-blue flex items-center gap-2">
                    <Wifi className="w-5 h-5" />
                    Remote Cyber Mitigation
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Network Isolation</span>
                      <span className="font-bold text-ghost-neon-green">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Traffic Filtering</span>
                      <span className="font-bold text-ghost-neon-green">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">AI Countermeasures</span>
                      <span className="font-bold text-ghost-neon-blue">DEPLOYED</span>
                    </div>
                  </div>
                </div>
              ) : null}

              <div>
                <h3 className="text-lg font-bold mb-3 text-ghost-neon-blue flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timeline
                </h3>
                <div className="space-y-3">
                  {selectedIncident.timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-ghost-blue/30 rounded border border-white/10"
                    >
                      <div className="w-2 h-2 bg-ghost-neon-blue rounded-full" />
                      <div className="flex-1">
                        <span className="font-bold">{event.stage}</span>
                        <span className="text-gray-400 text-sm ml-2">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
