import LeafletMap from "./LeafletMap";
import type { Parcel } from "../../types/parcel";

interface MapContainerProps {
  parcels: Parcel[];
}

export default function MapContainer({ parcels }: MapContainerProps) {
  return <LeafletMap parcels={parcels} />;
}
