import type { RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) => {
    return defineRoutes((route) => {
        route("/", "pages/index.tsx", { index: true });
        route("login", "templates/LoginLayout.tsx", () => {
            route("", "pages/login/login.tsx", { index: true });
        });
        route("dashboard", "templates/DashboardLayout.tsx", () => {
            route("", "pages/dashboard/home.tsx", { index: true });
            route("account", "pages/dashboard/account.tsx");
            route("my-profile", "pages/dashboard/myProfile.tsx");
        });
    });
}) satisfies RouteConfig;
