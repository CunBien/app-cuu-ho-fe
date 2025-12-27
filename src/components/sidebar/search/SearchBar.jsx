import React from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Box sx={{ p: 2, mb: 1 }}>
      <TextField
        fullWidth
        placeholder="Tìm kiếm địa điểm, khu vực..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.25)',
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.2)',
              '& fieldset': {
                borderColor: '#dc2626',
                borderWidth: '2px',
              },
            },
          },
          '& .MuiInputBase-input': {
            color: 'white',
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.6)',
              opacity: 1,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}