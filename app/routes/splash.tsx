import Lottie from '~/components/lottie';
import {loadJson} from '~/helpers/fileLoader.server';
import { useLoaderData, useFetcher } from "remix";
import type { LoaderFunction } from "remix";
import { convertColors } from '~/helpers/animationTransformer.server';
import { useEffect } from 'react';
import { getColorsFromCookie } from '~/helpers/colorParser';

export const loader: LoaderFunction = async ({request}) => {
  const animationData = await loadJson('animations/animation.json');
  const convertedAnimation = convertColors(animationData)
  return {
    animation: JSON.stringify(convertedAnimation),
    colors: await getColorsFromCookie(request),
  }
}

function Splash() {

  const {animation, colors} = useLoaderData()
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.data) {
      const root = document.documentElement;
      root.style.setProperty('--color-1', fetcher.data.color1);
      root.style.setProperty('--color-2', fetcher.data.color2);
      root.style.setProperty('--color-3', fetcher.data.color3);
    }
  }, [fetcher])

  return (
    <>
      <div>splash</div>
      <fetcher.Form  method="post" action="/color" >
        <input type="color" name="color1" defaultValue={colors.color1} />
        <input type="color" name="color2" defaultValue={colors.color2}/>
        <input type="color" name="color3" defaultValue={colors.color3}/>
        <input type="submit" />
      </fetcher.Form>
      <Lottie
        loop={true}
        autoplay={true}
        animationString={animation}
        renderer={'svg'}
      />
    </>
  )
}
export default Splash