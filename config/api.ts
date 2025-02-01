export const api = {
    AUTH_API: import.meta.env.VITE_AUTH_API_URL || "http://localhost:4001/api",
    CORE_API: import.meta.env.VITE_CORE_API_URL || "http://localhost:4002/api",
    WA_API: import.meta.env.VITE_WA_API_URL || "https://crunchis.sharky-ai.com.co/chatbot-Backend/whatsapp-service",
};