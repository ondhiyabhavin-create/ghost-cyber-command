import { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'Admin' | 'Commander' | 'Analyst' | 'Operator'

interface UserRoleContextType {
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('Commander')

  return (
    <UserRoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </UserRoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider')
  }
  return context
}

