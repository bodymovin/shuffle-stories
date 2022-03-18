import Lottie from '~/components/Lottie';
import {loadJson} from '~/helpers/fileLoader.server';
import { useLoaderData, useFetcher, useNavigate } from "remix";
import type { LoaderFunction } from "remix";
import { convertColors } from '~/helpers/animationTransformer.server';
import { useEffect } from 'react';
import { getColorsFromCookie } from '~/helpers/colorParser';
import { ColorSet } from '~/interfaces/colors';
import { loadAnimation } from '~/helpers/animationData';


interface UserLoaderData {
  colors: ColorSet
  animation: string
}

export const loader: LoaderFunction = async ({request}):Promise<UserLoaderData> => {

  const animationData = await loadAnimation('assets/title/data.json')
  return {
    animation: JSON.stringify(animationData),
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
    navigate('/selection/character')
  }

  return (
    <>
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