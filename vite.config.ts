import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import type { Plugin } from "vite";

export function AutoImageToolsPlugin(): Plugin {
  return {
    name: "auto-imagetools",
    enforce: "pre",

    async resolveId(source, importer) {
      if (/\.(png|jpe?g|webp|avif)$/i.test(source) && !source.includes("?")) {
        const params = "?as=picture&format=avif;webp;png&placeholder&w=400;800";
        const resolved = await this.resolve(source + params, importer, {
          skipSelf: true,
        });
        if (resolved) return resolved.id;
      }
      return null;
    },
    async load() {
      return null;
    },
  };
}
// https://vite.dev/config /
export default defineConfig({
  plugins: [AutoImageToolsPlugin(), imagetools(), react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
