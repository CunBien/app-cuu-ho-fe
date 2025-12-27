// src/components/map/CustomMarker.jsx

import React from 'react';
import { Marker } from 'react-map-gl';
import { getMarkerColor } from '../../utils/getMarkerStyle';

const markerStyleBase = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '2px solid white',
  cursor: 'pointer',
  boxShadow: '0 0 5px rgba(0,0,0,0.5)',
  transition: 'transform 0.2s ease-in-out', // Thêm hiệu ứng
};

// Sử dụng React.memo cho cả marker để tối ưu hiệu năng
const CustomMarker = React.memo(({ incident, onClick, isSelected }) => {
  const color = getMarkerColor(incident.urgency);

  // Tạo style động dựa trên prop isSelected
  const dynamicStyle = {
    ...markerStyleBase,
    backgroundColor: color,
    transform: isSelected ? 'scale(1.5)' : 'scale(1)', // Phóng to nếu được chọn
    zIndex: isSelected ? 1 : 0, // Đưa marker được chọn lên trên
  };

  return (
    <Marker longitude={incident.longitude} latitude={incident.latitude}>
      <div
        style={dynamicStyle}
        onClick={() => onClick(incident)}
      />
    </Marker>
  );
});

export default CustomMarker;