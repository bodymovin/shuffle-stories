import Lottie from '~/components/lottie';
import {loadJson} from '~/helpers/fileLoader.server';
import { useLoaderData, useFetcher, useNavigate } from "remix";
import type { LoaderFunction } from "remix";
import { convertColors } from '~/helpers/animationTransformer.server';
import { useEffect } from 'react';
import { getColorsFromCookie } from '~/helpers/colorParser';
import { ColorSet } from '~/interfaces/colors';


interface UserLoaderData {
  colors: ColorSet
  animation: string
}

export const loader: LoaderFunction = async ({request}):Promise<UserLoaderData> => {
  const animationData = await loadJson('animations/animation.json');
  const convertedAnimation = convertColors(animationData)
  return {
    animation: JSON.stringify(convertedAnimation),
    colors: await getColorsFromCookie(request),
  }
}

function Splash() {

  const {animation, colors} = useLoaderData<UserLoaderData>()
  const fetcher = useFetcher()
  const navigate = useNavigate()

  useEffect(() => {
    if (fetcher.data) {
      const root = document.documentElement;
      root.style.setProperty('--color-1', fetcher.data.color1);
      root.style.setProperty('--color-2', fetcher.data.color2);
      root.style.setProperty('--color-3', fetcher.data.color3);
    }
  }, [fetcher])

  const onComplete = () => {
    navigate('/navigation')
  }

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
        loop={false}
        autoplay={true}
        animationString={animation}
        renderer={'svg'}
        onComplete={onComplete}
      />
    </>
  )
}
export default Splash