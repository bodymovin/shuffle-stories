import { convertColors } from "./animationTransformer.server";
import { loadJson } from "./fileLoader.server";

export interface AnimationData {
  nm: string
}

export interface ChapterPaths {
  character: string
  partner: string
  object: string
  vehicle: string
  path: string
  destination: string
}

export type Chapters = 'character' | 'partner' | 'object' | 'vehicle' | 'path' | 'destination'

const selectionChapterMap: ChapterPaths = {
  'character': 'character_selection.json',
  'partner': 'partner_selection.json',
  'object': 'object_selection.json',
  'vehicle': 'vehicle_selection.json',
  'path': 'path_selection.json',
  'destination': 'destination_selection.json',
}

export const getSelectionChapterButtons = async (): Promise<ChapterPaths> => {
  return {
    'character': '/assets/selection/Adventurer.json',
    'partner': '/assets/selection/Partner.json',
    'object': '/assets/selection/Object.json',
    'vehicle': '/assets/selection/Vehicle.json',
    'path': '/assets/selection/Path.json',
    'destination': '/assets/selection/Destiny.json',
  }
}

const loadAnimation = async (path: string): Promise<AnimationData> => {
  const animationData = await loadJson(path);
  const convertedAnimation = convertColors(animationData)
  return convertedAnimation
}

export const getSelectionChapterForStory = async (story: string, chapter: Chapters): Promise<AnimationData> => {
  return await loadAnimation(`assets/story/${story}/${selectionChapterMap[chapter]}`)
}