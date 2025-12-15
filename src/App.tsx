import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IncidentsProvider } from './context/IncidentsContext'
import Layout from './components/Layout'
import CommandOverview from './pages/CommandOverview'
import LiveThreatMap from './pages/LiveThreatMap'
import OpenIncidents from './pages/OpenIncidents'
import AIControlTower from './pages/AIControlTower'
import DefensiveOps from './pages/DefensiveOps'
import OffensiveOps from './pages/OffensiveOps'
import WirelessWall from './pages/WirelessWall'
import FlashAlert from './pages/FlashAlert'
import BEAMLive from './pages/BEAMLive'
import AuditLogs from './pages/AuditLogs'
import SystemSettings from './pages/SystemSettings'
import BroadcastControl from './pages/BroadcastControl'
import ValueMetrics from './pages/ValueMetrics'
import ElectionSecurity from './pages/ElectionSecurity'
import IndicationWarning from './pages/IndicationWarning'

function App() {
  return (
    <IncidentsProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<CommandOverview />} />
            <Route path="/threat-map" element={<LiveThreatMap />} />
            <Route path="/incidents" element={<OpenIncidents />} />
            <Route path="/ai-control" element={<AIControlTower />} />
            <Route path="/defensive-ops" element={<DefensiveOps />} />
            <Route path="/offensive-ops" element={<OffensiveOps />} />
            <Route path="/wirelesswall" element={<WirelessWall />} />
            <Route path="/flash-alert" element={<FlashAlert />} />
            <Route path="/beam-live" element={<BEAMLive />} />
            <Route path="/broadcast" element={<BroadcastControl />} />
            <Route path="/value-metrics" element={<ValueMetrics />} />
            <Route path="/election-security" element={<ElectionSecurity />} />
            <Route path="/indication-warning" element={<IndicationWarning />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </IncidentsProvider>
  )
}

export default App
