import { motion } from 'framer-motion'
import { Database, Shield, Zap, Globe, TrendingUp, Activity } from 'lucide-react'

export default function IntelligenceValuePanel() {
  const metrics = {
    dataStreamsMonitored: 1247,
    incidentsPrevented: 342,
    decisionLatencyReduced: '87%',
    nationalCoverage: '98.5%',
    threatIntelligenceValue: '2.4 PB',
    responseTimeImprovement: '3.2x',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-ghost-neon-blue flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Intelligence Value Metrics
        </h2>
        <div className="text-xs text-gray-400">Read-Only Intelligence Dashboard</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-ghost-neon-blue/20 rounded-lg">
              <Database className="w-6 h-6 text-ghost-neon-blue" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Data Streams Monitored</div>
              <div className="text-2xl font-bold">{metrics.dataStreamsMonitored.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Real-time intelligence feeds</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-ghost-neon-green/20 rounded-lg">
              <Shield className="w-6 h-6 text-ghost-neon-green" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Incidents Prevented</div>
              <div className="text-2xl font-bold">{metrics.incidentsPrevented}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Proactive threat neutralization</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-ghost-neon-yellow/20 rounded-lg">
              <Zap className="w-6 h-6 text-ghost-neon-yellow" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Decision Latency Reduced</div>
              <div className="text-2xl font-bold">{metrics.decisionLatencyReduced}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Faster response times</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-ghost-neon-blue/20 rounded-lg">
              <Globe className="w-6 h-6 text-ghost-neon-blue" />
            </div>
            <div>
              <div className="text-sm text-gray-400">National Coverage</div>
              <div className="text-2xl font-bold">{metrics.nationalCoverage}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Infrastructure monitoring</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Threat Intelligence</div>
              <div className="text-2xl font-bold">{metrics.threatIntelligenceValue}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Processed data volume</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-ghost-neon-green/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-ghost-neon-green" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Response Improvement</div>
              <div className="text-2xl font-bold">{metrics.responseTimeImprovement}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Faster than baseline</div>
        </motion.div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold mb-1">Strategic Value</div>
            <div className="text-xs text-gray-400">
              Intelligence-driven decision making for national security operations
            </div>
          </div>
          <div className="px-4 py-2 bg-ghost-neon-green/10 border border-ghost-neon-green/30 rounded">
            <div className="text-xs font-bold text-ghost-neon-green">MISSION CRITICAL</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

