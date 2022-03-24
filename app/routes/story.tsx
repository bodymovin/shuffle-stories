import { Link, LoaderFunction, useLoaderData, useLocation } from "remix";
import LottieComponent from "~/components/Lottie";
import StoryVignette from "~/components/story/StoryVignette";
import { Chapters } from "~/helpers/enums/chapters";
import { createSVG } from "~/helpers/svgToString";
import { ChapterStrings, ChapterToContent } from "~/interfaces/chapters";
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

interface UserStoryData {
  posters: ChapterToContent
  animationPaths: ChapterToContent
}

export const loader: LoaderFunction = async ({request}):Promise<UserStoryData> => {
  const posters: ChapterToContent = {
    [Chapters.character]: await createSVG('/assets/story/1/character.svg'),
    [Chapters.partner]: await createSVG('/assets/story/1/partner.svg'),
    [Chapters.object]: await createSVG('/assets/story/1/object.svg'),
    [Chapters.vehicle]: await createSVG('/assets/story/1/vehicle.svg'),
    [Chapters.path]: await createSVG('/assets/story/1/path.svg'),
    [Chapters.destination]: await createSVG('/assets/story/1/destination.svg'),
  }
  const animationPaths: ChapterToContent = {
    [Chapters.character]: '/routed/assets/story/1/character_highlight.json',
    [Chapters.partner]: '/routed/assets/story/1/partner_highlight.json',
    [Chapters.object]: '/routed/assets/story/1/object_highlight.json',
    [Chapters.vehicle]: '/routed/assets/story/1/vehicle_highlight.json',
    [Chapters.path]: '/routed/assets/story/1/path_highlight.json',
    [Chapters.destination]: '/routed/assets/story/1/destination_highlight.json',
  }
  return {
    posters,
    animationPaths,
  }
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
  poster: string,
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
          <StoryVignette
            poster={poster}
            animationPath={animationPath}
            isSelected={isSelected}
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
  const {posters, animationPaths} = useLoaderData<UserStoryData>()
  return (
    <>
      <div className="wrapper">
        <div className="container">
          {buildChapterButton(
            1,
            animationPaths[Chapters.character],
            `/story/${Chapters.character}`,
            currentChapter === Chapters.character,
            !!currentChapter,
            posters[Chapters.character],
          )}
          {buildChapterButton(
            2,
            animationPaths[Chapters.partner],
            `/story/${Chapters.partner}`,
            currentChapter === Chapters.partner,
            !!currentChapter,
            posters[Chapters.partner],
          )}
          {buildChapterButton(
            3,
            animationPaths[Chapters.object],
            `/story/${Chapters.object}`,
            currentChapter === Chapters.object,
            !!currentChapter,
            posters[Chapters.object],
          )}
          {buildChapterButton(
            4,
            animationPaths[Chapters.vehicle],
            `/story/${Chapters.vehicle}`,
            currentChapter === Chapters.vehicle,
            !!currentChapter,
            posters[Chapters.vehicle],
          )}
          {buildChapterButton(
            5,
            animationPaths[Chapters.path],
            `/story/${Chapters.path}`,
            currentChapter === Chapters.path,
            !!currentChapter,
            posters[Chapters.path],
          )}
          {buildChapterButton(
            6,
            animationPaths[Chapters.destination],
            `/story/${Chapters.destination}`,
            currentChapter === Chapters.destination,
            !!currentChapter,
            posters[Chapters.destination],
          )}
        </div>
      </div>
    </>
  )
}
export default Story