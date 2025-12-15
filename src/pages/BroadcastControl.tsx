import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, Send, Users, Globe, Shield, FileText } from 'lucide-react'
import { broadcastMessages } from '../data/mockData'
import { BroadcastMessage } from '../data/mockData'

export default function BroadcastControl() {
  const [messages, setMessages] = useState(broadcastMessages)
  const [newMessage, setNewMessage] = useState({
    content: '',
    target: 'internal' as 'public' | 'internal' | 'allied',
  })

  const handleSend = () => {
    if (!newMessage.content.trim()) return

    const message: BroadcastMessage = {
      id: `broadcast-${Date.now()}`,
      content: newMessage.content,
      target: newMessage.target,
      status: 'draft',
      createdAt: new Date().toISOString(),
      approvedBy: '',
      reach: 0,
    }

    setMessages([message, ...messages])
    setNewMessage({ content: '', target: 'internal' })
  }

  const handleApprove = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: 'approved' as const, approvedBy: 'Commander Smith' }
          : m
      )
    )
  }

  const handleBroadcast = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'broadcasting' as const,
              reach: m.target === 'public' ? 1250000 : m.target === 'allied' ? 50000 : 5000,
            }
          : m
      )
    )
  }

  const targetIcons = {
    public: Globe,
    internal: Shield,
    allied: Users,
  }

  const targetColors = {
    public: 'text-blue-400',
    internal: 'text-ghost-neon-blue',
    allied: 'text-ghost-neon-green',
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Broadcast Control</h1>
        <p className="text-gray-400">Strategic Messaging & Counter-Propaganda Operations</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <Radio className="w-6 h-6" />
              Create New Broadcast
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Message Content</label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Enter broadcast message..."
                  className="w-full px-4 py-3 bg-ghost-dark border border-white/10 rounded-lg text-sm focus:outline-none focus:border-ghost-neon-blue/50 resize-none"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Target Audience</label>
                <div className="flex gap-2">
                  {(['public', 'internal', 'allied'] as const).map((target) => {
                    const Icon = targetIcons[target]
                    return (
                      <button
                        key={target}
                        onClick={() => setNewMessage({ ...newMessage, target })}
                        className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                          newMessage.target === target
                            ? target === 'public'
                              ? 'bg-blue-500/20 border-blue-500/50'
                              : target === 'internal'
                              ? 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50'
                              : 'bg-ghost-neon-green/20 border-ghost-neon-green/50'
                            : 'bg-ghost-blue/30 border-white/10 hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1 ${targetColors[target]}`} />
                        <span className="text-sm font-bold capitalize">{target}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={handleSend}
                className="w-full px-4 py-3 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg hover:bg-ghost-neon-blue/30 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span className="font-bold">Create Draft</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Broadcast Queue
            </h2>

            <div className="space-y-3">
              {messages.map((message) => {
                const TargetIcon = targetIcons[message.target]
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <TargetIcon className={`w-5 h-5 ${targetColors[message.target]}`} />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold capitalize">{message.target}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                message.status === 'draft'
                                  ? 'bg-gray-500/20 text-gray-400'
                                  : message.status === 'approved'
                                  ? 'bg-ghost-neon-yellow/20 text-ghost-neon-yellow'
                                  : message.status === 'broadcasting'
                                  ? 'bg-ghost-neon-green/20 text-ghost-neon-green'
                                  : 'bg-gray-500/20 text-gray-400'
                              }`}
                            >
                              {message.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{message.content}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {message.status === 'broadcasting' && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Reach: {message.reach.toLocaleString()}
                          </span>
                        )}
                        {message.approvedBy && (
                          <span>Approved by: {message.approvedBy}</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {message.status === 'draft' && (
                          <button
                            onClick={() => handleApprove(message.id)}
                            className="px-3 py-1 text-xs bg-ghost-neon-yellow/20 border border-ghost-neon-yellow/50 rounded hover:bg-ghost-neon-yellow/30 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {message.status === 'approved' && (
                          <button
                            onClick={() => handleBroadcast(message.id)}
                            className="px-3 py-1 text-xs bg-ghost-neon-green/20 border border-ghost-neon-green/50 rounded hover:bg-ghost-neon-green/30 transition-colors flex items-center gap-1"
                          >
                            <Radio className="w-3 h-3" />
                            Broadcast
                          </button>
                        )}
                        {message.status === 'broadcasting' && (
                          <div className="flex items-center gap-1 text-xs text-ghost-neon-green">
                            <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse" />
                            LIVE
                          </div>
                        )}
                      </div>
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
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Broadcast Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Active Broadcasts</span>
                <span className="text-sm font-bold">
                  {messages.filter((m) => m.status === 'broadcasting').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Pending Approval</span>
                <span className="text-sm font-bold">
                  {messages.filter((m) => m.status === 'draft').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Reach</span>
                <span className="text-sm font-bold">
                  {messages.reduce((acc, m) => acc + m.reach, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Counter-Propaganda</h3>
            <p className="text-xs text-gray-400 mb-3">
              Strategic messaging to counter disinformation campaigns and maintain operational security.
            </p>
            <div className="space-y-2">
              <div className="p-2 bg-ghost-neon-green/10 border border-ghost-neon-green/30 rounded text-xs">
                <div className="font-bold mb-1">Active Operations</div>
                <div className="text-gray-400">Monitoring 3 disinformation campaigns</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
