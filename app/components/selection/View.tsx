import { Form, useLoaderData, Link, useLocation } from 'remix'
import { ChapterPaths, Chapters } from '~/helpers/animationData'
import { buildHash } from '~/helpers/hash'
import { SelectionUserData } from '~/helpers/selection/loaderFunction'
import LottieComponent from '../Lottie'

interface ChapterNavigation {
  id: Chapters
  path: string
  name: string
  animationPath?:string
}

function buildChaptersNavigation(chapterPaths: ChapterPaths, currentChapter: Chapters) {
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
      <button
        key={chapter.id}
        type='submit'
        name='redirect'
        className={`footer__chapter-button ${currentChapter === chapter.id ? 'footer__chapter-button--selected' : '' }`}
        value={chapter.path}
      >
        <LottieComponent
          loop={false}
          autoplay={true}
          path={chapterPaths[chapter.id]}
          renderer={'svg'}
          className={''}
        />
      </button>
    )
  })
  
}

function View() {
  const options = [
    {
      id: '1',
      name: 'a'
    },
    {
      id: '2',
      name: 'b'
    },
    {
      id: '3',
      name: 'c'
    },
    {
      id: '4',
      name: 'd'
    },
    {
      id: '5',
      name: 'e'
    }
  ]
  const {animation, chapterPaths, currentChapter} = useLoaderData<SelectionUserData>()

  const { hash } = useLocation()

  return (
    <>
      <Form
        method='post'
        action='/selection/character'
        className='wrapper'
      >
        <article
          className='container'
        >
          <header
            className='header'
          >
            <h1>character</h1>
            <h2>character</h2>
          </header>
          <main
            className='main'
          >
              {options.map(option => {
                return (
                  <input
                    className='story-radio-input'
                    key={option.id}
                    type='radio'
                    id={`radio_${option.id}`}
                    name='story'
                    value={option.id}
                  />
                )
              })}
              <Link to={buildHash(options.length, -1, 'story-selection-', hash)} className='story-navigation story-navigation--left'>

              </Link>
              <div
                className='story-container'
              >
                {options.map((option, index) => {
                  return (
                    <label
                      htmlFor={`radio_${option.id}`}
                      key={option.id}
                      className={'story'}
                      id={`story-selection-${index}`}
                    >
                      <div
                        className='story__border'
                      >
                      </div>
                      <LottieComponent
                        loop={false}
                        autoplay={true}
                        animationString={animation}
                        renderer={'svg'}
                        className={'story__animation'}
                      />
                    </label>
                  )
                })}
              </div>
              <Link to={buildHash(options.length, 1, 'story-selection-', hash)} className='story-navigation story-navigation--right'>

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