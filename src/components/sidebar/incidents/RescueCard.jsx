import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const urgencyColors = {
  critical: "bg-red-100 border-red-500",
  high: "bg-orange-100 border-orange-500",
  medium: "bg-yellow-100 border-yellow-500",
  low: "bg-white border-gray-200",
};

const disasterIcons = {
  flood: "🌊",
  landslide: "🪨",
  storm: "🌪️",
};

// ========================== IMAGE MODAL ==========================
function ImageModal({ src, alt, onClose }) {
  const imgRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Zoom bằng con lăn chuột
  const handleWheel = (e) => {
    e.preventDefault();
    setScale((prev) => {
      const next = prev + (e.deltaY < 0 ? 0.2 : -0.2);
      return Math.min(Math.max(next, 1), 5); // Giới hạn từ 1x đến 5x
    });
  };

  // Kéo ảnh khi đã zoom
  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };
  const handleMouseUp = () => setIsDragging(false);

  // Zoom bằng cảm ứng (pinch)
  const lastDistance = useRef(null);
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (lastDistance.current) {
        const diff = distance - lastDistance.current;
        setScale((prev) =>
          Math.min(Math.max(prev + diff * 0.005, 1), 5)
        );
      }
      lastDistance.current = distance;
    }
  };
  const handleTouchEnd = () => (lastDistance.current = null);

  // Thoát bằng phím Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
        onClick={onClose}
      >
        {/* Khối ảnh */}
        <motion.div
          onClick={(e) => e.stopPropagation()} // Ngăn tắt khi bấm vào ảnh
          className="relative max-w-[95vw] max-h-[95vh] overflow-hidden flex items-center justify-center"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            animate={{ scale, x: offset.x, y: offset.y }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-full max-h-full object-contain rounded-lg select-none"
            draggable={false}
          />
        </motion.div>

        {/* Nút X đóng */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[10000] bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-black/80"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ========================== MAIN CARD ==========================
export default function RescueCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const shortDescription =
    data.description?.split(".").slice(0, 2).join(".").trim() + ".";

  return (
    <>
      <div
        className={`p-3 rounded-xl border-l-4 ${
          urgencyColors[data.urgency] ?? "bg-white border-gray-200"
        } shadow-sm hover:shadow-md transition-all`}
      >
        {/* Ảnh */}
        {data.image && (
          <div
            className="relative w-full h-40 mb-3 cursor-zoom-in"
            onClick={() => setIsImageOpen(true)}
          >
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 rounded-lg hover:bg-black/10 transition" />
          </div>
        )}

        {/* Tiêu đề + icon */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800 text-base">{data.name}</h3>
          <span className="text-2xl">
            {disasterIcons[data.disasterType] ?? "❗"}
          </span>
        </div>

        {/* Trạng thái */}
        <p className="text-sm mb-1">
          <strong>Trạng thái:</strong>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              data.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : data.status === "in-progress"
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {data.status === "pending"
              ? "Chờ xử lý"
              : data.status === "in-progress"
              ? "Đang xử lý"
              : "Hoàn tất"}
          </span>
        </p>

        <p className="text-sm italic text-gray-700">
          {isExpanded ? data.description : shortDescription}
        </p>

        <button
          onClick={() => setIsExpanded((s) => !s)}
          className="flex items-center justify-center w-full text-blue-600 mt-2 text-sm hover:underline"
        >
          {isExpanded ? "Ẩn bớt ▲" : "Xem chi tiết ▼"}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-2 text-sm text-gray-700 space-y-1"
            >
              <p>
                <strong>Mức nước:</strong>{" "}
                {typeof data.floodLevel === "number"
                  ? `${data.floodLevel}m`
                  : "N/A"}
              </p>
              <p>
                <strong>Người bị ảnh hưởng:</strong> {data.affectedPeople} người
              </p>
              <p>
                <strong>Thời gian cập nhật:</strong>{" "}
                {new Date(data.timestamp).toLocaleString("vi-VN")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isImageOpen && (
        <ImageModal
          src={data.image}
          alt={data.name}
          onClose={() => setIsImageOpen(false)}
        />
      )}
    </>
  );
}
