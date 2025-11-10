import { useState, useRef } from "react";
import { mockData } from "../data/mockData";
import Sidebar from "../components/sidebar/SideBar";
import MapView from "../components/map/MapView";
import Header from "../components/header/Header";
import { useFilteredData } from "../hooks/useFilteredData";

// Lưu ý: center ở đây bạn đang để là [lat, lng] (16.0471, 108.2062)
// Trong khi mockData và Mapbox thường dùng [lng, lat].
// Hãy đảm bảo nhất quán. Nếu MapView của bạn mong đợi [lat, lng] cho center thì giữ nguyên.
const center = [16.0471, 108.2062];

export default function IncidentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [mapBounds, setMapBounds] = useState(null);
  
  // Sử dụng ref để điều khiển map
  const mapRef = useRef(null);

  const filteredData = useFilteredData(
    mockData,
    { searchTerm, selectedDisaster, selectedUrgency },
    mapBounds
  );

  // --- HÀM ĐÃ SỬA ---
  const handleFocus = (incident) => {
    // 1. Kiểm tra mapRef có tồn tại không
    if (!mapRef.current) {
        console.error("❌ Lỗi: mapRef chưa sẵn sàng.");
        return;
    }
    if (!incident) return;

    // 2. Lấy toạ độ [lng, lat] một cách an toàn
    let lng, lat;
    if (Array.isArray(incident.coordinates) && incident.coordinates.length >= 2) {
      [lng, lat] = incident.coordinates;
    } else if (incident.longitude !== undefined && incident.latitude !== undefined) {
      lng = Number(incident.longitude);
      lat = Number(incident.latitude);
    }

    // 3. Kiểm tra toạ độ hợp lệ
    if (lng === undefined || lat === undefined || isNaN(lng) || isNaN(lat)) {
        console.warn("⚠️ Cảnh báo: Không tìm thấy toạ độ hợp lệ cho mục này:", incident.name);
        return;
    }

    console.log(`✈️ Đang bay tới: ${incident.name} tại [${lng}, ${lat}]`);

    // 4. Gọi flyTo trực tiếp từ mapRef.current (KHÔNG DÙNG .getMap())
    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 14,        // Zoom gần hơn một chút để nhìn rõ
      speed: 1.5,      // Tốc độ bay vừa phải
      essential: true, // Bắt buộc thực hiện animation
    });
  };
  // -------------------

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}
          selectedUrgency={selectedUrgency}
          setSelectedUrgency={setSelectedUrgency}
          filteredData={filteredData}
          handleFocus={handleFocus} // <-- Truyền hàm handleFocus xuống Sidebar
        />

        {/* Map Area */}
        <div className="flex-1 relative">
          <MapView
            data={filteredData}
            center={center}
            onBoundsChange={setMapBounds}
            mapRef={mapRef} // <-- Truyền ref xuống MapView
          />
        </div>
      </div>
    </div>
  );
}