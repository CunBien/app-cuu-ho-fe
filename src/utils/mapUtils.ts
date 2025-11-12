import { Incident } from "@/data/mockData";

export const getMarkerColor = (urgency: string): string => {
  const colors = {
    critical: "#dc2626", // red-600
    high: "#ea580c", // orange-600
    medium: "#ca8a04", // yellow-600
    low: "#16a34a", // green-600
  };
  return colors[urgency as keyof typeof colors] || "#6b7280"; // gray-500 default
};

export const getMarkerIcon = (incident: Incident) => {
  const color = getMarkerColor(incident.urgency);
  
  // Simple SVG marker
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 24 16 24s16-13 16-24c0-8.837-7.163-16-16-16z" 
            fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `)}`;
};

export const disasterIcons: Record<string, string> = {
  flood: "🌊",
  landslide: "🪨",
  storm: "🌪️",
};

export const disasterLabels: Record<string, string> = {
  flood: "Lũ lụt",
  landslide: "Sạt lở",
  storm: "Bão",
};

export const urgencyLabels: Record<string, string> = {
  critical: "Khẩn cấp",
  high: "Cao",
  medium: "Trung bình",
  low: "Thấp",
};
