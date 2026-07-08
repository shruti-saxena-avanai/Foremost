import type { Priority, Status, Task } from '../state/task'

export type StatusFilter = 'All' | Status
export type PriorityFilter = 'All' | Priority

export interface TaskFilters {
  status: StatusFilter
  priority: PriorityFilter
}

export const DEFAULT_FILTERS: TaskFilters = { status: 'All', priority: 'All' }

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter((task) => {
    const matchesStatus = filters.status === 'All' || task.status === filters.status
    const matchesPriority = filters.priority === 'All' || task.priority === filters.priority
    return matchesStatus && matchesPriority
  })
}
