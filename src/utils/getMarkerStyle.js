// src/utils/getMarkerStyle.js
export const getMarkerColor = (urgency) => {
  switch (urgency) {
    case 'critical': return '#d9534f';
    case 'high': return '#f0ad4e';
    case 'medium': return '#5cb85c';
    default: return '#777';
  }
};