import { ActionFunction } from 'remix'
import { serializeCookieWithColors, extractColorsFromRequest } from '~/helpers/colorParser'

export const action: ActionFunction = async ({request}) => {
  const colors = await extractColorsFromRequest(request)
  const cookie = await serializeCookieWithColors(request, colors)
  return new Response(JSON.stringify(colors), {
    headers: {
      'Set-Cookie': cookie,
      'Content-Type': 'application/json'
    }
  })
}