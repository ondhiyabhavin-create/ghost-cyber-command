import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, Send, Users, Globe, Shield, TrendingUp, Target } from 'lucide-react'

interface BroadcastNode {
  id: string
  name: string
  type: 'media' | 'government' | 'internal'
  reach: number
  position: { x: number; y: number }
  status: 'active' | 'idle'
}

const mediaNodes: BroadcastNode[] = [
  { id: 'node-1', name: 'CNN', type: 'media', reach: 2500000, position: { x: 20, y: 30 }, status: 'active' },
  { id: 'node-2', name: 'FOX', type: 'media', reach: 1800000, position: { x: 40, y: 25 }, status: 'active' },
  { id: 'node-3', name: 'NBC', type: 'media', reach: 2200000, position: { x: 60, y: 35 }, status: 'active' },
  { id: 'node-4', name: 'DHS', type: 'government', reach: 50000, position: { x: 30, y: 60 }, status: 'active' },
  { id: 'node-5', name: 'FBI', type: 'government', reach: 35000, position: { x: 50, y: 65 }, status: 'active' },
  { id: 'node-6', name: 'NSA', type: 'internal', reach: 5000, position: { x: 70, y: 70 }, status: 'active' },
]

export default function StrategicBroadcastConsole() {
  const [selectedTarget, setSelectedTarget] = useState<'public' | 'internal' | 'allied'>('public')
  const [message, setMessage] = useState('')
  const [broadcasting, setBroadcasting] = useState(false)

  const handleBroadcast = () => {
    if (!message.trim()) return
    setBroadcasting(true)
    setTimeout(() => setBroadcasting(false), 3000)
  }

  const totalReach = mediaNodes.reduce((acc, node) => acc + node.reach, 0)
  const activeNodes = mediaNodes.filter((n) => n.status === 'active').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-ghost-neon-blue flex items-center gap-2">
          <Radio className="w-6 h-6" />
          Strategic Broadcast Console
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse" />
          <span className="text-gray-400">{activeNodes} Active Channels</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Reach Heatmap */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <Target className="w-5 h-5" />
              Message Reach Heatmap
            </h3>
            <div className="relative h-64 bg-ghost-dark rounded-lg border border-ghost-neon-blue/20 overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Heat zones */}
                {mediaNodes.map((node) => {
                  const intensity = node.reach / 3000000
                  return (
                    <g key={node.id}>
                      <motion.circle
                        cx={node.position.x}
                        cy={node.position.y}
                        r={5 + intensity * 10}
                        fill={node.type === 'media' ? '#00d4ff' : node.type === 'government' ? '#00ff88' : '#ffd700'}
                        fillOpacity={0.3}
                        animate={{
                          r: [5 + intensity * 10, 8 + intensity * 10, 5 + intensity * 10],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <circle
                        cx={node.position.x}
                        cy={node.position.y}
                        r={2}
                        fill={node.type === 'media' ? '#00d4ff' : node.type === 'government' ? '#00ff88' : '#ffd700'}
                      />
                      <text
                        x={node.position.x}
                        y={node.position.y - 8}
                        fontSize="2.5"
                        fill="#fff"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        {node.name}
                      </text>
                    </g>
                  )
                })}

                {/* Connection lines */}
                {mediaNodes.slice(0, 3).map((node, index) => {
                  const nextNode = mediaNodes[index + 1]
                  if (!nextNode) return null
                  return (
                    <motion.line
                      key={`line-${index}`}
                      x1={node.position.x}
                      y1={node.position.y}
                      x2={nextNode.position.x}
                      y2={nextNode.position.y}
                      stroke="#00d4ff"
                      strokeWidth="0.3"
                      strokeDasharray="1 1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Message Composition */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Broadcast Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter strategic message..."
                className="w-full px-4 py-3 bg-ghost-dark border border-white/10 rounded-lg text-sm focus:outline-none focus:border-ghost-neon-blue/50 resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              {(['public', 'internal', 'allied'] as const).map((target) => {
                const icons = {
                  public: Globe,
                  internal: Shield,
                  allied: Users,
                }
                const Icon = icons[target]
                return (
                  <button
                    key={target}
                    onClick={() => setSelectedTarget(target)}
                    className={`flex-1 px-4 py-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                      selectedTarget === target
                        ? target === 'public'
                          ? 'bg-blue-500/20 border-blue-500/50'
                          : target === 'internal'
                          ? 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50'
                          : 'bg-ghost-neon-green/20 border-ghost-neon-green/50'
                        : 'bg-ghost-blue/30 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-bold capitalize">{target}</span>
                  </button>
                )
              })}
            </div>

            <button
              onClick={handleBroadcast}
              disabled={broadcasting || !message.trim()}
              className="w-full px-4 py-3 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg hover:bg-ghost-neon-blue/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {broadcasting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Radio className="w-5 h-5" />
                  </motion.div>
                  <span className="font-bold">Broadcasting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span className="font-bold">Broadcast Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/30 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Reach Metrics
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold mb-1">{totalReach.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Reach</div>
              </div>
              <div>
                <div className="text-lg font-bold mb-1">{activeNodes}</div>
                <div className="text-xs text-gray-400">Active Channels</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ghost-blue/30 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Media Outlets</h3>
            <div className="space-y-2">
              {mediaNodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-2 bg-ghost-dark rounded border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'active' ? 'bg-ghost-neon-green animate-pulse' : 'bg-gray-500'
                      }`}
                    />
                    <span className="text-sm">{node.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{node.reach.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-ghost-blue/30 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Confidence & Impact</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Message Confidence</span>
                  <span className="font-bold text-ghost-neon-green">94%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-ghost-neon-green"
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Impact Score</span>
                  <span className="font-bold text-ghost-neon-blue">87%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-ghost-neon-blue"
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
