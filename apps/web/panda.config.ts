import {defineConfig} from "@pandacss/dev"

export default defineConfig({
  // presets par défaut
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],

  // IMPORTANT: tableau de globs
  include: ["./src/**/*.{ts,tsx,js,jsx}"],

  // vous pouvez filtrer si besoin
  exclude: [],

  // dossier de sortie généré par Panda
  outdir: "styled-system",
})
