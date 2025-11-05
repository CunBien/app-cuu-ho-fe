// src/services/rescueService.js

import { mockIncidents } from '../data/mockData';

// Giả lập một cuộc gọi API
export const getAllIncidents = async () => {
  console.log('Fetching incidents from API...');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Fetched incidents successfully.');
      resolve(mockIncidents);
    }, 1000);
  });
};