import { ChapterStrings } from "~/interfaces/chapters"
import { ChapterNavigation } from "~/routes/selection/$"
import SubmitButton from './SubmitButton'

export interface ChapterButtonProps {
  path: string
  chapter: ChapterNavigation
  currentChapter: ChapterStrings
}

function ChapterButton({chapter, currentChapter, path}: ChapterButtonProps) {
  const isSelected = currentChapter === chapter.id
  return (
    <SubmitButton
      id={chapter.id}
      isSelected={isSelected}
      path={path}
      value={chapter.path}
    />
  )
}
export default ChapterButton