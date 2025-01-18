import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "pages/index.tsx", { index: true });
          route("login", "templates/LoginLayout.tsx", () => {
            route("", "pages/login/login.tsx", { index: true });
          });
          route("dashboard", "templates/DashboardLayout.tsx", () => {
            route("", "pages/dashboard/home.tsx", { index: true });
          });
        });
      },
    }),
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
    tsconfigPaths(),
  ],
  build: {
    target: "esnext", // Apunta a navegadores modernos
    minify: "esbuild", // Usa esbuild para una compilación rápida y eficiente
    outDir: "dist", // Carpeta de salida
  },
});
