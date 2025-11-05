// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-map-gl': path.resolve(__dirname, './node_modules/react-map-gl/dist/mapbox-legacy/index.js'),
    },
  }
});