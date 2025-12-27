export interface Incident {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  description: string;
  urgency: "critical" | "high" | "medium" | "low";
  disaster: "flood" | "landslide" | "storm";
  province: string;
  image?: string;
  contact?: string;
  status?: string;
}

// Mock data for rescue incidents
export const mockData: Incident[] = [
  {
    id: "1",
    name: "Lũ lụt nghiêm trọng ở Quảng Nam",
    coordinates: [108.2022, 15.5721],
    description: "Mực nước dâng cao, nhiều hộ dân bị cô lập. Cần hỗ trợ khẩn cấp lương thực và thực phẩm.",
    urgency: "critical",
    disaster: "flood",
    province: "Quảng Nam",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400",
    contact: "0905123456",
    status: "Đang cần cứu trợ"
  },
  {
    id: "2",
    name: "Sạt lở đất ở Thừa Thiên Huế",
    coordinates: [107.5909, 16.4637],
    description: "Sạt lở núi gây chia cắt giao thông. Nhiều gia đình cần di dời khẩn cấp.",
    urgency: "high",
    disaster: "landslide",
    province: "Thừa Thiên Huế",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    contact: "0912345678",
    status: "Cần di dời"
  },
  {
    id: "3",
    name: "Ngập lụt tại Đà Nẵng",
    coordinates: [108.2062, 16.0471],
    description: "Nhiều tuyến đường bị ngập. Cần hỗ trợ phương tiện di chuyển.",
    urgency: "medium",
    disaster: "flood",
    province: "Đà Nẵng",
    contact: "0923456789",
    status: "Đang theo dõi"
  },
  {
    id: "4",
    name: "Bão số 10 ảnh hưởng Nghệ An",
    coordinates: [105.6924, 19.0089],
    description: "Gió mạnh cấp 10-11. Nhiều nhà dân bị tốc mái. Cần hỗ trợ nơi ở tạm thời.",
    urgency: "critical",
    disaster: "storm",
    province: "Nghệ An",
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400",
    contact: "0934567890",
    status: "Khẩn cấp"
  },
  {
    id: "5",
    name: "Lũ quét ở Lào Cai",
    coordinates: [103.9707, 22.4856],
    description: "Lũ quét xuống bất ngờ trong đêm. Nhiều gia đình mất liên lạc.",
    urgency: "high",
    disaster: "flood",
    province: "Lào Cai",
    image: "https://images.unsplash.com/photo-1585773690161-7b1cd0accfcf?w=400",
    contact: "0945678901",
    status: "Tìm kiếm cứu nạn"
  },
  {
    id: "6",
    name: "Sạt lở ven sông ở Quảng Bình",
    coordinates: [106.3485, 17.4677],
    description: "Bờ sông bị sạt lở, đe dọa nhà dân. Cần di dời khoảng 50 hộ dân.",
    urgency: "medium",
    disaster: "landslide",
    province: "Quảng Bình",
    contact: "0956789012",
    status: "Đang đánh giá"
  },
  {
    id: "7",
    name: "Ngập cục bộ ở Hà Nội",
    coordinates: [105.8342, 21.0285],
    description: "Mưa lớn gây ngập một số tuyến phố. Giao thông khó khăn.",
    urgency: "low",
    disaster: "flood",
    province: "Hà Nội",
    contact: "0967890123",
    status: "Đã khắc phục"
  },
];
