import type { ReactNode } from 'react'
import './AppShell.css'

interface AppShellProps {
  meta?: ReactNode
  filters?: ReactNode
  children?: ReactNode
}

function AppShell({ meta, filters, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__header-inner">
          <div className="app-shell__brand">
            <span className="app-shell__logo" aria-hidden="true">
              F
            </span>
            <span className="app-shell__title">Foremost</span>
          </div>
          {meta && <div className="app-shell__meta">{meta}</div>}
        </div>
      </header>
      <div className="app-shell__body">
        {filters && <div className="app-shell__filters">{filters}</div>}
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  )
}

export default AppShell
