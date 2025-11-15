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
          closeButton={false}
          closeOnClick={false}
          offset={15}
          className="!p-0"
          maxWidth="none"
        >
          <div className="w-[calc(100vw-2rem)] max-w-sm bg-card/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-border/50 animate-scale-in">
            {/* Close button - Mobile friendly */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-all hover:scale-110 shadow-md"
              aria-label="Đóng"
            >
              <svg
                className="w-4 h-4 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-primary/15 via-primary/10 to-transparent px-4 py-4 border-b border-border/50">
              <div className="flex items-start gap-3 pr-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-3xl shrink-0 shadow-sm">
                  {disasterIcons[selectedItem.disaster]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-base leading-tight mb-2">
                    {selectedItem.name}
                  </h3>
                  <Badge
                    variant={
                      selectedItem.urgency === "high"
                        ? "destructive"
                        : selectedItem.urgency === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {urgencyLabels[selectedItem.urgency]}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-4 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1.5 uppercase tracking-wide">
                  Mô tả
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {selectedItem.status && (
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-semibold mb-1.5 uppercase tracking-wide">
                    Trạng thái
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {selectedItem.status}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-xs font-medium">{selectedItem.province}</p>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
