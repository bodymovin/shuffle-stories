import { redirect } from "remix";
import type { LoaderFunction } from "remix";
import { getUserPrefsFromRequest } from "~/cookies"

export const loader: LoaderFunction = async ({request}):Promise<null> => {
  const cookie = await getUserPrefsFromRequest(request)
  if (!cookie.visitedSplash) {
    throw redirect('/splash', 302)
  } else {
    throw redirect('/selection/character', 302)
  }
  return null
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Shuffle Stories</h1>
    </div>
  );
}
