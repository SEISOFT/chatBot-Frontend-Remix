export const config = {
    API_URL: import.meta.env.VITE_AUTH_API_URL  || "http://localhost:4001/api",
    CORE_URL: import.meta.env.VITE_AUTH_API_URL  || "http://localhost:4002/api",
    JWT_SECRET: "JWT",
};