// src/services/rescueService.js
import axiosClient from '../api/axiosClient';

// helper linh hoạt theo cấu trúc trả về
const handleResponse = (res) => {
  const d = res?.data;
  if (!d) return d;

  // Ưu tiên các dạng phổ biến
  if (Array.isArray(d)) return d;

  // data có thể là mảng hoặc object bọc items
  if (d?.data !== undefined) {
    if (Array.isArray(d.data)) return d.data;
    if (d.data?.items !== undefined) return d.data.items;
    if (d.data?.results !== undefined) return d.data.results;
  }

  // top-level items/results
  if (Array.isArray(d?.items)) return d.items;
  if (Array.isArray(d?.results)) return d.results;

  // Một số backend dùng key khác như list, rows, content
  if (Array.isArray(d?.list)) return d.list;
  if (Array.isArray(d?.rows)) return d.rows;
  if (Array.isArray(d?.content)) return d.content;

  // Nếu không có mảng, trả về d để caller tự xử lý
  return d;
};

// --- RESCUE REQUEST ---
export const getRescueRequests = async (params = {}) => {
  // GET /rescue_request
  // ví dụ params: { page: 1, size: 20, region_id: 3, status: 'open' }
  const res = await axiosClient.get('/rescue_request/', { params });
  return handleResponse(res);
};

export const getRescueRequestById = async (id) => {
  // GET /rescue_request/{id}
  const res = await axiosClient.get(`/rescue_request/${id}/`);
  return handleResponse(res);
};

export const createRescueRequest = async (payload) => {
  // POST /rescue_request
  const res = await axiosClient.post('/rescue_request/', payload);
  return handleResponse(res);
};

export const updateRescueRequest = async (id, payload) => {
  // PUT/PATCH /rescue_request/{id} (tùy BE)
  const res = await axiosClient.put(`/rescue_request/${id}/`, payload);
  return handleResponse(res);
};

export const deleteRescueRequest = async (id) => {
  // DELETE /rescue_request/{id}
  const res = await axiosClient.delete(`/rescue_request/${id}/`);
  return handleResponse(res);
};

// --- CATEGORY / REGION / SOURCE ---
export const getCategories = async (params = {}) => {
  // GET /category
  const res = await axiosClient.get('/category/', { params });
  return handleResponse(res);
};

export const getRegions = async (params = {}) => {
  // GET /region
  const res = await axiosClient.get('/region/', { params });
  return handleResponse(res);
};

export const getSources = async (params = {}) => {
  // GET /source
  const res = await axiosClient.get('/source/', { params });
  return handleResponse(res);
};
