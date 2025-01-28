import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    svgr({
      include: ["**/*.svg?react", "**/*.svg?r"],
      svgrOptions: {
        icon: true,
        replaceAttrValues: {
          fill: "currentColor",
        },
        svgo: true,
        svgProps: {
          clipRule: "evenodd",
          fill: "currentColor",
          fillRule: "evenodd",
          height: "1em",
          preserveAspectRatio: "xMidYMid meet",
          role: "img",
          width: "1em",
        },
      },
    }),

  ],
  build: {
    target: "esnext", // Apunta a navegadores modernos
    minify: "esbuild", // Usa esbuild para una compilación rápida y eficiente
    outDir: "dist", // Carpeta de salida
  },
});
