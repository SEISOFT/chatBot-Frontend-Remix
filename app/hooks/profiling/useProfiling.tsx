import { useState } from "react";
import { ProfilingResult } from "~/components/organisms/profiling/types";

const INITIAL_PROFILING_STATE: ProfilingResult = {
  business: {
    sector: "Comercio",
    yearsOperating: "Menos de 1 año",
    marketReach: "Local",
  },
  salesTeam: {
    teamSize: "1-5",
    usesTechTools: "No",
    dailyMessages: "Menos de 10",
  },
  digitalMarketing: {
    team: "No",
    digitalTools: ["Email marketing", "Otro"],
    socialMediaPresence: "Inactiva",
  },
  potencialMercado: {
    monthlySales: "Menos de $1M",
    averageTicket: "Menos de $100 mil",
    digitalSalesPercentage: "Ninguno",
  },
  openQuestion: {
    mainChallenge: "",
  },
};

export const useProfiling = () => {
  const [profilingData, setProfilingData] = useState<ProfilingResult>(
    INITIAL_PROFILING_STATE
  );

  const updateSection = <K extends keyof ProfilingResult>(
    key: K,
    data: ProfilingResult[K]
  ) => {
    setProfilingData((prev) => ({ ...prev, [key]: data }));
  };

  return { profilingData, updateSection };
};
