import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Shield, Zap, CheckCircle, AlertCircle, Wifi, Truck, Lock, ArrowUp } from 'lucide-react'
import { Incident } from '../data/mockData'
import { useIncidents } from '../context/IncidentsContext'
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
  const { incidents, secureIncident, escalateToCounterAttack, upgradeStatus } = useIncidents()
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    incidents[0] || null
  )
  const [responseMode, setResponseMode] = useState<'remote' | 'hardware'>('remote')

  // Update selected incident when incidents change
  useEffect(() => {
    if (selectedIncident) {
      const updated = incidents.find((inc) => inc.id === selectedIncident.id)
      if (updated) {
        setSelectedIncident(updated)
      }
    } else if (incidents.length > 0 && !selectedIncident) {
      setSelectedIncident(incidents[0])
    }
  }, [incidents, selectedIncident])

  const handleSecureIncident = (incidentId: string) => {
    secureIncident(incidentId)
    const updated = incidents.find((inc) => inc.id === incidentId)
    if (updated) {
      setSelectedIncident({ ...updated, status: 'neutralized' })
    }
  }

  const handleCounterAttack = (incidentId: string) => {
    escalateToCounterAttack(incidentId)
    const updated = incidents.find((inc) => inc.id === incidentId)
    if (updated) {
      setSelectedIncident({ ...updated, status: 'counter_attack' })
    }
  }

  const handleUpgradeStatus = (incidentId: string, newStatus: Incident['status']) => {
    upgradeStatus(incidentId, newStatus)
    const updated = incidents.find((inc) => inc.id === incidentId)
    if (updated) {
      setSelectedIncident({ ...updated, status: newStatus })
    }
  }

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
              {incidents.map((incident) => {
                const updatedIncident = incidents.find((inc) => inc.id === incident.id) || incident
                return (
                  <motion.button
                    key={incident.id}
                    onClick={() => setSelectedIncident(updatedIncident)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedIncident?.id === incident.id
                        ? 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50'
                        : 'bg-ghost-blue/30 border-white/10 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold">{updatedIncident.id}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          updatedIncident.status === 'detected'
                            ? 'bg-ghost-neon-red/20 text-ghost-neon-red'
                            : updatedIncident.status === 'contained'
                            ? 'bg-ghost-neon-yellow/20 text-ghost-neon-yellow'
                            : updatedIncident.status === 'counter_attack'
                            ? 'bg-ghost-neon-blue/20 text-ghost-neon-blue'
                            : 'bg-ghost-neon-green/20 text-ghost-neon-green'
                        }`}
                      >
                        {updatedIncident.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {updatedIncident.affectedRegion} • {updatedIncident.attackType}
                    </div>
                  </motion.button>
                )
              })}
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

              {/* Action Buttons */}
              {selectedIncident.status !== 'neutralized' && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="space-y-4">
                    {/* Status Upgrade Buttons */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 mb-2">Upgrade Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedIncident.status === 'detected' && (
                          <motion.button
                            onClick={() => handleUpgradeStatus(selectedIncident.id, 'contained')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-ghost-neon-yellow/20 border border-ghost-neon-yellow/50 rounded-lg hover:bg-ghost-neon-yellow/30 transition-colors flex items-center gap-2"
                          >
                            <ArrowUp className="w-4 h-4 text-ghost-neon-yellow" />
                            <span className="text-sm font-bold text-ghost-neon-yellow">Contain</span>
                          </motion.button>
                        )}
                        {selectedIncident.status === 'contained' && (
                          <motion.button
                            onClick={() => handleCounterAttack(selectedIncident.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg hover:bg-ghost-neon-blue/30 transition-colors flex items-center gap-2"
                          >
                            <Zap className="w-4 h-4 text-ghost-neon-blue" />
                            <span className="text-sm font-bold text-ghost-neon-blue">Counter-Attack</span>
                          </motion.button>
                        )}
                        {selectedIncident.status === 'counter_attack' && (
                          <motion.button
                            onClick={() => handleSecureIncident(selectedIncident.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-ghost-neon-green/20 border border-ghost-neon-green/50 rounded-lg hover:bg-ghost-neon-green/30 transition-colors flex items-center gap-2"
                          >
                            <Lock className="w-4 h-4 text-ghost-neon-green" />
                            <span className="text-sm font-bold text-ghost-neon-green">Secure</span>
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Quick Secure Button (always available) */}
                    <motion.button
                      onClick={() => handleSecureIncident(selectedIncident.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-ghost-neon-green/20 border border-ghost-neon-green/50 rounded-lg hover:bg-ghost-neon-green/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock className="w-5 h-5 text-ghost-neon-green" />
                      <span className="font-bold text-ghost-neon-green">Secure Incident</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
