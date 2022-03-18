import { LoaderFunction } from "remix";
import { ChapterToContent, Chapters } from "~/interfaces/chapters";
import { getSelectionChapterButtons, getSelectionChapterForStory } from "../animationData";
import { getSelectionSubTitleByChapter, getSelectionTitleByChapter } from "../textData";

const getChapterFromPath = (path: string): Chapters => {
  const partParts = path.split('/')
  // TODO: improve this
  return partParts[partParts.length - 1] as Chapters
}

export interface SelectionUserData {
  animation: string
  currentChapter: Chapters
  chapterPaths: ChapterToContent
  title: string
  subtitle: string
}

export const loader: LoaderFunction = async ({request}):Promise<SelectionUserData> => {
  const urlData = new URL(request.url)
  const chapter = getChapterFromPath(urlData.pathname)
  const animation = await getSelectionChapterForStory('1', chapter)
  return {
    animation: JSON.stringify(animation),
    currentChapter: chapter,
    chapterPaths: await getSelectionChapterButtons(),
    title: await getSelectionTitleByChapter(chapter),
    subtitle: await getSelectionSubTitleByChapter(chapter),
  }
}
