import { useState, useRef } from "react";
import { mockData } from "@/data/mockData";
import Sidebar from "@/components/sidebar/Sidebar";
import MapView from "@/components/map/MapView";
import Header from "@/components/header/Header";
import { useFilteredData } from "@/hooks/useFilteredData";

const center: [number, number] = [16.0471, 108.2062]; // [lat, lng] – Đà Nẵng

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisaster, setSelectedDisaster] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [mapBounds, setMapBounds] = useState<any>(null);

  // Ref to control map
  const mapRef = useRef<any>(null);

  const filteredData = useFilteredData(
    mockData,
    { searchTerm, selectedDisaster, selectedUrgency },
    mapBounds
  );

  // Focus on an incident
  const handleFocus = (incident: any) => {
    if (!mapRef.current || !incident) {
      console.warn("Map not ready or invalid incident");
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
      console.warn("No coordinates:", incident.name);
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

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header mapRef={mapRef} />

      <div className="flex flex-1 overflow-hidden relative">
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

        <div className="flex-1 relative">
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
