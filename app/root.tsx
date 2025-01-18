import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "/app/styles/global.css",
    media: "print", // Diferir hasta que sea necesario
    onload: "this.media='all'",
  },
];

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <Outlet />
    </ChakraProvider>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
