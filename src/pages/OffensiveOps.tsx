import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sword, Target, Zap, Shield, CheckCircle } from 'lucide-react'

export default function OffensiveOps() {
  const [authorized, setAuthorized] = useState(false)
  const [strikeExecuted, setStrikeExecuted] = useState(false)

  const handleAuthorize = () => {
    setAuthorized(true)
  }

  const handleExecute = () => {
    setStrikeExecuted(true)
    setTimeout(() => {
      setStrikeExecuted(false)
      setAuthorized(false)
    }, 5000)
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Offensive Operations</h1>
        <p className="text-gray-400">Counter-Attack Capabilities & Strike Authorization</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[600px] bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6 relative overflow-hidden"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue">Attack Path Planning</h2>
            
            <div className="relative w-full h-full">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Target routers/servers */}
                {[
                  { x: 20, y: 30, id: 'target-1' },
                  { x: 50, y: 50, id: 'target-2' },
                  { x: 80, y: 40, id: 'target-3' },
                ].map((target) => (
                  <g key={target.id}>
                    <motion.circle
                      cx={target.x}
                      cy={target.y}
                      r={strikeExecuted ? 3 : 2}
                      fill={strikeExecuted ? '#ff0040' : '#ff8800'}
                      animate={
                        strikeExecuted
                          ? {
                              r: [3, 6, 3],
                              opacity: [1, 0.5, 1],
                            }
                          : {
                              r: [2, 2.5, 2],
                              opacity: [0.7, 1, 0.7],
                            }
                      }
                      transition={{
                        duration: strikeExecuted ? 0.5 : 2,
                        repeat: Infinity,
                      }}
                    />
                    <text
                      x={target.x}
                      y={target.y + 6}
                      fontSize="2"
                      fill="#ff8800"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      {target.id}
                    </text>
                  </g>
                ))}

                {/* Attack paths */}
                {authorized && (
                  <>
                    {[
                      { x1: 10, y1: 20, x2: 20, y2: 30 },
                      { x1: 10, y1: 20, x2: 50, y2: 50 },
                      { x1: 10, y1: 20, x2: 80, y2: 40 },
                    ].map((path, index) => (
                      <motion.line
                        key={index}
                        x1={path.x1}
                        y1={path.y1}
                        x2={path.x2}
                        y2={path.y2}
                        stroke="#ff0040"
                        strokeWidth="0.5"
                        strokeDasharray="1 1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: index * 0.3 }}
                      />
                    ))}
                  </>
                )}

                {/* Strike origin */}
                <motion.circle
                  cx={10}
                  cy={20}
                  r={authorized ? 2 : 1.5}
                  fill={authorized ? '#ff0040' : '#00d4ff'}
                  animate={
                    authorized
                      ? {
                          r: [2, 3, 2],
                          opacity: [0.7, 1, 0.7],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <text
                  x={10}
                  y={15}
                  fontSize="2"
                  fill="#00d4ff"
                  textAnchor="middle"
                  className="font-mono"
                >
                  ORIGIN
                </text>

                {/* Strike effect */}
                {strikeExecuted && (
                  <>
                    {[
                      { x: 20, y: 30 },
                      { x: 50, y: 50 },
                      { x: 80, y: 40 },
                    ].map((target, index) => (
                      <motion.circle
                        key={`strike-${index}`}
                        cx={target.x}
                        cy={target.y}
                        r={0}
                        fill="none"
                        stroke="#ff0040"
                        strokeWidth="0.5"
                        initial={{ r: 0, opacity: 1 }}
                        animate={{ r: 10, opacity: 0 }}
                        transition={{
                          duration: 1,
                          delay: index * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
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
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <Target className="w-5 h-5" />
              Strike Targets
            </h3>
            <div className="space-y-2">
              {['target-1', 'target-2', 'target-3'].map((target) => (
                <div
                  key={target}
                  className="flex items-center justify-between p-2 bg-ghost-blue/30 rounded border border-white/10"
                >
                  <span className="text-sm font-mono">{target}</span>
                  {strikeExecuted ? (
                    <CheckCircle className="w-4 h-4 text-ghost-neon-green" />
                  ) : (
                    <div className="w-2 h-2 bg-ghost-neon-yellow rounded-full animate-pulse" />
                  )}
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
              <Shield className="w-5 h-5" />
              Authorization
            </h3>
            {!authorized ? (
              <button
                onClick={handleAuthorize}
                className="w-full px-4 py-3 bg-ghost-neon-yellow/20 border border-ghost-neon-yellow/50 rounded-lg hover:bg-ghost-neon-yellow/30 transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                <span className="font-bold">Authorize Countermeasure</span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-ghost-neon-green/20 border border-ghost-neon-green/50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-ghost-neon-green" />
                    <span className="font-bold text-ghost-neon-green">AUTHORIZED</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Strike paths calculated and ready for execution
                  </p>
                </div>
                {!strikeExecuted ? (
                  <button
                    onClick={handleExecute}
                    className="w-full px-4 py-3 bg-ghost-neon-red/20 border border-ghost-neon-red/50 rounded-lg hover:bg-ghost-neon-red/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span className="font-bold">Execute AI Strike</span>
                  </button>
                ) : (
                  <div className="p-3 bg-ghost-neon-red/20 border border-ghost-neon-red/50 rounded">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-ghost-neon-red animate-pulse" />
                      <span className="font-bold text-ghost-neon-red">STRIKE EXECUTED</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Operations Log</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-ghost-neon-blue rounded-full" />
                <span className="text-gray-400">
                  {new Date().toLocaleTimeString()} — System Ready
                </span>
              </div>
              {authorized && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ghost-neon-yellow rounded-full" />
                  <span className="text-gray-400">
                    {new Date().toLocaleTimeString()} — Authorization Granted
                  </span>
                </div>
              )}
              {strikeExecuted && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-ghost-neon-red rounded-full animate-pulse" />
                  <span className="text-gray-400">
                    {new Date().toLocaleTimeString()} — Strike Executed
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
