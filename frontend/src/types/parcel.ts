export interface Parcel {
  id: number;
  geom: {
    type: "Polygon";
    coordinates: number[][][]; // GeoJSON polygon coordinates
  };
  currentZoning: string;
  address: string;
  owner: string;
  parcelNumber: string;
}

// Also export as type for better compatibility
export type ParcelType = Parcel;
