import { useMemo } from "react";
import { Incident } from "@/data/mockData";

interface Filters {
  searchTerm: string;
  selectedDisaster: string;
  selectedUrgency: string;
}

export const useFilteredData = (
  data: Incident[],
  filters: Filters,
  mapBounds?: any
) => {
  return useMemo(() => {
    let filtered = [...data];

    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.province.toLowerCase().includes(term)
      );
    }

    // Filter by disaster type
    if (filters.selectedDisaster && filters.selectedDisaster !== "all") {
      filtered = filtered.filter(
        (item) => item.disaster === filters.selectedDisaster
      );
    }

    // Filter by urgency
    if (filters.selectedUrgency && filters.selectedUrgency !== "all") {
      filtered = filtered.filter(
        (item) => item.urgency === filters.selectedUrgency
      );
    }

    // Filter by map bounds (if provided)
    if (mapBounds) {
      filtered = filtered.filter((item) => {
        const [lng, lat] = item.coordinates;
        return (
          lng >= mapBounds._sw.lng &&
          lng <= mapBounds._ne.lng &&
          lat >= mapBounds._sw.lat &&
          lat <= mapBounds._ne.lat
        );
      });
    }

    return filtered;
  }, [data, filters, mapBounds]);
};
