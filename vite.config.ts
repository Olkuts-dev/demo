import { fileURLToPath, URL } from "node:url";
import svgLoader from "vite-svg-loader";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // This is needed, or else Vite will try to find image paths (which it wont be able to find because this will be called on the web, not directly)
      // For example <img src="/images/logo.png"> will not work without the code below
      template: {
          transformAssetUrls: {
              includeAbsolute: false,
          },
      },
  }),
    svgLoader(),
  ],
  build: {
    target: "modules",
  },
  resolve: {
    alias: {
      "@assets"    : fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@"          : fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/index";`,
      },
    },
  },
});
