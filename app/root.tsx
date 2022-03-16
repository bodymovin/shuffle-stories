import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from '~/styles/global.css'
import { useLoaderData } from "remix";
import { getColorsFromCookie } from "./helpers/colorParser";
import { ColorSet } from "./interfaces/colors";

export const meta: MetaFunction = () => {
  return { title: "Shuffle Stories" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
}

interface UserData {
  colors: ColorSet
}

export const loader: LoaderFunction = async ({request}):Promise<UserData> => {
  return {
    colors: await getColorsFromCookie(request),
  }
}

export default function App() {

  const {colors} = useLoaderData<UserData>()
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.style.setProperty('--color-1', colors.color1);
    root.style.setProperty('--color-2', colors.color2);
    root.style.setProperty('--color-3', colors.color3);
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}