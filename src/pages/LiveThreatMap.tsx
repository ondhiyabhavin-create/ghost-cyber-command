import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { initialThreats, regions } from '../data/mockData'
import { Shield, X, Zap, AlertTriangle } from 'lucide-react'
import { Threat } from '../data/mockData'
import EscalationMeter from '../components/EscalationMeter'

export default function LiveThreatMap() {
  const [threats, setThreats] = useState(initialThreats)
  const [nationalAlert, setNationalAlert] = useState(false)

  useEffect(() => {
    // Check for national alert (Level 3+)
    const hasNationalAlert = threats.some((t) => t.escalationState >= 3 && !t.isBlocked)
    setNationalAlert(hasNationalAlert)
  }, [threats])

  useEffect(() => {
    // Auto-escalate threats when same IP appears across multiple regions
    const ipCounts = new Map<string, number>()
    threats.forEach((t) => {
      if (!t.isBlocked) {
        ipCounts.set(t.sourceIP, (ipCounts.get(t.sourceIP) || 0) + 1)
      }
    })

    setThreats((prev) =>
      prev.map((t) => {
        if (t.isBlocked) return t
        const count = ipCounts.get(t.sourceIP) || 1
        let newState = t.escalationState

        if (count >= 3 && t.affectedRegions.length >= 3) {
          newState = 4 // Strategic/State-Level
        } else if (count >= 2 && t.affectedRegions.length >= 2) {
          newState = Math.max(t.escalationState, 3) // National
        } else if (count >= 2) {
          newState = Math.max(t.escalationState, 2) // Coordinated
        }

        return { ...t, escalationState: newState as 1 | 2 | 3 | 4 }
      })
    )
  }, [])

  const handleBlockIP = (threatId: string) => {
    setThreats((prev) =>
      prev.map((t) =>
        t.id === threatId ? { ...t, isBlocked: true } : t
      )
    )
  }

  const handleCountermeasure = (threatId: string) => {
    setThreats((prev) =>
      prev.map((t) =>
        t.id === threatId ? { ...t, isBlocked: true, severity: 'low' as const } : t
      )
    )
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Live Threat Map</h1>
        <p className="text-gray-400">Real-Time Attack Visualization & IP Intelligence</p>
      </motion.div>

      {nationalAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-500/20 glass border-2 border-purple-500 rounded-lg p-4 mb-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <AlertTriangle className="w-6 h-6 text-purple-400" />
            </motion.div>
            <div>
              <h3 className="font-bold text-purple-300 text-lg">NATIONAL ALERT</h3>
              <p className="text-sm text-purple-200">
                Level 3+ escalation detected. Strategic threat assessment required.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[600px] bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6 relative overflow-hidden"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue">Global Threat Visualization</h2>
            
            <div className="relative w-full h-full">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* World map outline (simplified) */}
                <path
                  d="M 10 20 L 30 15 L 50 20 L 70 18 L 85 25 L 90 40 L 85 55 L 75 65 L 60 70 L 45 68 L 30 72 L 15 65 L 8 50 L 5 35 Z"
                  fill="rgba(0, 212, 255, 0.05)"
                  stroke="rgba(0, 212, 255, 0.2)"
                  strokeWidth="0.5"
                />

                {regions.map((region) => (
                  <circle
                    key={region.id}
                    cx={region.coordinates.x}
                    cy={region.coordinates.y}
                    r="2"
                    fill="rgba(0, 212, 255, 0.3)"
                  />
                ))}

                {threats.map((threat, index) => {
                  const region = regions.find((r) => threat.targetRegion.includes(r.name))
                  if (!region) return null

                  const severityColors = {
                    low: '#00ff88',
                    medium: '#ffd700',
                    high: '#ff8800',
                    critical: '#ff0040',
                  }

                  const escalationColors = {
                    localized: '#ff8800',
                    coordinated: '#ff0040',
                    multi_region: '#ff00ff',
                  }

                  const originX = 20 + (index % 3) * 25
                  const originY = 15 + Math.floor(index / 3) * 30

                  return (
                    <g key={threat.id}>
                      {/* Multi-region attack visualization */}
                      {threat.escalationLevel === 'multi_region' && threat.affectedRegions.map((regName, regIndex) => {
                        const affectedRegion = regions.find((r) => regName.includes(r.name))
                        if (!affectedRegion) return null
                        return (
                          <motion.line
                            key={`multi-${regIndex}`}
                            x1={originX}
                            y1={originY}
                            x2={affectedRegion.coordinates.x}
                            y2={affectedRegion.coordinates.y}
                            stroke={escalationColors[threat.escalationLevel]}
                            strokeWidth="0.8"
                            strokeDasharray="2 1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: regIndex * 0.2,
                            }}
                          />
                        )
                      })}

                      {/* Coordinated attack indicator */}
                      {threat.escalationLevel === 'coordinated' && (
                        <motion.circle
                          cx={originX}
                          cy={originY}
                          r={3}
                          fill="none"
                          stroke={escalationColors[threat.escalationLevel]}
                          strokeWidth="0.5"
                          animate={{
                            r: [3, 6, 3],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}

                      {/* Attack line */}
                      {!threat.isBlocked && (
                        <motion.line
                          x1={originX}
                          y1={originY}
                          x2={region.coordinates.x}
                          y2={region.coordinates.y}
                          stroke={threat.escalationLevel === 'multi_region' ? escalationColors[threat.escalationLevel] : severityColors[threat.severity]}
                          strokeWidth={threat.escalationLevel === 'multi_region' ? "0.8" : "0.5"}
                          strokeDasharray="1 1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                      )}

                      {/* Origin point */}
                      <motion.circle
                        cx={originX}
                        cy={originY}
                        r={threat.isBlocked ? 1 : 1.5}
                        fill={threat.isBlocked ? '#666' : severityColors[threat.severity]}
                        animate={
                          threat.isBlocked
                            ? {}
                            : {
                                r: [1.5, 2.5, 1.5],
                                opacity: [0.7, 1, 0.7],
                              }
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />

                      {/* Target point */}
                      <motion.circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r={threat.isBlocked ? 1.5 : 2}
                        fill={threat.isBlocked ? '#666' : severityColors[threat.severity]}
                        animate={
                          threat.isBlocked
                            ? {}
                            : {
                                r: [2, 3.5, 2],
                                opacity: [0.7, 1, 0.7],
                              }
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />

                      {threat.isBlocked && (
                        <motion.text
                          x={(originX + region.coordinates.x) / 2}
                          y={(originY + region.coordinates.y) / 2}
                          fontSize="2"
                          fill="#00ff88"
                          textAnchor="middle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          BLOCKED
                        </motion.text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Active Threats</h3>
            <div className="space-y-3">
              {threats.map((threat) => (
                <div
                  key={threat.id}
                  className={`p-3 rounded-lg border ${
                    threat.isBlocked
                      ? 'bg-gray-800/50 border-gray-600'
                      : threat.severity === 'critical'
                      ? 'bg-ghost-neon-red/20 border-ghost-neon-red/50'
                      : 'bg-ghost-blue/30 border-ghost-neon-blue/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm">{threat.sourceIP}</span>
                    {threat.isBlocked && (
                      <span className="text-xs text-ghost-neon-green">BLOCKED</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {threat.attackType} → {threat.targetRegion}
                  </div>
                  <div className="mt-2">
                    <EscalationMeter threat={threat} />
                  </div>
                  {threat.escalationLevel === 'multi_region' && (
                    <div className="text-xs text-gray-500 mt-1">
                      {threat.attackCount} attacks, {threat.affectedRegions.length} regions
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    {!threat.isBlocked && (
                      <>
                        <button
                          onClick={() => handleBlockIP(threat.id)}
                          className="flex-1 px-2 py-1 text-xs bg-ghost-neon-red/20 border border-ghost-neon-red/50 rounded hover:bg-ghost-neon-red/30 transition-colors"
                        >
                          <Shield className="w-3 h-3 inline mr-1" />
                          Block
                        </button>
                        <button
                          onClick={() => handleCountermeasure(threat.id)}
                          className="flex-1 px-2 py-1 text-xs bg-ghost-neon-yellow/20 border border-ghost-neon-yellow/50 rounded hover:bg-ghost-neon-yellow/30 transition-colors"
                        >
                          <Zap className="w-3 h-3 inline mr-1" />
                          Counter
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
