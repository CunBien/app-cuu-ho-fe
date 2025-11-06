// src/utils/mapUtils.js
import L from "leaflet";

export function getMarkerIcon(urgency) {
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
}
