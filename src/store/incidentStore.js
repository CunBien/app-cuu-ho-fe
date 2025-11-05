// src/store/incidentStore.js
import { create } from 'zustand';
import { getAllIncidents } from '../services/rescueService';

export const useIncidentStore = create((set, get) => ({ // Thêm 'get' vào đây
  // State
  incidents: [],
  isLoading: false,
  isFetched: false, // <-- Thêm lá cờ này
  selectedIncident: null,

  // Actions
  actions: {
    fetchIncidents: async () => {
      // Chỉ fetch nếu chưa từng fetch hoặc đang không loading
      if (get().isLoading || get().isFetched) {
        return; // Thoát ngay, không làm gì cả
      }

      set({ isLoading: true });
      try {
        const incidentsData = await getAllIncidents();
        set({ incidents: incidentsData, isFetched: true }); // <-- Đặt isFetched thành true sau khi thành công
      } catch (error) {
        console.error('Failed to fetch incidents', error);
      } finally {
        set({ isLoading: false }); // <-- Luôn set isLoading thành false
      }
    },

    setSelectedIncident: (incident) => {
      set({ selectedIncident: incident });
    },
  }
}));