export default function FilterPanel({
  selectedDisaster,
  setSelectedDisaster,
  selectedUrgency,
  setSelectedUrgency,
}) {
  return (
    <div className="p-4 border-b space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 select-none">
          Loại thiên tai
        </label>
        <select
          className="w-full px-3 py-2 border rounded-lg cursor-pointer"
          value={selectedDisaster}
          onChange={(e) => setSelectedDisaster(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="flood">Lũ lụt</option>
          <option value="landslide">Sạt lở</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 pointer-events-none select-none">
          Mức độ khẩn cấp
        </label>
        <select
          className="w-full px-3 py-2 border rounded-lg cursor-pointer"
          value={selectedUrgency}
          onChange={(e) => setSelectedUrgency(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="critical">Khẩn cấp</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
        </select>
        <p class="flex items-center mt-2 text-xs text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5 mr-2"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Chọn đúng thông tin có thể dễ dàng tìm kiếm hơn
        </p>
      </div>
    </div>
  );
}
