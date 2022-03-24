import { LoaderFunction, Outlet, redirect, useLoaderData, Link, useLocation } from "remix";
import LottieComponent from "~/components/Lottie";
import { Chapters } from "~/helpers/enums/chapters";
import { ChapterStrings } from "~/interfaces/chapters";
import styles from "~/styles/story.css";

const getChapterFromPath = (path: string): ChapterStrings | null => {
  
  const partParts = path.split('/')
  const chapterPart = partParts[partParts.length - 1]
  if (Chapters.hasOwnProperty(chapterPart)) {
    // TODO: improve this
    return chapterPart as ChapterStrings
  }
  return null
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles
    }
  ]
}

function buildChapterButton(
  chapterNumber: number,
  animationPath: string,
  link: string,
  isSelected: boolean,
  hasChapterSelected: boolean,
) {
  let className = `chapter chapter__${chapterNumber}`
  if (isSelected) {
    className += ` chapter__${chapterNumber}--selected chapter--selected`
  } else if (hasChapterSelected) {
    className += ` chapter--unselected`
  }
  return (
    <Link to={link} className={className}>
      <div className="chapter__background"></div>
      <div className="chapter__anim">
          <LottieComponent
            loop={false}
            autoplay={true}
            path={animationPath}
            renderer={'svg'}
            className={'chapter__anim_wrapper'}
          />  
      </div>
      <div className="chapter__border">
      </div>
    </Link>
  )
}

function Story() {
  const location = useLocation()
  const currentChapter = getChapterFromPath(location.pathname)
  return (
    <>
      <div className="wrapper">
        <div className="container">
          {buildChapterButton(
            1,
            '/routed/assets/story/1/character.json',
            `/story/${Chapters.character}`,
            currentChapter === Chapters.character,
            !!currentChapter,
          )}
          {buildChapterButton(
            2,
            '/routed/assets/story/1/partner.json',
            `/story/${Chapters.partner}`,
            currentChapter === Chapters.partner,
            !!currentChapter,
          )}
          {buildChapterButton(
            3,
            '/routed/assets/story/1/object.json',
            `/story/${Chapters.object}`,
            currentChapter === Chapters.object,
            !!currentChapter,
          )}
          {buildChapterButton(
            4,
            '/routed/assets/story/1/vehicle.json',
            `/story/${Chapters.vehicle}`,
            currentChapter === Chapters.vehicle,
            !!currentChapter,
          )}
          {buildChapterButton(
            5,
            '/routed/assets/story/1/path.json',
            `/story/${Chapters.path}`,
            currentChapter === Chapters.path,
            !!currentChapter,
          )}
          {buildChapterButton(
            6,
            '/routed/assets/story/1/destination.json',
            `/story/${Chapters.destination}`,
            currentChapter === Chapters.destination,
            !!currentChapter,
          )}
        </div>
      </div>
    </>
  )
}
export default Story