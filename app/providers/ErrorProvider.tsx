import { ReactNode, useCallback, useMemo } from "react";
import { useToast } from "@chakra-ui/react";
import { ErrorContext, ErrorOptions } from "~/contexts/ErrorContext";

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const toast = useToast();
  const reportError = useCallback(
    (options: ErrorOptions) => {
      const { message, title, component, showInProd } = options;
      const isProd = process.env.NODE_ENV === "production";
      if (!isProd || showInProd) {
        const place = component ? ` at ${component}` : "";
        console.error(`Error${place}: ${message}`);
      }
      toast({
        title: title ?? "Error",
        description: message,
        status: "error",
        variant: "solid",
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );

  const contextValue = useMemo(() => ({ reportError }), [reportError]);

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
