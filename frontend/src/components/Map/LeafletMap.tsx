import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { useSelectionStore } from "../../stores/selectionStore";
import type { Parcel } from "../../types/parcel";

const ZONING_COLORS: Record<string, { color: string; fillColor: string }> = {
  Residential: {
    color: "#10b981", // Green
    fillColor: "#d1fae5", // Light green
  },
  Commercial: {
    color: "#3b82f6", // Blue
    fillColor: "#dbeafe", // Light blue
  },
  Industrial: {
    color: "#f59e0b", // Orange
    fillColor: "#fef3c7", // Light orange
  },
  "Mixed-Use": {
    color: "#8b5cf6", // Purple
    fillColor: "#ede9fe", // Light purple
  },
};

interface LeafletMapProps {
  parcels: Parcel[];
}

export default function LeafletMap({ parcels }: LeafletMapProps) {
  const selectedParcelIds = useSelectionStore(
    (state) => state.selectedParcelIds
  );
  const toggleParcel = useSelectionStore((state) => state.toggleParcel);

  // Calculate center from the first parcel's coordinates
  let center: [number, number] = [40.7128, -74.006]; // Default fallback
  let zoom = 13;

  if (parcels && parcels.length > 0) {
    // Calculate the center across all parcels for a better overview
    let minLat = Infinity,
      maxLat = -Infinity,
      minLng = Infinity,
      maxLng = -Infinity;

    parcels.forEach((parcel: Parcel) => {
      parcel.geom.coordinates[0].forEach((coord: number[]) => {
        const [lng, lat] = coord;
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
      });
    });

    // Set center to the middle of all parcels
    center = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
    zoom = 14; 
  }

  return (
    <div className="flex-1 relative">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render ALL parcel polygons - colored by zoning type! */}
        {(parcels as Parcel[])?.map((parcel: Parcel) => {
          const isSelected = selectedParcelIds.has(parcel.id);
          const zoningColors =
            ZONING_COLORS[parcel.currentZoning as keyof typeof ZONING_COLORS] ||
            ZONING_COLORS.Residential;

          return (
            <Polygon
              key={parcel.id}
              positions={parcel.geom.coordinates[0].map((coord: number[]) => [
                coord[1],
                coord[0],
              ])}
              pathOptions={{
                color: isSelected ? "#ef4444" : zoningColors.color, 
                fillColor: zoningColors.fillColor, 
                fillOpacity: isSelected ? 0.8 : 0.6, 
                weight: isSelected ? 3 : 2, 
              }}
              eventHandlers={{
                click: () => toggleParcel(parcel.id),
              }}
            />
          );
        })}
      </MapContainer>
      <div className="absolute top-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-lg pointer-events-none">
        <h3 className="font-semibold text-sm">
          Parcels Loaded: {parcels?.length || 0}
        </h3>
        <p className="text-xs text-gray-600">
          Click parcels to select for zoning updates
        </p>
      </div>

      <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-lg pointer-events-none">
        <h3 className="font-semibold text-sm mb-2">Zoning Legend</h3>
        <div className="space-y-2">
          {Object.entries(ZONING_COLORS).map(([zoningType, colors]) => {
            const count =
              parcels?.filter(
                (parcel: Parcel) => parcel.currentZoning === zoningType
              ).length || 0;

            return (
              <div key={zoningType} className="flex items-center gap-2 text-xs">
                <div
                  className="w-4 h-4 rounded border-2 flex-shrink-0"
                  style={{
                    backgroundColor: colors.fillColor,
                    borderColor: colors.color,
                  }}
                ></div>
                <span className="text-gray-700">
                  <span className="font-medium">{zoningType}</span>
                  {count > 0 && (
                    <span className="text-gray-500 ml-1">({count})</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selection indicator */}
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded border-2 border-red-500 bg-red-100 flex-shrink-0"></div>
            <span className="text-gray-700 font-medium">Selected Parcel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
