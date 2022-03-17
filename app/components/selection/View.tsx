import { Form, useLoaderData, Link, useLocation } from "remix"
import { buildHash } from "~/helpers/hash"
import LottieComponent from "../Lottie"

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
  const {animation} = useLoaderData<any>()

  const { hash } = useLocation()

  return (
    <>
      <Form
        method="post"
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
            <button type="submit" name="redirect" value="character" >Character</button>
            <button type="submit" name="redirect" value="companion" >Companion</button>
            <button type="submit" name="redirect" value="vehicle" >Vehicle</button>
          </footer>
        </article>
      </Form>
    </>
  )
}
export default View