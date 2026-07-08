import type { Task } from '../state/task'
import './TaskListView.css'

interface TaskListViewProps {
  tasks: Task[]
  isLoading: boolean
  error?: string | null
  emptyMessage?: string
  onRetry?: () => void
  onEdit?: (task: Task) => void
  onToggleStatus?: (task: Task) => void
  onDelete?: (task: Task) => void
}

function TaskListView({
  tasks,
  isLoading,
  error,
  emptyMessage,
  onRetry,
  onEdit,
  onToggleStatus,
  onDelete,
}: TaskListViewProps) {
  if (isLoading) {
    return (
      <div className="task-list-state" role="status">
        Loading tasks…
      </div>
    )
  }

  if (error) {
    return (
      <div className="task-list-state task-list-state--error" role="alert">
        <p>{error}</p>
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-state">
        {emptyMessage ?? 'No tasks yet — add one to get started.'}
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const isCompleted = task.status === 'Completed'
        return (
          <li
            key={task.id}
            className={`task-list__item${isCompleted ? ' task-list__item--completed' : ''}`}
          >
            <div className="task-list__info">
              <span className="task-list__title">{task.title}</span>
              <span className="task-list__meta">
                <span className={`task-list__badge task-list__badge--priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className={`task-list__badge task-list__badge--status-${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              </span>
            </div>
            <div className="task-list__controls">
              <button type="button" onClick={() => onEdit?.(task)}>
                Edit
              </button>
              <button type="button" onClick={() => onToggleStatus?.(task)}>
                {isCompleted ? 'Reopen' : 'Complete'}
              </button>
              <button type="button" onClick={() => onDelete?.(task)}>
                Delete
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default TaskListView
