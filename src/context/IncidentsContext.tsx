import { createContext, useContext, useState, ReactNode } from 'react'
import { Incident } from '../data/mockData'
import { initialIncidents } from '../data/mockData'

interface IncidentsContextType {
  incidents: Incident[]
  updateIncident: (id: string, updates: Partial<Incident>) => void
  secureIncident: (id: string) => void
  escalateToCounterAttack: (id: string) => void
  upgradeStatus: (id: string, newStatus: Incident['status']) => void
}

const IncidentsContext = createContext<IncidentsContextType | undefined>(undefined)

export function IncidentsProvider({ children }: { children: ReactNode }) {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)

  const updateIncident = (id: string, updates: Partial<Incident>) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id ? { ...inc, ...updates } : inc
      )
    )
  }

  const secureIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id && inc.status !== 'neutralized') {
          return {
            ...inc,
            status: 'neutralized',
            timeline: [
              ...inc.timeline,
              {
                stage: 'Secured & Neutralized',
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return inc
      })
    )
  }

  const escalateToCounterAttack = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id && inc.status === 'contained') {
          return {
            ...inc,
            status: 'counter_attack',
            timeline: [
              ...inc.timeline,
              {
                stage: 'Counter-Attack Initiated',
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return inc
      })
    )
  }

  const upgradeStatus = (id: string, newStatus: Incident['status']) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === id) {
          const statusOrder: Incident['status'][] = ['detected', 'contained', 'counter_attack', 'neutralized']
          const currentIndex = statusOrder.indexOf(inc.status)
          const newIndex = statusOrder.indexOf(newStatus)
          
          if (newIndex > currentIndex) {
            const statusLabels: Record<Incident['status'], string> = {
              detected: 'Detected',
              contained: 'Contained',
              counter_attack: 'Counter-Attack Initiated',
              neutralized: 'Secured & Neutralized',
            }
            
            return {
              ...inc,
              status: newStatus,
              timeline: [
                ...inc.timeline,
                {
                  stage: statusLabels[newStatus],
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          }
        }
        return inc
      })
    )
  }

  return (
    <IncidentsContext.Provider
      value={{
        incidents,
        updateIncident,
        secureIncident,
        escalateToCounterAttack,
        upgradeStatus,
      }}
    >
      {children}
    </IncidentsContext.Provider>
  )
}

export function useIncidents() {
  const context = useContext(IncidentsContext)
  if (context === undefined) {
    throw new Error('useIncidents must be used within an IncidentsProvider')
  }
  return context
}

