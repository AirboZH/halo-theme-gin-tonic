import presetTypography from "@unocss/preset-typography";
import presetWind3 from "@unocss/preset-wind3";
import { defineConfig } from "unocss";

export default defineConfig({
  content: {
    filesystem: [
      "src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}",
      "public/fragments/**/*.html",
    ],
  },
  presets: [presetWind3(), presetTypography()],
});
