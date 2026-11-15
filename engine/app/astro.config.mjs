import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [svelte()],
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
