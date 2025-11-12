import { disasterLabels, urgencyLabels } from "@/utils/mapUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterPanelProps {
  selectedDisaster: string;
  setSelectedDisaster: (value: string) => void;
  selectedUrgency: string;
  setSelectedUrgency: (value: string) => void;
}

export default function FilterPanel({
  selectedDisaster,
  setSelectedDisaster,
  selectedUrgency,
  setSelectedUrgency,
}: FilterPanelProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
          Loại thiên tai
        </label>
        <Select value={selectedDisaster} onValueChange={setSelectedDisaster}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {Object.entries(disasterLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
          Mức độ khẩn cấp
        </label>
        <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {Object.entries(urgencyLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
