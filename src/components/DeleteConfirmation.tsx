import type { MouseEvent } from 'react'
import type { Task } from '../state/task'
import './Modal.css'
import './DeleteConfirmation.css'

interface DeleteConfirmationProps {
  task: Task
  onConfirm: () => void
  onCancel: () => void
}

function DeleteConfirmation({ task, onConfirm, onCancel }: DeleteConfirmationProps) {
  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onCancel()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal delete-confirmation" role="alertdialog" aria-label="Confirm delete">
        <p>
          Delete <strong>{task.title}</strong>? This cannot be undone.
        </p>
        <div className="modal__actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="delete-confirmation__confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
