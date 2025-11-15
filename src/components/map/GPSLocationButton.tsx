import { useState } from "react";
import { Navigation, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface GPSLocationButtonProps {
  mapRef: React.RefObject<any>;
}

export default function GPSLocationButton({ mapRef }: GPSLocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Không hỗ trợ GPS",
        description: "Trình duyệt của bạn không hỗ trợ định vị GPS",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            duration: 2000,
            essential: true,
          });

          toast({
            title: "Đã tìm thấy vị trí",
            description: `Tọa độ: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        }

        setIsLoading(false);
      },
      (error) => {
        let message = "Không thể lấy vị trí của bạn";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Bạn đã từ chối quyền truy cập vị trí";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Thông tin vị trí không khả dụng";
            break;
          case error.TIMEOUT:
            message = "Hết thời gian chờ khi lấy vị trí";
            break;
        }

        toast({
          title: "Lỗi định vị",
          description: message,
          variant: "destructive",
        });

        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <Button
      onClick={handleGetLocation}
      variant="outline"
      size="icon"
      disabled={isLoading}
      className="shrink-0"
      title="Xác định vị trí của tôi"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Navigation className="w-4 h-4" />
      )}
    </Button>
  );
}
