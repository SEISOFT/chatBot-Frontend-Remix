import { useState } from "react";
import { Profiling } from "~/components/organisms/profiling/types";
import { useError } from "../useError";
import { useUser } from "../useUser";

const INITIAL_PROFILING_STATE: Profiling = {
  business: {
    sector: null,
    yearsOperating: null,
    marketReach: null,
  },
  salesTeam: {
    teamSize: null,
    usesTechTools: null,
    dailyMessages: null,
  },
  digitalMarketing: {
    team: null,
    digitalTools: [],
    socialMediaPresence: null,
  },
  marketPotential: {
    monthlySales: null,
    averageTicket: null,
    digitalSalesPercentage: null,
  },
  openQuestion: {
    mainChallenge: null,
  },
};

export const useProfiling = () => {
  const { reportError } = useError();
  const { isLoading, updateUser } = useUser();
  const [profilingData, setProfilingData] = useState<Profiling>(
    INITIAL_PROFILING_STATE
  );
  const updateSection = <K extends keyof Profiling>(
    key: K,
    data: Profiling[K]
  ) => {
    setProfilingData((prev) => ({ ...prev, [key]: data }));
  };

  const submitProfiling = async () => {
    try {
      updateUser({ profile: profilingData });
    } catch (error) {
      reportError({
        component: "useProfiling.tsx Ln.52",
        title: "Error actualizar el usuario",
        message: `${error}`,
        showInProd: true,
      });
    }
  };

  return { profilingData, updateSection, submitProfiling, isLoading };
};
