import { LoaderFunction } from "remix";
import { ChapterToContent, Chapters } from "~/interfaces/chapters";
import { getSelectionChapterButtons, getSelectionChapterAnimationForStory, getSelectionChapterPathForStory } from "../animationData";
import { getStories, getUserStoryForChapterFromRequest, SelectionStory } from "../story";
import { getSelectionSubTitleByChapter, getSelectionTitleByChapter } from "../textData";

export const getChapterFromRequest = (request: Request): Chapters => {
  const urlData = new URL(request.url)
  const path = urlData.pathname
  const partParts = path.split('/')
  // TODO: improve this
  return partParts[partParts.length - 1] as Chapters
}

export interface SelectionUserData {
  currentChapter: Chapters
  selectedStoryId: string
  chapterPaths: ChapterToContent
  title: string
  subtitle: string
  stories: SelectionStory[]
}

export const loader: LoaderFunction = async ({request}):Promise<SelectionUserData> => {
  const chapter = getChapterFromRequest(request)
  const selectedStoryId = await getUserStoryForChapterFromRequest(chapter, request)
  const stories = await Promise.all((
    await getStories())
    .map(async story => {
      return {
        ...story,
        path: selectedStoryId === story.id ? '' : (await getSelectionChapterPathForStory(story.id, chapter)),
        animation: selectedStoryId === story.id ? JSON.stringify(await getSelectionChapterAnimationForStory(story.id, chapter)) : '',
      }
  }))
  return {
    currentChapter: chapter,
    chapterPaths: await getSelectionChapterButtons(),
    title: await getSelectionTitleByChapter(chapter),
    subtitle: await getSelectionSubTitleByChapter(chapter),
    selectedStoryId,
    stories,
  }
}
