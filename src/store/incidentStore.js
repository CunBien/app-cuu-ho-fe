// src/store/incidentStore.js
import { create } from 'zustand';
import { getRescueRequests, getCategories, getRegions } from '../services/rescueService';
import { extractCoordsFromURL } from '../utils/mapUtils'; // Sẽ tạo file này ở bước sau

// Hàm helper để "làm giàu" dữ liệu
const enrichIncidents = (incidents, categories, regions) => {
  // Tạo Map để tra cứu nhanh O(1)
  const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
  const regionMap = new Map(regions.map(reg => [reg.id, reg.name]));

  return incidents.map(incident => {
    const coords = extractCoordsFromURL(incident.map_link);

    // Extract from location.coordinates (GeoJSON format: [longitude, latitude])
    const locationLng = incident.location?.coordinates?.[0];
    const locationLat = incident.location?.coordinates?.[1];

    // Prefer location.coordinates, fallback to map_link, then direct fields
    const rawLat = locationLat ?? coords?.lat ?? incident.latitude ?? incident.lat ?? null;
    const rawLng = locationLng ?? coords?.lng ?? incident.longitude ?? incident.lng ?? null;

    const latitude = rawLat !== null && rawLat !== undefined ? Number(rawLat) : null;
    const longitude = rawLng !== null && rawLng !== undefined ? Number(rawLng) : null;

    // Warn when coordinates are missing or invalid to help debugging
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      console.warn(`Incident ${incident.id} has invalid coords: lat=${rawLat} lng=${rawLng} location=${JSON.stringify(incident.location)}`);
    }

    return {
      ...incident, // Giữ lại toàn bộ dữ liệu gốc
      // Thêm các trường đã được xử lý để component dễ sử dụng
      categoryName: categoryMap.get(incident.category_id) || 'Không xác định',
      regionName: regionMap.get(incident.region_id) || 'Không xác định',
      latitude,
      longitude,
    };
  });
};

export const useIncidentStore = create((set, get) => ({
  // === STATE ===
  allIncidents: [],
  categories: [],
  regions: [],
  isLoading: true, // Bắt đầu với true
  isFetched: false,
  selectedIncident: null,
  filters: {
    searchTerm: '',
    selectedCategory: 'all',
    selectedRegion: 'all',
    selectedTimeRange: 'all', // Thêm bộ lọc thởi gian
  },

  // === ACTIONS ===
  actions: {
    fetchInitialData: async () => {
      if (get().isFetched) return;
      set({ isLoading: true });
      try {
        const [incidentsData, categoriesData, regionsData] = await Promise.all([
          getRescueRequests(),
          getCategories(),
          getRegions(),
        ]);
        
        const enrichedData = enrichIncidents(incidentsData, categoriesData, regionsData);

        set({
          allIncidents: enrichedData,
          categories: categoriesData,
          regions: regionsData,
          isFetched: true,
        });
      } catch (error) {
        console.error('Failed to fetch initial data', error);
      } finally {
        set({ isLoading: false });
      }
    },
    
    // Đổi tên các action cho khớp
    setSelectedCategory: (categoryId) => {
      set((state) => ({ filters: { ...state.filters, selectedCategory: categoryId } }));
    },
    setSelectedRegion: (regionId) => {
      set((state) => ({ filters: { ...state.filters, selectedRegion: regionId } }));
    },
    setSelectedTimeRange: (timeRange) => {
      set((state) => ({ filters: { ...state.filters, selectedTimeRange: timeRange } }));
    },

    setSelectedIncident: (incident) => {
      set({ selectedIncident: incident });
    },
    
    // Actions mới để cập nhật bộ lọc
    setSearchTerm: (term) => {
      set((state) => ({ filters: { ...state.filters, searchTerm: term } }));
    },
}
}));