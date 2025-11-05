// src/components/map/MapComponent.jsx

import React, { useState, useEffect } from 'react'; // Thêm useEffect
import Map, { NavigationControl } from 'react-map-gl';
import CustomMarker from './CustomMarker';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Sử dụng React.memo để ngăn component này render lại một cách không cần thiết
// Nó chỉ render lại khi props (incidents, onMarkerClick, selectedIncident) thực sự thay đổi.
const MapComponent = React.memo(({ incidents, onMarkerClick, selectedIncident }) => {
  const [viewState, setViewState] = useState({
    longitude: 106.7024,
    latitude: 10.7758,
    zoom: 12,
  });

  // Thêm một useEffect để di chuyển bản đồ đến marker được chọn
  useEffect(() => {
    if (selectedIncident) {
      setViewState(currentViewState => ({
        ...currentViewState,
        longitude: selectedIncident.longitude,
        latitude: selectedIncident.latitude,
        zoom: 14
      }));
    }
  }, [selectedIncident]);

  console.log("MapComponent is rendering");

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position="top-right" />

      {incidents.map(incident => (
        <CustomMarker
          key={incident.id}
          incident={incident}
          onClick={onMarkerClick}
          // Thêm prop để biết marker này có đang được chọn hay không
          isSelected={selectedIncident?.id === incident.id}
        />
      ))}
    </Map>
  );
});

export default MapComponent;