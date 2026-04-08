// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import UnoCSS from "@unocss/astro";

import Icons from "unplugin-icons/vite";

export default defineConfig({
  base: "/themes/astro-starter",
  build: {
    assets: "assets",
    format: "file",
  },
  outDir: "./templates",
  integrations: [react(), UnoCSS()],
  vite: {
    plugins: [
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    ],
  },
});
