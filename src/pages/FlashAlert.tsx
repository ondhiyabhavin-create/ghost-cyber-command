import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, QrCode, MessageSquare, Shield, EyeOff, Trash2 } from 'lucide-react'

export default function FlashAlert() {
  const [messages] = useState([
    {
      id: 1,
      text: 'Anonymous alert received',
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: 2,
      text: 'Secure communication established',
      timestamp: new Date(Date.now() - 600000),
      read: true,
    },
  ])

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Flash Alert</h1>
        <p className="text-gray-400">Anonymous Communication & Zero-Log Alerting System</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[600px] bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <QrCode className="w-6 h-6" />
              QR Scan Simulation
            </h2>
            
            <div className="flex items-center justify-center h-full">
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div className="w-64 h-64 bg-white rounded-lg p-4 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 w-full h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        } rounded-sm`}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.01,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 border-4 border-ghost-neon-blue rounded-lg"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 mb-4">
                Scan QR code to establish anonymous communication channel
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg hover:bg-ghost-neon-blue/30 transition-colors flex items-center gap-2 mx-auto"
              >
                <Zap className="w-5 h-5" />
                <span className="font-bold">Generate New QR Code</span>
              </motion.button>
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
              <MessageSquare className="w-5 h-5" />
              Anonymous Messages
            </h3>
            <div className="space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border ${
                    message.read
                      ? 'bg-ghost-blue/30 border-white/10'
                      : 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400">Anonymous</span>
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 bg-ghost-neon-blue rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm mb-2">{message.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    <button className="text-xs text-gray-400 hover:text-white">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
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
              <Shield className="w-5 h-5" />
              Security Features
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-ghost-neon-green/10 border border-ghost-neon-green/30 rounded">
                <Shield className="w-4 h-4 text-ghost-neon-green" />
                <span className="text-sm">Zero-Log Protocol</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-ghost-neon-green/10 border border-ghost-neon-green/30 rounded">
                <EyeOff className="w-4 h-4 text-ghost-neon-green" />
                <span className="text-sm">No Trace Storage</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-ghost-neon-green/10 border border-ghost-neon-green/30 rounded">
                <Shield className="w-4 h-4 text-ghost-neon-green" />
                <span className="text-sm">End-to-End Encrypted</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse" />
              <span className="text-sm font-bold text-ghost-neon-green">SYSTEM ACTIVE</span>
            </div>
            <p className="text-xs text-gray-400">
              All communications are anonymous and automatically deleted after reading
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

