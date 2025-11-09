import { useState } from "react";
import { Menu, X, Filter } from "lucide-react"; // Thêm Filter icon nếu muốn
import SearchBar from "./search/SearchBar";
import FilterPanel from "./filter/FilterPanel";
import RescueCard from "./incidents/RescueCard";

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    selectedDisaster,
    setSelectedDisaster,
    selectedUrgency,
    setSelectedUrgency,
    filteredData,
    handleFocus,
  } = props;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderContent = () => {
    if (filteredData.length === 0)
      return (
        <p className="text-gray-500 text-center py-8">
          Không tìm thấy thông tin cứu hộ.
        </p>
      );

    return filteredData.map((item) => (
      <RescueCard key={item.id} incident={item} onFocus={handleFocus} />
    ));
  };

  return (
    <>
      {/* NÚT TOGGLE */}
      <button
        onClick={toggleSidebar}
        className={`
          fixed bottom-6 right-6 z-50
          w-12 h-12
          bg-white border-2 border-gray-800
          rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 hover:shadow-xl hover:border-gray-900
          focus:outline-none focus:ring-4 focus:ring-gray-300
          group
        `}
        aria-label="Mở bộ lọc"
      >
        <div className="relative w-5 h-5">
          {/* Icon Filter khi đóng */}
          <Filter
            size={20}
            className={`absolute inset-0 transition-all duration-300 text-gray-800
              ${
                isOpen
                  ? "opacity-0 rotate-180 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
          />
          {/* Icon X khi mở */}
          <X
            size={20}
            className={`absolute inset-0 transition-all duration-300 text-gray-800
              ${
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-180 scale-0"
              }`}
          />
        </div>

        {/* Tooltip khi hover */}
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isOpen ? "Đóng bộ lọc" : "Mở bộ lọc"}
        </span>
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-96 bg-white shadow-2xl flex flex-col border-r border-gray-200
          transform-gpu origin-left
          transition-all duration-500 ease-out
          ${
            isOpen
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-full scale-75 opacity-0"
          }
        `}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Đóng"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Nội dung */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterPanel
              selectedDisaster={selectedDisaster}
              setSelectedDisaster={setSelectedDisaster}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
            />
          </div>

          <div
            className="px-4 pb-4 space-y-3 overflow-y-auto"
            style={{ maxHeight: "60vh" }}
          >
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black transition-opacity duration-500 ease-out
          pointer-events-none
          ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0"}
        `}
        onClick={toggleSidebar}
        style={{ zIndex: 30 }}
      />
    </>
  );
};

export default Sidebar;
