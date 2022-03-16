import { createCookie } from "remix";

export interface UserPrefs {
  visitedSplash?: boolean,
  color1?: string,
  color2?: string,
  color3?: string,
}

export const userPrefs = createCookie("user-prefs", {
  maxAge: 604_800, // one week
});

export const getUserPrefsFromRequest = async (request: Request): Promise<UserPrefs> => {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await userPrefs.parse(cookieHeader)) || {}
  return cookie
}

export const updateUserPrefs = async (request: Request, keys: UserPrefs) => {
  const cookie = {
    ...(await getUserPrefsFromRequest(request)),
    ...keys,
  }
  return await userPrefs.serialize(cookie)
}