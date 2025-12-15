export interface ServiceHealth {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'under_attack';
  latency: number;
  threatLevel: number;
  aiConfidence: number;
  region: string;
}

export interface Incident {
  id: string;
  affectedRegion: string;
  affectedInfrastructure: string[];
  attackType: 'Ransomware' | 'DDoS' | 'Malware' | 'Supply Chain';
  sourceIPs: string[];
  status: 'detected' | 'contained' | 'counter_attack' | 'neutralized';
  detectedAt: string;
  assignedDepartment: 'Cyber Ops' | 'Hardware Ops' | 'Network Ops';
  assignedTeam: string;
  eta: string;
  timeline: Array<{
    stage: string;
    timestamp: string;
  }>;
  fieldResponse?: FieldResponse;
  requiresHardware: boolean;
}

export interface Threat {
  id: string;
  sourceIP: string;
  targetRegion: string;
  attackType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  isBlocked: boolean;
  threatCategory: 'global' | 'regional';
  escalationLevel: 'localized' | 'coordinated' | 'multi_region';
  escalationState: 1 | 2 | 3 | 4; // Level 1: Localized, 2: Coordinated, 3: National, 4: Strategic/State-Level
  attackCount: number;
  affectedRegions: string[];
  isStateActor: boolean;
}

export interface FieldResponse {
  id: string;
  incidentId: string;
  teamName: string;
  location: string;
  status: 'dispatched' | 'en_route' | 'on_site' | 'repairing' | 'completed';
  dispatchTime: string;
  eta: string;
  responseType: 'remote' | 'on_site';
  repairProgress: number;
}

export interface BroadcastMessage {
  id: string;
  content: string;
  target: 'public' | 'internal' | 'allied';
  status: 'draft' | 'approved' | 'broadcasting' | 'completed';
  createdAt: string;
  approvedBy: string;
  reach: number;
}

export interface AIAgent {
  id: string;
  name: string;
  type: 'offensive' | 'defensive';
  category: string;
  status: 'active' | 'idle' | 'analyzing' | 'executing';
  currentTask: string;
  confidence: number;
}

export interface Region {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'under_attack';
  coordinates: { x: number; y: number };
  threats: number;
}

export const initialServices: ServiceHealth[] = [
  {
    id: 'power-grid',
    name: 'Power Grid',
    status: 'healthy',
    latency: 12,
    threatLevel: 2,
    aiConfidence: 98,
    region: 'Northeast',
  },
  {
    id: 'telecom',
    name: 'Telecom',
    status: 'healthy',
    latency: 8,
    threatLevel: 1,
    aiConfidence: 99,
    region: 'National',
  },
  {
    id: 'defense-network',
    name: 'Defense Network',
    status: 'degraded',
    latency: 45,
    threatLevel: 5,
    aiConfidence: 87,
    region: 'Southwest',
  },
  {
    id: 'election-infrastructure',
    name: 'Election Infrastructure',
    status: 'healthy',
    latency: 15,
    threatLevel: 1,
    aiConfidence: 99,
    region: 'National',
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    status: 'under_attack',
    latency: 120,
    threatLevel: 9,
    aiConfidence: 92,
    region: 'West Coast',
  },
  {
    id: 'data-centers',
    name: 'Data Centers',
    status: 'healthy',
    latency: 5,
    threatLevel: 2,
    aiConfidence: 97,
    region: 'National',
  },
];

export const initialIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    affectedRegion: 'West Coast',
    affectedInfrastructure: ['Supply Chain'],
    attackType: 'DDoS',
    sourceIPs: ['192.168.45.23', '10.0.0.142'],
    status: 'contained',
    detectedAt: '2024-01-15T14:32:00Z',
    assignedDepartment: 'Hardware Ops',
    assignedTeam: 'Field Team Delta',
    eta: '2024-01-15T16:00:00Z',
    requiresHardware: true,
    fieldResponse: {
      id: 'field-001',
      incidentId: 'INC-2024-001',
      teamName: 'Field Team Delta',
      location: 'San Francisco, CA',
      status: 'on_site',
      dispatchTime: '2024-01-15T14:45:00Z',
      eta: '2024-01-15T16:00:00Z',
      responseType: 'on_site',
      repairProgress: 65,
    },
    timeline: [
      { stage: 'Detected', timestamp: '2024-01-15T14:32:00Z' },
      { stage: 'Contained', timestamp: '2024-01-15T14:45:00Z' },
      { stage: 'Field Team Dispatched', timestamp: '2024-01-15T14:45:00Z' },
      { stage: 'On-Site Repair', timestamp: '2024-01-15T15:00:00Z' },
    ],
  },
];

export const broadcastMessages: BroadcastMessage[] = [
  {
    id: 'broadcast-001',
    content: 'System maintenance scheduled for tonight. All services will remain operational.',
    target: 'public',
    status: 'approved',
    createdAt: '2024-01-15T10:00:00Z',
    approvedBy: 'Commander Smith',
    reach: 1250000,
  },
  {
    id: 'broadcast-002',
    content: 'Counter-propaganda operation active. Monitoring disinformation campaigns.',
    target: 'internal',
    status: 'broadcasting',
    createdAt: '2024-01-15T12:00:00Z',
    approvedBy: 'Director Johnson',
    reach: 5000,
  },
];

export const valueMetrics = {
  dataProcessed: '2.4 PB',
  threatsNeutralized: 1247,
  uptime: '99.99%',
  activeSubscriptions: 47,
  syndicationPartners: 12,
  revenueStreams: ['Data Syndication', 'Threat Intelligence', 'Infrastructure Monitoring'],
};

export const initialThreats: Threat[] = [
  {
    id: 'threat-001',
    sourceIP: '192.168.45.23',
    targetRegion: 'West Coast',
    attackType: 'DDoS',
    severity: 'critical',
    timestamp: '2024-01-15T14:32:00Z',
    isBlocked: false,
    threatCategory: 'regional',
    escalationLevel: 'localized',
    escalationState: 1,
    attackCount: 1,
    affectedRegions: ['West Coast'],
    isStateActor: false,
  },
  {
    id: 'threat-002',
    sourceIP: '10.0.0.142',
    targetRegion: 'West Coast',
    attackType: 'DDoS',
    severity: 'high',
    timestamp: '2024-01-15T14:33:00Z',
    isBlocked: false,
    threatCategory: 'regional',
    escalationLevel: 'localized',
    escalationState: 1,
    attackCount: 1,
    affectedRegions: ['West Coast'],
    isStateActor: false,
  },
  {
    id: 'threat-003',
    sourceIP: '172.16.0.89',
    targetRegion: 'Northeast',
    attackType: 'Malware',
    severity: 'medium',
    timestamp: '2024-01-15T13:20:00Z',
    isBlocked: true,
    threatCategory: 'global',
    escalationLevel: 'multi_region',
    escalationState: 3,
    attackCount: 5,
    affectedRegions: ['Northeast', 'Southeast', 'Midwest'],
    isStateActor: false,
  },
  {
    id: 'threat-004',
    sourceIP: '203.0.113.42',
    targetRegion: 'National',
    attackType: 'Advanced Persistent Threat',
    severity: 'critical',
    timestamp: '2024-01-15T15:00:00Z',
    isBlocked: false,
    threatCategory: 'global',
    escalationLevel: 'multi_region',
    escalationState: 4,
    attackCount: 12,
    affectedRegions: ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West Coast'],
    isStateActor: true,
  },
];

export const aiAgents: AIAgent[] = [
  {
    id: 'venatores-01',
    name: 'Venatores Alpha',
    type: 'offensive',
    category: 'Venatores',
    status: 'active',
    currentTask: 'Tracking threat source IP 192.168.45.23',
    confidence: 94,
  },
  {
    id: 'retiarius-01',
    name: 'Retiarius Prime',
    type: 'offensive',
    category: 'Retiarius',
    status: 'executing',
    currentTask: 'Counter-attack in progress',
    confidence: 88,
  },
  {
    id: 'bestiarii-01',
    name: 'Bestiarii Unit',
    type: 'offensive',
    category: 'Bestiarii',
    status: 'analyzing',
    currentTask: 'Analyzing attack patterns',
    confidence: 91,
  },
  {
    id: 'recon-01',
    name: 'Recon Scout Alpha',
    type: 'defensive',
    category: 'Recon Scouts',
    status: 'active',
    currentTask: 'Monitoring network traffic',
    confidence: 96,
  },
  {
    id: 'linemen-01',
    name: 'Linemen Unit 1',
    type: 'defensive',
    category: 'Linemen',
    status: 'active',
    currentTask: 'Protecting NCD core',
    confidence: 98,
  },
  {
    id: 'pawns-01',
    name: 'Pawns Defense Grid',
    type: 'defensive',
    category: 'Pawns',
    status: 'active',
    currentTask: 'Perimeter defense active',
    confidence: 95,
  },
];

export const regions: Region[] = [
  { id: 'ne', name: 'Northeast', status: 'healthy', coordinates: { x: 75, y: 25 }, threats: 1 },
  { id: 'se', name: 'Southeast', status: 'healthy', coordinates: { x: 70, y: 60 }, threats: 0 },
  { id: 'mw', name: 'Midwest', status: 'healthy', coordinates: { x: 50, y: 45 }, threats: 0 },
  { id: 'sw', name: 'Southwest', status: 'degraded', coordinates: { x: 30, y: 55 }, threats: 0 },
  { id: 'wc', name: 'West Coast', status: 'under_attack', coordinates: { x: 15, y: 40 }, threats: 2 },
  { id: 'pnw', name: 'Pacific Northwest', status: 'healthy', coordinates: { x: 10, y: 20 }, threats: 0 },
];
