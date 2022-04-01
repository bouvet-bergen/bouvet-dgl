import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";

import appStylesheetUrl from "~/styles/app.css";
import normalizeStylesheetUrl from "~/styles/normalize.css";
import variablesStylesheetUrl from "~/styles/variables.css";
import variablesDarkStylesheetUrl from "~/styles/variables-dark.css";
import { getUser } from "~/session.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: normalizeStylesheetUrl }, 
    { rel: "preconnect", href: "https://fonts.googleapis.com" }, 
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" }, 
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" }, 
    { rel: "stylesheet", href: appStylesheetUrl }, 
    { rel: "stylesheet", href: variablesStylesheetUrl }, 
    { rel: "stylesheet", href: variablesDarkStylesheetUrl, media: '(prefers-color-scheme: dark)' }, 
    { rel: "icon", href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥏</text></svg>" }
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Bouvet DGS",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
