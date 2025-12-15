import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Globe,
  AlertTriangle,
  Brain,
  Shield,
  Sword,
  Wifi,
  Zap,
  Radio,
  FileText,
  Settings,
  Megaphone,
  TrendingUp,
} from 'lucide-react'
import LogoCompact from './LogoCompact'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Command Overview' },
  { path: '/threat-map', icon: Globe, label: 'Live Threat Map' },
  { path: '/incidents', icon: AlertTriangle, label: 'Open Incidents' },
  { path: '/ai-control', icon: Brain, label: 'AI Control Tower' },
  { path: '/defensive-ops', icon: Shield, label: 'Defensive Ops' },
  { path: '/offensive-ops', icon: Sword, label: 'Offensive Ops' },
  { path: '/wirelesswall', icon: Wifi, label: 'WirelessWall' },
  { path: '/flash-alert', icon: Zap, label: 'Flash Alert' },
  { path: '/beam-live', icon: Radio, label: 'BEAM Live' },
  { path: '/broadcast', icon: Megaphone, label: 'Broadcast Control' },
  { path: '/value-metrics', icon: TrendingUp, label: 'Value Metrics' },
  { path: '/audit-logs', icon: FileText, label: 'Audit & Logs' },
  { path: '/settings', icon: Settings, label: 'System Settings' },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-ghost-blue/80 glass border-r border-ghost-neon-blue/20 flex flex-col"
    >
      <div className="p-6 border-b border-ghost-neon-blue/20">
        <div className="mb-3">
          <LogoCompact />
        </div>
        <p className="text-xs text-gray-400 mt-2">Tech for the People. Privacy Is Your Right.</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-ghost-neon-blue/20 text-ghost-neon-blue border border-ghost-neon-blue/50'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-ghost-neon-blue' : ''}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-ghost-neon-blue/20">
        <div className="text-xs text-gray-500">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse"></div>
            <span>System Operational</span>
          </div>
          <div className="text-gray-600">CLASSIFIED</div>
        </div>
      </div>
    </motion.aside>
  )
}
