export default function FilterPanel({
  selectedDisaster,
  setSelectedDisaster,
  selectedUrgency,
  setSelectedUrgency,
}) {
  return (
    <div className="p-4 border-b space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Loại thiên tai</label>
        <select
          className="w-full px-3 py-2 border rounded-lg"
          value={selectedDisaster}
          onChange={(e) => setSelectedDisaster(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="flood">Lũ lụt</option>
          <option value="landslide">Sạt lở</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Mức độ khẩn cấp
        </label>
        <select
          className="w-full px-3 py-2 border rounded-lg"
          value={selectedUrgency}
          onChange={(e) => setSelectedUrgency(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="critical">Khẩn cấp</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
        </select>
      </div>
    </div>
  );
}
