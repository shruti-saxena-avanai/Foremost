import type { Task } from '../state/task'

const STORAGE_KEY = 'foremost.tasks'

export class TaskPersistenceError extends Error {}

export function loadTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) return []

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error('Stored tasks are not an array')
    }
    return parsed as Task[]
  } catch (cause) {
    throw new TaskPersistenceError('Failed to read stored tasks', { cause })
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
