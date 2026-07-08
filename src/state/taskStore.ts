import { useSyncExternalStore } from 'react'
import type { Priority, Task } from './task'
import { loadTasks, saveTasks, TaskPersistenceError } from '../persistence/taskPersistence'

interface TaskStoreState {
  tasks: Task[]
  loadError: string | null
}

function hydrate(): TaskStoreState {
  try {
    return { tasks: loadTasks(), loadError: null }
  } catch (error) {
    const message = error instanceof TaskPersistenceError ? error.message : 'Failed to load tasks'
    return { tasks: [], loadError: message }
  }
}

let state = hydrate()
const listeners = new Set<() => void>()

function emit(): void {
  listeners.forEach((listener) => listener())
}

function persist(): void {
  saveTasks(state.tasks)
}

function requireTitle(title: string): string {
  const trimmed = title.trim()
  if (!trimmed) {
    throw new Error('Task title must not be empty')
  }
  return trimmed
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot(): TaskStoreState {
  return state
}

export function createTask(input: { title: string; priority?: Priority }): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title: requireTitle(input.title),
    priority: input.priority ?? 'Medium',
    status: 'Active',
    createdAt: Date.now(),
  }
  state = { ...state, tasks: [...state.tasks, task] }
  persist()
  emit()
  return task
}

export function updateTask(id: string, changes: { title?: string; priority?: Priority }): void {
  state = {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            ...(changes.title !== undefined ? { title: requireTitle(changes.title) } : {}),
            ...(changes.priority !== undefined ? { priority: changes.priority } : {}),
          }
        : task,
    ),
  }
  persist()
  emit()
}

function setStatus(id: string, status: Task['status']): void {
  state = {
    ...state,
    tasks: state.tasks.map((task) => (task.id === id ? { ...task, status } : task)),
  }
  persist()
  emit()
}

export function completeTask(id: string): void {
  setStatus(id, 'Completed')
}

export function reopenTask(id: string): void {
  setStatus(id, 'Active')
}

export function deleteTask(id: string): void {
  state = { ...state, tasks: state.tasks.filter((task) => task.id !== id) }
  persist()
  emit()
}

export function retryLoad(): void {
  state = hydrate()
  emit()
}

export function useTaskStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot)
  return {
    tasks: snapshot.tasks,
    loadError: snapshot.loadError,
    createTask,
    updateTask,
    completeTask,
    reopenTask,
    deleteTask,
    retryLoad,
  }
}
