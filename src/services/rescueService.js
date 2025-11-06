// src/services/rescueService.js

import { mockData } from "../data/mockData";

// Giả lập một cuộc gọi API
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getAllIncidents = async () => {
  console.log("Fetching incidents from API...");
  await delay(1000);
  console.log("Fetched incidents succesfully!");
  return mockData;
};
