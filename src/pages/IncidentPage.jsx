import { useState } from "react";
import { mockData } from "../data/mockData";
import Sidebar from "../components/sidebar/SideBar";
import SearchBar from "../components/sidebar/search/SearchBar";
import FilterPanel from "../components/sidebar/filter/FilterPanel";
import RescueCard from "../components/sidebar/incidents/RescueCard";
import MapView from "../components/map/MapView";
import { useFilteredData } from "../hooks/useFilteredData";
import L from "leaflet";
import { Box, Stack, Typography } from "@mui/material";

// Fix icon mặc định Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const center = [16.0471, 108.2062]; // Việt Nam

/** @type {[string, function]} */
/** @type {[DisasterType, function]} */
/** @type {[UrgencyLevel, function]} */
/** @type {[import("leaflet").LatLngBounds|null, function]} */
/**
 * @typedef {"all"|"critical"|"high"|"medium"|"low"} UrgencyLevel
 * @typedef {"all"|"flood"|"landslide"|"storm"} DisasterType
 */

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
        <Box sx={{ p: 2 }}>
          {filteredData.length === 0 ? (
            <Typography color="text.secondary" align="center">
              Không tìm thấy thông tin cứu hộ.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {filteredData.map((item) => (
                <RescueCard key={item.id} data={item} />
              ))}
            </Stack>
          )}
        </Box>
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