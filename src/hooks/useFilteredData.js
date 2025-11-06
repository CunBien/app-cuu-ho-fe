import { useMemo } from "react";

/**
 * Lọc danh sách sự cố theo điều kiện tìm kiếm, loại thảm hoạ, mức độ khẩn cấp và vùng bản đồ
 * Logic filter
 * @type {Incident[]}
 */
export function useFilteredData(mockData, filters, mapBounds) {
  const { searchTerm, selectedDisaster, selectedUrgency } = filters; // unpacking from argument object

  // return giá trị được ghi nhớ
  return useMemo(() => {
    return mockData.filter((item) => {
      // traverse through every each object and filter by available value from filters object

      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()); // check searchTerm includes in item.name or not

      const matchesSearchDes = item.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDisaster =
        selectedDisaster === "all" || item.disasterType === selectedDisaster;

      const matchesUrgency =
        selectedUrgency === "all" || item.urgency === selectedUrgency;

      const inBounds =
        !mapBounds ||
        mapBounds.contains([item.coordinates[1], item.coordinates[0]]);

      return (
        (matchesSearch || matchesSearchDes) &&
        matchesDisaster &&
        matchesUrgency &&
        inBounds
      );
    });
  }, [mockData, searchTerm, selectedDisaster, selectedUrgency, mapBounds]);
  // only change when at least one of these changes ?
}
