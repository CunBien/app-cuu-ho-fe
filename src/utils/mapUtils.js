// src/utils/mapUtils.js
/**
 * Trích xuất vĩ độ và kinh độ từ một URL Google Maps.
 * Ví dụ URL: https://www.google.com/maps/search/?api=1&query=10.12345,106.54321
 * @param {string} url - URL của Google Maps.
 * @returns {{lat: number, lng: number} | null} - Object chứa lat/lng hoặc null nếu không tìm thấy.
 */
export const extractCoordsFromURL = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const urlObj = new URL(url);

    // 1) ?query=lat,lng
    let q = urlObj.searchParams.get('query');
    // 2) ?q=lat,lng (Google search/share)
    if (!q) q = urlObj.searchParams.get('q');
    if (q) {
      const parts = q.split(',');
      if (parts.length >= 2) {
        const lat = parseFloat(parts[0].trim());
        const lng = parseFloat(parts[1].trim());
        if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
      }
    }

    // 3) Path dạng .../@lat,lng,zoom...
    // Ví dụ: https://www.google.com/maps/@10.12345,106.54321,15z
    const atMatch = url.match(/@(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/);
    if (atMatch) {
      const lat = parseFloat(atMatch[1]);
      const lng = parseFloat(atMatch[3]);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
    }

    // 4) Chuỗi bất kỳ có chứa "lat,lng"
    const anyMatch = url.match(/(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/);
    if (anyMatch) {
      const lat = parseFloat(anyMatch[1]);
      const lng = parseFloat(anyMatch[3]);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
    }

    return null;
  } catch (error) {
    console.error("Invalid map URL:", url);
    return null;
  }
};