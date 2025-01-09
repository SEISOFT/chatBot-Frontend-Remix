import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
          route("/", "pages/_index.tsx", { index: true });
          route("login", "pages/login/layout.tsx", () => {
            route("", "pages/login/login.tsx", { index: true });
          });
          route("dashboard", "pages/dashboard/layout.tsx", () => {
            route("", "pages/dashboard/dashboard.tsx", { index: true });
          });
        });
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
