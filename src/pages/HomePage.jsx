// src/pages/HomePage.jsx
import React, { useCallback } from 'react';
import { useIncidents } from '../hooks/useIncidents';
import MapComponent from '../components/map/MapComponent';

const pageStyle = { display: 'flex', height: '100vh', fontFamily: 'sans-serif' };
const sidebarStyle = { width: '350px', padding: '20px', boxSizing: 'border-box', overflowY: 'auto', borderRight: '1px solid #ccc' };
const mapContainerStyle = { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' };
const loadingOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10
};
function HomePage() {
  const { incidents, isLoading, selectedIncident, setSelectedIncident } = useIncidents();

  console.log('HomePage được render. IsLoading:', isLoading);

  const handleMarkerClick = useCallback((incident) => {
    setSelectedIncident(incident);
  }, [setSelectedIncident]);
  
  return (
    <div style={pageStyle}>
      <aside style={sidebarStyle}>
        <h2>Thông tin sự cố</h2>
        {isLoading && <p>Đang tải dữ liệu...</p>}
        {!selectedIncident && !isLoading && <p>Chọn một sự cố để xem chi tiết.</p>}
        {selectedIncident && (
          <div>
            <h3>{selectedIncident.title}</h3>
            <p><strong>Trạng thái:</strong> {selectedIncident.status}</p>
            <p><strong>Vĩ độ:</strong> {selectedIncident.latitude}</p>
            <p><strong>Kinh độ:</strong> {selectedIncident.longitude}</p>
          </div>
        )}
        <hr />
        <h3>Danh sách sự cố (để test)</h3>
        <ul>
          {incidents.map(inc => (
            <li key={inc.id} onClick={() => setSelectedIncident(inc)} style={{cursor: 'pointer'}}>
              {inc.title}
            </li>
          ))}
        </ul>
      </aside>
      
      <main style={mapContainerStyle}>
      {isLoading && incidents.length === 0 && (
            <div style={loadingOverlayStyle}>
                <h1>Đang tải bản đồ và dữ liệu...</h1>
            </div>
        )}
        <MapComponent 
            incidents={incidents} 
            onMarkerClick={handleMarkerClick}
            selectedIncident={selectedIncident}
        />
      </main>
    </div>
  );
}

export default HomePage;