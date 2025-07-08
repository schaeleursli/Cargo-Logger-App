import react from '@vitejs/plugin-react'; // ✅ This is the Vite plugin
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Cargo Logger App',
      short_name: 'CargoLogger',
      icons: [/* Add icons here */],
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0f172a'
    }
  })],
});