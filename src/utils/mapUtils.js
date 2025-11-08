// src/utils/mapUtils.js
/**
 * Trả về SVG string cho marker
 * Dùng với dangerouslySetInnerHTML trong react-map-gl
 */
export function getMarkerIcon(urgency) {
  const colors = {
    critical: "#ef4444", // đỏ
    high: "#f97316", // cam
    medium: "#eab308", // vàng
  };

  const color = colors[urgency?.toLowerCase()] || "#3b82f6"; // xanh dương mặc định

  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="${color}"
        stroke="white"
        stroke-width="3"
        style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));"
      />
      <!-- Điểm trắng nhỏ ở giữa (tùy chọn) -->
      <circle cx="16" cy="16" r="4" fill="white" />
    </svg>
  `.trim();
}
