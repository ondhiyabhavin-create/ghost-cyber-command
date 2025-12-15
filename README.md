# 🔒 GHOST — Defense-Grade Cyber Command Center

**Tech for the People. Privacy Is Your Right.**

A real-time cyber defense & incident response command center UI prototype inspired by US DoD / DHS / NSA / NORAD-like systems.

## 🎯 Overview

GHOST is a fully functional UI-only prototype that simulates a mission-critical cyber command & control dashboard. All interactions behave exactly like a real system, but operate entirely on hardcoded data with no backend dependencies.

## ✨ Features

### Core Modules

- **🛰️ Command Overview** - Common Operating Picture with national infrastructure map and service health monitoring
- **🌐 Live Threat Map** - Real-time attack visualization with IP intelligence and blocking capabilities
- **🚨 Open Incidents** - Incident management system with auto-trigger logic and response tracking
- **🧠 AI Control Tower** - Autonomous AI agent command & control (Fortis Colosseum & Sicilian Defense)
- **🛡️ Defensive Ops** - NCD (Network Control Device) protection visualization
- **⚔️ Offensive Ops** - Counter-attack capabilities and strike authorization
- **🔐 WirelessWall** - FIPS 140-2 encryption & invisible network security
- **📡 Flash Alert** - Anonymous communication & zero-log alerting
- **🔁 BEAM Live** - Unified communication & real-time data streams
- **🧾 Audit & Logs** - System activity logging & compliance records
- **⚙️ System Settings** - Configuration & system management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 🎨 Design Philosophy

- **Defense-Grade Aesthetics** - Dark military theme with neon accents
- **Visualization First** - No tables as primary UI, everything is visual
- **Real-Time Feel** - Smooth animations and micro-interactions everywhere
- **Glassmorphism** - Modern UI with glass effects and neon strokes
- **Mission-Critical** - Feels like a classified government system

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tooling
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons

## 📋 Project Structure

```
Ghost/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── data/           # Hardcoded mock data
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🎯 Key Behaviors

- **Auto-Incident Creation** - When services turn red, incidents are automatically created
- **Real-Time Updates** - Services update status periodically (simulated)
- **Interactive Threat Map** - Block IPs and launch countermeasures
- **AI Agent Activity** - Visual representation of AI agents working
- **Strike Authorization** - Multi-step authorization flow for offensive operations

## 🔒 Security Features (UI-Simulated)

- FIPS 140-2 Encryption indicators
- Zero-log protocol visualization
- Anonymous communication channels
- Threat blocking and countermeasures
- Real-time network monitoring

## 📝 Notes

- This is a **UI-only prototype** - no real backend or APIs
- All data is **hardcoded** in `src/data/mockData.ts`
- All interactions are **simulated** but feel real
- Perfect for **demos** and **client presentations**

## 🎭 Demo Scenarios

1. **Service Degradation** - Watch services change status and trigger incidents
2. **Threat Blocking** - Block IPs on the threat map and see visual feedback
3. **AI Activity** - Observe AI agents working in the control tower
4. **Strike Execution** - Authorize and execute counter-attacks
5. **Incident Management** - Track incidents from detection to neutralization

## 📄 License

This is a prototype/demo project.

---

**Built with precision for defense-grade cyber operations.**
