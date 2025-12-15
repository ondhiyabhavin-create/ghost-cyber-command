import { motion } from 'framer-motion'
import { Settings, Shield, Bell, Monitor, Database } from 'lucide-react'

export default function SystemSettings() {
  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">System Settings</h1>
        <p className="text-gray-400">Configuration & System Management</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-ghost-neon-blue" />
            <h2 className="text-xl font-bold">Security Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Two-Factor Authentication</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghost-neon-green"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-Block Threats</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghost-neon-green"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Encryption Level</span>
              <select className="px-3 py-1 bg-ghost-dark border border-white/10 rounded text-sm">
                <option>AES-256</option>
                <option>AES-192</option>
                <option>AES-128</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-ghost-neon-blue" />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Incident Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghost-neon-green"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Threat Warnings</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghost-neon-green"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">System Updates</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghost-neon-green"></div>
              </label>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Monitor className="w-6 h-6 text-ghost-neon-blue" />
            <h2 className="text-xl font-bold">Display Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <select className="px-3 py-1 bg-ghost-dark border border-white/10 rounded text-sm">
                <option>Dark (Default)</option>
                <option>High Contrast</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Animation Speed</span>
              <select className="px-3 py-1 bg-ghost-dark border border-white/10 rounded text-sm">
                <option>Normal</option>
                <option>Fast</option>
                <option>Slow</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Grid Background</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghost-neon-green"></div>
              </label>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-ghost-neon-blue" />
            <h2 className="text-xl font-bold">Data Management</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Log Retention</span>
              <select className="px-3 py-1 bg-ghost-dark border border-white/10 rounded text-sm">
                <option>30 days</option>
                <option>90 days</option>
                <option>1 year</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-Backup</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghost-neon-green"></div>
              </label>
            </div>
            <button className="w-full px-4 py-2 bg-ghost-neon-red/20 border border-ghost-neon-red/50 rounded-lg hover:bg-ghost-neon-red/30 transition-colors text-sm font-bold">
              Clear Cache
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
