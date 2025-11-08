/**
 * Dữ liệu giả lập (mock) các sự cố cứu hộ cứu nạn
 * Phục vụ hiển thị trên bản đồ và danh sách sự kiện
 *
 * ĐÃ SỬA: Chuyển từ mảng 'coordinates' sang thuộc tính 'longitude' và 'latitude'
 * để khớp với logic của component (RescueCard, MapComponent).
 */

export const mockData = [
  {
    id: "1",
    name: "Quảng Bình - Thôn Hồng Thủy",
    coordinates: [106.3487, 17.4686], // Cũ
    urgency: "critical",
    disasterType: "flood",
    floodLevel: 2.5,
    affectedPeople: 450,
    timestamp: "2025-11-08T03:49:00.000Z", // Sử dụng thời gian cố định để tránh thay đổi khi test
    description:
      "Ngập lụt nghiêm trọng, cần cứu trợ khẩn cấp. Nhiều hộ dân bị cô lập và thiếu lương thực.",
    status: "pending",
    image:
      "https://cdn.nhandan.vn/images/1ef398c4e2fb4bf07980a2ded785b3ef5dbd64547caaf87285f6077ef7b3b7aba69a293d9e0eaf8d7d221e905cac0c684e2a626b4c92785d1efce664433370b002477dacb7745cc4f5f9ad33cbcbec23/1730075214745-7761.jpeg",
    path: "https://nhandan.vn/quang-binh-hon-15-nghin-ngoi-nha-ngap-lut-nhieu-tuyen-duong-bi-tac-post839033.html",
  },
  {
    id: "2",
    name: "Quảng Trị - Hải Lăng",
    coordinates: [107.0471, 16.7943], 
    urgency: "high",
    disasterType: "flood",
    floodLevel: 1.8,
    affectedPeople: 320,
    timestamp: "2025-11-08T02:49:00.000Z",
    description: "Nước đang dâng cao, cần di dời dân khẩn cấp.",
    status: "in-progress",
    image:
      "https://media.vneconomy.vn/images/upload/2023/11/16/401088131-880720866754718-5091618574931240933-n.jpg",
    path:
      "https://vneconomy.vn/vung-ron-lu-hai-lang-hon-1-800-ngoi-nha-ngap-trong-nuoc-lu.html",
  },
  {
    id: "3",
    name: "Huế - Phú Lộc",
    coordinates: [107.7184, 16.2782], 
    urgency: "medium",
    disasterType: "storm",
    floodLevel: 1.2,
    affectedPeople: 180,
    timestamp: "2025-11-08T01:49:00.000Z",
    description:
      "Bão số 8 gây thiệt hại nhẹ, nhiều mái nhà bị tốc, cần hỗ trợ lương thực và vật liệu xây dựng.",
    status: "in-progress",
    image:
      "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/10/28/849553/Bao-So-9-Cay-Do-Rap-.jpg",
  },
  {
    id: "4",
    name: "Quảng Nam - Đại Lộc",
    coordinates: [108.0897, 15.8764],
    urgency: "critical",
    disasterType: "landslide",
    floodLevel: 0.8,
    affectedPeople: 280,
    timestamp: "2025-11-08T03:19:00.000Z",
    description:
      "Sạt lở đất nghiêm trọng tại khu vực miền núi, nhiều nhà bị vùi lấp. Cần cứu hộ ngay.",
    status: "pending",
    image:
      "https://bqn.1cdn.vn/2023/11/24/images.baoquangnam.vn-storage-newsportal-2023-11-23-151937-_tnb-61720-01.jpg",
  },
  {
    id: "5",
    name: "Đà Nẵng - Hòa Vang",
    coordinates: [108.0717, 16.0089], 
    urgency: "low",
    disasterType: "flood",
    floodLevel: 0.5,
    affectedPeople: 90,
    timestamp: "2025-11-08T00:49:00.000Z",
    description:
      "Mưa lớn kéo dài khiến nước ngập nhẹ. Tình hình đã được kiểm soát, cần hỗ trợ vệ sinh môi trường sau bão.",
    status: "completed",
  },
  {
    id: "6",
    name: "Quảng Ngãi - Bình Sơn",
    urgency: "high",
    disasterType: "flood",
    floodLevel: 2.1,
    affectedPeople: 410,
    timestamp: "2025-11-08T02:19:00.000Z",
    description:
      "Ngập sâu trên diện rộng, nhiều tuyến đường bị chia cắt, cần thuyền cứu hộ và lương thực khẩn cấp.",
    status: "pending",
    image:
      "https://media.baotintuc.vn/Upload/4b8fe7d5209d4637a9e924d2084eaf6a/2023/10/17/quang-ngai-lut.jpg",
  },
  {
    id: "7",
    name: "Nghệ An - Đô Lương",
    coordinates: [105.3119, 18.8741],
    urgency: "medium",
    disasterType: "flood",
    floodLevel: 1.4,
    affectedPeople: 210,
    timestamp: "2025-11-07T23:49:00.000Z",
    description:
      "Một số khu vực vẫn còn ngập, chính quyền đang tổ chức di dời người dân đến nơi an toàn.",
    status: "in-progress",
    image:
      "https://baonghean.vn/file/e783e9e42d3a4b2db84f981c3a217a5b/2023/10/13/lut-nghe-an.jpg",
  },
  {
    id: "8",
    name: "Hà Tĩnh - Hương Khê",
    coordinates: [105.6829, 18.2345],
    urgency: "critical",
    disasterType: "flood",
    floodLevel: 3.2,
    affectedPeople: 520,
    timestamp: "2025-11-08T03:34:00.000Z",
    description:
      "Ngập lụt cực kỳ nghiêm trọng, nhiều khu vực bị cô lập hoàn toàn. Cần cứu trợ khẩn cấp.",
    status: "pending",
    image:
      "https://media.baohatinh.vn/upload/reader/2023/10/17/lu-lut-ha-tinh-1_1710231656.jpg",
  },
];