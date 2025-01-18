import { ProfilingResult } from "./types";

// Tipo que define un paso del wizard
export interface WizardStep {
  title: string; // Título del paso
  description: string; // Descripción breve del paso
  key: keyof ProfilingResult; // Clave asociada a la sección de datos
}


export const stepsConfig: WizardStep[] = [
  {
    title: "Negocio",
    description: "Información del negocio",
    key: "business", // Clave asociada a la sección "business"
  },
  {
    title: "Equipo Comercial",
    description: "Datos del equipo de ventas",
    key: "salesTeam", // Clave asociada a la sección "salesTeam"
  },
  {
    title: "Marketing Digital",
    description: "Presencia digital",
    key: "digitalMarketing", // Clave asociada a la sección "digitalMarketing"
  },
  {
    title: "Potencial de Mercado",
    description: "Proyecciones de ventas",
    key: "potencialMercado", // Clave asociada a la sección "potencialMercado"
  },
  {
    title: "Desafío Principal",
    description: "¿Cuál es tu desafío?",
    key: "openQuestion", // Clave asociada a la sección "openQuestion"
  },
];
