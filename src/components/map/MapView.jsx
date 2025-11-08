// src/components/map/MapView.jsx
import React, { useRef, useEffect } from "react";
import { getMarkerIcon } from "../../utils/mapUtils";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Hàm lấy tọa độ an toàn: hỗ trợ cả coordinates (cũ) và latitude/longitude (mới)
const getPosition = (item) => {
  if (item.coordinates) return [item.coordinates[1], item.coordinates[0]]; // [lat, lng] → Mapbox dùng [lng, lat]
  if (item.latitude && item.longitude) return [item.latitude, item.longitude];
  return null;
};

export default function MapView({
  data = [],
  center = [16, 106], // [lat, lng]
  onBoundsChange,
}) {
  const mapRef = useRef();
  const [selectedItem, setSelectedItem] = React.useState(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !onBoundsChange) return;

    const handleMoveEnd = () => {
      onBoundsChange(map.getBounds());
    };

    map.on("moveend", handleMoveEnd);
    return () => map.off("moveend", handleMoveEnd);
  }, [onBoundsChange]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: center[0],
        longitude: center[1],
        zoom: 6,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position="top-right" />

      {/* Markers */}
      {data.map((item) => {
        const position = getPosition(item);
        if (!position) return null;

        const [lat, lng] = position;

        return (
          <Marker
            key={item.id}
            latitude={lat}
            longitude={lng}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedItem(item);
            }}
          >
            <div
              className="cursor-pointer transform -translate-x-1/2 -translate-y-full"
              dangerouslySetInnerHTML={{ __html: getMarkerIcon(item.urgency) }}
            />
          </Marker>
        );
      })}

      {/* Popup */}
      {selectedItem && (
        <Popup
          latitude={getPosition(selectedItem)[0]}
          longitude={getPosition(selectedItem)[1]}
          onClose={() => setSelectedItem(null)}
          closeButton={true}
          closeOnClick={false}
          offset={[0, -30]}
          className="text-sm"
        >
          <div className="p-2 max-w-xs">
            <h4 className="font-bold text-base">{selectedItem.name}</h4>
            <p>
              <strong>Loại:</strong>{" "}
              {selectedItem.disasterType === "flood" ? "Lũ lụt" : "Sạt lở"}
            </p>
            <p>
              <strong>Khẩn cấp:</strong> {selectedItem.urgency}
            </p>
            <p>
              <strong>Người ảnh hưởng:</strong> {selectedItem.affectedPeople}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
