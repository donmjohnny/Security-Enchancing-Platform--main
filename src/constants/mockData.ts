/**
 * SENTINEL — Mock Data
 *
 * Centralized demo/mock data for all security modules.
 */

export interface Door {
  id: string;
  name: string;
  location: string;
  status: 'secure' | 'attention' | 'locked' | 'open';
  lastAccess: string;
  lastAccessBy: string;
  isRestricted: boolean;
  authorizedUsers: number;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'live' | 'offline' | 'recording';
  hasMotion: boolean;
  hasPerson: boolean;
  event: string | null;
  health: number;
  imageUrl: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  location: string;
  time: string;
  source: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  description: string;
}

export interface ThreatEvent {
  id: string;
  time: string;
  description: string;
  type: 'access' | 'camera' | 'network' | 'sensor' | 'behavior';
  status: 'detected' | 'verified' | 'cleared';
}

export interface Incident {
  id: string;
  number: string;
  title: string;
  sources: string[];
  status: 'investigating' | 'assigned' | 'resolved' | 'closed';
  timeline: { time: string; event: string }[];
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  icon: string;
  location: string;
  description: string;
  time: string;
  type: 'access' | 'camera' | 'network' | 'sensor' | 'alert';
}

export interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'server' | 'endpoint' | 'firewall';
  status: 'online' | 'offline' | 'warning';
  ip: string;
}

// ─── Doors ─────────────────────────────────────────────
export const DOORS: Door[] = [
  { id: '1', name: 'Main Entrance', location: 'Ground Floor', status: 'secure', lastAccess: '12:42 PM', lastAccessBy: 'Arjun Mehta', isRestricted: false, authorizedUsers: 48 },
  { id: '2', name: 'Server Room', location: 'Basement B1', status: 'locked', lastAccess: '11:15 AM', lastAccessBy: 'Priya Sharma', isRestricted: true, authorizedUsers: 5 },
  { id: '3', name: 'Emergency Exit A', location: 'Ground Floor', status: 'attention', lastAccess: '12:38 PM', lastAccessBy: 'Unknown', isRestricted: false, authorizedUsers: 48 },
  { id: '4', name: 'Conference Room', location: '2nd Floor', status: 'secure', lastAccess: '10:30 AM', lastAccessBy: 'Rohan Patel', isRestricted: false, authorizedUsers: 32 },
  { id: '5', name: 'Executive Suite', location: '5th Floor', status: 'locked', lastAccess: '09:00 AM', lastAccessBy: 'Neha Gupta', isRestricted: true, authorizedUsers: 8 },
  { id: '6', name: 'Parking Garage', location: 'Basement B2', status: 'secure', lastAccess: '12:40 PM', lastAccessBy: 'Vikram Singh', isRestricted: false, authorizedUsers: 48 },
  { id: '7', name: 'Lab Access', location: '3rd Floor', status: 'secure', lastAccess: '11:50 AM', lastAccessBy: 'Ananya Reddy', isRestricted: true, authorizedUsers: 12 },
  { id: '8', name: 'Storage Room', location: '1st Floor', status: 'locked', lastAccess: '08:45 AM', lastAccessBy: 'Security Staff', isRestricted: false, authorizedUsers: 16 },
  { id: '9', name: 'Cafeteria', location: 'Ground Floor', status: 'open', lastAccess: '12:44 PM', lastAccessBy: 'Open Access', isRestricted: false, authorizedUsers: 48 },
  { id: '10', name: 'Reception', location: 'Ground Floor', status: 'secure', lastAccess: '12:41 PM', lastAccessBy: 'Kiran Desai', isRestricted: false, authorizedUsers: 48 },
  { id: '11', name: 'IT Office', location: '4th Floor', status: 'secure', lastAccess: '12:35 PM', lastAccessBy: 'Amit Kumar', isRestricted: false, authorizedUsers: 20 },
  { id: '12', name: 'Roof Access', location: 'Rooftop', status: 'locked', lastAccess: '07:00 AM', lastAccessBy: 'Maintenance', isRestricted: true, authorizedUsers: 3 },
];

// ─── Cameras ───────────────────────────────────────────
export const CAMERAS: Camera[] = [
  { id: '1', name: 'CAM 01', location: 'Main Entrance', status: 'live', hasMotion: true, hasPerson: true, event: 'Motion Detected', health: 98, imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400' },
  { id: '2', name: 'CAM 02', location: 'Parking Lot A', status: 'live', hasMotion: false, hasPerson: false, event: 'Area Clear', health: 95, imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400' },
  { id: '3', name: 'CAM 03', location: 'Lobby', status: 'live', hasMotion: true, hasPerson: true, event: null, health: 100, imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400' },
  { id: '4', name: 'CAM 04', location: 'Corridor B', status: 'live', hasMotion: true, hasPerson: false, event: 'Motion Detected', health: 92, imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400' },
  { id: '5', name: 'CAM 05', location: 'Server Room', status: 'recording', hasMotion: false, hasPerson: false, event: 'Area Clear', health: 99, imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400' },
  { id: '6', name: 'CAM 06', location: 'Emergency Exit', status: 'live', hasMotion: false, hasPerson: false, event: null, health: 97, imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400' },
  { id: '7', name: 'CAM 07', location: 'Rooftop', status: 'live', hasMotion: false, hasPerson: false, event: 'Area Clear', health: 88, imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400' },
  { id: '8', name: 'CAM 08', location: 'Loading Dock', status: 'offline', hasMotion: false, hasPerson: false, event: null, health: 0, imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400' },
];

// ─── Alerts ────────────────────────────────────────────
export const ALERTS: SecurityAlert[] = [
  { id: '1', title: 'Unauthorized Access Attempt', location: 'Server Room', time: '2 min ago', source: 'Access Control System', severity: 'critical', status: 'active', description: 'Multiple failed access attempts detected at Server Room door using unregistered credentials.' },
  { id: '2', title: 'Suspicious Motion Detected', location: 'Corridor B', time: '8 min ago', source: 'Camera System', severity: 'high', status: 'active', description: 'Unusual movement pattern detected in Corridor B after-hours zone.' },
  { id: '3', title: 'Door Left Open', location: 'Emergency Exit A', time: '15 min ago', source: 'Door Sensor', severity: 'medium', status: 'active', description: 'Emergency Exit A has been open for more than 2 minutes without authorization.' },
  { id: '4', title: 'Network Anomaly', location: 'IT Infrastructure', time: '1 hr ago', source: 'Network Monitor', severity: 'medium', status: 'acknowledged', description: 'Unusual data transfer pattern detected from endpoint 192.168.1.45.' },
  { id: '5', title: 'Sensor Battery Low', location: 'Zone 3 Motion Sensor', time: '3 hrs ago', source: 'Sensor Management', severity: 'low', status: 'acknowledged', description: 'Motion sensor in Zone 3 reporting battery level below 15%.' },
];

// ─── Threat Events ─────────────────────────────────────
export const THREAT_EVENTS: ThreatEvent[] = [
  { id: '1', time: '12:31', description: 'Unusual login attempt detected', type: 'network', status: 'detected' },
  { id: '2', time: '12:33', description: 'Failed badge scan — Server Room', type: 'access', status: 'detected' },
  { id: '3', time: '12:36', description: 'Door access verified — Main Entrance', type: 'access', status: 'cleared' },
  { id: '4', time: '12:38', description: 'Emergency Exit A opened', type: 'access', status: 'detected' },
  { id: '5', time: '12:40', description: 'Camera 04 — Motion detected', type: 'camera', status: 'verified' },
  { id: '6', time: '12:42', description: 'No active threat confirmed', type: 'behavior', status: 'cleared' },
];

// ─── Incidents ─────────────────────────────────────────
export const INCIDENTS: Incident[] = [
  {
    id: '1', number: '#024', title: 'Suspicious Server Room Activity',
    sources: ['Camera 07', 'Door Sensor 03', 'Network Monitor'],
    status: 'investigating',
    timeline: [
      { time: '10:41 AM', event: 'Server Room door accessed with expired badge' },
      { time: '10:42 AM', event: 'Motion detected by Camera 07' },
      { time: '10:43 AM', event: 'Unrecognized device connected to network' },
      { time: '10:45 AM', event: 'Alert escalated to security team' },
    ],
    createdAt: '10:41 AM',
  },
  {
    id: '2', number: '#023', title: 'After-Hours Access — Parking Garage',
    sources: ['Door Sensor 06', 'Camera 02'],
    status: 'assigned',
    timeline: [
      { time: '11:30 PM', event: 'Parking garage access at unusual hour' },
      { time: '11:31 PM', event: 'Camera 02 captured vehicle entry' },
      { time: '11:35 PM', event: 'Badge verified — authorized personnel' },
    ],
    createdAt: '11:30 PM',
  },
];

// ─── Recent Activity ───────────────────────────────────
export const RECENT_ACTIVITY: ActivityEvent[] = [
  { id: '1', icon: 'door-open', location: 'Main Entrance', description: 'Access granted', time: '12:44 PM', type: 'access' },
  { id: '2', icon: 'camera', location: 'Camera 04', description: 'Motion detected', time: '12:40 PM', type: 'camera' },
  { id: '3', icon: 'wifi', location: 'Network Monitor', description: 'No anomaly detected', time: '12:38 PM', type: 'network' },
  { id: '4', icon: 'alert-circle', location: 'Emergency Exit A', description: 'Door opened', time: '12:38 PM', type: 'alert' },
  { id: '5', icon: 'shield-check', location: 'Server Room', description: 'Access denied — unregistered badge', time: '12:33 PM', type: 'access' },
];

// ─── Network Devices ───────────────────────────────────
export const NETWORK_DEVICES: NetworkDevice[] = [
  { id: '1', name: 'Core Router', type: 'router', status: 'online', ip: '10.0.0.1' },
  { id: '2', name: 'Main Firewall', type: 'firewall', status: 'online', ip: '10.0.0.2' },
  { id: '3', name: 'Switch Floor 1', type: 'switch', status: 'online', ip: '10.0.1.1' },
  { id: '4', name: 'Switch Floor 2', type: 'switch', status: 'online', ip: '10.0.2.1' },
  { id: '5', name: 'App Server', type: 'server', status: 'online', ip: '10.0.10.1' },
  { id: '6', name: 'DB Server', type: 'server', status: 'online', ip: '10.0.10.2' },
  { id: '7', name: 'Workstation 45', type: 'endpoint', status: 'warning', ip: '192.168.1.45' },
];

// ─── Security Score ────────────────────────────────────
export const SECURITY_SCORE = {
  overall: 92,
  physical: 95,
  cyber: 89,
  access: 94,
  surveillance: 97,
  incidentResponse: 88,
};

// ─── Security Summary ──────────────────────────────────
export const SECURITY_SUMMARY = {
  riskScore: 18,
  securityHealth: 94,
  activeIncidents: 2,
  systemsOnline: 98,
  summary: 'All critical access points are secure. Camera systems are operational. Two low-risk anomalies were detected and automatically monitored.',
};

// ─── Module Stats (for orbit bubbles) ──────────────────
export const MODULE_STATS = {
  doors: { total: 12, secure: 11, attention: 1 },
  cameras: { total: 24, active: 8, events: 2 },
  alerts: { total: 3, critical: 1 },
  sensors: { online: 18, total: 20 },
  incidents: { open: 2 },
  riskScore: 18,
};
