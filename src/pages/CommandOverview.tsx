import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initialServices, regions } from '../data/mockData'
import ServiceHealthCard from '../components/ServiceHealthCard'
import ThreatMap from '../components/ThreatMap'
import IncidentAlert from '../components/IncidentAlert'
import StrategicBroadcastConsole from '../components/StrategicBroadcastConsole'
import Logo from '../components/Logo'
import { Incident } from '../data/mockData'
import { Brain, Zap, Shield, Activity } from 'lucide-react'

export default function CommandOverview() {
  const [services, setServices] = useState(initialServices)
  const [alertIncident, setAlertIncident] = useState<Incident | null>(null)
  const [autonomousActions] = useState([
    {
      id: '1',
      type: 'auto_mitigation',
      description: 'AI automatically blocked 47 malicious IPs',
      timestamp: new Date(Date.now() - 120000),
      status: 'completed',
    },
    {
      id: '2',
      type: 'auto_alert',
      description: 'Autonomous alert sent to DHS CISA',
      timestamp: new Date(Date.now() - 300000),
      status: 'completed',
    },
    {
      id: '3',
      type: 'auto_response',
      description: 'AI initiated counter-measures on Power Grid',
      timestamp: new Date(Date.now() - 600000),
      status: 'in_progress',
    },
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setServices((prev) =>
        prev.map((service) => {
          // Random status changes for demo
          if (Math.random() > 0.95) {
            const newStatus =
              service.status === 'healthy'
                ? 'degraded'
                : service.status === 'degraded'
                ? 'under_attack'
                : 'healthy'
            
            if (newStatus === 'under_attack') {
              // Auto-trigger incident
              const requiresHardware = service.name === 'Power Grid' || service.name === 'Supply Chain'
              const newIncident: Incident = {
                id: `INC-${Date.now()}`,
                affectedRegion: service.region,
                affectedInfrastructure: [service.name],
                attackType: 'DDoS',
                sourceIPs: [`192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`],
                status: 'detected',
                detectedAt: new Date().toISOString(),
                assignedDepartment: requiresHardware ? 'Hardware Ops' : 'Cyber Ops',
                assignedTeam: requiresHardware ? 'Field Team Delta' : 'Alpha Team',
                eta: new Date(Date.now() + 3600000).toISOString(),
                requiresHardware,
                timeline: [{ stage: 'Detected', timestamp: new Date().toISOString() }],
              }
              setAlertIncident(newIncident)
            }
            
            return {
              ...service,
              status: newStatus,
              latency: newStatus === 'under_attack' ? 150 : service.latency,
              threatLevel: newStatus === 'under_attack' ? 9 : service.threatLevel,
            }
          }
          return service
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold neon-blue mb-2">Command Overview</h1>
          <p className="text-gray-400">Common Operating Picture — Real-Time Infrastructure Monitoring</p>
        </div>
        <div className="hidden lg:block">
          <Logo />
        </div>
      </motion.div>

      <AnimatePresence>
        {alertIncident && (
          <IncidentAlert
            incident={alertIncident}
            onClose={() => setAlertIncident(null)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[500px] bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue">National Infrastructure Map</h2>
            <ThreatMap regions={regions} services={services} />
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h2 className="text-lg font-bold mb-4 text-ghost-neon-blue">System Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Services</span>
                <span className="font-bold">{services.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Operational</span>
                <span className="font-bold text-ghost-neon-green">
                  {services.filter((s) => s.status === 'healthy').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Under Attack</span>
                <span className="font-bold text-ghost-neon-red">
                  {services.filter((s) => s.status === 'under_attack').length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue">Service Health Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceHealthCard key={service.id} service={service} delay={index * 0.1} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <StrategicBroadcastConsole />
      </motion.div>

      {/* Autonomous Crisis Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <div className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ghost-neon-blue flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Autonomous Crisis Management
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse" />
              <span className="text-sm font-bold text-ghost-neon-green">AI ACTIVE</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            AI-driven autonomous responses and decision-making for crisis management, indication & warning, and broadcasting services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                label: 'Auto-Responses',
                value: '127',
                icon: Zap,
                color: 'text-ghost-neon-blue',
                description: 'Autonomous actions taken',
              },
              {
                label: 'Threats Mitigated',
                value: '89',
                icon: Shield,
                color: 'text-ghost-neon-green',
                description: 'AI-blocked attacks',
              },
              {
                label: 'Decision Latency',
                value: '0.8s',
                icon: Activity,
                color: 'text-ghost-neon-yellow',
                description: 'Avg response time',
              },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-ghost-blue/30 rounded-lg border border-white/10 p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs text-gray-400">{stat.label}</span>
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </motion.div>
              )
            })}
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-ghost-neon-blue">Recent Autonomous Actions</h3>
            <div className="space-y-2">
              {autonomousActions.map((action) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-ghost-blue/30 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-ghost-neon-blue" />
                    <div>
                      <p className="text-sm font-bold">{action.description}</p>
                      <p className="text-xs text-gray-500">
                        {action.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      action.status === 'completed'
                        ? 'bg-ghost-neon-green/20 text-ghost-neon-green'
                        : 'bg-ghost-neon-yellow/20 text-ghost-neon-yellow'
                    }`}
                  >
                    {action.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
