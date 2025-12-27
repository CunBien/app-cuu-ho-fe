// src/hooks/useFilteredData.js
import { useMemo } from "react";

export function useFilteredData(allIncidents, filters, mapBounds) {
  const { searchTerm, selectedCategory, selectedRegion, selectedTimeRange } = filters;

  return useMemo(() => {
    // Chuyển đổi ID từ chuỗi sang số nếu cần
    const categoryId = selectedCategory === 'all' ? 'all' : parseInt(selectedCategory, 10);
    const regionId = selectedRegion === 'all' ? 'all' : parseInt(selectedRegion, 10);

    return allIncidents.filter((item) => {
      const matchesSearch =
        (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.content || item.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryId === 'all' || item.category_id === categoryId;

      const matchesRegion =
        regionId === 'all' || item.region_id === regionId;

      const matchesTime = (() => {
        if (selectedTimeRange === 'all') return true;
        const incidentDate = new Date(item.created_date);
        const now = new Date();
        let hours = 24;
        if (selectedTimeRange === 'week') hours = 24 * 7;
        if (selectedTimeRange === 'month') hours = 24 * 30;

        const timeLimit = new Date(now.getTime() - hours * 60 * 60 * 1000);
        return incidentDate >= timeLimit;
      })();

      const inBounds =
        !mapBounds ||
        (typeof mapBounds.contains === 'function' &&
          item.latitude != null &&
          item.longitude != null &&
          mapBounds.contains([item.latitude, item.longitude]));

      return matchesSearch && matchesCategory && matchesRegion && matchesTime && inBounds;
    });
  }, [allIncidents, searchTerm, selectedCategory, selectedRegion, selectedTimeRange, mapBounds]);
}