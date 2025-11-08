// src/components/map/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef } from "react";
import { getMarkerIcon } from "../../utils/mapUtils";

// Hàm lấy tọa độ an toàn: hỗ trợ cả coordinates (cũ) và latitude/longitude (mới)
const getPosition = (item) => {
  if (item.coordinates) return [item.coordinates[1], item.coordinates[0]]; // [lat, lng]
  if (item.latitude && item.longitude) return [item.latitude, item.longitude];
  return null; // Không có tọa độ
};

export default function MapView({ data = [], center = [16, 106], onBoundsChange }) {
  const mapRef = useRef();

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="h-full w-full"
      whenCreated={(map) => {
        mapRef.current = map;
        if (onBoundsChange) map.on("moveend", () => onBoundsChange(map.getBounds()));
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />

      {data.map((item) => {
        const position = getPosition(item);
        if (!position) return null; // Skip nếu không có tọa độ

        return (
          <Marker
            key={item.id}
            position={position}
            icon={getMarkerIcon(item.urgency)}
          >
            <Popup>
              <div className="p-2 text-sm">
                <h4 className="font-bold">{item.name}</h4>
                <p>
                  <strong>Loại:</strong>{" "}
                  {item.disasterType === "flood" ? "Lũ lụt" : "Sạt lở"}
                </p>
                <p>
                  <strong>Khẩn cấp:</strong> {item.urgency}
                </p>
                <p>
                  <strong>Người ảnh hưởng:</strong> {item.affectedPeople}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
