import { useState, type FormEvent, type MouseEvent } from 'react'
import type { Priority, Task } from '../state/task'
import PrioritySelector from './PrioritySelector'
import './Modal.css'
import './TaskEditor.css'

interface TaskEditorProps {
  initialTask?: Task | null
  onSave: (input: { title: string; priority: Priority }) => void
  onCancel: () => void
}

function TaskEditor({ initialTask, onSave, onCancel }: TaskEditorProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [priority, setPriority] = useState<Priority>(initialTask?.priority ?? 'Medium')
  const [showError, setShowError] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setShowError(true)
      return
    }
    onSave({ title: trimmed, priority })
  }

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onCancel()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <form
        className="modal task-editor"
        onSubmit={handleSubmit}
        aria-label={initialTask ? 'Edit task' : 'New task'}
      >
        <h2>{initialTask ? 'Edit Task' : 'New Task'}</h2>
        <label className="task-editor__field">
          Title
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setShowError(false)
            }}
            autoFocus
          />
        </label>
        {showError && (
          <p role="alert" className="task-editor__error">
            Title is required.
          </p>
        )}
        <PrioritySelector value={priority} onChange={setPriority} />
        <div className="modal__actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default TaskEditor
