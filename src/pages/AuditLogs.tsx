import { motion } from 'framer-motion'
import { FileText, Search, Filter, Download } from 'lucide-react'

const logs = [
  { id: 1, timestamp: new Date(), action: 'System Access', user: 'SYSTEM', status: 'SUCCESS', details: 'Command Overview accessed' },
  { id: 2, timestamp: new Date(Date.now() - 60000), action: 'Threat Blocked', user: 'AI-Agent', status: 'SUCCESS', details: 'IP 192.168.45.23 blocked' },
  { id: 3, timestamp: new Date(Date.now() - 120000), action: 'Incident Created', user: 'AUTO', status: 'SUCCESS', details: 'INC-2024-001 created' },
  { id: 4, timestamp: new Date(Date.now() - 180000), action: 'Countermeasure', user: 'OPERATOR', status: 'SUCCESS', details: 'Strike authorized and executed' },
  { id: 5, timestamp: new Date(Date.now() - 240000), action: 'Network Scan', user: 'AI-Agent', status: 'SUCCESS', details: 'Vulnerability scan completed' },
]

export default function AuditLogs() {
  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold neon-blue mb-2">Audit & Logs</h1>
            <p className="text-gray-400">System Activity Logging & Compliance Records</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg hover:bg-ghost-neon-blue/30 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Export Logs</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4 space-y-4"
          >
            <div>
              <h3 className="text-lg font-bold mb-3 text-ghost-neon-blue flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </h3>
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full px-3 py-2 bg-ghost-dark border border-white/10 rounded-lg text-sm focus:outline-none focus:border-ghost-neon-blue/50"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 text-ghost-neon-blue flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter
              </h3>
              <div className="space-y-2">
                {['All', 'Success', 'Failed', 'Warning'].map((filter) => (
                  <button
                    key={filter}
                    className="w-full text-left px-3 py-2 bg-ghost-blue/30 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-ghost-neon-blue flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Activity Logs
              </h2>
              <span className="text-sm text-gray-400">{logs.length} entries</span>
            </div>

            <div className="space-y-3">
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold">{log.action}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            log.status === 'SUCCESS'
                              ? 'bg-ghost-neon-green/20 text-ghost-neon-green'
                              : 'bg-ghost-neon-red/20 text-ghost-neon-red'
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{log.details}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">{log.user}</div>
                      <div className="text-xs text-gray-600 font-mono">
                        {log.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
