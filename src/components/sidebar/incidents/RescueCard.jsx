import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// 🎨 Giữ màu như bản cũ
const urgencyColors = {
  critical: "bg-red-100 border-red-500",
  high: "bg-orange-100 border-orange-500",
  medium: "bg-yellow-100 border-yellow-500",
  low: "bg-green-100 border-green-500",
  default: "bg-gray-100 border-gray-400",
};

// 🌀 Biểu tượng theo loại thảm họa
const disasterIcons = {
  flood: "🌊",
  landslide: "🪨",
  storm: "🌪️",
};

// Đổi tên prop từ data thành incident, và onFocusMarker thành onFocus để khớp với Parent (IncidentPage.jsx)
export default function RescueCard({ incident, onFocus }) {
  // THÊM: Kiểm tra guard clause để tránh lỗi TypeError khi incident là null/undefined
  if (!incident) return null;
    
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Kiểm tra xem có đủ tọa độ để di chuyển bản đồ không
  const hasCoordinates = incident.longitude && incident.latitude;

  // Cắt mô tả ngắn
  // Dùng toán tử '?' an toàn hơn
  const shortDescription =
    incident.description?.split(".").slice(0, 2).join(".") + ".";

  // Hàm di chuyển bản đồ nội bộ: Gọi prop onFocus và truyền TOÀN BỘ đối tượng incident
  const handleMapClick = () => {
    // Chỉ gọi hàm focus nếu có tọa độ
    if (onFocus && hasCoordinates) {
      onFocus(incident); 
    }
  };

  // Lấy màu theo độ khẩn cấp
  const colorStyle =
    urgencyColors[incident.urgency?.toLowerCase()] || urgencyColors.default;

  return (
    <div
      className={`p-3 rounded-xl border-l-4 ${colorStyle} shadow-sm hover:shadow-md transition-all cursor-pointer`}
    >
      {/* Ảnh (nếu có) */}
      {incident.image && (
        <img
          src={incident.image}
          alt={incident.name}
          className="w-full h-40 object-cover rounded-lg mb-3 cursor-pointer"
          onClick={() => setZoomedImage(incident.image)}
        />
      )}

      {/* Tiêu đề + icon */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800 text-base">{incident.name}</h3>
        <span className="text-2xl">
          {disasterIcons[incident.disasterType] || "❗"}
        </span>
      </div>

      {/* Địa chỉ / Xem bản đồ */}
      {/* ĐÃ SỬA: Luôn hiển thị nút, nhưng vô hiệu hóa nếu không có tọa độ */}
      <p 
        className={`text-sm mb-1`}
        // Thêm tooltip (chú thích) khi di chuột qua nếu bị vô hiệu hóa
        title={!hasCoordinates ? 'Không có thông tin tọa độ để hiển thị trên bản đồ' : ''}
      >
        <button
          onClick={handleMapClick}
          // Vô hiệu hóa nút và đổi màu nếu không có tọa độ
          disabled={!hasCoordinates}
          className={`hover:underline font-medium transition-colors ${
            hasCoordinates 
              ? 'text-blue-600 hover:text-blue-800' // Màu khi kích hoạt
              : 'text-gray-400 cursor-not-allowed' // Màu khi bị vô hiệu hóa
          }`}
        >
          📍 Xem trên bản đồ
        </button>
      </p>

      {/* Trạng thái */}
      <p className="text-sm mb-1">
        <strong>Trạng thái:</strong>{" "}
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            incident.status === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : incident.status === "in-progress"
              ? "bg-blue-200 text-blue-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {incident.status === "pending"
            ? "Chờ xử lý"
            : incident.status === "in-progress"
            ? "Đang xử lý"
            : "Hoàn thành"}
        </span>
      </p>

      {/* Mô tả ngắn */}
      <p className="text-sm italic text-gray-700">
        {isExpanded ? incident.description : shortDescription}
      </p>

      {/* Mũi tên mở rộng */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full text-blue-600 mt-2 text-sm hover:underline"
      >
        {isExpanded ? "Ẩn bớt ▲" : "Xem chi tiết ▼"}
      </button>

      {/* Nội dung mở rộng */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2 text-sm text-gray-700 space-y-1"
          >
            <p>
              <strong>Mức nước:</strong>{" "}
              {incident.floodLevel ? `${incident.floodLevel}m` : "N/A"}
            </p>
            <p>
              <strong>Người bị ảnh hưởng:</strong> {incident.affectedPeople} người
            </p>
            <p>
              <strong>Thời gian cập nhật:</strong>{" "}
              {new Date(incident.timestamp).toLocaleString("vi-VN")}
            </p>
            {incident.path && (
              <p>
                <a
                  href={incident.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  📰 Nguồn
                </a>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ảnh phóng to */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full px-2"
            >
              ✕
            </button>
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={zoomedImage}
                  alt="Zoomed"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </div>
  );
}