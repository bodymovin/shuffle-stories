import { Chapters } from '~/helpers/enums/chapters'

export type ChapterStrings = keyof typeof Chapters;

export type ChapterToContent = {
  [key in Chapters]: string
}