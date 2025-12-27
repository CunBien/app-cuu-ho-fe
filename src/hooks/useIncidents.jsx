// src/hooks/useIncidents.js

import React, { useState, useCallback } from "react";
import { getAllIncidents } from "../services/rescueService";

export function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const fetchIncidents = useCallback(async () => {
    // Nếu đã load rồi thì không fetch lại
    if (isLoading || isFetched) return;

    setIsLoading(true);
    try {
      const data = await getAllIncidents();
      setIncidents(data);
      setIsFetched(true);
    } catch (error) {
      console.error("Failed to fetch incidents", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isFetched]);

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        isLoading,
        isFetched,
        selectedIncident,
        fetchIncidents,
        setSelectedIncident,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}