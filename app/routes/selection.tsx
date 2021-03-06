import { json, LoaderFunction, Outlet } from 'remix';
import { updateUserPrefs } from '~/cookies';
import styles from '~/styles/selection.css';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
}

export const loader: LoaderFunction = async ({ request }): Promise<any> => {
  const serializedCookie = await updateUserPrefs(request, { visitedSplash: true });
  return json({
    ok: true,
  }, {
    headers: {
      'Set-Cookie': serializedCookie,
    },
  });
};

export default function Navigation() {
  return (
    <Outlet />
  );
}
