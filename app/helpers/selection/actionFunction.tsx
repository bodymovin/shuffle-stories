import { ActionFunction, redirect } from "remix"
import { bodyParser } from "remix-utils"

export const action: ActionFunction = async ({request}) => {
  const body: any = await bodyParser.toJSON(request)
  return redirect(`selection/${body.redirect}`)
}