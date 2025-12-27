import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Chip, IconButton, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

// 🍀 Biểu tượng theo categoryName
const disasterIcons = {
  "Lũ lụt": "🌊",
  "Sạt lở đất": "🪨",
  "Bão": "🌪️",
};

const statusConfig = {
  pending: { label: 'Chờ xử lý', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  'in-progress': { label: 'Đang xử lý', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  resolved: { label: 'Đã giải quyết', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  default: { label: 'Không xác định', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' },
};

export default function RescueCard({ incident, onFocus }) {
  if (!incident) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const title = incident.title || "Chưa có tiêu đề";
  const content = incident.content || "Chưa có mô tả.";
  const status = incident.status || "default";
  const categoryName = incident.categoryName || "Khác";
  const regionName = incident.regionName || "Không xác định";
  const postTime = incident.posted_time;
  const imageUrl = incident.image;
  const hasCoordinates = incident.latitude && incident.longitude;

  const shortDescription = content.length > 80 ? content.substring(0, 80) + "..." : content;
  const statusStyle = statusConfig[status] || statusConfig.default;

  const handleMapClick = () => {
    if (onFocus && hasCoordinates) {
      onFocus(incident);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      const date = new Date(timeStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 60) return `${diffMins} phút trước`;
      if (diffHours < 24) return `${diffHours} giờ trước`;
      if (diffDays < 7) return `${diffDays} ngày trước`;
      return date.toLocaleDateString('vi-VN');
    } catch {
      return timeStr;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '12px',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Status indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: statusStyle.color,
          }}
        />

        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1.5 }}>
            <Box sx={{ flex: 1, pr: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: 1.4,
                  mb: 0.5,
                }}
              >
                {title}
              </Typography>
              <Chip
                label={statusStyle.label}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.color,
                  border: `1px solid ${statusStyle.color}`,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            </Box>
            <Box sx={{ fontSize: '28px', flexShrink: 0 }}>
              {disasterIcons[categoryName] || "❗"}
            </Box>
          </Box>

          {/* Image */}
          {imageUrl && (
            <Box
              component="img"
              src={imageUrl}
              alt={title}
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(imageUrl);
              }}
              sx={{
                width: '100%',
                height: 160,
                objectFit: 'cover',
                borderRadius: '12px',
                mb: 1.5,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          )}

          {/* Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CategoryIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.6)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
                {categoryName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.6)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
                {regionName}
              </Typography>
            </Box>
            {postTime && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.6)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                  {formatTime(postTime)}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Description */}
          {!isExpanded && (
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '13px',
                lineHeight: 1.5,
                mt: 1.5,
              }}
            >
              {shortDescription}
            </Typography>
          )}

          {/* Map Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleMapClick();
            }}
            disabled={!hasCoordinates}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: hasCoordinates
                ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              cursor: hasCoordinates ? 'pointer' : 'not-allowed',
              opacity: hasCoordinates ? 1 : 0.5,
              width: '100%',
              transition: 'all 0.2s ease',
            }}
          >
            {hasCoordinates ? '🗺️ Xem trên bản đồ' : 'Không có tọa độ'}
          </motion.button>
        </Box>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <Box
                sx={{
                  p: 2,
                  pt: 0,
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {content}
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={() => setZoomedImage(null)}
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: 'white',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <CloseIcon />
            </IconButton>
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={zoomedImage}
                  alt="Zoomed"
                  style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                />
              </TransformComponent>
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
