import { motion } from 'framer-motion'
import { DollarSign, Database, Shield, TrendingUp, Users, Globe } from 'lucide-react'
import { valueMetrics } from '../data/mockData'
import IntelligenceValuePanel from '../components/IntelligenceValuePanel'

export default function ValueMetrics() {
  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Value Metrics</h1>
        <p className="text-gray-400">Data Commodity & Revenue Intelligence</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <h2 className="text-xl font-bold mb-6 text-ghost-neon-blue flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Performance Metrics
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-8 h-8 text-ghost-neon-blue" />
                <div>
                  <div className="text-sm text-gray-400">Data Processed</div>
                  <div className="text-2xl font-bold">{valueMetrics.dataProcessed}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Real-time processing capacity</div>
            </div>

            <div className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-8 h-8 text-ghost-neon-green" />
                <div>
                  <div className="text-sm text-gray-400">Threats Neutralized</div>
                  <div className="text-2xl font-bold">{valueMetrics.threatsNeutralized.toLocaleString()}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Total successful interventions</div>
            </div>

            <div className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-ghost-neon-yellow" />
                <div>
                  <div className="text-sm text-gray-400">System Uptime</div>
                  <div className="text-2xl font-bold">{valueMetrics.uptime}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Mission-critical availability</div>
            </div>

            <div className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8 text-ghost-neon-blue" />
                <div>
                  <div className="text-sm text-gray-400">Active Subscriptions</div>
                  <div className="text-2xl font-bold">{valueMetrics.activeSubscriptions}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Enterprise clients</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Revenue Streams
            </h3>
            <div className="space-y-2">
              {valueMetrics.revenueStreams.map((stream, index) => (
                <div
                  key={index}
                  className="p-3 bg-ghost-blue/30 rounded border border-white/10"
                >
                  <div className="text-sm font-bold">{stream}</div>
                  <div className="text-xs text-gray-400 mt-1">Active revenue channel</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Syndication Partners
            </h3>
            <div className="text-3xl font-bold mb-2">{valueMetrics.syndicationPartners}</div>
            <div className="text-xs text-gray-400">Data syndication network</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Data Commodity</h3>
            <p className="text-xs text-gray-400 mb-3">
              Threat intelligence and infrastructure monitoring data available for syndication.
            </p>
            <div className="p-2 bg-ghost-neon-green/10 border border-ghost-neon-green/30 rounded text-xs">
              <div className="font-bold mb-1">Market Value</div>
              <div className="text-gray-400">High-demand intelligence commodity</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <IntelligenceValuePanel />
      </motion.div>
    </div>
  )
}
