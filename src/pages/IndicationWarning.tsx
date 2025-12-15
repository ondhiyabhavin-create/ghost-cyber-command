import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, Activity, Shield, Zap, Clock } from 'lucide-react'

interface WarningIndicator {
  id: string
  category: 'cyber' | 'infrastructure' | 'election' | 'disinformation'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  detectedAt: Date
  trend: 'increasing' | 'stable' | 'decreasing'
  confidence: number
  affectedRegions: string[]
}

export default function IndicationWarning() {
  const [indicators] = useState<WarningIndicator[]>([
    {
      id: '1',
      category: 'cyber',
      severity: 'critical',
      description: 'Coordinated DDoS attack pattern detected across multiple regions',
      detectedAt: new Date(Date.now() - 1800000),
      trend: 'increasing',
      confidence: 94,
      affectedRegions: ['Northeast', 'Southeast', 'West Coast'],
    },
    {
      id: '2',
      category: 'infrastructure',
      severity: 'high',
      description: 'Anomalous network traffic patterns in power grid systems',
      detectedAt: new Date(Date.now() - 3600000),
      trend: 'stable',
      confidence: 87,
      affectedRegions: ['Midwest'],
    },
    {
      id: '3',
      category: 'disinformation',
      severity: 'high',
      description: 'Rapid spread of false information campaign detected',
      detectedAt: new Date(Date.now() - 5400000),
      trend: 'increasing',
      confidence: 91,
      affectedRegions: ['National'],
    },
    {
      id: '4',
      category: 'election',
      severity: 'medium',
      description: 'Suspicious voter registration activity patterns',
      detectedAt: new Date(Date.now() - 7200000),
      trend: 'decreasing',
      confidence: 76,
      affectedRegions: ['Southeast'],
    },
  ])

  const [systemMetrics, setSystemMetrics] = useState({
    totalIndicators: indicators.length,
    criticalAlerts: indicators.filter((i) => i.severity === 'critical').length,
    avgConfidence: 0,
    responseTime: '2.3s',
  })

  useEffect(() => {
    const avgConf =
      indicators.reduce((acc, i) => acc + i.confidence, 0) / indicators.length || 0
    setSystemMetrics({
      totalIndicators: indicators.length,
      criticalAlerts: indicators.filter((i) => i.severity === 'critical').length,
      avgConfidence: avgConf,
      responseTime: '2.3s',
    })
  }, [indicators])

  const categoryIcons = {
    cyber: Shield,
    infrastructure: Activity,
    election: Zap,
    disinformation: AlertTriangle,
  }

  const severityColors = {
    low: 'text-ghost-neon-green',
    medium: 'text-ghost-neon-yellow',
    high: 'text-ghost-neon-red',
    critical: 'text-red-500',
  }

  const trendColors = {
    increasing: 'text-ghost-neon-red',
    stable: 'text-ghost-neon-yellow',
    decreasing: 'text-ghost-neon-green',
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Indication & Warning (I&W)</h1>
        <p className="text-gray-400">Early Threat Detection & Predictive Analysis</p>
      </motion.div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Active Indicators',
            value: systemMetrics.totalIndicators,
            icon: AlertTriangle,
            color: 'text-ghost-neon-blue',
          },
          {
            label: 'Critical Alerts',
            value: systemMetrics.criticalAlerts,
            icon: AlertTriangle,
            color: 'text-ghost-neon-red',
          },
          {
            label: 'Avg Confidence',
            value: `${systemMetrics.avgConfidence.toFixed(1)}%`,
            icon: Shield,
            color: 'text-ghost-neon-green',
          },
          {
            label: 'Response Time',
            value: systemMetrics.responseTime,
            icon: Clock,
            color: 'text-ghost-neon-yellow',
          },
        ].map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-6 h-6 ${metric.color}`} />
                <span className="text-xs text-gray-400">{metric.label}</span>
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Active Warning Indicators
            </h2>

            <div className="space-y-3">
              {indicators.map((indicator) => {
                const CategoryIcon = categoryIcons[indicator.category]
                return (
                  <motion.div
                    key={indicator.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-ghost-blue/30 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <CategoryIcon className={`w-6 h-6 ${severityColors[indicator.severity]}`} />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold capitalize">{indicator.category}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded capitalize ${severityColors[indicator.severity]}`}
                            >
                              {indicator.severity}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded capitalize flex items-center gap-1 ${trendColors[indicator.trend]}`}
                            >
                              <TrendingUp
                                className={`w-3 h-3 ${
                                  indicator.trend === 'increasing'
                                    ? 'rotate-180'
                                    : indicator.trend === 'stable'
                                    ? 'rotate-90'
                                    : ''
                                }`}
                              />
                              {indicator.trend}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{indicator.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-ghost-neon-blue">
                          {indicator.confidence}%
                        </div>
                        <div className="text-xs text-gray-500">Confidence</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Affected Regions:</span>
                      {indicator.affectedRegions.map((region, idx) => (
                        <span key={idx} className="px-2 py-1 bg-ghost-blue/50 rounded">
                          {region}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Detected: {indicator.detectedAt.toLocaleString()}
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
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Indicator Categories</h3>
            <div className="space-y-2">
              {Object.entries(categoryIcons).map(([category, Icon]) => {
                const count = indicators.filter((i) => i.category === category).length
                return (
                  <div
                    key={category}
                    className="flex items-center justify-between p-2 bg-ghost-blue/30 rounded border border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-ghost-neon-blue" />
                      <span className="text-sm capitalize">{category}</span>
                    </div>
                    <span className="text-xs font-bold">{count}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Warning Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">System Status</span>
                <span className="text-sm font-bold text-ghost-neon-green">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Monitoring Coverage</span>
                <span className="text-sm font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">False Positive Rate</span>
                <span className="text-sm font-bold text-ghost-neon-green">2.1%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

