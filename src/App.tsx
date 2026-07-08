import { useEffect, useMemo, useState } from 'react'
import AppShell from './components/AppShell'
import TaskListView from './components/TaskListView'
import TaskEditor from './components/TaskEditor'
import DeleteConfirmation from './components/DeleteConfirmation'
import { useTaskStore } from './state/taskStore'
import { sortTasks } from './utils/taskSorter'
import type { Priority, Task } from './state/task'
import './App.css'

function App() {
  const { tasks, loadError, retryLoad, createTask, updateTask, completeTask, reopenTask, deleteTask } =
    useTaskStore()
  const [isHydrating, setIsHydrating] = useState(true)
  const [editingTask, setEditingTask] = useState<Task | 'new' | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  useEffect(() => {
    setIsHydrating(false)
  }, [])

  const sortedTasks = useMemo(() => sortTasks(tasks), [tasks])

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
        tasks={sortedTasks}
        isLoading={isHydrating}
        error={loadError}
        onRetry={retryLoad}
        onEdit={(task) => setEditingTask(task)}
        onToggleStatus={(task) =>
          task.status === 'Active' ? completeTask(task.id) : reopenTask(task.id)
        }
        onDelete={(task) => setDeletingTask(task)}
      />

      {editingTask !== null && (
        <TaskEditor
          initialTask={editingTask === 'new' ? null : editingTask}
          onSave={handleSave}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {deletingTask && (
        <DeleteConfirmation
          task={deletingTask}
          onConfirm={() => {
            deleteTask(deletingTask.id)
            setDeletingTask(null)
          }}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </AppShell>
  )
}

export default App
