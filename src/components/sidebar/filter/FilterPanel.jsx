// src/components/sidebar/filter/FilterPanel.jsx
import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterPanel({
  categories,
  regions,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  selectedTimeRange,
  setSelectedTimeRange,
}) {
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        mb: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FilterListIcon sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.7)' }} />
        <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          BỘ LỌC
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel
              id="category-label"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': { color: '#dc2626' },
              }}
            >
              Loại sự cố
            </InputLabel>
            <Select
              labelId="category-label"
              label="Loại sự cố"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#dc2626',
                },
                '.MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel
              id="region-label"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': { color: '#dc2626' },
              }}
            >
              Khu vực
            </InputLabel>
            <Select
              labelId="region-label"
              label="Khu vực"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#dc2626',
                },
                '.MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              {regions.map((reg) => (
                <MenuItem key={reg.id} value={reg.id}>
                  {reg.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel
              id="time-range-label"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': { color: '#dc2626' },
              }}
            >
              Thời gian
            </InputLabel>
            <Select
              labelId="time-range-label"
              label="Thời gian"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#dc2626',
                },
                '.MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            >
              <MenuItem value="all">Mọi lúc</MenuItem>
              <MenuItem value="day">24 giờ qua</MenuItem>
              <MenuItem value="week">Tuần qua</MenuItem>
              <MenuItem value="month">Tháng qua</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
}