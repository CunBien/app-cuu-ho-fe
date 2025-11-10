import React, { useEffect, useState } from "react";
import { getMarkerIcon } from "../../utils/mapUtils";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/**
 * Chuẩn hoá vị trí:
 * - mockData lưu coordinates = [lng, lat]
 * - toLngLat(item) trả về [lng, lat] hoặc null
 * - toLatLng(item) trả về [lat, lng] (dùng khi cần)
 */
const toLngLat = (item) => {
  if (!item) return null;
  if (Array.isArray(item.coordinates) && item.coordinates.length >= 2) {
    // dữ liệu của bạn: [lng, lat]
    return [item.coordinates[0], item.coordinates[1]]; // [lng, lat]
  }
  if (item.longitude !== undefined && item.latitude !== undefined) {
    return [item.longitude, item.latitude];
  }
  return null;
};

const toLatLng = (item) => {
  const ll = toLngLat(item);
  if (!ll) return null;
  return [ll[1], ll[0]]; // [lat, lng]
};

export default function MapView({
  data = [],
  center = [16, 106], // keep it but we'll pass to initialViewState properly
  onBoundsChange,
  mapRef, // nhận ref từ cha
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // nếu onBoundsChange cần mapbox-gl Map instance
    if (!mapRef?.current || !onBoundsChange) return;
    const map = mapRef.current.getMap();
    if (!map) return;

    const handleMoveEnd = () => {
      onBoundsChange(map.getBounds());
    };

    map.on("moveend", handleMoveEnd);
    return () => map.off("moveend", handleMoveEnd);
  }, [onBoundsChange, mapRef]);

  // initialViewState expects latitude, longitude; center arg is [lat, lng] in your original code,
  // but to avoid confusion, accept center as [lat, lng] and map to props below.
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
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position="top-right" />

      {/* Markers */}
      {data.map((item) => {
        const lngLat = toLngLat(item);
        if (!lngLat) return null;
        const [lng, lat] = lngLat;
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
      {selectedItem && (() => {
        const lngLat = toLngLat(selectedItem);
        if (!lngLat) return null;
        const [lng, lat] = lngLat;
        return (
          <Popup
            latitude={lat}
            longitude={lng}
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
        );
      })()}
    </Map>
  );
}
