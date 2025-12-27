import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapPin, Phone, ChevronDown, ChevronUp, X } from "lucide-react";
import { Incident } from "@/data/mockData";
import { disasterIcons, urgencyLabels } from "@/utils/mapUtils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RescueCardProps {
  incident: Incident;
  onFocus: (incident: Incident) => void;
}

const urgencyStyles = {
  critical: "bg-critical-light border-l-critical text-critical",
  high: "bg-high-light border-l-high text-high",
  medium: "bg-medium-light border-l-medium text-medium",
  low: "bg-low-light border-l-low text-low",
};

export default function RescueCard({ incident, onFocus }: RescueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!incident) return null;

  const coordsFromIncident = (() => {
    if (Array.isArray(incident.coordinates) && incident.coordinates.length >= 2) {
      const [lng, lat] = incident.coordinates;
      return { latitude: lat, longitude: lng };
    }
    return null;
  })();

  const hasCoordinates = !!coordsFromIncident;
  const shortDescription =
    incident.description?.split(".").slice(0, 2).join(".") + ".";

  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onFocus || !hasCoordinates) return;
    onFocus({ ...incident, ...coordsFromIncident } as Incident);
  };

  const urgencyStyle =
    urgencyStyles[incident.urgency] || "bg-muted border-l-muted-foreground";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl border-l-4 ${urgencyStyle} shadow-sm hover:shadow-md transition-all cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {incident.image && (
          <img
            src={incident.image}
            alt={incident.name}
            className="w-full h-40 object-cover rounded-lg mb-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImage(incident.image!);
            }}
          />
        )}

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground text-sm flex-1">
            {disasterIcons[incident.disaster]} {incident.name}
          </h3>
          <Badge variant="secondary" className="text-xs shrink-0">
            {urgencyLabels[incident.urgency]}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          {isExpanded ? incident.description : shortDescription}
        </p>

        {incident.status && (
          <p className="text-xs font-medium text-foreground mb-3">
            Trạng thái: {incident.status}
          </p>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 mb-3"
            >
              {incident.contact && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{incident.contact}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {hasCoordinates && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleMapClick}
              className="text-xs flex-1"
            >
              <MapPin className="w-3.5 h-3.5 mr-1" />
              Xem trên bản đồ
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-xs"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Thu gọn
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Chi tiết
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Image zoom modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setZoomedImage(null)}
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setZoomedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            <TransformWrapper>
              <TransformComponent>
                <img
                  src={zoomedImage}
                  alt="Zoomed"
                  className="max-w-full max-h-[90vh] rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </TransformComponent>
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
