import { QuestionsConfig } from "../../components/organisms/profiling/types";

export const questionsConfig: QuestionsConfig = {
    business: [
        {
            title: "¿A qué sector pertenece tu negocio?",
            options: ["Comercio", "Servicios", "Manufactura", "Otro"],
            key: "sector",
        },
        {
            title: "¿Cuántos años tiene tu negocio?",
            options: ["Menos de 1 año", "1-3 años", "Más de 3 años"],
            key: "yearsOperating",
        },
        {
            title: "¿Cuál es el alcance de tu mercado?",
            options: ["Local", "Nacional", "Internacional"],
            key: "marketReach",
        },
    ],
    salesTeam: [
        {
            title: "¿Cuántas personas están en tu equipo comercial?",
            options: ["1-5", "6-10", "Más de 10"],
            key: "teamSize",
        },
        {
            title: "¿Utilizan herramientas tecnológicas (CRM, automatización)?",
            options: ["Sí", "No"],
            key: "usesTechTools",
        },
        {
            title: "¿Cuántos mensajes responden diariamente en las líneas comerciales?",
            options: [
                "Menos de 10",
                "10-50",
                "51-100",
                "101-200",
                "Más de 200",
            ],
            key: "dailyMessages",
        },
    ],
    digitalMarketing: [
        {
            title: "¿Tienes un equipo de marketing?",
            options: ["Sí, especializado", "Sí, pero no especializado", "No"],
            key: "team",
        },
        {
            title: "¿Qué herramientas de marketing digital utilizas?",
            options: [
                "Redes sociales",
                "Email marketing",
                "Google Ads",
                "Otro",
                "Ninguna",
            ],
            key: "digitalTools",
            multiple: true,
        },
        {
            title: "¿Cuál es tu presencia en redes sociales?",
            options: ["Muy activa", "Moderada", "Inactiva"],
            key: "socialMediaPresence",
        },
    ],
    potencialMercado: [
        {
            title: "¿Cuál es tu rango de ventas mensuales promedio?",
            options: [
                "Menos de $1M",
                "$1M-$10M",
                "$10M-$50M",
                "$50M-$200M",
                "Más de $200M",
            ],
            key: "monthlySales",
        },
        {
            title: "¿Cuál es tu ticket promedio?",
            options: [
                "Menos de $100 mil",
                "$100 mil-$500 mil",
                "$500 mil-$1M",
                "$1M-$5M",
                "Más de $5M",
            ],
            key: "averageTicket",
        },
        {
            title: "Del total de las ventas, ¿qué porcentaje proviene de canales digitales?",
            options: [
                "Ninguno",
                "Menos del 25%",
                "25%-50%",
                "51%-75%",
                "Más del 75%",
            ],
            key: "digitalSalesPercentage",
        },
    ],
    openQuestion: [
        {
            title: "¿Cuál es tu principal desafío actual en ventas o marketing?",
            key: "mainChallenge",
            textarea: true,
        },
    ],
};
