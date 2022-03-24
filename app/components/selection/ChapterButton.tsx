import { ChapterStrings } from "~/interfaces/chapters"
import LottieComponent from "../Lottie"
import { ChapterNavigation } from "~/routes/selection/$"

export interface ChapterButtonProps {
  path: string
  chapter: ChapterNavigation
  currentChapter: ChapterStrings
}

function ChapterButton({chapter, currentChapter, path}: ChapterButtonProps) {
  const isSelected = currentChapter === chapter.id
  return (
    <button
        key={chapter.id}
        type='submit'
        name='redirect'
        className={`footer__chapter-button ${isSelected ? 'footer__chapter-button--selected' : '' }`}
        value={chapter.path}
      >
        <LottieComponent
          loop={false}
          autoplay={true}
          path={path}
          renderer={'svg'}
          direction={isSelected ? 1 : -1}
        />
      </button>
  )
}
export default ChapterButton