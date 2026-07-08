import type { PriorityFilter, StatusFilter } from '../utils/taskFilter'
import './FilterControls.css'

interface FilterControlsProps {
  status: StatusFilter
  priority: PriorityFilter
  onStatusChange: (status: StatusFilter) => void
  onPriorityChange: (priority: PriorityFilter) => void
  onClear: () => void
}

function FilterControls({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
  onClear,
}: FilterControlsProps) {
  const isFiltered = status !== 'All' || priority !== 'All'

  return (
    <div className="filter-controls">
      <label>
        Status
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Priority
        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as PriorityFilter)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
      <button type="button" onClick={onClear} disabled={!isFiltered}>
        Clear filters
      </button>
    </div>
  )
}

export default FilterControls
