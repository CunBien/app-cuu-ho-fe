// src/data/mockData.js
// YYYY-MM-DDTHH:mm:ssZ
/**
 * @typedef {Object} Incident
 * @property {string} id - Mã định danh duy nhất cho sự kiện
 * @property {string} name - Tên hoặc địa điểm xảy ra thảm hoạ
 * @property {[number, number]} coordinates - Tọa độ [longitude, latitude]
 * @property {"critical"|"high"|"medium"|"low"} urgency - Mức độ khẩn cấp
 * @property {"flood"|"landslide"|"storm"} disasterType - Loại thảm hoạ
 * @property {number} floodLevel - Mức nước (m)
 * @property {number} affectedPeople - Số người bị ảnh hưởng
 * @property {string} timestamp - Thời điểm ghi nhận (ISO 8601)
 */
export const mockData = [
  {
    id: "1",
    name: "Quảng Bình - Thôn Hồng Thủy",
    coordinates: [106.3487, 17.4686],
    urgency: "critical",
    disasterType: "flood",
    floodLevel: 2.5,
    affectedPeople: 450,
    timestamp: new Date().toISOString(),
    description:
      "Ngập lụt nghiêm trọng, cần cứu trợ khẩn cấp. Nhiều hộ dân bị cô lập.",
    status: "pending",
  },
  {
    id: "2",
    name: "Quảng Trị - Hải Lăng",
    coordinates: [107.0471, 16.7943],
    urgency: "high",
    disasterType: "flood",
    floodLevel: 1.8,
    affectedPeople: 320,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    description: "Nước đang dâng cao, cần di dời dân khẩn cấp.",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Huế - Phú Lộc",
    coordinates: [107.7184, 16.2782],
    urgency: "medium",
    disasterType: "storm",
    floodLevel: 1.2,
    affectedPeople: 180,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    description: "Bão gây thiệt hại nhẹ, cần hỗ trợ lương thực.",
    status: "in-progress",
  },
  {
    id: "4",
    name: "Quảng Nam - Đại Lộc",
    coordinates: [108.0897, 15.8764],
    urgency: "critical",
    disasterType: "landslide",
    floodLevel: 0.8,
    affectedPeople: 280,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    description:
      "Sạt lở đất nghiêm trọng, nhiều nhà bị vùi lấp. Cần cứu hộ ngay.",
    status: "pending",
  },
  {
    id: "5",
    name: "Đà Nẵng - Hòa Vang",
    coordinates: [108.0717, 16.0089],
    urgency: "low",
    disasterType: "flood",
    floodLevel: 0.5,
    affectedPeople: 90,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    description: "Tình hình đã được kiểm soát, cần hỗ trợ sau bão.",
    status: "completed",
  },
  {
    id: "6",
    name: "Quảng Ngãi - Bình Sơn",
    coordinates: [108.9359, 15.3018],
    urgency: "high",
    disasterType: "flood",
    floodLevel: 2.1,
    affectedPeople: 410,
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    description: "Ngập sâu, cần thuyền cứu hộ và lương thực.",
    status: "pending",
  },
  {
    id: "7",
    name: "Nghệ An - Đô Lương",
    coordinates: [105.3119, 18.8741],
    urgency: "medium",
    disasterType: "flood",
    floodLevel: 1.4,
    affectedPeople: 210,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    description: "Một số khu vực ngập, đang di dời dân.",
    status: "in-progress",
  },
  {
    id: "8",
    name: "Hà Tĩnh - Hương Khê",
    coordinates: [105.6829, 18.2345],
    urgency: "critical",
    disasterType: "flood",
    floodLevel: 3.2,
    affectedPeople: 520,
    timestamp: new Date(Date.now() - 900000).toISOString(),
    description: "Ngập lụt cực kỳ nghiêm trọng. Cần cứu trợ khẩn cấp nhất.",
    status: "pending",
  },
];
