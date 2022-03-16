import { json, LoaderFunction } from "remix";
import { updateUserPrefs } from "~/cookies";

export const loader: LoaderFunction = async ({request}): Promise<any> => {
  const serializedCookie = await updateUserPrefs(request, {visitedSplash: true})
  request.headers.set("Cookie", serializedCookie)
  return json({ 
    ok: true,
  }, {
    headers: {
      'Set-Cookie': serializedCookie,
    }
  });
}

export default function Navigation() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Navigation</h1>
    </div>
  );
}
