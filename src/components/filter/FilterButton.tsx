import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterPanel from "./FilterPanel";

interface FilterButtonProps {
  selectedDisaster: string;
  setSelectedDisaster: (value: string) => void;
  selectedUrgency: string;
  setSelectedUrgency: (value: string) => void;
}

export default function FilterButton({
  selectedDisaster,
  setSelectedDisaster,
  selectedUrgency,
  setSelectedUrgency,
}: FilterButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bộ lọc tìm kiếm</DialogTitle>
          <DialogDescription>
            Chọn loại thiên tai và mức độ khẩn cấp để lọc kết quả
          </DialogDescription>
        </DialogHeader>
        <FilterPanel
          selectedDisaster={selectedDisaster}
          setSelectedDisaster={setSelectedDisaster}
          selectedUrgency={selectedUrgency}
          setSelectedUrgency={setSelectedUrgency}
        />
      </DialogContent>
    </Dialog>
  );
}
