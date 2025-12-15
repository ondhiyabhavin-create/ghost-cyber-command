import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Vote, MapPin, Activity, Clock } from 'lucide-react'

interface ElectionThreat {
  id: string
  type: 'voting_system' | 'registration' | 'disinformation' | 'infrastructure'
  severity: 'low' | 'medium' | 'high' | 'critical'
  location: string
  description: string
  detectedAt: Date
  status: 'detected' | 'investigating' | 'mitigated' | 'resolved'
}

export default function ElectionSecurity() {
  const [threats] = useState<ElectionThreat[]>([
    {
      id: '1',
      type: 'voting_system',
      severity: 'high',
      location: 'Nevada - Clark County',
      description: 'Unauthorized access attempt detected on voting machine network',
      detectedAt: new Date(Date.now() - 1800000),
      status: 'investigating',
    },
    {
      id: '2',
      type: 'disinformation',
      severity: 'critical',
      location: 'National - Social Media',
      description: 'Coordinated disinformation campaign targeting election integrity',
      detectedAt: new Date(Date.now() - 3600000),
      status: 'mitigated',
    },
    {
      id: '3',
      type: 'registration',
      severity: 'medium',
      location: 'Georgia - Fulton County',
      description: 'Suspicious voter registration activity detected',
      detectedAt: new Date(Date.now() - 7200000),
      status: 'resolved',
    },
  ])

  const [electionStatus, setElectionStatus] = useState({
    totalPrecincts: 18750,
    monitoredPrecincts: 18750,
    activeThreats: threats.filter((t) => t.status !== 'resolved').length,
    systemsOperational: 98.7,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setElectionStatus((prev) => ({
        ...prev,
        activeThreats: threats.filter((t) => t.status !== 'resolved').length,
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [threats])

  const threatTypeIcons = {
    voting_system: Shield,
    registration: Vote,
    disinformation: AlertTriangle,
    infrastructure: Activity,
  }

  const severityColors = {
    low: 'text-ghost-neon-green',
    medium: 'text-ghost-neon-yellow',
    high: 'text-ghost-neon-red',
    critical: 'text-red-500',
  }

  const statusColors = {
    detected: 'bg-ghost-neon-red/20 border-ghost-neon-red/50',
    investigating: 'bg-ghost-neon-yellow/20 border-ghost-neon-yellow/50',
    mitigated: 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50',
    resolved: 'bg-ghost-neon-green/20 border-ghost-neon-green/50',
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Election Security</h1>
        <p className="text-gray-400">Election Infrastructure Monitoring & Threat Detection</p>
      </motion.div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Precincts',
            value: electionStatus.totalPrecincts.toLocaleString(),
            icon: MapPin,
            color: 'text-ghost-neon-blue',
          },
          {
            label: 'Monitored',
            value: `${((electionStatus.monitoredPrecincts / electionStatus.totalPrecincts) * 100).toFixed(1)}%`,
            icon: CheckCircle,
            color: 'text-ghost-neon-green',
          },
          {
            label: 'Active Threats',
            value: electionStatus.activeThreats,
            icon: AlertTriangle,
            color: 'text-ghost-neon-red',
          },
          {
            label: 'Systems Operational',
            value: `${electionStatus.systemsOperational}%`,
            icon: Activity,
            color: 'text-ghost-neon-green',
          },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Active Election Threats
            </h2>

            <div className="space-y-3">
              {threats.map((threat) => {
                const ThreatIcon = threatTypeIcons[threat.type]
                return (
                  <motion.div
                    key={threat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border ${statusColors[threat.status]}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <ThreatIcon className={`w-6 h-6 ${severityColors[threat.severity]}`} />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold capitalize">
                              {threat.type.replace('_', ' ')}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded capitalize ${severityColors[threat.severity]}`}
                            >
                              {threat.severity}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4" />
                            {threat.location}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{threat.status}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{threat.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      Detected: {threat.detectedAt.toLocaleString()}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Threat Categories</h3>
            <div className="space-y-2">
              {Object.entries(threatTypeIcons).map(([type, Icon]) => {
                const count = threats.filter((t) => t.type === type).length
                return (
                  <div
                    key={type}
                    className="flex items-center justify-between p-2 bg-ghost-blue/30 rounded border border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-ghost-neon-blue" />
                      <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
                    </div>
                    <span className="text-xs font-bold">{count}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Security Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Voting Systems</span>
                <span className="text-sm font-bold text-ghost-neon-green">SECURE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Registration DB</span>
                <span className="text-sm font-bold text-ghost-neon-green">SECURE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Network Infrastructure</span>
                <span className="text-sm font-bold text-ghost-neon-yellow">MONITORING</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

