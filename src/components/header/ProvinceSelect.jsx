// src/components/header/ProvinceSelect.jsx
import React from "react";
import provinces from "../../data/provinces";
import { MapPin } from "lucide-react";

export default function ProvinceSelect({ mapRef }) {
  const handleChange = (e) => {
    const code = e.target.value;
    if (!code || !mapRef?.current) return;

    const province = provinces.find((p) => p.code === code);
    if (!province) return;

    mapRef.current.flyTo({
      center: [province.lng, province.lat],
      zoom: province.zoom || 9,
      duration: 2000,
      essential: true,
    });
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

      <select
        onChange={handleChange}
        defaultValue=""
        className="
          w-full pl-10 pr-9 py-2.5
          text-gray-800 text-sm font-medium
          bg-white
          border border-gray-300 rounded-xl
          focus:outline-none focus:border-gray-500 focus:ring-4 focus:ring-gray-200
          transition-all duration-200
          cursor-pointer appearance-none
          hover:border-gray-400
        "
      >
        <option value="" disabled>
          Chọn tỉnh / thành phố
        </option>
        {provinces
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p) => (
            <option key={p.code} value={p.code}>
              {p.name.replace(/^(Tỉnh|TP\.)\s+/g, "")}
            </option>
          ))}
      </select>

      {/* Mũi tên nhỏ gọn */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
