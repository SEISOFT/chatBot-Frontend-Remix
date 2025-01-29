import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import { ErrorProvider } from "./providers/ErrorProvider";
import "./styles/global.css";

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/sharkyFavicon.svg" />
        <title>Sharky</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorProvider>
        <Outlet />
      </ErrorProvider>
    </ChakraProvider>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
