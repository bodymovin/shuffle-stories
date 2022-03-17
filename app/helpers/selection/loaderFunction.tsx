import { LoaderFunction } from "remix";
import { ChapterPaths, Chapters, getSelectionChapterButtons, getSelectionChapterForStory } from "../animationData";

const getChapterFromPath = (path: string): Chapters => {
  const partParts = path.split('/')
  // TODO: improve this
  return partParts[partParts.length - 1] as Chapters
}

export interface SelectionUserData {
  animation: string
  currentChapter: Chapters
  chapterPaths: ChapterPaths
}

export const loader: LoaderFunction = async ({request}):Promise<SelectionUserData> => {
  const urlData = new URL(request.url)
  const chapter = getChapterFromPath(urlData.pathname)
  const animation = await getSelectionChapterForStory('1', chapter)
  return {
    animation: JSON.stringify(animation),
    currentChapter: chapter,
    chapterPaths: await getSelectionChapterButtons(),
  }
}
