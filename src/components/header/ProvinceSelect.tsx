import provinces from "@/data/provinces";
import { MapPin } from "lucide-react";

interface ProvinceSelectProps {
  mapRef: React.RefObject<any>;
}

export default function ProvinceSelect({ mapRef }: ProvinceSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (!code || !mapRef?.current) return;

    const province = provinces.find((p) => p.code === code);
    if (!province) return;

    mapRef.current.flyTo({
      center: [province.lng, province.lat],
      zoom: province.zoom || 9,
      duration: 2000,
      essential: true,
    });
  };

  return (
    <div className="relative min-w-[200px]">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />

      <select
        onChange={handleChange}
        defaultValue=""
        className="w-full pl-10 pr-9 py-2.5 text-sm font-medium text-foreground bg-background border border-border rounded-xl focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all cursor-pointer appearance-none hover:border-ring/50"
      >
        <option value="" disabled>
          Chọn tỉnh / thành phố
        </option>
        {provinces
          .sort((a, b) => a.name.localeCompare(b.name, "vi"))
          .map((p) => (
            <option key={p.code} value={p.code}>
              {p.name.replace(/^(Tỉnh|TP\.)\s+/g, "")}
            </option>
          ))}
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
