import { useState, useEffect } from 'react'
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
  Vote,
  Bell,
  Network,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react'
import LogoCompact from './LogoCompact'
import { useUserRole, UserRole } from '../context/UserRoleContext'

interface NavItem {
  path: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  roles: UserRole[] // Roles that can access this item
}

const allNavItems: NavItem[] = [
  { path: '/', icon: LayoutDashboard, label: 'Command Overview', roles: ['Admin', 'Commander', 'Analyst', 'Operator'] },
  { path: '/threat-map', icon: Globe, label: 'Live Threat Map', roles: ['Admin', 'Commander', 'Analyst', 'Operator'] },
  { path: '/incidents', icon: AlertTriangle, label: 'Open Incidents', roles: ['Admin', 'Commander', 'Analyst', 'Operator'] },
  { path: '/indication-warning', icon: Bell, label: 'Indication & Warning', roles: ['Admin', 'Commander', 'Analyst'] },
  { path: '/ai-control', icon: Brain, label: 'AI Control Tower', roles: ['Admin', 'Commander'] },
  { path: '/defensive-ops', icon: Shield, label: 'Defensive Ops', roles: ['Admin', 'Commander', 'Analyst', 'Operator'] },
  { path: '/offensive-ops', icon: Sword, label: 'Offensive Ops', roles: ['Admin', 'Commander'] },
  { path: '/wirelesswall', icon: Wifi, label: 'WirelessWall', roles: ['Admin', 'Commander', 'Analyst', 'Operator'] },
  { path: '/flash-alert', icon: Zap, label: 'Flash Alert', roles: ['Admin', 'Commander'] },
  { path: '/beam-live', icon: Radio, label: 'BEAM Live', roles: ['Admin', 'Commander', 'Analyst'] },
  { path: '/broadcast', icon: Megaphone, label: 'Broadcast Control', roles: ['Admin', 'Commander'] },
  { path: '/election-security', icon: Vote, label: 'Election Security', roles: ['Admin', 'Commander', 'Analyst'] },
  { path: '/value-metrics', icon: TrendingUp, label: 'Value Metrics', roles: ['Admin', 'Commander', 'Analyst'] },
  { path: '/network-assets', icon: Network, label: 'Network & Assets', roles: ['Admin', 'Commander', 'Analyst', 'Operator'] },
  { path: '/access-trust', icon: ShieldCheck, label: 'Access & Trust', roles: ['Admin', 'Commander'] },
  { path: '/audit-logs', icon: FileText, label: 'Audit & Logs', roles: ['Admin', 'Commander', 'Analyst'] },
  { path: '/settings', icon: Settings, label: 'System Settings', roles: ['Admin'] },
]

export default function Sidebar() {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const { currentRole, setCurrentRole } = useUserRole()
  
  // Filter nav items based on current role
  const navItems = allNavItems.filter((item) => item.roles.includes(currentRole))

  const roles: UserRole[] = ['Admin', 'Commander', 'Analyst', 'Operator']

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsRoleDropdownOpen(false)
    }

    if (isRoleDropdownOpen) {
      const timeoutId = setTimeout(() => {
        window.addEventListener('click', handleClickOutside)
      }, 0)
      
      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isRoleDropdownOpen])

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRoleDropdownOpen(!isRoleDropdownOpen)
  }

  const handleRoleSelect = (role: UserRole, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentRole(role)
    setIsRoleDropdownOpen(false)
  }

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
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0 sidebar-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0, 212, 255, 0.3) transparent' }}>
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
        <div className="text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse"></div>
            <span>System Operational</span>
          </div>
          <div className="text-gray-600">CLASSIFIED</div>
        </div>
        
        {/* Role Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={handleToggleDropdown}
            className="w-full px-3 py-2 rounded-lg bg-ghost-neon-blue/10 border border-ghost-neon-blue/30 hover:bg-ghost-neon-blue/20 transition-all cursor-pointer text-left"
          >
            <div className="text-xs text-gray-400 mb-1">Active Role</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-ghost-neon-blue">{currentRole}</span>
              <ChevronDown 
                className={`w-4 h-4 text-ghost-neon-blue transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </button>

          {isRoleDropdownOpen && (
            <div 
              className="absolute bottom-full left-0 right-0 mb-2 bg-ghost-blue/95 backdrop-blur-md border border-ghost-neon-blue/30 rounded-lg shadow-xl z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                {roles.map((role, index) => (
                  <button
                    key={role}
                    type="button"
                    onClick={(e) => handleRoleSelect(role, e)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all cursor-pointer ${
                      currentRole === role
                        ? 'bg-ghost-neon-blue/20 text-ghost-neon-blue'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    } ${index === 0 ? 'rounded-t-lg' : ''} ${index === roles.length - 1 ? 'rounded-b-lg' : ''}`}
                  >
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{role}</span>
                    {currentRole === role && (
                      <span className="ml-auto text-xs text-ghost-neon-blue">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
