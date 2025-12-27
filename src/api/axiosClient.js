// src/api/axiosClient.js
import axios from 'axios';

// Sử dụng proxy trong development, direct URL trong production
const baseURL = import.meta.env.DEV 
  ? '/api'  // Trong development, sử dụng proxy
  : 'https://app-cuu-ho-api.dutai.site'; // Trong production, sử dụng direct URL

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để log requests trong development
if (import.meta.env.DEV) {
  axiosClient.interceptors.request.use(
    (config) => {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
      console.log('Full URL:', config.baseURL + config.url);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => {
      console.log('API Response:', response.status, response.config.url);
      try {
        const body = response?.data;
        const bodyPreview = Array.isArray(body)
          ? { type: 'array', length: body.length }
          : body && typeof body === 'object'
            ? { type: 'object', keys: Object.keys(body) }
            : { type: typeof body, value: body };
        console.log('API Response Body Preview:', bodyPreview);
        if (body && typeof body === 'object') {
          console.log('API Body keys:', Object.keys(body));
          if (body?.data && typeof body.data === 'object') {
            console.log('API Body.data keys:', Array.isArray(body.data) ? `array(${body.data.length})` : Object.keys(body.data));
          }
        }
        if (body && typeof body === 'object') {
          const dataField = body?.data ?? body?.results ?? body?.items;
          if (Array.isArray(dataField)) {
            console.log('API Data Array length:', dataField.length);
          } else if (dataField && typeof dataField === 'object') {
            console.log('API Data Object keys:', Object.keys(dataField));
          } else {
            console.log('API Data field not found (data/results/items)');
          }
        }
      } catch (_) {}
      return response;
    },
    (error) => {
      console.error('API Error:', error.response?.status, error.config?.url);
      console.error('Error Data:', error.response?.data);
      return Promise.reject(error);
    }
  );
}

export default axiosClient;