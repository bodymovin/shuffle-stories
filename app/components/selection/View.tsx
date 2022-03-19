import { useEffect, useState } from 'react'
import { Form, useLoaderData } from 'remix'
import { SelectionUserData } from '~/helpers/selection/loaderFunction'
import { ChapterToContent, Chapters } from '~/interfaces/chapters'
import LottieComponent from '../Lottie'
import ChapterButton from './ChapterButton'

export interface ChapterNavigation {
  id: Chapters
  path: string
  name: string
}

function buildChaptersNavigation(chapterPaths: ChapterToContent, currentChapter: Chapters) {
  const chapters: ChapterNavigation[] = [
    {
      id: 'character',
      path: 'character',
      name: 'Character',
    },
    {
      id: 'partner',
      path: 'partner',
      name: 'Partner',
    },
    {
      id: 'object',
      path: 'object',
      name: 'Object',
    },
    {
      id: 'vehicle',
      path: 'vehicle',
      name: 'Vehicle',
    },
    {
      id: 'path',
      path: 'path',
      name: 'Path',
    },
    {
      id: 'destination',
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
  console.log('selectedStoryId', selectedStoryId)
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