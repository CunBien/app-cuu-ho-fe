import { useState, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { mockData } from "./data/mockData";
import SearchBar from "./components/sidebar/search/SearchBar";
import FilterPanel from "./components/sidebar/filter/FIlterPanel";
import RescueCard from "./components/sidebar/incidents/RescueCard";
import Sidebar from "./components/sidebar/SideBar";

// Fix icon mặc định của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const center = [16.0471, 108.2062]; // Việt Nam

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [mapBounds, setMapBounds] = useState(null);
  const mapRef = useRef();

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDisaster =
        selectedDisaster === "all" || item.disasterType === selectedDisaster;
      const matchesUrgency =
        selectedUrgency === "all" || item.urgency === selectedUrgency;

      const inBounds =
        !mapBounds ||
        mapBounds.contains([item.coordinates[1], item.coordinates[0]]);

      return matchesSearch && matchesDisaster && matchesUrgency && inBounds;
    });
  }, [searchTerm, selectedDisaster, selectedUrgency, mapBounds]);

  // Custom icon theo mức độ khẩn cấp
  const getMarkerIcon = (urgency) => {
    const colors = {
      critical: "#ef4444",
      high: "#f97316",
      medium: "#eab308",
    };
    const color = colors[urgency] || "#3b82f6";

    return L.divIcon({
      className: "custom-marker",
      html: `<div style="
        background: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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
            filteredData.map((item) => <RescueCard key={item.id} data={item} />)
          )}
        </div>
      </Sidebar>

      {/* Leaflet Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={6}
          className="h-full w-full"
          ref={mapRef}
          whenCreated={(map) => {
            mapRef.current = map;
            map.on("moveend", () => {
              const bounds = map.getBounds();
              setMapBounds(bounds);
            });
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />

          {filteredData.map((item) => (
            <Marker
              key={item.id}
              position={[item.coordinates[1], item.coordinates[0]]}
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
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
