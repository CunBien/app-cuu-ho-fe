/**
 * Dữ liệu giả lập (mock) các sự cố cứu hộ cứu nạn
 * Phục vụ hiển thị trên bản đồ và danh sách sự kiện
 *
 * ĐÃ CHUẨN HÓA: Sử dụng mảng 'coordinates': [longitude, latitude] cho tất cả các mục.
 */

export const mockData = [
  {
    id: "1",
    name: "Quảng Bình - Thôn Hồng Thủy",
    coordinates: [106.3487, 17.4686], // [Kinh độ, Vĩ độ]
    urgency: "critical",
    disasterType: "flood",
    floodLevel: 2.5,
    affectedPeople: 450,
    timestamp: "2025-11-08T03:49:00.000Z",
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
    path: "https://vneconomy.vn/vung-ron-lu-hai-lang-hon-1-800-ngoi-nha-ngap-trong-nuoc-lu.html",
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
    path: 
      "https://laodong.vn/xa-hoi/hue-gio-bao-giat-khung-khiep-cay-coi-do-hang-loat-tren-duong-849553.ldo",
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
    // ĐÃ THÊM: Tọa độ cho Bình Sơn
    coordinates: [108.7500, 15.3333],
    urgency: "high",
    disasterType: "flood",
    floodLevel: 2.1,
    affectedPeople: 410,
    timestamp: "2025-11-08T02:19:00.000Z",
    description:
      "Ngập sâu trên diện rộng, nhiều tuyến đường bị chia cắt, cần thuyền cứu hộ và lương thực khẩn cấp.",
    status: "pending",
    image:
      "https://image.baoquangngai.vn//data/dataimages/202110/original/images2409554_5.jpg",
    path:
    "https://baoquangngai.vn/channel/2024/202110/binh-son-nhieu-xa-ven-song-tra-bong-bi-ngap-sau-trong-nuoc-lu-3085503/",
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
      "https://truyenhinhnghean.vn/file/4028eaa46735a26101673a4df345003c/4028eaa467f477c80167f4aa053f0c68/092022/do_luong_1_20220929111105.jpg",
    path:
    "https://truyenhinhnghean.vn/doi-song-xa-hoi/202209/do-luong-mua-lon-suot-dem-gay-ngap-cuc-bo-chia-cat-quoc-lo-46-89f49e1/",
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
      "https://file3.qdnd.vn/data/images/0/2023/10/31/upload_2260/huong%20khe%20ngap.jpg?dpi=150&quality=100&w=870",
    path: 
    "https://www.qdnd.vn/xa-hoi/cap-nhat-mua-lu-tai-ha-tinh-luc-luong-vu-trang-quan-khu-4-huy-dong-luc-luong-khac-phuc-hau-qua-mua-lu-tai-ha-tinh-749367",
  },
];