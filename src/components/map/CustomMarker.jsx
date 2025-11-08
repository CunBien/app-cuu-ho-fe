import React from "react";
import { Marker } from "react-map-gl";
import { getMarkerColor } from "../../../utils/getMarkerStyle";

const markerStyleBase = {
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: "2px solid white",
  cursor: "pointer",
  boxShadow: "0 0 5px rgba(0,0,0,0.5)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
};

const CustomMarker = React.memo(({ incident, onClick, isSelected }) => {
  const color = getMarkerColor(incident.status);

  // Áp dụng hiệu ứng nổi bật khi isSelected là TRUE
  const dynamicStyle = {
    ...markerStyleBase,
    backgroundColor: color,
    transform: isSelected ? "scale(1.6)" : "scale(1)",
    boxShadow: isSelected
      ? "0 0 15px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 0, 0, 1)" // Thêm hiệu ứng đỏ để dễ nhìn hơn
      : "0 0 5px rgba(0,0,0,0.5)",
    zIndex: isSelected ? 10 : 1, // Đưa lên trên cùng
  };

  return (
    <Marker
      longitude={incident.longitude}
      latitude={incident.latitude}
      anchor="center"
    >
      <div
        style={dynamicStyle}
        onClick={() => onClick(incident)}
        title={incident.name}
      />
    </Marker>
  );
});

export default CustomMarker;