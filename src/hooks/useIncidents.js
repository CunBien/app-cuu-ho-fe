// src/hooks/useIncidents.js

import { useEffect } from "react";
import { useIncidentStore } from "../../store/incidentStore";

export const useIncidents = () => {
  const incidents = useIncidentStore((state) => state.incidents);
  const isLoading = useIncidentStore((state) => state.isLoading);
  const selectedIncident = useIncidentStore((state) => state.selectedIncident);
  const { fetchIncidents, setSelectedIncident } = useIncidentStore(
    (state) => state.actions
  );

  console.log("Hook useIncidents được render.");

  useEffect(() => {
    console.log("useEffect trong useIncidents đang chạy.");
    if (
      useIncidentStore.getState().incidents.length === 0 &&
      !useIncidentStore.getState().isLoading
    ) {
      fetchIncidents();
    }
  }, []);

  // Khôi phục lại các giá trị trả về
  return { incidents, isLoading, selectedIncident, setSelectedIncident };
};
