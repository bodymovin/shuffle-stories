import { Story } from "@prisma/client"
import { getUserPrefsFromRequest, updateUserPrefs, UserPrefs } from "~/cookies"
import { ChapterStrings } from "~/interfaces/chapters"
import { db } from "~/utils/db.server"

export const getUserStoryForChapterFromRequest = async (
  chapter: ChapterStrings,
  request: Request,
  stories: Story[]): Promise<string> => {
  const userPrefs = await getUserPrefsFromRequest(request)
  const storyId = userPrefs[chapter]
  const story = stories.find(story => story.id === storyId)
  return (story && storyId) || stories[0].id
}

export const setUserStory = async (data: UserPrefs, request: Request) => {
  return await updateUserPrefs(request, data)
}

export interface SelectionStory {
  id: string
  title: string
  path?: string
  animation?: string
  enabled: boolean
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