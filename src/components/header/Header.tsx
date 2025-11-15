import { AlertCircle } from "lucide-react";
import ProvinceSelect from "./ProvinceSelect";
import GPSLocationButton from "../map/GPSLocationButton";

interface HeaderProps {
  mapRef: React.RefObject<any>;
}

export default function Header({ mapRef }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-bold text-foreground truncate">
                Hệ thống cứu hộ
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                Theo dõi và hỗ trợ khẩn cấp
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <GPSLocationButton mapRef={mapRef} />
            <ProvinceSelect mapRef={mapRef} />
          </div>
        </div>
      </div>
    </header>
  );
}
