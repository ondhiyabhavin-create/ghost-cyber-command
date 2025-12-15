import { motion } from 'framer-motion'
import { Region, ServiceHealth } from '../data/mockData'

interface ThreatMapProps {
  regions: Region[]
  services: ServiceHealth[]
}

export default function ThreatMap({ regions, services }: ThreatMapProps) {
  const getRegionStatus = (regionId: string) => {
    const regionServices = services.filter((s) => s.region.includes(regionId))
    if (regionServices.some((s) => s.status === 'under_attack')) return 'under_attack'
    if (regionServices.some((s) => s.status === 'degraded')) return 'degraded'
    return 'healthy'
  }

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Simplified US map outline */}
        <path
          d="M 20 30 L 30 25 L 40 30 L 50 28 L 60 32 L 70 30 L 75 35 L 70 45 L 65 55 L 60 60 L 50 58 L 40 62 L 30 58 L 25 50 L 20 40 Z"
          fill="rgba(0, 212, 255, 0.05)"
          stroke="rgba(0, 212, 255, 0.2)"
          strokeWidth="0.5"
        />

        {regions.map((region) => {
          const status = getRegionStatus(region.id)
          const statusColor =
            status === 'healthy'
              ? '#00ff88'
              : status === 'degraded'
              ? '#ffd700'
              : '#ff0040'

          return (
            <g key={region.id}>
              <motion.circle
                cx={region.coordinates.x}
                cy={region.coordinates.y}
                r={status === 'under_attack' ? 4 : 3}
                fill={statusColor}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: status === 'under_attack' ? [1, 1.5, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              {status === 'under_attack' && (
                <motion.circle
                  cx={region.coordinates.x}
                  cy={region.coordinates.y}
                  r={6}
                  fill="none"
                  stroke={statusColor}
                  strokeWidth="0.5"
                  initial={{ r: 4, opacity: 1 }}
                  animate={{ r: 12, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
              <text
                x={region.coordinates.x}
                y={region.coordinates.y + 8}
                fontSize="3"
                fill={statusColor}
                textAnchor="middle"
                className="font-mono"
              >
                {region.name}
              </text>
            </g>
          )
        })}

        {/* Attack lines simulation */}
        {services
          .filter((s) => s.status === 'under_attack')
          .map((service, index) => {
            const region = regions.find((r) => service.region.includes(r.name))
            if (!region) return null

            return (
              <motion.line
                key={`attack-${service.id}-${index}`}
                x1={region.coordinates.x - 10}
                y1={region.coordinates.y - 10}
                x2={region.coordinates.x}
                y2={region.coordinates.y}
                stroke="#ff0040"
                strokeWidth="0.3"
                strokeDasharray="1 1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            )
          })}
      </svg>
    </div>
  )
}
