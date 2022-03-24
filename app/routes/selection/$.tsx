import { useEffect, useState } from "react";
import { ActionFunction, Form, LoaderFunction, redirect, useLoaderData } from "remix";
import { bodyParser } from "remix-utils";
import LottieComponent from "~/components/Lottie";
import ChapterButton from "~/components/selection/ChapterButton";
import { ChapterToContent, ChapterStrings } from "~/interfaces/chapters";
import { getSelectionChapterButtons, getSelectionChapterAnimationForStory, getSelectionChapterPathForStory } from "../../helpers/animationData";
import { Chapters } from "../../helpers/enums/chapters";
import { getStories, getUserStoryForChapterFromRequest, SelectionStory, setUserStory } from "../../helpers/story";
import { getSelectionSubTitleByChapter, getSelectionTitleByChapter } from "../../helpers/textData";

export const getChapterFromRequest = (request: Request): ChapterStrings => {
  const urlData = new URL(request.url)
  const path = urlData.pathname
  const partParts = path.split('/')
  console.log('Chapters', Chapters)
  console.log('PART', partParts[partParts.length - 1])
  if (Chapters.hasOwnProperty(partParts[partParts.length - 1])) {
    // TODO: improve this
    console.log('ENTROTROTROTO')
    return partParts[partParts.length - 1] as ChapterStrings
  }
  throw redirect(`/selection/${Chapters.character}`, 302);
}

export interface SelectionUserData {
  currentChapter: ChapterStrings
  selectedStoryId: string
  chapterPaths: ChapterToContent
  title: string
  subtitle: string
  stories: SelectionStory[]
}

export const loader: LoaderFunction = async ({request}):Promise<SelectionUserData> => {
  const chapter = getChapterFromRequest(request)
  const selectedStoryId = await getUserStoryForChapterFromRequest(chapter, request)
  const stories = await Promise.all((
    await getStories())
    .map(async story => {
      return {
        ...story,
        path: selectedStoryId === story.id ? '' : (await getSelectionChapterPathForStory(story.id, chapter)),
        animation: selectedStoryId === story.id ? JSON.stringify(await getSelectionChapterAnimationForStory(story.id, chapter)) : '',
      }
  }))
  return {
    currentChapter: chapter,
    chapterPaths: await getSelectionChapterButtons(),
    title: await getSelectionTitleByChapter(chapter),
    subtitle: await getSelectionSubTitleByChapter(chapter),
    selectedStoryId,
    stories,
  }
}

export const action: ActionFunction = async ({request}) => {
  const body: any = await bodyParser.toJSON(request)
  const headers: HeadersInit = {}
  if (body.story) {
    const chapter = getChapterFromRequest(request)
    const storyChapter = {
      [chapter]: body.story
    }
    const serializedCookie = await setUserStory(storyChapter, request)
    headers['Set-Cookie'] = serializedCookie
  }
  return redirect(`selection/${body.redirect}`, {
    headers: headers,
  })
}


export interface ChapterNavigation {
  id: ChapterStrings
  path: string
  name: string
}

function buildChaptersNavigation(chapterPaths: ChapterToContent, currentChapter: ChapterStrings) {
  const chapters: ChapterNavigation[] = [
    {
      id: Chapters.character,
      path: 'character',
      name: 'Character',
    },
    {
      id: Chapters.partner,
      path: 'partner',
      name: 'Partner',
    },
    {
      id: Chapters.object,
      path: 'object',
      name: 'Object',
    },
    {
      id: Chapters.vehicle,
      path: 'vehicle',
      name: 'Vehicle',
    },
    {
      id: Chapters.path,
      path: 'path',
      name: 'Path',
    },
    {
      id: Chapters.destination,
      path: 'destination',
      name: 'Destination',
    }
  ]
  return chapters.map((chapter) => {
    return (
      <ChapterButton
        key={chapter.id}
        chapter={chapter}
        currentChapter={currentChapter}
        path={chapterPaths[chapter.id]}
      />
    )
  })
  
}

function View() {

  const {chapterPaths, currentChapter, title, subtitle, selectedStoryId, stories} = useLoaderData<SelectionUserData>()
  const [currentStoryId, setStoryId] = useState(selectedStoryId)
  const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    setStoryId(selectedStoryId)
    setIsFirst(true)
  }, [currentChapter, selectedStoryId])

  const navigateToNextStory = (direction: number) => {
    const currentStoryIndex = stories.findIndex(story => story.id === currentStoryId)
    if (currentStoryIndex > 0 && direction === -1) {
      setStoryId(stories[currentStoryIndex - 1].id)
    } else if (currentStoryIndex < stories.length - 1 && direction === 1) {
      setStoryId(stories[currentStoryIndex + 1].id)
    }
    setIsFirst(false)
  }

  const currentStoryIndex = stories.findIndex(story => story.id === currentStoryId)

  return (
    <>
      <Form
        method='post'
        action={`/selection/${currentChapter}`}
        className='wrapper'
      >
        <article
          className='container'
        >
          <header
            className='header'
          >
            <h1 className='header--title'>{title}</h1>
            <h2 className='header--subtitle'>{subtitle}</h2>
          </header>
          <main
            className='main'
          >
              <button
                onClick={(ev) => {ev.preventDefault(); navigateToNextStory(-1)}}
                className='story__navigation'
                disabled={currentStoryIndex <= 0}
              >
                <svg
                    viewBox="0 0 54.01 106.02"
                    className='story__navigation__icon story__navigation__icon--flipped'
                  >
                  <polyline
                    points="1,1 53.01,53.01 1,105.02"
                  />
                </svg>
              </button>
              <div
                className='story-container'
                key={currentChapter}
              >
                <div
                  className={`story-container__scroller ${isFirst ? '' : 'story-container__scroller--animated' }`}
                  style={{transform: `translate(${-100 * currentStoryIndex}%, 0)`}}
                >
                  {stories.map((story, index) => {
                    return (
                      <div key={story.id} className={'story-container__scroller__element'}>
                        <input
                          className='story-radio-input'
                          key={`${story.id}__input`}
                          type='radio'
                          id={`radio_${story.id}`}
                          name='story'
                          value={story.id}
                          defaultChecked={selectedStoryId === story.id}
                        />
                        <label
                          htmlFor={`radio_${story.id}`}
                          key={`${story.id}__label`}
                          className={'story'}
                          id={`story-selection-${index}`}
                        >
                          <div className='story__container'>
                            <div
                              className='story__container__border'
                            >
                            </div>
                            <LottieComponent
                              loop={false}
                              autoplay={true}
                              path={story.path}
                              animationString={story.animation}
                              renderer={'svg'}
                              className={'story__container__animation'}
                            />
                          </div>
                        </label>
                      </div>
                    )
                    })}
                  </div>
              </div>
              <button
                onClick={(ev) => {ev.preventDefault(); navigateToNextStory(1)}}
                className='story__navigation'
                disabled={currentStoryIndex >= stories.length - 1}
              >
                <svg
                    viewBox="0 0 54.01 106.02"
                    className='story__navigation__icon'
                  >
                  <polyline
                    points="1,1 53.01,53.01 1,105.02"
                  />
                </svg>
              </button>
          </main>
          <footer
            className='footer'
          >
            {buildChaptersNavigation(chapterPaths, currentChapter)}
          </footer>
        </article>
      </Form>
    </>
  )
}
export default View