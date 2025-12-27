// src/data/mockData.js
export const mockIncidents = [
  {
    "id": "1",
    "name": "Quảng Bình - Thôn Hồng Thủy",
    "latitude": 17.48,      // Thêm latitude
    "longitude": 106.63,     // Thêm longitude
    "coordinates": [106.63, 17.48],
    "urgency": "critical",
    "disasterType": "flood",
    "floodLevel": 2.5,
    "affectedPeople": 450,
    "timestamp": "2025-11-06T08:00:00Z",
    "description": "Ngập lụt nghiêm trọng, cần cứu trợ khẩn cấp. Nhiều hộ dân bị cô lập. Nước dâng nhanh, gây nguy hiểm cho người già và trẻ em.",
    "status": "pending",
    "image": "https://images.unsplash.com/photo-1567437259931-5232DE512492?q=80&w=1932", // Thêm ảnh
    "path": "https://vnexpress.net/" // Thêm link nguồn
  },
  {
    "id": "2",
    "name": "Hà Giang - Xã Pả Vi",
    "latitude": 23.23,
    "longitude": 105.28,
    "coordinates": [105.28, 23.23],
    "urgency": "high",
    "disasterType": "landslide",
    "floodLevel": null,
    "affectedPeople": 80,
    "timestamp": "2025-11-05T15:30:00Z",
    "description": "Sạt lở đất chia cắt tuyến đường chính. Một số nhà dân có nguy cơ bị vùi lấp. Cần máy móc để giải phóng mặt bằng.",
    "status": "in_progress",
    "image": "https://images.unsplash.com/photo-1601636773954-4375986c7533?q=80&w=1964",
    "path": "https://vnexpress.net/"
  },
  // Thêm các dữ liệu khác nếu cần
];