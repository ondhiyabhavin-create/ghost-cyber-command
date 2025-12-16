import { motion } from 'framer-motion'
import { useUserRole, UserRole } from '../context/UserRoleContext'
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Key,
  Users,
  Network,
  Building2,
  Activity,
  Lock,
  Unlock,
} from 'lucide-react'

// Mock data that changes based on role
const getRoleData = (role: UserRole) => {
  const baseData = {
    Admin: {
      ncdAuth: [
        { id: '1', name: 'NCD-ALPHA-01', status: 'Trusted' as const, lastVerified: '2 minutes ago', location: 'Washington, DC' },
        { id: '2', name: 'NCD-BRAVO-02', status: 'Trusted' as const, lastVerified: '5 minutes ago', location: 'New York, NY' },
        { id: '3', name: 'NCD-CHARLIE-03', status: 'Unverified' as const, lastVerified: '2 hours ago', location: 'Los Angeles, CA' },
        { id: '4', name: 'NCD-DELTA-04', status: 'Trusted' as const, lastVerified: '10 minutes ago', location: 'Chicago, IL' },
        { id: '5', name: 'NCD-ECHO-05', status: 'Trusted' as const, lastVerified: '1 minute ago', location: 'Denver, CO' },
      ],
      vendors: [
        { id: '1', name: 'TechCorp Solutions', status: 'Approved' as const, accessLevel: 'Full Access', lastAccess: '1 hour ago' },
        { id: '2', name: 'SecureNet Inc', status: 'Approved' as const, accessLevel: 'Full Access', lastAccess: '30 minutes ago' },
        { id: '3', name: 'DataFlow Systems', status: 'Restricted' as const, accessLevel: 'Read Only', lastAccess: '2 days ago' },
        { id: '4', name: 'CloudSecure LLC', status: 'Approved' as const, accessLevel: 'Full Access', lastAccess: '15 minutes ago' },
        { id: '5', name: 'Suspicious Vendor Co', status: 'Restricted' as const, accessLevel: 'No Access', lastAccess: 'Never' },
      ],
      sessions: [
        { id: '1', sessionId: 'SESS-ADM-2025-001', role: 'Admin' as UserRole, status: 'Valid' as const, issuedAt: '2025-01-15 08:00:00', expiresAt: '2025-01-15 20:00:00' },
        { id: '2', sessionId: 'SESS-ADM-2025-002', role: 'Admin' as UserRole, status: 'Valid' as const, issuedAt: '2025-01-15 10:30:00', expiresAt: '2025-01-15 22:30:00' },
        { id: '3', sessionId: 'SESS-ADM-2025-003', role: 'Admin' as UserRole, status: 'Expired' as const, issuedAt: '2025-01-14 14:00:00', expiresAt: '2025-01-14 18:00:00' },
      ],
      accessLogs: [
        { id: '1', timestamp: '2025-01-15 14:23:15', user: 'admin.user', role: 'Admin' as UserRole, action: 'Full System Access', resource: 'All Systems', status: 'Success' as const, ipAddress: '10.0.0.1' },
        { id: '2', timestamp: '2025-01-15 14:20:45', user: 'admin.user', role: 'Admin' as UserRole, action: 'Role Management', resource: 'User Database', status: 'Success' as const, ipAddress: '10.0.0.1' },
        { id: '3', timestamp: '2025-01-15 14:18:30', user: 'admin.user', role: 'Admin' as UserRole, action: 'Vendor Access Grant', resource: 'TechCorp Solutions', status: 'Success' as const, ipAddress: '10.0.0.1' },
        { id: '4', timestamp: '2025-01-15 14:15:12', user: 'admin.user', role: 'Admin' as UserRole, action: 'Session Revocation', resource: 'SESS-ADM-2025-003', status: 'Success' as const, ipAddress: '10.0.0.1' },
        { id: '5', timestamp: '2025-01-15 14:10:05', user: 'admin.user', role: 'Admin' as UserRole, action: 'NCD Verification', resource: 'NCD-CHARLIE-03', status: 'Success' as const, ipAddress: '10.0.0.1' },
      ],
    },
    Commander: {
      ncdAuth: [
        { id: '1', name: 'NCD-ALPHA-01', status: 'Trusted' as const, lastVerified: '2 minutes ago', location: 'Washington, DC' },
        { id: '2', name: 'NCD-BRAVO-02', status: 'Trusted' as const, lastVerified: '5 minutes ago', location: 'New York, NY' },
        { id: '3', name: 'NCD-CHARLIE-03', status: 'Unverified' as const, lastVerified: '2 hours ago', location: 'Los Angeles, CA' },
        { id: '4', name: 'NCD-DELTA-04', status: 'Trusted' as const, lastVerified: '10 minutes ago', location: 'Chicago, IL' },
      ],
      vendors: [
        { id: '1', name: 'TechCorp Solutions', status: 'Approved' as const, accessLevel: 'Full Access', lastAccess: '1 hour ago' },
        { id: '2', name: 'SecureNet Inc', status: 'Approved' as const, accessLevel: 'Full Access', lastAccess: '30 minutes ago' },
        { id: '3', name: 'DataFlow Systems', status: 'Restricted' as const, accessLevel: 'Read Only', lastAccess: '2 days ago' },
        { id: '4', name: 'CloudSecure LLC', status: 'Approved' as const, accessLevel: 'Full Access', lastAccess: '15 minutes ago' },
      ],
      sessions: [
        { id: '1', sessionId: 'SESS-CMD-2025-001', role: 'Commander' as UserRole, status: 'Valid' as const, issuedAt: '2025-01-15 08:00:00', expiresAt: '2025-01-15 20:00:00' },
        { id: '2', sessionId: 'SESS-CMD-2025-002', role: 'Commander' as UserRole, status: 'Valid' as const, issuedAt: '2025-01-15 12:00:00', expiresAt: '2025-01-15 18:00:00' },
      ],
      accessLogs: [
        { id: '1', timestamp: '2025-01-15 14:23:15', user: 'commander.user', role: 'Commander' as UserRole, action: 'Strategic Overview', resource: 'Command Dashboard', status: 'Success' as const, ipAddress: '10.0.0.2' },
        { id: '2', timestamp: '2025-01-15 14:20:45', user: 'commander.user', role: 'Commander' as UserRole, action: 'Threat Assessment', resource: 'Threat Map', status: 'Success' as const, ipAddress: '10.0.0.2' },
        { id: '3', timestamp: '2025-01-15 14:18:30', user: 'commander.user', role: 'Commander' as UserRole, action: 'Incident Review', resource: 'Open Incidents', status: 'Success' as const, ipAddress: '10.0.0.2' },
        { id: '4', timestamp: '2025-01-15 14:15:12', user: 'commander.user', role: 'Commander' as UserRole, action: 'Vendor Access Review', resource: 'Vendor List', status: 'Success' as const, ipAddress: '10.0.0.2' },
      ],
    },
    Analyst: {
      ncdAuth: [
        { id: '1', name: 'NCD-ALPHA-01', status: 'Trusted' as const, lastVerified: '2 minutes ago', location: 'Washington, DC' },
        { id: '2', name: 'NCD-BRAVO-02', status: 'Trusted' as const, lastVerified: '5 minutes ago', location: 'New York, NY' },
        { id: '3', name: 'NCD-CHARLIE-03', status: 'Unverified' as const, lastVerified: '2 hours ago', location: 'Los Angeles, CA' },
      ],
      vendors: [
        { id: '1', name: 'TechCorp Solutions', status: 'Approved' as const, accessLevel: 'Read Only', lastAccess: '1 hour ago' },
        { id: '2', name: 'SecureNet Inc', status: 'Approved' as const, accessLevel: 'Read Only', lastAccess: '30 minutes ago' },
        { id: '3', name: 'DataFlow Systems', status: 'Restricted' as const, accessLevel: 'No Access', lastAccess: 'Never' },
      ],
      sessions: [
        { id: '1', sessionId: 'SESS-ANA-2025-001', role: 'Analyst' as UserRole, status: 'Valid' as const, issuedAt: '2025-01-15 09:00:00', expiresAt: '2025-01-15 17:00:00' },
        { id: '2', sessionId: 'SESS-ANA-2025-002', role: 'Analyst' as UserRole, status: 'Expired' as const, issuedAt: '2025-01-14 14:00:00', expiresAt: '2025-01-14 18:00:00' },
      ],
      accessLogs: [
        { id: '1', timestamp: '2025-01-15 14:23:15', user: 'analyst.user', role: 'Analyst' as UserRole, action: 'Data Analysis', resource: 'Threat Intelligence', status: 'Success' as const, ipAddress: '10.0.0.3' },
        { id: '2', timestamp: '2025-01-15 14:20:45', user: 'analyst.user', role: 'Analyst' as UserRole, action: 'Report Generation', resource: 'Analytics Dashboard', status: 'Success' as const, ipAddress: '10.0.0.3' },
        { id: '3', timestamp: '2025-01-15 14:18:30', user: 'analyst.user', role: 'Analyst' as UserRole, action: 'Read Access', resource: 'Access Logs', status: 'Success' as const, ipAddress: '10.0.0.3' },
        { id: '4', timestamp: '2025-01-15 14:15:12', user: 'analyst.user', role: 'Analyst' as UserRole, action: 'System Configuration', resource: 'Settings', status: 'Denied' as const, ipAddress: '10.0.0.3' },
      ],
    },
    Operator: {
      ncdAuth: [
        { id: '1', name: 'NCD-ALPHA-01', status: 'Trusted' as const, lastVerified: '2 minutes ago', location: 'Washington, DC' },
        { id: '2', name: 'NCD-BRAVO-02', status: 'Trusted' as const, lastVerified: '5 minutes ago', location: 'New York, NY' },
      ],
      vendors: [
        { id: '1', name: 'TechCorp Solutions', status: 'Approved' as const, accessLevel: 'Read Only', lastAccess: '1 hour ago' },
        { id: '2', name: 'SecureNet Inc', status: 'Approved' as const, accessLevel: 'Read Only', lastAccess: '30 minutes ago' },
      ],
      sessions: [
        { id: '1', sessionId: 'SESS-OPR-2025-001', role: 'Operator' as UserRole, status: 'Valid' as const, issuedAt: '2025-01-15 10:00:00', expiresAt: '2025-01-15 16:00:00' },
      ],
      accessLogs: [
        { id: '1', timestamp: '2025-01-15 14:23:15', user: 'operator.user', role: 'Operator' as UserRole, action: 'System Monitoring', resource: 'System Status', status: 'Success' as const, ipAddress: '10.0.0.4' },
        { id: '2', timestamp: '2025-01-15 14:20:45', user: 'operator.user', role: 'Operator' as UserRole, action: 'Incident Response', resource: 'Open Incidents', status: 'Success' as const, ipAddress: '10.0.0.4' },
        { id: '3', timestamp: '2025-01-15 14:18:30', user: 'operator.user', role: 'Operator' as UserRole, action: 'Role Management', resource: 'User Database', status: 'Denied' as const, ipAddress: '10.0.0.4' },
      ],
    },
  }

  return baseData[role] || baseData.Operator
}

export default function AccessTrust() {
  const { currentRole } = useUserRole()
  const roleData = getRoleData(currentRole)
  const roles: UserRole[] = ['Admin', 'Commander', 'Analyst', 'Operator']

  const getStatusBadge = (status: string, type: 'trust' | 'access' | 'session') => {
    const configs = {
      trust: {
        Trusted: { color: 'text-ghost-neon-green', bg: 'bg-ghost-neon-green/20', border: 'border-ghost-neon-green/50', icon: CheckCircle },
        Unverified: { color: 'text-ghost-neon-yellow', bg: 'bg-ghost-neon-yellow/20', border: 'border-ghost-neon-yellow/50', icon: AlertTriangle },
      },
      access: {
        Approved: { color: 'text-ghost-neon-green', bg: 'bg-ghost-neon-green/20', border: 'border-ghost-neon-green/50', icon: CheckCircle },
        Restricted: { color: 'text-ghost-neon-red', bg: 'bg-ghost-neon-red/20', border: 'border-ghost-neon-red/50', icon: XCircle },
      },
      session: {
        Valid: { color: 'text-ghost-neon-green', bg: 'bg-ghost-neon-green/20', border: 'border-ghost-neon-green/50', icon: Lock },
        Expired: { color: 'text-ghost-neon-yellow', bg: 'bg-ghost-neon-yellow/20', border: 'border-ghost-neon-yellow/50', icon: Unlock },
        Revoked: { color: 'text-ghost-neon-red', bg: 'bg-ghost-neon-red/20', border: 'border-ghost-neon-red/50', icon: XCircle },
      },
    }

    const config = type === 'trust' 
      ? configs.trust[status as keyof typeof configs.trust]
      : type === 'access'
      ? configs.access[status as keyof typeof configs.access]
      : configs.session[status as keyof typeof configs.session]

    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${config.color} ${config.bg} ${config.border} border`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    )
  }

  const getLogStatusBadge = (status: string) => {
    const configs = {
      Success: { color: 'text-ghost-neon-green', bg: 'bg-ghost-neon-green/20', icon: CheckCircle },
      Failed: { color: 'text-ghost-neon-yellow', bg: 'bg-ghost-neon-yellow/20', icon: AlertTriangle },
      Denied: { color: 'text-ghost-neon-red', bg: 'bg-ghost-neon-red/20', icon: XCircle },
    }

    const config = configs[status as keyof typeof configs]
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${config.color} ${config.bg}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    )
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Access & Trust</h1>
        <p className="text-gray-400">
          User & Role Management • Device Authentication • Vendor Access • Session Security • Audit Logs
        </p>
      </motion.div>

      {/* User & Role Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
          <Users className="w-6 h-6" />
          User & Role Management
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roles.map((role) => {
            const isActive = role === currentRole
            return (
              <div
                key={role}
                className={`p-4 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50'
                    : 'bg-ghost-blue/30 border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={`w-5 h-5 ${isActive ? 'text-ghost-neon-blue' : 'text-gray-400'}`} />
                  <span className={`font-bold ${isActive ? 'text-ghost-neon-blue' : 'text-gray-300'}`}>
                    {role}
                  </span>
                </div>
                {isActive && (
                  <div className="text-xs text-ghost-neon-blue mt-2">ACTIVE ROLE</div>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device & Network Control (NCD) Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
            <Network className="w-6 h-6" />
            Device & Network Control (NCD) Authentication
          </h2>
          <div className="space-y-3">
            {roleData.ncdAuth.map((ncd) => (
              <div
                key={ncd.id}
                className="bg-ghost-blue/30 rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-white">{ncd.name}</div>
                    <div className="text-xs text-gray-400">{ncd.location}</div>
                  </div>
                  {getStatusBadge(ncd.status, 'trust')}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last Verified: {ncd.lastVerified}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vendor / Supplier Access Validation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
        >
          <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            Vendor / Supplier Access Validation
          </h2>
          <div className="space-y-3">
            {roleData.vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-ghost-blue/30 rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-white">{vendor.name}</div>
                    <div className="text-xs text-gray-400">{vendor.accessLevel}</div>
                  </div>
                  {getStatusBadge(vendor.status, 'access')}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last Access: {vendor.lastAccess}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Session Keys & Identity Verification Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
          <Key className="w-6 h-6" />
          Session Keys & Identity Verification Status
        </h2>
        <div className="space-y-3">
          {roleData.sessions.map((session) => (
            <div
              key={session.id}
              className="bg-ghost-blue/30 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-white font-mono">{session.sessionId}</div>
                  <div className="text-xs text-gray-400">Role: {session.role}</div>
                </div>
                {getStatusBadge(session.status, 'session')}
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-gray-400">Issued At:</div>
                  <div className="text-white font-mono">{session.issuedAt}</div>
                </div>
                <div>
                  <div className="text-gray-400">Expires At:</div>
                  <div className="text-white font-mono">{session.expiresAt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Access Logs & Trust Audit History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Access Logs & Trust Audit History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-bold text-ghost-neon-blue">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-ghost-neon-blue">User</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-ghost-neon-blue">Role</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-ghost-neon-blue">Action</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-ghost-neon-blue">Resource</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-ghost-neon-blue">Status</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-ghost-neon-blue">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {roleData.accessLogs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 text-sm font-mono text-gray-300">{log.timestamp}</td>
                  <td className="py-3 px-4 text-sm text-white">{log.user}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="px-2 py-1 rounded bg-ghost-blue/50 text-xs font-bold">{log.role}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-300">{log.action}</td>
                  <td className="py-3 px-4 text-sm text-gray-300">{log.resource}</td>
                  <td className="py-3 px-4 text-sm">{getLogStatusBadge(log.status)}</td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

