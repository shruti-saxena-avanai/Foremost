import type { Task } from '../state/task'

const STATUS_RANK: Record<Task['status'], number> = { Active: 0, Completed: 1 }
const PRIORITY_RANK: Record<Task['priority'], number> = { High: 0, Medium: 1, Low: 2 }

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (STATUS_RANK[a.status] !== STATUS_RANK[b.status]) {
      return STATUS_RANK[a.status] - STATUS_RANK[b.status]
    }
    if (PRIORITY_RANK[a.priority] !== PRIORITY_RANK[b.priority]) {
      return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
    }
    return a.createdAt - b.createdAt
  })
}
