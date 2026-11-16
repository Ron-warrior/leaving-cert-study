import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import AstroPWA from "@vite-pwa/astro";

const base = process.env.BASE_PATH ?? "/";
const normalizedBase = base.endsWith("/") ? base : `${base}/`;
const site = process.env.SITE_URL ?? "https://ron-warrior.github.io";

export default defineConfig({
  site,
  base: normalizedBase,
  trailingSlash: "always",
  integrations: [
    svelte(),
    AstroPWA({
      registerType: "autoUpdate",
      injectRegister: false,
      base: normalizedBase,
      scope: normalizedBase,
      manifest: {
        id: normalizedBase,
        name: "Leaving Cert Study",
        short_name: "LC Study",
        description:
          "Leaving Certificate Computer Science and Spanish notes, exam questions, listening audio, oral practice and timed mocks.",
        start_url: normalizedBase,
        scope: normalizedBase,
        display: "standalone",
        background_color: "#0b1220",
        theme_color: "#0b1220",
        lang: "en",
        categories: ["education"],
        icons: [
          {
            src: `${normalizedBase}icons/icon-192.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: `${normalizedBase}icons/icon-512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: `${normalizedBase}icons/icon-maskable-512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,json,webmanifest}"],
        // Keep the custom 404 online; the Worker serves it for missing navigations.
        globIgnores: ["**/audio/**", "**/404.html"],
        // Unknown URLs must not be rewritten to the home page.
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  output: "static",
  outDir: "./dist",
  vite: {
    server: {
      allowedHosts: ["pv-a556860a725c-fca000a2-26a2-4494-bcf6-482decb829f6.style.dev"],
      fs: {
        // Notes and subject content live at the repository root, outside the app.
        allow: ["../.."],
      },
    },
  },
});
