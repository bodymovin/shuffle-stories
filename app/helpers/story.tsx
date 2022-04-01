import { getUserPrefsFromRequest, updateUserPrefs, UserPrefs } from "~/cookies"
import { ChapterStrings } from "~/interfaces/chapters"
import { db } from "~/utils/db.server"

export const getUserStoryForChapterFromRequest = async (chapter: ChapterStrings, request: Request): Promise<string> => {
  const userPrefs = await getUserPrefsFromRequest(request)
  return userPrefs[chapter] || ''
}

export const setUserStory = async (data: UserPrefs, request: Request) => {
  return await updateUserPrefs(request, data)
}

export interface SelectionStory {
  id: string
  title: string
  path?: string
  animation?: string
}

export const getStories = async () => {
  const stories = await db.story.findMany({
    include: {
      Chapter: true,
    },
    orderBy: {
      order: 'asc',
    }
  })
  return stories
}