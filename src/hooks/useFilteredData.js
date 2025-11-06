import { useMemo } from "react";

/**
 * Lọc danh sách sự cố theo điều kiện tìm kiếm, loại thảm hoạ, mức độ khẩn cấp và vùng bản đồ
 * Logic filter
 * @type {Incident[]}
 */
export function useFilteredData(mockData, filters, mapBounds) {
  const { searchTerm, selectedDisaster, selectedUrgency } = filters; // unpacking

  return useMemo(() => {
    return mockData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDisaster =
        selectedDisaster === "all" || item.disasterType === selectedDisaster;
      const matchesUrgency =
        selectedUrgency === "all" || item.urgency === selectedUrgency;

      const inBounds =
        !mapBounds ||
        mapBounds.contains([item.coordinates[1], item.coordinates[0]]);

      return matchesSearch && matchesDisaster && matchesUrgency && inBounds;
    });
  }, [mockData, searchTerm, selectedDisaster, selectedUrgency, mapBounds]);
  // only change when at least one of these changes ?
}
