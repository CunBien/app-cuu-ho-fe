import { AlertCircle } from "lucide-react";
import ProvinceSelect from "./ProvinceSelect";

interface HeaderProps {
  mapRef: React.RefObject<any>;
}

export default function Header({ mapRef }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Hệ thống cứu hộ
            </h1>
            <p className="text-xs text-muted-foreground">
              Theo dõi và hỗ trợ khẩn cấp
            </p>
          </div>
        </div>
        <ProvinceSelect mapRef={mapRef} />
      </div>
    </header>
  );
}
