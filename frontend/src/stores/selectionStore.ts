import { create } from 'zustand'

interface SelectionState {
  // State properties  
  selectedParcelIds: Set<number>
  selectedZoning: string
  
  // Actions (functions that change state)
  toggleParcel: (parcelId: number) => void
  clearSelection: () => void
  setZoning: (zoning: string) => void
}

export const useSelectionStore = create<SelectionState>((set) => ({
  // Initial state values
  selectedParcelIds: new Set(),
  selectedZoning: '',
  
  // Action: Toggle parcel selection
  toggleParcel: (parcelId) => set((state) => {
    const newSet = new Set(state.selectedParcelIds)  // Copy current set
    
    if (newSet.has(parcelId)) {
      newSet.delete(parcelId)  // Remove if already selected
    } else {
      newSet.add(parcelId)     // Add if not selected
    }
    
    return { selectedParcelIds: newSet }  // Return new state
  }),
  
  // Action: Clear all selections
  clearSelection: () => set({
    selectedParcelIds: new Set(),
    selectedZoning: ''
  }),
  
  // Action: Set zoning type
  setZoning: (zoning) => set({ selectedZoning: zoning }),
}))