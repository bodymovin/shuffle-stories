import { getUserPrefsFromRequest, updateUserPrefs, UserPrefs } from "~/cookies"
import { Chapters } from "~/interfaces/chapters"

export const getUserStoryForChapterFromRequest = async (chapter: Chapters, request: Request) => {
  const userPrefs = await getUserPrefsFromRequest(request)
  return userPrefs[chapter] || '1'
}

export const setUserStory = async (data: UserPrefs, request: Request) => {
  return await updateUserPrefs(request, data)
}

export interface SelectionStory {
  id: string
  name: string
  path?: string
  animation?: string
}

export const getStories = async (): Promise<SelectionStory[]> => {
  const stories = [
    {
      id: '1',
      name: 'Friend of Monsters'
    },
    {
      id: '2',
      name: 'Brewer of time'
    },
    {
      id: '3',
      name: 'Gambler of lost smiles'
    }
  ]
  return stories
}