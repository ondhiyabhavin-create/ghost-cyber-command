import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, FileSearch, BarChart3, TrendingUp } from 'lucide-react'

export default function DefensiveOps() {
  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Defensive Operations</h1>
        <p className="text-gray-400">Sicilian Defense - NCD Protection with Vulnerability Assessment & Risk Management</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[600px] bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6 relative overflow-hidden"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue">NCD Defense Visualization</h2>
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central Core (The King) */}
              <motion.div
                className="absolute z-20"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <div className="w-32 h-32 bg-ghost-neon-green/20 border-4 border-ghost-neon-green rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-ghost-neon-green/30 border-2 border-ghost-neon-green rounded-full flex items-center justify-center">
                    <Shield className="w-12 h-12 text-ghost-neon-green" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-ghost-neon-green">NCD CORE</span>
                </div>
              </motion.div>

              {/* Defensive Rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute border-2 border-ghost-neon-blue/30 rounded-full"
                  style={{
                    width: `${150 + ring * 80}px`,
                    height: `${150 + ring * 80}px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20 + ring * 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}

              {/* Moving Shields */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((shield) => (
                <motion.div
                  key={shield}
                  className="absolute"
                  style={{
                    transformOrigin: 'center',
                  }}
                  animate={{
                    rotate: [shield * 45, shield * 45 + 360],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    className="w-16 h-16 bg-ghost-neon-blue/20 border-2 border-ghost-neon-blue rounded-lg flex items-center justify-center"
                    style={{
                      transform: `translateY(-${120}px)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: shield * 0.25,
                    }}
                  >
                    <Shield className="w-8 h-8 text-ghost-neon-blue" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Threat Vectors (being deflected) */}
              {[0, 1, 2].map((threat) => (
                <motion.div
                  key={threat}
                  className="absolute"
                  animate={{
                    x: [
                      Math.cos(threat * 120) * 100,
                      Math.cos(threat * 120) * 150,
                      Math.cos(threat * 120) * 100,
                    ],
                    y: [
                      Math.sin(threat * 120) * 100,
                      Math.sin(threat * 120) * 150,
                      Math.sin(threat * 120) * 100,
                    ],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: threat * 1,
                  }}
                >
                  <AlertTriangle className="w-6 h-6 text-ghost-neon-red" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Defense Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">NCD Core</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-ghost-neon-green" />
                  <span className="text-sm font-bold text-ghost-neon-green">SECURED</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Defensive Rings</span>
                <span className="text-sm font-bold text-ghost-neon-green">3 ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Shield Units</span>
                <span className="text-sm font-bold text-ghost-neon-green">8 DEPLOYED</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <FileSearch className="w-5 h-5" />
              Continuous Incident Monitoring
            </h3>
            <div className="space-y-2">
              <div className="p-2 bg-ghost-blue/30 rounded border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Internal Controls</div>
                <div className="text-sm font-bold text-ghost-neon-green">Effective</div>
              </div>
              <div className="p-2 bg-ghost-blue/30 rounded border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Network Operators Training</div>
                <div className="text-sm font-bold">Proficient</div>
              </div>
              <div className="p-2 bg-ghost-blue/30 rounded border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Data Sources Tracked</div>
                <div className="text-sm font-bold">247 Active</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <FileSearch className="w-5 h-5" />
              Vulnerability Assessment
            </h3>
            <div className="space-y-2">
              <div className="p-2 bg-ghost-blue/30 rounded border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Lifecycle Vulnerabilities</div>
                <div className="text-sm font-bold">12 Identified</div>
              </div>
              <div className="p-2 bg-ghost-blue/30 rounded border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Exploitation Likelihood</div>
                <div className="text-sm font-bold text-ghost-neon-yellow">Low-Medium</div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs text-gray-400">
                  Last Scan: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Risk Management Framework
            </h3>
            <div className="space-y-2">
              <div className="p-2 bg-ghost-blue/30 rounded border border-white/10">
                <div className="text-xs text-gray-400 mb-1">End-to-End Network Risks</div>
                <div className="text-sm font-bold text-ghost-neon-green">Mapped</div>
              </div>
              <div className="p-2 bg-ghost-blue/30 rounded border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Supply Chain Risks</div>
                <div className="text-sm font-bold">Assessed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Cost-Benefit Prioritization
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Risk Probability</span>
                <span className="font-bold">12%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Priority Level</span>
                <span className="font-bold text-ghost-neon-yellow">Medium</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Threats Deflected</h3>
            <div className="text-3xl font-bold text-ghost-neon-green mb-2">1,247</div>
            <div className="text-xs text-gray-400">Last 24 hours</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
