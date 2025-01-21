// 📌 Negocio
export type BusinessSector = "Comercio" | "Servicios" | "Manufactura" | "Otro";
export type BusinessYears = "Menos de 1 año" | "1-3 años" | "Más de 3 años";
export type MarketReach = "Local" | "Nacional" | "Internacional";

// 📌 Equipo Comercial
export type SalesTeamSize = "1-5" | "6-10" | "Más de 10";
export type TechToolsUsage = "Sí" | "No";
export type DailyMessages =
  | "Menos de 10"
  | "10-50"
  | "51-100"
  | "101-200"
  | "Más de 200";

// 📌 Marketing Digital
export type MarketingTeam =
  | "Sí, especializado"
  | "Sí, pero no especializado"
  | "No";
export type DigitalTool =
  | "Redes sociales"
  | "Email marketing"
  | "Google Ads"
  | "Otro"
  | "Ninguna";
export type SocialMediaPresence = "Muy activa" | "Moderada" | "Inactiva";

// 📌 Potencial de Mercado
export type MonthlySales =
  | "Menos de $1M"
  | "$1M-$10M"
  | "$10M-$50M"
  | "$50M-$200M"
  | "Más de $200M";
export type AverageTicket =
  | "Menos de $100 mil"
  | "$100 mil-$500 mil"
  | "$500 mil-$1M"
  | "$1M-$5M"
  | "Más de $5M";
export type DigitalSalesPercentage =
  | "Ninguno"
  | "Menos del 25%"
  | "25%-50%"
  | "51%-75%"
  | "Más del 75%";

// 📌 Pregunta Abierta
export type OpenQuestionResponse = string;
// Interfaz genérica para una pregunta
interface Question<T extends string | string[]> {
  title: string; // Título de la pregunta
  options?: T[]; // Opciones de respuesta (solo para preguntas cerradas)
  key: ProfilingKey; // Clave única que identifica la pregunta
  multiple?: boolean; // Indica si se permiten múltiples respuestas
  textarea?: boolean; // Indica si es una pregunta abierta
}
// 📌 Preguntas para cada sección
export type BusinessQuestion =
  | Question<BusinessSector>
  | Question<BusinessYears>
  | Question<MarketReach>;

export type SalesTeamQuestion =
  | Question<SalesTeamSize>
  | Question<TechToolsUsage>
  | Question<DailyMessages>;

export type DigitalMarketingQuestion =
  | Question<MarketingTeam>
  | Question<DigitalTool>
  | Question<SocialMediaPresence>;

export type MarketPotentialQuestion =
  | Question<MonthlySales>
  | Question<AverageTicket>
  | Question<DigitalSalesPercentage>;

export type OpenQuestion = Question<string>;

// Interfaz que define la configuración completa
export interface QuestionsConfig {
  business: BusinessQuestion[];
  salesTeam: SalesTeamQuestion[];
  digitalMarketing: DigitalMarketingQuestion[];
  marketPotential: MarketPotentialQuestion[];
  openQuestion: OpenQuestion[];
}

// 📌 Objeto resultante del formulario
// 1. Ajusta la interfaz para permitir null
export interface Profiling {
  business: {
    sector: BusinessSector | null;
    yearsOperating: BusinessYears | null;
    marketReach: MarketReach | null;
  };
  salesTeam: {
    teamSize: SalesTeamSize | null;
    usesTechTools: TechToolsUsage | null;
    dailyMessages: DailyMessages | null;
  };
  digitalMarketing: {
    team: MarketingTeam | null;
    digitalTools: DigitalTool[];
    socialMediaPresence: SocialMediaPresence | null;
  };
  marketPotential: {
    monthlySales: MonthlySales | null;
    averageTicket: AverageTicket | null;
    digitalSalesPercentage: DigitalSalesPercentage | null;
  };
  openQuestion: {
    mainChallenge: OpenQuestionResponse | null;
  };
}

export type BusinessKey = keyof Profiling["business"]; 
export type SalesTeamKey = keyof Profiling["salesTeam"];
export type DigitalMarketingKey = keyof Profiling["digitalMarketing"];
export type MarketPotentialKey = keyof Profiling["marketPotential"];
export type OpenQuestionKey = keyof Profiling["openQuestion"];

export type ProfilingKey =
  | BusinessKey
  | SalesTeamKey
  | DigitalMarketingKey
  | MarketPotentialKey
  | OpenQuestionKey