import { motion } from 'framer-motion'
import { aiAgents } from '../data/mockData'
import { Brain, Shield, Sword, Activity, Zap } from 'lucide-react'
import { AIAgent } from '../data/mockData'

export default function AIControlTower() {
  const offensiveAgents = aiAgents.filter((a) => a.type === 'offensive')
  const defensiveAgents = aiAgents.filter((a) => a.type === 'defensive')

  const AgentCard = ({ agent }: { agent: AIAgent }) => {
    const statusColors = {
      active: 'text-ghost-neon-green',
      idle: 'text-gray-400',
      analyzing: 'text-ghost-neon-yellow',
      executing: 'text-ghost-neon-blue',
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 relative overflow-hidden"
      >
        {agent.status === 'executing' && (
          <motion.div
            className="absolute inset-0 bg-ghost-neon-blue/10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={
                  agent.status === 'active' || agent.status === 'executing'
                    ? { rotate: [0, 360] }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className={`p-3 rounded-lg ${
                  agent.type === 'offensive'
                    ? 'bg-ghost-neon-red/20 border border-ghost-neon-red/50'
                    : 'bg-ghost-neon-green/20 border border-ghost-neon-green/50'
                }`}
              >
                <Brain className="w-6 h-6" />
              </motion.div>
              <div>
                <h3 className="font-bold text-lg">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity
                className={`w-5 h-5 ${statusColors[agent.status]}`}
              />
              <span className={`text-sm font-bold ${statusColors[agent.status]}`}>
                {agent.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Current Task</span>
              <span className="font-bold text-ghost-neon-blue">
                {agent.confidence}% Confidence
              </span>
            </div>
            <p className="text-sm text-gray-300">{agent.currentTask}</p>
          </div>

          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                agent.type === 'offensive'
                  ? 'bg-ghost-neon-red'
                  : 'bg-ghost-neon-green'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${agent.confidence}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="h-full p-6 space-y-6 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">AI Control Tower</h1>
        <p className="text-gray-400">Autonomous AI Agent Command & Control</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-ghost-neon-red/20 border border-ghost-neon-red/50 rounded-lg">
              <Sword className="w-6 h-6 text-ghost-neon-red" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Fortis Colosseum</h2>
              <p className="text-sm text-gray-400">Offensive AI Agents</p>
            </div>
          </div>
          <div className="space-y-4">
            {offensiveAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-ghost-neon-green/20 border border-ghost-neon-green/50 rounded-lg">
              <Shield className="w-6 h-6 text-ghost-neon-green" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Sicilian Defense</h2>
              <p className="text-sm text-gray-400">Defensive AI Agents</p>
            </div>
          </div>
          <div className="space-y-4">
            {defensiveAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
          <Zap className="w-6 h-6" />
          AI Activity Feed
        </h2>
        <div className="space-y-3">
          {aiAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center gap-4 p-3 bg-ghost-blue/30 rounded border border-white/10"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  agent.status === 'active' || agent.status === 'executing'
                    ? 'bg-ghost-neon-green animate-pulse'
                    : 'bg-gray-500'
                }`}
              />
              <div className="flex-1">
                <span className="font-bold">{agent.name}</span>
                <span className="text-gray-400 ml-2">— {agent.currentTask}</span>
              </div>
              <span className="text-xs text-gray-500">{agent.status}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
