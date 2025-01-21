import { Profiling } from "../../components/organisms/profiling/types";

export interface WizardStep {
  title: string;
  description: string;
  key: keyof Profiling;
}


export const stepsConfig: WizardStep[] = [
  {
    title: "Negocio",
    description: "Información del negocio",
    key: "business",
  },
  {
    title: "Equipo Comercial",
    description: "Datos del equipo de ventas",
    key: "salesTeam",
  },
  {
    title: "Marketing Digital",
    description: "Presencia digital",
    key: "digitalMarketing",
  },
  {
    title: "Potencial de Mercado",
    description: "Proyecciones de ventas",
    key: "potencialMercado",
  },
  {
    title: "Desafío Principal",
    description: "¿Cuál es tu desafío?",
    key: "openQuestion",
  },
];
