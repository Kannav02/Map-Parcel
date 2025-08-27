interface ZoningFormProps {
  selectedZoning: string
  onZoningChange: (zoning: string) => void
  onClearAll: () => void
  onUpdate: () => void
  disabled?: boolean
}

export default function ZoningForm({ 
  selectedZoning, 
  onZoningChange, 
  onClearAll, 
  onUpdate,
  disabled = false
}: ZoningFormProps) {
  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Change to:
        </label>
        <select 
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedZoning}
          onChange={(e) => onZoningChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select zoning type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Mixed-Use">Mixed-Use</option>
        </select>
      </div>
      
      <div className="flex gap-2">
        <button 
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
          onClick={onClearAll}
          disabled={disabled}
        >
          Clear All
        </button>
        <button 
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          onClick={onUpdate}
          disabled={disabled || !selectedZoning}
        >
          Update
        </button>
      </div>
    </>
  )
}