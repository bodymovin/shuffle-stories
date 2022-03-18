import { useEffect } from 'react'
import { Form, useLoaderData, Link, useLocation } from 'remix'
import { buildHash } from '~/helpers/hash'
import { SelectionUserData } from '~/helpers/selection/loaderFunction'
import { ChapterToContent, Chapters } from '~/interfaces/chapters'
import LottieComponent from '../Lottie'
import ChapterButton from './ChapterButton'

export interface ChapterNavigation {
  id: Chapters
  path: string
  name: string
  animationPath?:string
}

function buildChaptersNavigation(chapterPaths: ChapterToContent, currentChapter: Chapters) {
  const chapters: ChapterNavigation[] = [
    {
      id: 'character',
      path: 'character#story-selection-2',
      name: 'Character',
    },
    {
      id: 'partner',
      path: 'partner#story-selection-2',
      name: 'Partner',
    },
    {
      id: 'object',
      path: 'object#story-selection-2',
      name: 'Object',
    },
    {
      id: 'vehicle',
      path: 'vehicle#story-selection-2',
      name: 'Vehicle',
    },
    {
      id: 'path',
      path: 'path#story-selection-2',
      name: 'Path',
    },
    {
      id: 'destination',
      path: 'destination#story-selection-2',
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

  const {chapterPaths, currentChapter, title, subtitle, selectedStory, stories} = useLoaderData<SelectionUserData>()

  const location = useLocation()
  const hash = location.hash

  useEffect(() => {
    console.log(hash)
  }, [])

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
              <Link to={buildHash(stories.length, -1, 'story-selection-', hash)} className='story-navigation story-navigation--left'>

              </Link>
              <div
                className='story-container'
                key={currentChapter}
              >
                {stories.map((story, index) => {
                  return (
                    <>
                      <input
                        className='story-radio-input'
                        key={`${story.id}__input`}
                        type='radio'
                        id={`radio_${story.id}`}
                        name='story'
                        value={story.id}
                        defaultChecked={selectedStory === story.id}
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
                    </>
                  )
                  })}
              </div>
              <Link to={buildHash(stories.length, 1, 'story-selection-', hash)} className='story-navigation story-navigation--right'>

              </Link>
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