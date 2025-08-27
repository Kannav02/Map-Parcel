interface SelectionPanelProps {
  selectedCount: number
}

export default function SelectionPanel({ selectedCount }: SelectionPanelProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Selected Parcels</h3>
      <p className="text-gray-600">{selectedCount} parcels selected</p>
    </div>
  )
}