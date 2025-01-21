import { useState } from "react";
import { Profiling } from "~/components/organisms/profiling/types";

const INITIAL_PROFILING_STATE: Profiling = {
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
  const [profilingData, setProfilingData] = useState<Profiling>(
    INITIAL_PROFILING_STATE
  );

  const updateSection = <K extends keyof Profiling>(
    key: K,
    data: Profiling[K]
  ) => {
    setProfilingData((prev) => ({ ...prev, [key]: data }));
  };

  return { profilingData, updateSection };
};
