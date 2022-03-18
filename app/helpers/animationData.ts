import { ChapterToContent, Chapters } from "~/interfaces/chapters";
import { convertColors } from "./animationTransformer.server";
import { loadJson } from "./fileLoader.server";

export interface AnimationData {
  nm: string
}

const selectionChapterMap: ChapterToContent = {
  'character': 'character_selection.json',
  'partner': 'partner_selection.json',
  'object': 'object_selection.json',
  'vehicle': 'vehicle_selection.json',
  'path': 'path_selection.json',
  'destination': 'destination_selection.json',
}

export const getSelectionChapterButtons = async (): Promise<ChapterToContent> => {
  return {
    'character': `/routed/assets/selection/Adventurer.json`,
    'partner': '/routed/assets/selection/Partner.json',
    'object': '/routed/assets/selection/Object.json',
    'vehicle': '/routed/assets/selection/Vehicle.json',
    'path': '/routed/assets/selection/Path.json',
    'destination': '/routed/assets/selection/Destiny.json',
  }
}

export const loadAnimation = async (path: string): Promise<AnimationData> => {
  const animationData = await loadJson(path);
  const convertedAnimation = convertColors(animationData)
  return convertedAnimation
}

export const getSelectionChapterAnimationForStory = async (story: string, chapter: Chapters): Promise<AnimationData> => {
  return await loadAnimation(`assets/story/${story}/${selectionChapterMap[chapter]}`)
}

export const getSelectionChapterPathForStory = async (story: string, chapter: Chapters): Promise<string> => {
  return `/routed/assets/story/${story}/${selectionChapterMap[chapter]}`
}