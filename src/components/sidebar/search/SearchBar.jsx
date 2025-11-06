export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="p-4 border-b">
      <input
        type="text"
        placeholder="Tìm kiếm địa điểm, khu vực, đặc điểm..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
