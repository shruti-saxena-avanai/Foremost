import type { Priority } from '../state/task'
import './PrioritySelector.css'

const PRIORITIES: Priority[] = ['High', 'Medium', 'Low']

interface PrioritySelectorProps {
  value: Priority
  onChange: (priority: Priority) => void
  id?: string
}

function PrioritySelector({ value, onChange, id = 'priority' }: PrioritySelectorProps) {
  return (
    <label htmlFor={id} className={`priority-selector priority-selector--${value.toLowerCase()}`}>
      Priority
      <select id={id} value={value} onChange={(event) => onChange(event.target.value as Priority)}>
        {PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
    </label>
  )
}

export default PrioritySelector
