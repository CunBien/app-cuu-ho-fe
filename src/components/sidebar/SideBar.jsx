import SearchBar from "./search/SearchBar";
import FilterPanel from "./filter/FIlterPanel";
import RescueCard from "./incidents/RescueCard";

const Sidebar = (props) => {
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

  const renderContent = () => {
    if (filteredData.length === 0)
      return (
        <p className="text-gray-500 text-center">
          Không tìm thấy thông tin cứu hộ.
        </p>
      );

    return filteredData.map((item) => (
      <RescueCard key={item.id} incident={item} onFocus={handleFocus} />
    ));
  };

  return (
    <div className="w-96 bg-white shadow-lg flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterPanel
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}
          selectedUrgency={selectedUrgency}
          setSelectedUrgency={setSelectedUrgency}
        />
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
