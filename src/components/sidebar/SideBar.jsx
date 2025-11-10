import { useState, useCallback } from "react";
import { Menu, X, Filter } from "lucide-react";
import SearchBar from "./search/SearchBar";
import FilterPanel from "./filter/FilterPanel";
import RescueCard from "./incidents/RescueCard"; // Đảm bảo đường dẫn import đúng

const Sidebar = ({
  searchTerm,
  setSearchTerm,
  selectedDisaster,
  setSelectedDisaster,
  selectedUrgency,
  setSelectedUrgency,
  filteredData,
  handleFocus, // Nhận từ IncidentPage
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);

  const renderContent = () => {
    if (!filteredData || filteredData.length === 0)
      return (
        <p className="text-gray-500 text-center py-8">
          Không tìm thấy thông tin cứu hộ.
        </p>
      );

    return filteredData.map((item) => (
      <RescueCard
        key={item.id}
        incident={item}
        onFocus={handleFocus} // <-- QUAN TRỌNG: Truyền prop này xuống
      />
    ));
  };

  return (
    <>
      {/* Nút mở Sidebar trên mobile (hoặc khi đóng) */}
      <button
        onClick={toggleSidebar}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-white border-2 border-gray-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 focus:outline-none md:hidden ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Mở bộ lọc"
      >
        <Filter size={20} className="text-gray-800" />
      </button>

      {/* Sidebar chính */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-40 w-full md:w-96 bg-white shadow-2xl md:shadow-none flex flex-col border-r border-gray-200 transform-gpu transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header Mobile */}
        <div className="flex md:hidden justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
          <button onClick={toggleSidebar} className="p-1.5 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Nội dung */}
        <div className="flex-1 flex flex-col overflow-hidden h-full">
          <div className="p-4 space-y-4 flex-shrink-0 bg-white z-10">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterPanel
              selectedDisaster={selectedDisaster}
              setSelectedDisaster={setSelectedDisaster}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
            />
          </div>

          <div className="px-4 pb-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Overlay cho mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;