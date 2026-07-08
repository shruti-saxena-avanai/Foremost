import { useEffect, useState } from 'react'
import AppShell from './components/AppShell'
import TaskListView from './components/TaskListView'
import TaskEditor from './components/TaskEditor'
import { useTaskStore } from './state/taskStore'
import type { Priority, Task } from './state/task'
import './App.css'

function App() {
  const { tasks, loadError, retryLoad, createTask, updateTask } = useTaskStore()
  const [isHydrating, setIsHydrating] = useState(true)
  const [editingTask, setEditingTask] = useState<Task | 'new' | null>(null)

  useEffect(() => {
    setIsHydrating(false)
  }, [])

  function handleSave(input: { title: string; priority: Priority }) {
    if (editingTask && editingTask !== 'new') {
      updateTask(editingTask.id, input)
    } else {
      createTask(input)
    }
    setEditingTask(null)
  }

  return (
    <AppShell
      filters={
        <div className="toolbar">
          <button type="button" className="new-task-button" onClick={() => setEditingTask('new')}>
            New Task
          </button>
        </div>
      }
    >
      <TaskListView
        tasks={tasks}
        isLoading={isHydrating}
        error={loadError}
        onRetry={retryLoad}
        onEdit={(task) => setEditingTask(task)}
      />

      {editingTask !== null && (
        <TaskEditor
          initialTask={editingTask === 'new' ? null : editingTask}
          onSave={handleSave}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </AppShell>
  )
}

export default App
