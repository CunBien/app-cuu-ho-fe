import { useEffect, useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Incident } from "@/data/mockData";
import { getMarkerColor, disasterIcons, urgencyLabels } from "@/utils/mapUtils";
import { Badge } from "@/components/ui/badge";

// You'll need to add your Mapbox token as an environment variable
// For now, we'll use a free alternative (MapLibre with OpenStreetMap)
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface MapViewProps {
  data: Incident[];
  center?: [number, number]; // [lat, lng]
  onBoundsChange?: (bounds: any) => void;
  mapRef: React.RefObject<any>;
}

const toLngLat = (item: Incident): [number, number] | null => {
  if (Array.isArray(item.coordinates) && item.coordinates.length >= 2) {
    return [item.coordinates[0], item.coordinates[1]]; // [lng, lat]
  }
  return null;
};

export default function MapView({
  data = [],
  center = [16, 106],
  onBoundsChange,
  mapRef,
}: MapViewProps) {
  const [selectedItem, setSelectedItem] = useState<Incident | null>(null);

  useEffect(() => {
    if (!mapRef?.current || !onBoundsChange) return;
    const map = mapRef.current.getMap();
    if (!map) return;

    const handleMoveEnd = () => {
      onBoundsChange(map.getBounds());
    };

    map.on("moveend", handleMoveEnd);
    return () => map.off("moveend", handleMoveEnd);
  }, [onBoundsChange, mapRef]);

  const initialLatitude = Array.isArray(center) ? center[0] : 16;
  const initialLongitude = Array.isArray(center) ? center[1] : 106;

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: initialLatitude,
        longitude: initialLongitude,
        zoom: 6,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={
        MAPBOX_TOKEN
          ? "mapbox://styles/mapbox/streets-v12"
          : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      }
      {...(MAPBOX_TOKEN && { mapboxAccessToken: MAPBOX_TOKEN })}
    >
      <NavigationControl position="top-right" />

      {/* Markers */}
      {data.map((item) => {
        const lngLat = toLngLat(item);
        if (!lngLat) return null;
        const [lng, lat] = lngLat;
        const color = getMarkerColor(item.urgency);

        return (
          <Marker
            key={item.id}
            longitude={lng}
            latitude={lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedItem(item);
            }}
          >
            <div
              className="cursor-pointer transition-transform hover:scale-110"
              style={{
                width: "32px",
                height: "40px",
              }}
            >
              <svg
                width="32"
                height="40"
                viewBox="0 0 32 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0C7.163 0 0 7.163 0 16c0 11 16 24 16 24s16-13 16-24c0-8.837-7.163-16-16-16z"
                  fill={color}
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="16" cy="16" r="6" fill="white" />
              </svg>
            </div>
          </Marker>
        );
      })}

      {/* Popup */}
      {selectedItem && toLngLat(selectedItem) && (
        <Popup
          longitude={toLngLat(selectedItem)![0]}
          latitude={toLngLat(selectedItem)![1]}
          anchor="top"
          onClose={() => setSelectedItem(null)}
          closeButton={true}
          closeOnClick={false}
          className="custom-popup"
        >
          <div className="p-2 min-w-[200px]">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm">
                {disasterIcons[selectedItem.disaster]} {selectedItem.name}
              </h3>
              <Badge variant="secondary" className="text-xs shrink-0">
                {urgencyLabels[selectedItem.urgency]}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {selectedItem.description.split(".")[0]}.
            </p>
            {selectedItem.status && (
              <p className="text-xs font-medium">
                Trạng thái: {selectedItem.status}
              </p>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
