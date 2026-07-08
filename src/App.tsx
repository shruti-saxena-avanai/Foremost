import { useEffect, useMemo, useState } from 'react'
import AppShell from './components/AppShell'
import TaskListView from './components/TaskListView'
import TaskEditor from './components/TaskEditor'
import DeleteConfirmation from './components/DeleteConfirmation'
import FilterControls from './components/FilterControls'
import { useTaskStore } from './state/taskStore'
import { sortTasks } from './utils/taskSorter'
import { DEFAULT_FILTERS, filterTasks, type TaskFilters } from './utils/taskFilter'
import type { Priority, Task } from './state/task'
import './App.css'

function App() {
  const { tasks, loadError, retryLoad, createTask, updateTask, completeTask, reopenTask, deleteTask } =
    useTaskStore()
  const [isHydrating, setIsHydrating] = useState(true)
  const [editingTask, setEditingTask] = useState<Task | 'new' | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS)

  useEffect(() => {
    setIsHydrating(false)
  }, [])

  const visibleTasks = useMemo(
    () => sortTasks(filterTasks(tasks, filters)),
    [tasks, filters],
  )

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
          <FilterControls
            status={filters.status}
            priority={filters.priority}
            onStatusChange={(status) => setFilters((current) => ({ ...current, status }))}
            onPriorityChange={(priority) => setFilters((current) => ({ ...current, priority }))}
            onClear={() => setFilters(DEFAULT_FILTERS)}
          />
          <button type="button" className="new-task-button" onClick={() => setEditingTask('new')}>
            New Task
          </button>
        </div>
      }
    >
      <TaskListView
        tasks={visibleTasks}
        isLoading={isHydrating}
        error={loadError}
        emptyMessage={
          tasks.length > 0 && visibleTasks.length === 0
            ? 'No tasks match the current filters.'
            : undefined
        }
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
