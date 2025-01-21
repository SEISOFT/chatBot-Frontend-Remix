import { api } from "config/api";
import { constants } from "config/constants";
import { useState } from "react";
import { Profiling } from "~/components/organisms/profiling/types";
import { useError } from "../useError";

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
  const [profilingData, setProfilingData] = useState<Profiling>(
    INITIAL_PROFILING_STATE
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem(constants.JWT_SECRET);
  const updateSection = <K extends keyof Profiling>(
    key: K,
    data: Profiling[K]
  ) => {
    setProfilingData((prev) => ({ ...prev, [key]: data }));
  };

  const submitProfiling = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${api.CORE_URL}/user/update-user`, {
        method: "PUT",
        body: JSON.stringify(profilingData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("JWT inválido");
      }
    } catch (error) {
      reportError({
        component: "useProfiling.tsx Ln.63",
        title: "Error al iniciar sesión",
        message: `${error}`,
        showInProd: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { profilingData, updateSection, submitProfiling, isSubmitting };
};
