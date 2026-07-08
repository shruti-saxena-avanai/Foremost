import { useEffect, useState } from 'react'
import AppShell from './components/AppShell'
import TaskListView from './components/TaskListView'
import { useTaskStore } from './state/taskStore'

function App() {
  const { tasks, loadError, retryLoad } = useTaskStore()
  const [isHydrating, setIsHydrating] = useState(true)

  useEffect(() => {
    setIsHydrating(false)
  }, [])

  return (
    <AppShell>
      <TaskListView
        tasks={tasks}
        isLoading={isHydrating}
        error={loadError}
        onRetry={retryLoad}
      />
    </AppShell>
  )
}

export default App
