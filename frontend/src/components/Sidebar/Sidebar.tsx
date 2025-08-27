import SelectionPanel from "./SelectionPanel";
import ZoningForm from "./ZoningForm";

interface SidebarProps {
  selectedCount: number;
  selectedZoning: string;
  onZoningChange: (zoning: string) => void;
  onClearAll: () => void;
  onUpdate: () => void;
}

export default function Sidebar({
  selectedCount,
  selectedZoning,
  onZoningChange,
  onClearAll,
  onUpdate,
}: SidebarProps) {
  return (
    <div className="w-80 bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Controls</h2>

      <SelectionPanel selectedCount={selectedCount} />

      <ZoningForm
        selectedZoning={selectedZoning}
        onZoningChange={onZoningChange}
        onClearAll={onClearAll}
        onUpdate={onUpdate}
        disabled={selectedCount === 0}
      />
    </div>
  );
}
