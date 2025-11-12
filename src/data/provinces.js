// src/data/provinces.js
const provinces = [
  { code: "01", name: "TP. Hà Nội", lat: 21.028, lng: 105.854, zoom: 11 }, // giữ nguyên
  { code: "02", name: "Tỉnh Hà Giang", lat: 22.766, lng: 104.95, zoom: 9 }, // giữ nguyên + sáp nhập một phần?
  { code: "03", name: "Tỉnh Cao Bằng", lat: 22.666, lng: 106.266, zoom: 9 }, // giữ nguyên
  { code: "04", name: "Tỉnh Lạng Sơn", lat: 21.853, lng: 106.761, zoom: 9 }, // giữ nguyên
  { code: "05", name: "Tỉnh Quảng Ninh", lat: 21.006, lng: 107.293, zoom: 9 }, // giữ nguyên
  { code: "06", name: "Tỉnh Lai Châu", lat: 22.337, lng: 103.158, zoom: 9 }, // giữ nguyên
  { code: "07", name: "Tỉnh Điện Biên", lat: 21.804, lng: 103.107, zoom: 9 }, // giữ nguyên
  { code: "08", name: "Tỉnh Sơn La", lat: 21.328, lng: 103.919, zoom: 9 }, // giữ nguyên
  { code: "09", name: "Tỉnh Thanh Hóa", lat: 19.807, lng: 105.776, zoom: 9 }, // giữ nguyên
  { code: "10", name: "Tỉnh Nghệ An", lat: 18.793, lng: 105.563, zoom: 8 }, // giữ nguyên
  { code: "11", name: "Tỉnh Hà Tĩnh", lat: 18.294, lng: 105.878, zoom: 9 }, // giữ nguyên
  { code: "12", name: "Tỉnh Lào Cai", lat: 22.485, lng: 103.966, zoom: 9 }, // mới sau sáp nhập (Lào Cai + Yên Bái + Phú Thọ phần)
  { code: "13", name: "Tỉnh Thái Nguyên", lat: 21.567, lng: 105.825, zoom: 9 }, // mới (Thái Nguyên + Bắc Kạn + Tuyên Quang)
  { code: "14", name: "Tỉnh Bắc Ninh", lat: 21.121, lng: 106.111, zoom: 10 }, // mới (Bắc Ninh + Bắc Giang + Vĩnh Phúc)
  { code: "15", name: "Tỉnh Hưng Yên", lat: 20.646, lng: 106.051, zoom: 10 }, // mới (Hưng Yên + Thái Bình + Hà Nam)
  { code: "16", name: "TP. Hải Phòng", lat: 20.865, lng: 106.683, zoom: 10 }, // mới (Hải Phòng + Hải Dương)
  { code: "17", name: "Tỉnh Ninh Bình", lat: 20.25, lng: 105.975, zoom: 10 }, // mới (Ninh Bình + Nam Định + một phần Hà Nam)
  { code: "18", name: "TP. Huế", lat: 16.463, lng: 107.59, zoom: 11 }, // mới (Thừa Thiên Huế, giữ nguyên nhưng nâng cấp)
  { code: "19", name: "TP. Đà Nẵng", lat: 16.047, lng: 108.206, zoom: 11 }, // giữ nguyên
  { code: "20", name: "Tỉnh Quảng Trị", lat: 16.75, lng: 107.083, zoom: 9 }, // mới (Quảng Trị + Quảng Bình)
  { code: "21", name: "Tỉnh Quảng Ngãi", lat: 15.121, lng: 108.804, zoom: 9 }, // mới (Quảng Ngãi + Bình Định + Phú Yên)
  { code: "22", name: "Tỉnh Khánh Hòa", lat: 12.25, lng: 109.133, zoom: 9 }, // mới (Khánh Hòa + Ninh Thuận)
  { code: "23", name: "Tỉnh Gia Lai", lat: 13.75, lng: 108.25, zoom: 9 }, // mới (Gia Lai + Kon Tum)
  { code: "24", name: "Tỉnh Đắk Lắk", lat: 12.666, lng: 108.05, zoom: 9 }, // mới (Đắk Lắk + Đắk Nông)
  { code: "25", name: "Tỉnh Lâm Đồng", lat: 11.946, lng: 108.441, zoom: 9 }, // mới (Lâm Đồng mở rộng)
  { code: "26", name: "Tỉnh Bình Phước", lat: 11.666, lng: 106.833, zoom: 9 }, // mới (Bình Phước + Bình Dương)
  { code: "27", name: "Tỉnh Tây Ninh", lat: 11.307, lng: 106.096, zoom: 9 }, // mới (Tây Ninh + một phần Long An)
  { code: "28", name: "Tỉnh Đồng Nai", lat: 10.916, lng: 107.083, zoom: 9 }, // mới (Đồng Nai + Bà Rịa - Vũng Tàu)
  { code: "29", name: "TP. Hồ Chí Minh", lat: 10.776, lng: 106.7, zoom: 11 }, // giữ nguyên
  { code: "30", name: "Tỉnh Đồng Tháp", lat: 10.666, lng: 105.666, zoom: 9 }, // mới (Đồng Tháp + Tiền Giang + Bến Tre)
  { code: "31", name: "Tỉnh An Giang", lat: 10.521, lng: 105.125, zoom: 9 }, // mới (An Giang + Kiên Giang phần)
  { code: "32", name: "Tỉnh Vĩnh Long", lat: 10.25, lng: 105.966, zoom: 10 }, // mới (Vĩnh Long + Trà Vinh + Sóc Trăng)
  { code: "33", name: "TP. Cần Thơ", lat: 10.033, lng: 105.788, zoom: 11 }, // giữ nguyên + mở rộng (Hậu Giang + Cần Thơ)
  { code: "34", name: "Tỉnh Cà Mau", lat: 9.183, lng: 105.15, zoom: 9 }, // mới (Cà Mau + Bạc Liêu)
];

export default provinces;
