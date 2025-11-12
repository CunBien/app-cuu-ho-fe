// src/components/header/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center space-x-3 text-gray-900 hover:text-gray-700 transition-colors duration-200"
    >
      {/* Biểu tượng GIF */}
      <img
        src="/icons8-map.gif"
        alt="Biểu tượng bản đồ cứu hộ"
        className="w-9 h-9 object-contain drop-shadow-sm"
        loading="lazy"
      />

      {/* Tiêu đề - chỉ hiện trên màn hình lớn hơn mobile */}
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-tight">
          Hệ thống cứu hộ cứu nạn
        </span>
        <span className="hidden sm:block text-xs font-medium text-gray-500 tracking-wider">
          Hỗ trợ nhân dân
        </span>
      </div>
    </Link>
  );
}
