import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import ClassificationBanner from './ClassificationBanner'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-ghost-dark">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ClassificationBanner 
          level="TOP SECRET" 
          authority="FEDERAL" 
          mission="CYBER DEFENSE OPERATIONS"
          regionOfResponsibility="CONTINENTAL UNITED STATES"
        />
        <Navbar />
        <main className="flex-1 overflow-auto grid-background">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
