import type { Parcel } from "../types/parcel";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// API function to fetch parcels
export async function fetchParcels(): Promise<Parcel[]> {
  const response = await fetch(`${API_BASE_URL}/api/parcels`);

  if (!response.ok) {
    throw new Error(`Failed to fetch parcels: ${response.statusText}`);
  }

  const data = await response.json();
  // Backend returns { success: true, count: number, parcels: [...] }
  return data.parcels;
}

// API function to update zoning
export interface ZoningUpdateRequest {
  parcelIds: number[];
  newZoning: string;
}

export async function updateZoning(request: ZoningUpdateRequest) {
  const response = await fetch(`${API_BASE_URL}/api/zoning/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
      batchId: uuidv4(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update zoning: ${response.statusText}`);
  }

  return response.json();
}
