import {defineConfig} from "@pandacss/dev"

export const config = defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  include: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}"
  ],
  outdir: "styled-system",
})
