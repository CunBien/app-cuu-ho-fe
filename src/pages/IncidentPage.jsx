import { useState, useRef } from "react";
import { mockData } from "../data/mockData";
import Sidebar from "../components/sidebar/SideBar";
import MapView from "../components/map/MapView";
import Header from "../components/header/Header";
import { useFilteredData } from "../hooks/useFilteredData";

const center = [16.0471, 108.2062]; // [lat, lng] – Đà Nẵng

export default function IncidentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [mapBounds, setMapBounds] = useState(null);

  // Ref điều khiển map – dùng chung cho cả Sidebar và ProvinceSelect
  const mapRef = useRef(null);

  const filteredData = useFilteredData(
    mockData,
    { searchTerm, selectedDisaster, selectedUrgency },
    mapBounds
  );

  // Focus vào một điểm sự cố
  const handleFocus = (incident) => {
    if (!mapRef.current || !incident) {
      console.warn("Map chưa sẵn sàng hoặc incident không hợp lệ");
      return;
    }

    let lng, lat;
    if (
      Array.isArray(incident.coordinates) &&
      incident.coordinates.length >= 2
    ) {
      [lng, lat] = incident.coordinates; // [lng, lat]
    } else if (incident.longitude && incident.latitude) {
      lng = Number(incident.longitude);
      lat = Number(incident.latitude);
    } else {
      console.warn("Không có tọa độ:", incident.name);
      return;
    }

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 15,
      duration: 2000,
      speed: 1.8,
      curve: 1.42,
      essential: true,
    });
  };

  // Focus vào tỉnh (gọi từ ProvinceSelect)
  const flyToProvince = (lng, lat, zoom = 9) => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom,
      duration: 2500,
      essential: true,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header mapRef={mapRef} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}
          selectedUrgency={selectedUrgency}
          setSelectedUrgency={setSelectedUrgency}
          filteredData={filteredData}
          handleFocus={handleFocus}
        />

        <div className="flex-1 relative bg-white">
          <MapView
            data={filteredData}
            center={center}
            onBoundsChange={setMapBounds}
            mapRef={mapRef}
          />
        </div>
      </div>
    </div>
  );
}
