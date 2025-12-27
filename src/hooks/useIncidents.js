// src/hooks/useIncidents.js

// import { useEffect } from 'react';
// import { useIncidentStore } from '../store/incidentStore';

// export const useIncidents = () => {
//   // Lấy danh sách các sự cố (incidents) từ state của incidentStore
//   const incidents = useIncidentStore((state) => state.incidents);
//   // Lấy trạng thái loading từ state
//   const isLoading = useIncidentStore((state) => state.isLoading);
//   // Lấy sự cố được chọn hiện tại từ state
//   const selectedIncident = useIncidentStore((state) => state.selectedIncident);
//   // Lấy các action fetchIncidents và setSelectedIncident từ state.actions
//   const { fetchIncidents, setSelectedIncident } = useIncidentStore((state) => state.actions);

//   // Log mỗi lần hook useIncidents được render
//   console.log('Hook useIncidents được render.');

//   // useEffect để fetch dữ liệu incidents khi danh sách incidents rỗng và không đang loading
//   useEffect(() => {
//     console.log('useEffect trong useIncidents đang chạy.');
//     if (useIncidentStore.getState().incidents.length === 0 && !useIncidentStore.getState().isLoading) {
//          fetchIncidents();
//     }
//   }, []);

//   // Trả về các giá trị incidents, isLoading, selectedIncident và hàm setSelectedIncident cho việc sử dụng ngoài
//   return { incidents, isLoading, selectedIncident, setSelectedIncident };
// };

import { useContext } from "react";
import { IncidentProvider } from "./useIncidents.jsx";

export function useIncidents() {
  return useContext(IncidentProvider);
}
