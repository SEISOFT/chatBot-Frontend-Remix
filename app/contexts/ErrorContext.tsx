import { createContext } from "react";

export interface ErrorOptions {
  component?: string;
  title?: string;
  message: string;
  showInProd?: boolean;
}

export interface ErrorContextProps {
  reportError: (options: ErrorOptions) => void;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(
  undefined
);
