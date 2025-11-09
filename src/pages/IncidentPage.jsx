// src/pages/IncientPage.jsx
import { useState } from "react";
import { mockData } from "../data/mockData";
import Sidebar from "../components/sidebar/SideBar";
import MapView from "../components/map/MapView";
import Header from "../components/header/Header";
import { useFilteredData } from "../hooks/useFilteredData";

const center = [16.0471, 108.2062]; // Việt Nam

export default function IncientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [mapBounds, setMapBounds] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    <div>
      <Header />
      <div className="flex flex-row h-screen">
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}
          selectedUrgency={selectedUrgency}
          setSelectedUrgency={setSelectedUrgency}
          filteredData={filteredData}
          handleFocus={handleFocus}
        ></Sidebar>

        <div className="flex-1 relative">
          <MapView
            data={filteredData}
            center={center}
            onBoundsChange={setMapBounds}
          />
        </div>
      </div>
    </div>
  );
}
