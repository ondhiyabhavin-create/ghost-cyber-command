import { motion } from 'framer-motion'
import { Radio, Video, MapPin, Activity, Zap } from 'lucide-react'

export default function BEAMLive() {
  const feeds = [
    { id: 1, name: 'Feed Alpha', type: 'video', status: 'live', latency: 120 },
    { id: 2, name: 'Feed Beta', type: 'iot', status: 'live', latency: 85 },
    { id: 3, name: 'Feed Gamma', type: 'gps', status: 'live', latency: 45 },
    { id: 4, name: 'Feed Delta', type: 'sensor', status: 'live', latency: 200 },
  ]

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">BEAM Live</h1>
        <p className="text-gray-400">Unified Communication & Real-Time Data Streams</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {feeds.map((feed, index) => (
              <motion.div
                key={feed.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {feed.type === 'video' && <Video className="w-6 h-6 text-ghost-neon-blue" />}
                    {feed.type === 'iot' && <Activity className="w-6 h-6 text-ghost-neon-green" />}
                    {feed.type === 'gps' && <MapPin className="w-6 h-6 text-ghost-neon-yellow" />}
                    {feed.type === 'sensor' && <Radio className="w-6 h-6 text-ghost-neon-red" />}
                    <div>
                      <h3 className="font-bold text-lg">{feed.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{feed.type} Stream</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-ghost-neon-green">LIVE</span>
                  </div>
                </div>

                {feed.type === 'video' && (
                  <div className="aspect-video bg-ghost-dark rounded-lg border border-ghost-neon-blue/20 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-ghost-neon-blue/20 to-transparent"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <Video className="w-16 h-16 text-ghost-neon-blue/50" />
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-xs font-mono">
                      LIVE
                    </div>
                  </div>
                )}

                {feed.type === 'iot' && (
                  <div className="space-y-2">
                    {['Temperature: 72°F', 'Humidity: 45%', 'Pressure: 1013 hPa'].map((data, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 bg-ghost-blue/30 rounded border border-white/10"
                      >
                        <span className="text-sm font-mono">{data}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {feed.type === 'gps' && (
                  <div className="h-48 bg-ghost-dark rounded-lg border border-ghost-neon-blue/20 flex items-center justify-center relative">
                    <MapPin className="w-12 h-12 text-ghost-neon-yellow" />
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-ghost-neon-yellow rounded-full"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <div className="absolute bottom-2 left-2 text-xs font-mono">
                      Lat: 40.7128° N, Lon: 74.0060° W
                    </div>
                  </div>
                )}

                {feed.type === 'sensor' && (
                  <div className="space-y-2">
                    {['Motion Detected', 'Door Status: Closed', 'Camera Active'].map((data, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 bg-ghost-blue/30 rounded border border-white/10 flex items-center justify-between"
                      >
                        <span className="text-sm">{data}</span>
                        <div className="w-2 h-2 bg-ghost-neon-green rounded-full animate-pulse" />
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-ghost-neon-yellow" />
                    <span className="text-gray-400">Latency:</span>
                    <span className={`font-mono font-bold ${
                      feed.latency < 100 ? 'text-ghost-neon-green' :
                      feed.latency < 200 ? 'text-ghost-neon-yellow' :
                      'text-ghost-neon-red'
                    }`}>
                      {feed.latency}ms
                    </span>
                  </div>
                  {feed.latency < 1000 && (
                    <span className="text-xs text-ghost-neon-green font-bold">
                      ⚡ Sub-second delivery
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <Radio className="w-5 h-5" />
              Stream Status
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Active Feeds</span>
                <span className="text-sm font-bold">{feeds.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Bandwidth</span>
                <span className="text-sm font-bold">2.4 Gbps</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg Latency</span>
                <span className="text-sm font-bold text-ghost-neon-green">
                  {Math.round(feeds.reduce((acc, f) => acc + f.latency, 0) / feeds.length)}ms
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
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Feed Types</h3>
            <div className="space-y-2">
              {['Video', 'IoT', 'GPS', 'Sensor'].map((type) => (
                <div
                  key={type}
                  className="flex items-center justify-between p-2 bg-ghost-blue/30 rounded border border-white/10"
                >
                  <span className="text-sm">{type}</span>
                  <span className="text-xs text-ghost-neon-green">ACTIVE</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
