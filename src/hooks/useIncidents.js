import { useContext } from "react";
import { IncidentProvider } from "./useIncidents.jsx";

export function useIncidents() {
  return useContext(IncidentProvider);
}
