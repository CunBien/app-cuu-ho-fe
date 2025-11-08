// src/pages/IncientPage.jsx
import { useState } from "react";
import { mockData } from "../data/mockData";
import Sidebar from "../components/sidebar/SideBar";
import SearchBar from "../components/sidebar/search/SearchBar";
import FilterPanel from "../components/sidebar/filter/FilterPanel";
import RescueCard from "../components/sidebar/incidents/RescueCard";
import MapView from "../components/map/MapView";
import { useFilteredData } from "../hooks/useFilteredData";
import L from "leaflet";

// Fix icon mặc định Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const center = [16.0471, 108.2062]; // Việt Nam

export default function IncientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [mapBounds, setMapBounds] = useState(null);

  const filteredData = useFilteredData(
    mockData,
    { searchTerm, selectedDisaster, selectedUrgency },
    mapBounds
  );

  // Hàm tạm để test focus marker khi click "Xem trên bản đồ"
  const handleFocus = (incident) => {
    console.log("Focus on:", incident);
    // Sau này có thể dùng để điều khiển MapView
  };

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterPanel
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}
          selectedUrgency={selectedUrgency}
          setSelectedUrgency={setSelectedUrgency}
        />
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredData.length === 0 ? (
            <p className="text-gray-500 text-center">
              Không tìm thấy thông tin cứu hộ.
            </p>
          ) : (
            filteredData.map((item) => (
              <RescueCard
                key={item.id}
                incident={item}   // ✅ Sửa ở đây: data -> incident
                onFocus={handleFocus} 
              />
            ))
          )}
        </div>
      </Sidebar>

      <div className="flex-1 relative">
        <MapView
          data={filteredData}
          center={center}
          onBoundsChange={setMapBounds}
        />
      </div>
    </div>
  );
}
