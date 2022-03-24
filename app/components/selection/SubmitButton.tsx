import LottieComponent from "../Lottie"

export interface ChapterButtonProps {
  path: string
  value: string
  id: string
  isSelected: boolean
}

function SubmitButton({value, path, isSelected, id}: ChapterButtonProps) {
  return (
    <button
      key={id}
      type='submit'
      name='redirect'
      className={`footer__chapter-button ${isSelected ? 'footer__chapter-button--selected' : '' }`}
      value={value}
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
export default SubmitButton