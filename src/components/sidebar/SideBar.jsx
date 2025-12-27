import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const sidebarVariants = {
  open: {
    width: 420,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    width: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export default function Sidebar({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={sidebarVariants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100vh',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.2)',
            color: 'white',
          }}
        >
          {/* Header with gradient */}
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 28, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: '-0.5px' }}>
                  Cứu Hộ Khẩn Cấp
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)', mt: 0.5 }}>
                  Hệ thống hỗ trợ y tế và cứu nạn
                </Typography>
              </Box>
            </Box>
            <Chip
              label="TRỰC TUYẾN"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                fontWeight: 600,
                fontSize: '10px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                height: 24,
              }}
            />
          </Box>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
              },
            }}
          >
            {children}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}