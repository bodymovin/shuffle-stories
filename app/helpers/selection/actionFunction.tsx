import { ActionFunction, redirect } from "remix"
import { bodyParser } from "remix-utils"
import { Chapters } from "~/interfaces/chapters"
import { getUserStoryForChapterFromRequest, setUserStory } from "../story"
// import { getChapterFromRequest } from "./loaderFunction"

export const getChapterFromRequest = (request: Request): Chapters => {
  const urlData = new URL(request.url)
  const path = urlData.pathname
  const partParts = path.split('/')
  // TODO: improve this
  return partParts[partParts.length - 1] as Chapters
}

export const action: ActionFunction = async ({request}) => {
  const body: any = await bodyParser.toJSON(request)
  const headers: HeadersInit = {}
  if (body.story) {
    const chapter = getChapterFromRequest(request)
    const storyChapter = {
      [chapter]: body.story
    }
    const serializedCookie = await setUserStory(storyChapter, request)
    headers['Set-Cookie'] = serializedCookie
  }
  return redirect(`selection/${body.redirect}`, {
    headers: headers,
  })
}