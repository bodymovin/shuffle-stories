export interface ChapterToContent {
  character: string
  partner: string
  object: string
  vehicle: string
  path: string
  destination: string
}

export type Chapters = 'character' | 'partner' | 'object' | 'vehicle' | 'path' | 'destination'