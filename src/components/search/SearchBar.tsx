import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Tìm kiếm sự cố..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-background border-border focus:ring-2 focus:ring-ring transition-all"
      />
    </div>
  );
}
