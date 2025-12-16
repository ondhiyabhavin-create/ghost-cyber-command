# GHOST Cyber Command Center - Role Permissions & Access Control

## Overview

This document outlines the role-based access control (RBAC) system for the GHOST Cyber Command Center. Each role has specific permissions and can access different pages/modules based on their responsibilities.

---

## Role Hierarchy

1. **Admin** - Full system access and administrative control
2. **Commander** - Strategic operations and command-level access
3. **Analyst** - Analysis, monitoring, and reporting capabilities
4. **Operator** - Basic operational monitoring and defensive actions

---

## Role Definitions & Responsibilities

### 🔴 Admin
**Highest Level Access**

**Actual Role:**
- Full system administrator with complete control over all GHOST platform features
- Can manage user roles, system settings, and all operational modules
- Has access to all classified information and administrative functions
- Can grant/revoke access, manage vendors, and control system configuration

**Responsibilities:**
- System configuration and maintenance
- User and role management
- Vendor access approval/restriction
- Complete audit log access
- All offensive and defensive operations
- Strategic decision-making authority

---

### 🟠 Commander
**Strategic Command Level**

**Actual Role:**
- Strategic operations commander with oversight of all cyber defense operations
- Makes high-level decisions and coordinates multi-team responses
- Has access to offensive operations and strategic tools
- Cannot modify system settings but has full operational control

**Responsibilities:**
- Strategic threat assessment and response coordination
- Offensive and defensive operations oversight
- Flash alert and broadcast control
- AI Control Tower management
- Access & Trust management
- Incident escalation and resolution

---

### 🟡 Analyst
**Intelligence & Analysis**

**Actual Role:**
- Intelligence analyst focused on threat analysis and reporting
- Read-only access to most systems with analysis capabilities
- Cannot perform offensive operations or system modifications
- Generates reports and provides intelligence insights

**Responsibilities:**
- Threat intelligence analysis
- Data analysis and pattern recognition
- Report generation
- Indication & Warning monitoring
- Value metrics analysis
- Audit log review (read-only)
- Defensive operations monitoring

---

### 🟢 Operator
**Basic Operations**

**Actual Role:**
- Basic operational staff with limited access to core monitoring functions
- Can view incidents and perform basic defensive actions
- No access to strategic tools, offensive operations, or administrative functions
- Focused on day-to-day operational monitoring

**Responsibilities:**
- System status monitoring
- Incident viewing and basic response
- Defensive operations execution
- Network asset monitoring
- Basic threat map viewing

---

## Page Access Matrix

| Page/Module | Admin | Commander | Analyst | Operator |
|------------|:-----:|:---------:|:-------:|:-------:|
| **Command Overview** | ✅ | ✅ | ✅ | ✅ |
| **Live Threat Map** | ✅ | ✅ | ✅ | ✅ |
| **Open Incidents** | ✅ | ✅ | ✅ | ✅ |
| **Indication & Warning** | ✅ | ✅ | ✅ | ❌ |
| **AI Control Tower** | ✅ | ✅ | ❌ | ❌ |
| **Defensive Ops** | ✅ | ✅ | ✅ | ✅ |
| **Offensive Ops** | ✅ | ✅ | ❌ | ❌ |
| **WirelessWall** | ✅ | ✅ | ✅ | ✅ |
| **Flash Alert** | ✅ | ✅ | ❌ | ❌ |
| **BEAM Live** | ✅ | ✅ | ✅ | ❌ |
| **Broadcast Control** | ✅ | ✅ | ❌ | ❌ |
| **Election Security** | ✅ | ✅ | ✅ | ❌ |
| **Value Metrics** | ✅ | ✅ | ✅ | ❌ |
| **Network & Assets** | ✅ | ✅ | ✅ | ✅ |
| **Access & Trust** | ✅ | ✅ | ❌ | ❌ |
| **Audit & Logs** | ✅ | ✅ | ✅ | ❌ |
| **System Settings** | ✅ | ❌ | ❌ | ❌ |

**Total Pages Accessible:**
- **Admin:** 17 pages (100%)
- **Commander:** 15 pages (88%)
- **Analyst:** 11 pages (65%)
- **Operator:** 6 pages (35%)

---

## Detailed Page Access by Role

### Admin (17 pages)
**Full System Access**

1. Command Overview
2. Live Threat Map
3. Open Incidents
4. Indication & Warning
5. AI Control Tower
6. Defensive Ops
7. Offensive Ops
8. WirelessWall
9. Flash Alert
10. BEAM Live
11. Broadcast Control
12. Election Security
13. Value Metrics
14. Network & Assets
15. Access & Trust
16. Audit & Logs
17. System Settings

**Unique Access:**
- System Settings (only Admin)
- Full Access & Trust management
- Complete administrative control

---

### Commander (15 pages)
**Strategic Operations**

1. Command Overview
2. Live Threat Map
3. Open Incidents
4. Indication & Warning
5. AI Control Tower
6. Defensive Ops
7. Offensive Ops
8. WirelessWall
9. Flash Alert
10. BEAM Live
11. Broadcast Control
12. Election Security
13. Value Metrics
14. Network & Assets
15. Access & Trust
16. Audit & Logs

**Restricted:**
- ❌ System Settings (Admin only)

**Unique Capabilities:**
- Offensive operations control
- Flash alert management
- Broadcast control
- Access & Trust management

---

### Analyst (11 pages)
**Intelligence & Analysis**

1. Command Overview
2. Live Threat Map
3. Open Incidents
4. Indication & Warning
5. Defensive Ops
6. WirelessWall
7. BEAM Live
8. Election Security
9. Value Metrics
10. Network & Assets
11. Audit & Logs

**Restricted:**
- ❌ AI Control Tower
- ❌ Offensive Ops
- ❌ Flash Alert
- ❌ Broadcast Control
- ❌ Access & Trust
- ❌ System Settings

**Unique Capabilities:**
- Read-only audit log access
- Value metrics analysis
- Threat intelligence analysis
- Report generation

---

### Operator (6 pages)
**Basic Operations**

1. Command Overview
2. Live Threat Map
3. Open Incidents
4. Defensive Ops
5. WirelessWall
6. Network & Assets

**Restricted:**
- ❌ Indication & Warning
- ❌ AI Control Tower
- ❌ Offensive Ops
- ❌ Flash Alert
- ❌ BEAM Live
- ❌ Broadcast Control
- ❌ Election Security
- ❌ Value Metrics
- ❌ Access & Trust
- ❌ Audit & Logs
- ❌ System Settings

**Unique Capabilities:**
- Basic system monitoring
- Incident viewing
- Defensive operations execution
- Network asset monitoring

---

## Access & Trust Data by Role

### Admin
- **NCD Devices:** 5 devices (full visibility)
- **Vendors:** 5 vendors (Full Access to approved, can restrict)
- **Sessions:** 3 active sessions
- **Access Logs:** Full system access logs with all actions

### Commander
- **NCD Devices:** 4 devices
- **Vendors:** 4 vendors (Full Access to approved)
- **Sessions:** 2 active sessions
- **Access Logs:** Strategic operations logs

### Analyst
- **NCD Devices:** 3 devices
- **Vendors:** 3 vendors (Read Only access)
- **Sessions:** 1 active session
- **Access Logs:** Read-only analysis logs (some actions denied)

### Operator
- **NCD Devices:** 2 devices
- **Vendors:** 2 vendors (Read Only access)
- **Sessions:** 1 active session
- **Access Logs:** Basic operational logs (limited access)

---

## Permission Summary

### Write/Modify Permissions
- **Admin:** ✅ All systems
- **Commander:** ✅ Operational systems (no system settings)
- **Analyst:** ❌ Read-only (no modifications)
- **Operator:** ✅ Basic defensive actions only

### Strategic Operations
- **Admin:** ✅ Full access
- **Commander:** ✅ Full access
- **Analyst:** ❌ No access
- **Operator:** ❌ No access

### Administrative Functions
- **Admin:** ✅ Full administrative control
- **Commander:** ❌ No administrative access
- **Analyst:** ❌ No administrative access
- **Operator:** ❌ No administrative access

### Reporting & Analysis
- **Admin:** ✅ Full access
- **Commander:** ✅ Full access
- **Analyst:** ✅ Full access
- **Operator:** ❌ Limited access

---

## Security Notes

⚠️ **Important:**
- This is a UI-only role simulation for demo/presentation purposes
- No actual authentication or backend validation is implemented
- Role switching is instant and does not require credentials
- All data is mock/static and changes based on selected role
- This system is NOT suitable for production use

---

## Role Switching

Users can switch roles using the dropdown in the sidebar footer. The sidebar navigation automatically updates to show only pages accessible to the selected role.

**Location:** Sidebar Footer → "Active Role" dropdown

**Available Roles:**
- Admin
- Commander
- Analyst
- Operator

---

*Last Updated: January 2025*
*GHOST Cyber Command Center - Role-Based Access Control Documentation*

