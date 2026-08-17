import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'https://fifa-squad-generator-game.onrender.com',
      '/images': 'https://fifa-squad-generator-game.onrender.com',
    },
  },
});
