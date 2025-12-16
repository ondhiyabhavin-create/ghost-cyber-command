import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server,
  Cloud,
  Wifi,
  Package,
  Shield,
  AlertTriangle,
  Activity,
  Search,
  Lock,
  Scan,
  X,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

type AssetStatus = 'secure' | 'at_risk' | 'under_threat'

type AssetCategory = 'ncd' | 'servers' | 'cloud' | 'iot' | 'supply_chain'

interface Asset {
  id: string
  name: string
  category: AssetCategory
  status: AssetStatus
  ipAddress?: string
  location: string
  lastScanned: string
  riskScore: number
  vulnerabilities: number
  recentActivity: {
    type: string
    timestamp: string
    description: string
  }[]
}

const categoryConfig = {
  ncd: { label: 'Network Control Devices', icon: Wifi, color: 'text-ghost-neon-blue' },
  servers: { label: 'Servers', icon: Server, color: 'text-ghost-neon-green' },
  cloud: { label: 'Cloud Services', icon: Cloud, color: 'text-ghost-neon-yellow' },
  iot: { label: 'IoT Devices', icon: Activity, color: 'text-ghost-neon-blue' },
  supply_chain: { label: 'Supply Chain Systems', icon: Package, color: 'text-purple-400' },
}

const statusConfig = {
  secure: {
    label: 'Secure',
    color: 'text-ghost-neon-green',
    bgColor: 'bg-ghost-neon-green/20',
    borderColor: 'border-ghost-neon-green/50',
    icon: CheckCircle,
  },
  at_risk: {
    label: 'At Risk',
    color: 'text-ghost-neon-yellow',
    bgColor: 'bg-ghost-neon-yellow/20',
    borderColor: 'border-ghost-neon-yellow/50',
    icon: AlertTriangle,
  },
  under_threat: {
    label: 'Under Threat',
    color: 'text-ghost-neon-red',
    bgColor: 'bg-ghost-neon-red/20',
    borderColor: 'border-ghost-neon-red/50',
    icon: AlertCircle,
  },
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'NCD-ALPHA-01',
    category: 'ncd',
    status: 'secure',
    ipAddress: '192.168.1.100',
    location: 'Washington, DC',
    lastScanned: '2 minutes ago',
    riskScore: 12,
    vulnerabilities: 0,
    recentActivity: [
      { type: 'scan', timestamp: '2m ago', description: 'Security scan completed - No threats detected' },
      { type: 'update', timestamp: '1h ago', description: 'Firmware updated to v2.4.1' },
    ],
  },
  {
    id: '2',
    name: 'NCD-BRAVO-02',
    category: 'ncd',
    status: 'at_risk',
    ipAddress: '192.168.1.101',
    location: 'New York, NY',
    lastScanned: '15 minutes ago',
    riskScore: 45,
    vulnerabilities: 2,
    recentActivity: [
      { type: 'alert', timestamp: '5m ago', description: 'Unusual network traffic detected' },
      { type: 'scan', timestamp: '15m ago', description: 'Security scan completed - 2 vulnerabilities found' },
    ],
  },
  {
    id: '3',
    name: 'NCD-CHARLIE-03',
    category: 'ncd',
    status: 'under_threat',
    ipAddress: '192.168.1.102',
    location: 'Los Angeles, CA',
    lastScanned: '1 hour ago',
    riskScore: 78,
    vulnerabilities: 5,
    recentActivity: [
      { type: 'threat', timestamp: '10m ago', description: 'Active threat detected - Countermeasures deployed' },
      { type: 'alert', timestamp: '25m ago', description: 'Multiple failed login attempts' },
    ],
  },
  {
    id: '4',
    name: 'Primary Data Server',
    category: 'servers',
    status: 'secure',
    ipAddress: '10.0.0.50',
    location: 'Washington, DC',
    lastScanned: '5 minutes ago',
    riskScore: 8,
    vulnerabilities: 0,
    recentActivity: [
      { type: 'scan', timestamp: '5m ago', description: 'Security scan completed - All systems secure' },
      { type: 'backup', timestamp: '2h ago', description: 'Automated backup completed successfully' },
    ],
  },
  {
    id: '5',
    name: 'Backup Server Cluster',
    category: 'servers',
    status: 'at_risk',
    ipAddress: '10.0.0.51',
    location: 'Denver, CO',
    lastScanned: '30 minutes ago',
    riskScore: 38,
    vulnerabilities: 1,
    recentActivity: [
      { type: 'alert', timestamp: '20m ago', description: 'Outdated security patch detected' },
      { type: 'scan', timestamp: '30m ago', description: 'Security scan completed - 1 vulnerability found' },
    ],
  },
  {
    id: '6',
    name: 'AWS Production Environment',
    category: 'cloud',
    status: 'secure',
    ipAddress: 'N/A',
    location: 'US-East-1',
    lastScanned: '10 minutes ago',
    riskScore: 15,
    vulnerabilities: 0,
    recentActivity: [
      { type: 'scan', timestamp: '10m ago', description: 'Cloud security scan completed' },
      { type: 'config', timestamp: '3h ago', description: 'Security group rules updated' },
    ],
  },
  {
    id: '7',
    name: 'Azure Development Environment',
    category: 'cloud',
    status: 'at_risk',
    ipAddress: 'N/A',
    location: 'US-West-2',
    lastScanned: '45 minutes ago',
    riskScore: 42,
    vulnerabilities: 3,
    recentActivity: [
      { type: 'alert', timestamp: '30m ago', description: 'Unusual API access patterns detected' },
      { type: 'scan', timestamp: '45m ago', description: 'Cloud security scan completed - 3 vulnerabilities found' },
    ],
  },
  {
    id: '8',
    name: 'IoT Sensor Network - Building A',
    category: 'iot',
    status: 'secure',
    ipAddress: '192.168.2.0/24',
    location: 'Washington, DC',
    lastScanned: '1 minute ago',
    riskScore: 18,
    vulnerabilities: 0,
    recentActivity: [
      { type: 'scan', timestamp: '1m ago', description: 'IoT network scan completed - All devices secure' },
      { type: 'update', timestamp: '4h ago', description: 'Device firmware updated across network' },
    ],
  },
  {
    id: '9',
    name: 'IoT Gateway - Warehouse',
    category: 'iot',
    status: 'under_threat',
    ipAddress: '192.168.3.50',
    location: 'Chicago, IL',
    lastScanned: '2 hours ago',
    riskScore: 85,
    vulnerabilities: 7,
    recentActivity: [
      { type: 'threat', timestamp: '15m ago', description: 'Malicious connection attempt blocked' },
      { type: 'alert', timestamp: '1h ago', description: 'Gateway firmware outdated' },
    ],
  },
  {
    id: '10',
    name: 'Supply Chain Portal',
    category: 'supply_chain',
    status: 'secure',
    ipAddress: '10.1.0.100',
    location: 'Washington, DC',
    lastScanned: '20 minutes ago',
    riskScore: 22,
    vulnerabilities: 1,
    recentActivity: [
      { type: 'scan', timestamp: '20m ago', description: 'Supply chain security scan completed' },
      { type: 'access', timestamp: '1h ago', description: 'Authorized access from partner network' },
    ],
  },
  {
    id: '11',
    name: 'Vendor Management System',
    category: 'supply_chain',
    status: 'at_risk',
    ipAddress: '10.1.0.101',
    location: 'Atlanta, GA',
    lastScanned: '1 hour ago',
    riskScore: 48,
    vulnerabilities: 4,
    recentActivity: [
      { type: 'alert', timestamp: '45m ago', description: 'Suspicious vendor access attempt' },
      { type: 'scan', timestamp: '1h ago', description: 'Security scan completed - 4 vulnerabilities found' },
    ],
  },
]

export default function NetworkAssets() {
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [assets, setAssets] = useState<Asset[]>(mockAssets)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          // Random status changes for demo
          if (Math.random() > 0.98 && asset.status === 'secure') {
            return {
              ...asset,
              status: 'at_risk' as AssetStatus,
              riskScore: Math.min(asset.riskScore + 20, 100),
              vulnerabilities: asset.vulnerabilities + 1,
            }
          }
          return asset
        })
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleScan = (assetId: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? {
              ...asset,
              lastScanned: 'Just now',
              recentActivity: [
                {
                  type: 'scan',
                  timestamp: 'Just now',
                  description: 'Security scan initiated - Results pending',
                },
                ...asset.recentActivity.slice(0, 4),
              ],
            }
          : asset
      )
    )
    setTimeout(() => {
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === assetId
            ? {
                ...asset,
                lastScanned: 'Just now',
                recentActivity: [
                  {
                    type: 'scan',
                    timestamp: 'Just now',
                    description: 'Security scan completed - No new threats detected',
                  },
                  ...asset.recentActivity.slice(0, 4),
                ],
              }
            : asset
        )
      )
    }, 2000)
  }

  const handleIsolate = (assetId: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? {
              ...asset,
              status: 'secure' as AssetStatus,
              recentActivity: [
                {
                  type: 'action',
                  timestamp: 'Just now',
                  description: 'Asset isolated from network - Threat neutralized',
                },
                ...asset.recentActivity.slice(0, 4),
              ],
            }
          : asset
      )
    )
  }

  const handleProtect = (assetId: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === assetId
          ? {
              ...asset,
              status: 'secure' as AssetStatus,
              riskScore: Math.max(asset.riskScore - 30, 0),
              vulnerabilities: Math.max(asset.vulnerabilities - 1, 0),
              recentActivity: [
                {
                  type: 'action',
                  timestamp: 'Just now',
                  description: 'Enhanced protection enabled - Security posture improved',
                },
                ...asset.recentActivity.slice(0, 4),
              ],
            }
          : asset
      )
    )
  }

  const categoryStats = {
    all: assets.length,
    ncd: assets.filter((a) => a.category === 'ncd').length,
    servers: assets.filter((a) => a.category === 'servers').length,
    cloud: assets.filter((a) => a.category === 'cloud').length,
    iot: assets.filter((a) => a.category === 'iot').length,
    supply_chain: assets.filter((a) => a.category === 'supply_chain').length,
  }

  const statusCounts = {
    secure: assets.filter((a) => a.status === 'secure').length,
    at_risk: assets.filter((a) => a.status === 'at_risk').length,
    under_threat: assets.filter((a) => a.status === 'under_threat').length,
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Network & Assets</h1>
        <p className="text-gray-400">
          Central view of all protected infrastructure and digital assets connected to the GHOST platform
        </p>
      </motion.div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => {
          const config = statusConfig[status as AssetStatus]
          const Icon = config.icon
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm font-bold ${config.color} mb-1`}>{config.label}</div>
                  <div className="text-2xl font-bold text-white">{count}</div>
                </div>
                <Icon className={`w-8 h-8 ${config.color}`} />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
      >
        <div className="flex flex-wrap gap-2">
          {(['all', ...Object.keys(categoryConfig)] as (AssetCategory | 'all')[]).map((category) => {
            const isSelected = selectedCategory === category
            const config =
              category === 'all'
                ? { label: 'All Assets', icon: Activity, color: 'text-white' }
                : categoryConfig[category as AssetCategory]
            const Icon = config.icon

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-ghost-neon-blue/20 border-ghost-neon-blue/50 text-ghost-neon-blue'
                    : 'bg-ghost-blue/30 border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {config.label} ({categoryStats[category]})
                </span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search assets by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-ghost-blue/50 glass border border-ghost-neon-blue/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-ghost-neon-blue/50"
        />
      </motion.div>

      {/* Assets Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredAssets.map((asset, index) => {
          const categoryInfo = categoryConfig[asset.category]
          const statusInfo = statusConfig[asset.status]
          const CategoryIcon = categoryInfo.icon
          const StatusIcon = statusInfo.icon

          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-ghost-blue/50 glass rounded-lg border ${statusInfo.borderColor} p-4 cursor-pointer hover:bg-ghost-blue/60 transition-all`}
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <CategoryIcon className={`w-6 h-6 ${categoryInfo.color}`} />
                  <div>
                    <h3 className="font-bold text-white">{asset.name}</h3>
                    <p className="text-xs text-gray-400">{categoryInfo.label}</p>
                  </div>
                </div>
                <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-medium">{asset.location}</span>
                </div>
                {asset.ipAddress && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">IP Address:</span>
                    <span className="text-white font-medium">{asset.ipAddress}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Risk Score:</span>
                  <span
                    className={`font-bold ${
                      asset.riskScore < 30
                        ? 'text-ghost-neon-green'
                        : asset.riskScore < 60
                        ? 'text-ghost-neon-yellow'
                        : 'text-ghost-neon-red'
                    }`}
                  >
                    {asset.riskScore}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Vulnerabilities:</span>
                  <span
                    className={`font-bold ${
                      asset.vulnerabilities === 0
                        ? 'text-ghost-neon-green'
                        : asset.vulnerabilities < 3
                        ? 'text-ghost-neon-yellow'
                        : 'text-ghost-neon-red'
                    }`}
                  >
                    {asset.vulnerabilities}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Last Scanned:</span>
                  <span className="text-white font-medium">{asset.lastScanned}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className={`text-xs px-2 py-1 rounded ${statusInfo.bgColor} ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ghost-blue/95 glass rounded-lg border border-ghost-neon-blue/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedAsset.name}</h2>
                  <p className="text-gray-400">{categoryConfig[selectedAsset.category].label}</p>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-ghost-blue/30 rounded-lg p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className={`text-lg font-bold ${statusConfig[selectedAsset.status].color}`}>
                    {statusConfig[selectedAsset.status].label}
                  </div>
                </div>
                <div className="bg-ghost-blue/30 rounded-lg p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Risk Score</div>
                  <div
                    className={`text-lg font-bold ${
                      selectedAsset.riskScore < 30
                        ? 'text-ghost-neon-green'
                        : selectedAsset.riskScore < 60
                        ? 'text-ghost-neon-yellow'
                        : 'text-ghost-neon-red'
                    }`}
                  >
                    {selectedAsset.riskScore}
                  </div>
                </div>
                <div className="bg-ghost-blue/30 rounded-lg p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Vulnerabilities</div>
                  <div
                    className={`text-lg font-bold ${
                      selectedAsset.vulnerabilities === 0
                        ? 'text-ghost-neon-green'
                        : selectedAsset.vulnerabilities < 3
                        ? 'text-ghost-neon-yellow'
                        : 'text-ghost-neon-red'
                    }`}
                  >
                    {selectedAsset.vulnerabilities}
                  </div>
                </div>
                <div className="bg-ghost-blue/30 rounded-lg p-4 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Last Scanned</div>
                  <div className="text-lg font-bold text-white">{selectedAsset.lastScanned}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-ghost-neon-blue mb-3">Asset Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white font-medium">{selectedAsset.location}</span>
                  </div>
                  {selectedAsset.ipAddress && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">IP Address:</span>
                      <span className="text-white font-medium">{selectedAsset.ipAddress}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-ghost-neon-blue mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {selectedAsset.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="bg-ghost-blue/30 rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{activity.type.toUpperCase()}</span>
                        <span className="text-xs text-gray-400">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-300">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleScan(selectedAsset.id)}
                  className="flex-1 px-4 py-2 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg hover:bg-ghost-neon-blue/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Scan className="w-4 h-4" />
                  <span className="font-bold">Scan</span>
                </button>
                {selectedAsset.status !== 'secure' && (
                  <>
                    <button
                      onClick={() => handleIsolate(selectedAsset.id)}
                      className="flex-1 px-4 py-2 bg-ghost-neon-yellow/20 border border-ghost-neon-yellow/50 rounded-lg hover:bg-ghost-neon-yellow/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span className="font-bold">Isolate</span>
                    </button>
                    <button
                      onClick={() => handleProtect(selectedAsset.id)}
                      className="flex-1 px-4 py-2 bg-ghost-neon-green/20 border border-ghost-neon-green/50 rounded-lg hover:bg-ghost-neon-green/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span className="font-bold">Protect</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

