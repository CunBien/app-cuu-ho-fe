import { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../search/SearchBar";
import FilterButton from "../filter/FilterButton";
import RescueCard from "../incidents/RescueCard";
import { Incident } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDisaster: string;
  setSelectedDisaster: (value: string) => void;
  selectedUrgency: string;
  setSelectedUrgency: (value: string) => void;
  filteredData: Incident[];
  handleFocus: (incident: Incident) => void;
}

export default function Sidebar({
  searchTerm,
  setSearchTerm,
  selectedDisaster,
  setSelectedDisaster,
  selectedUrgency,
  setSelectedUrgency,
  filteredData,
  handleFocus,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle button - visible on mobile and desktop */}
      <Button
        onClick={toggleSidebar}
        size="icon"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg"
        aria-label="Toggle sidebar"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 h-full w-[320px] bg-card border-r border-border shadow-lg z-40 flex flex-col"
      >
        <div className="p-4 space-y-4 border-b border-border">
          <div className="flex items-center justify-between md:justify-start">
            <h2 className="text-lg font-semibold text-foreground">
              Danh sách sự cố
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex gap-2">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterButton
              selectedDisaster={selectedDisaster}
              setSelectedDisaster={setSelectedDisaster}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredData.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 text-sm">
                Không tìm thấy thông tin cứu hộ.
              </p>
            ) : (
              filteredData.map((item) => (
                <RescueCard
                  key={item.id}
                  incident={item}
                  onFocus={handleFocus}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </motion.aside>
    </>
  );
}
