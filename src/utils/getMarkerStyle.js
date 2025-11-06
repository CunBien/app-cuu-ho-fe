// src/utils/getMarkerStyle.js

export const getMarkerColor = (status) => {
    switch (status) {
      case 'new':
        return '#d9534f'; // Màu đỏ cho sự cố mới
      case 'in_progress':
        return '#f0ad4e'; // Màu cam cho sự cố đang xử lý
      case 'resolved':
        return '#5cb85c'; // Màu xanh cho sự cố đã giải quyết
      default:
        return '#777'; // Màu xám mặc định
    }
  };