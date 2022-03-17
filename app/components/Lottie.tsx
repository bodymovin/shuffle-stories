import Lottie from "lottie-web/build/player/lottie_worker"
import type {AnimationItem, AnimationConfigWithPath, AnimationConfigWithData} from 'lottie-web/build/player/lottie'
import { useEffect, useLayoutEffect, useRef } from "react"

type LottieRenderer = 'svg'

interface LottieComponentProps {
  path?: string,
  animationString?: string,
  loop?: boolean,
  autoplay?: boolean,
  renderer: LottieRenderer,
  onComplete?: () => void,
  className?: string
}

function getConfig(props: LottieComponentProps, container: any): AnimationConfigWithPath | AnimationConfigWithData | null {
  if (props.path) {
    return {
      container,
      loop: props.loop,
      autoplay: props.autoplay,
      renderer: props.renderer,
      path: props.path,
    }
  } else if (props.animationString) {
    return {
      container,
      loop: props.loop,
      autoplay: props.autoplay,
      renderer: props.renderer,
      animationData: JSON.parse(props.animationString)
    }
  } else {
    return null
  }
}

function LottieComponent(props: LottieComponentProps) {
  const {onComplete} = props
  
  const containerElem = useRef(null)
  const containerAnimation = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (containerElem.current) {
      if (containerAnimation.current) {
        containerAnimation.current.destroy()
      }
      const config = getConfig(props, containerElem.current)
      if (config) {
        
        containerAnimation.current = Lottie.loadAnimation(config)
        if (onComplete) {
          containerAnimation.current.addEventListener('complete', onComplete)
        }
      }
    }
  }, [props.path, props.loop, props.renderer, onComplete])
  
  return (
    <div
      className={props.className}
      ref={containerElem}
    >

    </div>
  )
}

export default LottieComponent