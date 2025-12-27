// src/pages/HomePage.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useIncidentStore } from '../store/incidentStore';
import { useFilteredData } from '../hooks/useFilteredData';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// Import các component mới
import Sidebar from '../components/sidebar/SideBar';
import SearchBar from '../components/sidebar/search/SearchBar';
import FilterPanel from '../components/sidebar/filter/FilterPanel';
import RescueCard from '../components/sidebar/incidents/RescueCard';
import MapComponent from '../components/map/MapComponent';

const pageStyle = { display: 'flex', height: '100vh', fontFamily: 'sans-serif' };
const mapContainerStyle = { flex: 1, position: 'relative' };

function HomePage() {
  // 1. Lấy state từ store với selector riêng lẻ để tránh tạo object mới mỗi render
  const allIncidents = useIncidentStore((state) => state.allIncidents);
  const filters = useIncidentStore((state) => state.filters);
  const selectedIncident = useIncidentStore((state) => state.selectedIncident);
  const isLoading = useIncidentStore((state) => state.isLoading);
  const categories = useIncidentStore((state) => state.categories);
  const regions = useIncidentStore((state) => state.regions);
  // Lấy actions từ store
  const fetchInitialData = useIncidentStore((state) => state.actions.fetchInitialData);
  const setSelectedIncident = useIncidentStore((state) => state.actions.setSelectedIncident);
  const setSearchTerm = useIncidentStore((state) => state.actions.setSearchTerm);
  const setSelectedCategory = useIncidentStore((state) => state.actions.setSelectedCategory);
  const setSelectedRegion = useIncidentStore((state) => state.actions.setSelectedRegion);
  const setSelectedTimeRange = useIncidentStore((state) => state.actions.setSelectedTimeRange);

  // 2. State riêng của HomePage
  const [mapBounds, setMapBounds] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State để điều khiển sidebar

  // 3. Sử dụng useEffect để fetch dữ liệu ban đầu
  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 4. Sử dụng hook mới để lọc dữ liệu
  const filteredIncidents = useFilteredData(allIncidents, filters, mapBounds);

  // 5. Tối ưu hóa các hàm callback
  const handleMarkerClick = useCallback((incident) => {
    setSelectedIncident(incident);
  }, [setSelectedIncident]);

  const handleCardClick = useCallback((incident) => {
    setSelectedIncident(incident);
  }, [setSelectedIncident]);

  const handleFocusOnMap = useCallback((incident) => {
    setSelectedIncident(incident);
  }, [setSelectedIncident]);


  return (
    <div style={pageStyle}>
      {/* --- SIDEBAR --- */}
      <Sidebar isOpen={isSidebarOpen}>
        <SearchBar searchTerm={filters.searchTerm} setSearchTerm={setSearchTerm} />
        <FilterPanel
          categories={categories}
          regions={regions}
          selectedCategory={filters.selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedRegion={filters.selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedTimeRange={filters.selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
        />
        <Box sx={{ p: 0 }}>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  border: '3px solid rgba(255, 255, 255, 0.1)',
                  borderTopColor: '#dc2626',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                Đang tải dữ liệu...
              </Typography>
            </Box>
          )}
          {!isLoading && (
            <Stack spacing={0}>
              {filteredIncidents.map((incident) => (
                <RescueCard
                  key={incident.id}
                  incident={incident}
                  onFocus={handleFocusOnMap}
                />
              ))}
            </Stack>
          )}
          {!isLoading && filteredIncidents.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                mt: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                📭 Không tìm thấy sự cố nào phù hợp.
              </Typography>
            </Box>
          )}
        </Box>
      </Sidebar>
      
      <main style={mapContainerStyle}>
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'white',
              transform: 'scale(1.05)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <MapComponent 
            incidents={filteredIncidents}
            // `onMarkerClick` giờ cũng có thể dùng lại hàm `handleFocusOnMap`
            onMarkerClick={handleFocusOnMap} 
            selectedIncident={selectedIncident}
            // onBoundsChange={setMapBounds} 
        />
      </main>
    </div>
  );
}

export default HomePage;