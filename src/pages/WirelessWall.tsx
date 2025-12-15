import { motion } from 'framer-motion'
import { Wifi, Shield, Lock, EyeOff } from 'lucide-react'

export default function WirelessWall() {
  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">WirelessWall</h1>
        <p className="text-gray-400">FIPS 140-2 Encryption & Invisible Network Security</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[600px] bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6 relative overflow-hidden"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue">Network Cloaking Visualization</h2>
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Cloaking layer animation */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-ghost-neon-blue/20 via-transparent to-transparent" />
              </motion.div>

              {/* Central encryption core */}
              <motion.div
                className="relative z-10"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <div className="w-48 h-48 bg-ghost-neon-blue/20 border-4 border-ghost-neon-blue rounded-full flex items-center justify-center">
                  <div className="w-36 h-36 bg-ghost-neon-blue/30 border-2 border-ghost-neon-blue rounded-full flex items-center justify-center">
                    <Lock className="w-16 h-16 text-ghost-neon-blue" />
                  </div>
                </div>
              </motion.div>

              {/* Encryption tunnel flows */}
              {[0, 1, 2, 3, 4, 5].map((tunnel) => (
                <motion.div
                  key={tunnel}
                  className="absolute"
                  style={{
                    transformOrigin: 'center',
                  }}
                  animate={{
                    rotate: [tunnel * 60, tunnel * 60 + 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    className="w-32 h-1 bg-gradient-to-r from-transparent via-ghost-neon-blue to-transparent"
                    style={{
                      transform: `translateY(-${100}px)`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: tunnel * 0.3,
                    }}
                  />
                </motion.div>
              ))}

              {/* Invisible network indicator */}
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg">
                  <EyeOff className="w-5 h-5 text-ghost-neon-blue" />
                  <span className="font-bold text-ghost-neon-blue">INVISIBLE NETWORK ACTIVE</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">FIPS 140-2</span>
                <span className="text-sm font-bold text-ghost-neon-green">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Encryption Level</span>
                <span className="text-sm font-bold text-ghost-neon-blue">AES-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Cloaking Status</span>
                <span className="text-sm font-bold text-ghost-neon-green">ENABLED</span>
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
              <Wifi className="w-5 h-5" />
              Network Visibility
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-ghost-blue/30 rounded border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">Authorized Devices</span>
                  <span className="text-sm text-ghost-neon-green">247</span>
                </div>
                <div className="text-xs text-gray-400">All devices verified</div>
              </div>
              <div className="p-3 bg-ghost-blue/30 rounded border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">Active Sessions</span>
                  <span className="text-sm text-ghost-neon-blue">1,832</span>
                </div>
                <div className="text-xs text-gray-400">Encrypted & secure</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Real-Time Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Data Encrypted</span>
                <span className="font-bold">2.4 TB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Threats Blocked</span>
                <span className="font-bold text-ghost-neon-green">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Uptime</span>
                <span className="font-bold">99.99%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
