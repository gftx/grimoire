import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "apple-touch-icon.png"],
      manifest: {
        short_name: "Grimoire",
        name: "Grimoire",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: ".",
        display: "standalone",
        background_color: "#f9fafb",
        theme_color: "#4f46e5",
        orientation: "portrait-primary",
      },
    }),
  ],
  server: {
    port: 5173,
    host: true,
    watch: {
      usePolling: true,
    },
    allowedHosts: ["grimoire.su"],
  },
});
