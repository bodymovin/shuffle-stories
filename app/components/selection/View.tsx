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
  const {animation, chapterPaths, currentChapter, title, subtitle} = useLoaderData<SelectionUserData>()

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
            <h1 className='header--title'>{title}</h1>
            <h2 className='header--subtitle'>{subtitle}</h2>
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
                {/* <svg width="1500" height="1500" viewBox="0 0 1500 1500" style={{width: '100%', height: '100%', background: 'rgba(0,127,0,0.5)'}}>

                </svg> */}
                {/* <img src="https://www.mickeyshannon.com/photos/landscape-photography.jpg" style={{width: '100%', height: '100%', background: 'rgba(0,127,0,0.5)'}} /> */}
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