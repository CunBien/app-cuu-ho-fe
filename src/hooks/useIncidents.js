import { useContext } from "react";
import { IncidentProvider } from "./IncidentProvider.jsx";

export function useIncidents() {
  return useContext(IncidentProvider);
}
