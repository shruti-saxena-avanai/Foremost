export type Priority = 'High' | 'Medium' | 'Low'

export type Status = 'Active' | 'Completed'

export interface Task {
  id: string
  title: string
  priority: Priority
  status: Status
  createdAt: number
}
