import type { ReactNode } from 'react'
import './AppShell.css'

interface AppShellProps {
  filters?: ReactNode
  children?: ReactNode
}

function AppShell({ filters, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1 className="app-shell__title">Foremost</h1>
      </header>
      {filters && <div className="app-shell__filters">{filters}</div>}
      <main className="app-shell__main">{children}</main>
    </div>
  )
}

export default AppShell
