import { useQuery } from "@tanstack/react-query";
import AppLayout from "./components/Layout/AppLayout";
import MapContainer from "./components/Map/MapContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelectionStore } from "./stores/selectionStore";
import { updateZoning, fetchParcels } from "./lib/api";

function App() {
  // Fetch parcel data at App level so we can refetch after updates - again realised this after I had this in MapContainer, not useful tbh
  const {
    data: parcels,
    isLoading,
    error,
    refetch: refetchParcels,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: fetchParcels,
  });

  // Get all selection state from Zustand store
  const selectedParcelIds = useSelectionStore(
    (state) => state.selectedParcelIds
  );
  const selectedZoning = useSelectionStore((state) => state.selectedZoning);
  const clearSelection = useSelectionStore((state) => state.clearSelection);
  const setZoning = useSelectionStore((state) => state.setZoning);

  const handleUpdate = async () => {
    const parcelIds = Array.from(selectedParcelIds);

    // Validation
    if (parcelIds.length === 0 || !selectedZoning) return;

    try {
      const result = await updateZoning({
        parcelIds,
        newZoning: selectedZoning,
      });

      console.log("Update successful:", result);
      clearSelection();

      // refetching again to show the updated data here
      await refetchParcels();

      alert(
        `Successfully updated ${result.updatedCount} parcels to ${selectedZoning}`
      );
    } catch (error) {
      console.error("Update failed:", error);
      alert(
        `Failed to update parcels: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  // Show loading or error states
  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading parcels...</p>
        </div>
        <Sidebar
          selectedCount={0}
          selectedZoning={selectedZoning}
          onZoningChange={setZoning}
          onClearAll={clearSelection}
          onUpdate={handleUpdate}
        />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="flex-1 bg-red-100 flex items-center justify-center">
          <p className="text-xl text-red-600">
            Error loading parcels: {error.message}
          </p>
        </div>
        <Sidebar
          selectedCount={0}
          selectedZoning={selectedZoning}
          onZoningChange={setZoning}
          onClearAll={clearSelection}
          onUpdate={handleUpdate}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <MapContainer parcels={parcels || []} />
      <Sidebar
        selectedCount={selectedParcelIds.size} // Get count from Set size
        selectedZoning={selectedZoning}
        onZoningChange={setZoning}
        onClearAll={clearSelection}
        onUpdate={handleUpdate}
      />
    </AppLayout>
  );
}

export default App;
