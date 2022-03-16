import { bodyParser } from "remix-utils"
import { userPrefs } from "~/cookies"

const DEFAULT_COLOR_1 = '#353535'
const DEFAULT_COLOR_2 = '#FFEBD5'
const DEFAULT_COLOR_3 = '#F3E7D6'

const getColorsFromCookie = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await userPrefs.parse(cookieHeader)) || {}
  const colors = {
    color1: cookie.color1 || DEFAULT_COLOR_1,
    color2: cookie.color2 || DEFAULT_COLOR_2,
    color3: cookie.color3 || DEFAULT_COLOR_3,
  }
  return colors
}

const extractColorsFromRequest = async (request: Request) => {
  const body: any = await bodyParser.toJSON(request)
  const colors: any = {}
  colors.color1 = body.color1 || DEFAULT_COLOR_1
  colors.color2 = body.color2 || DEFAULT_COLOR_2
  colors.color3 = body.color3 || DEFAULT_COLOR_3
  return colors
}

const serializeCookieWithColors = async (request: Request, colors: any) => {
  const cookieHeader = request.headers.get("Cookie")
  const cookie = (await userPrefs.parse(cookieHeader)) || {}
  cookie.color1 = colors.color1 || DEFAULT_COLOR_1
  cookie.color2 = colors.color2 || DEFAULT_COLOR_2
  cookie.color3 = colors.color3 || DEFAULT_COLOR_3
  return await userPrefs.serialize(cookie)
}

export {
  getColorsFromCookie,
  extractColorsFromRequest,
  serializeCookieWithColors,
}