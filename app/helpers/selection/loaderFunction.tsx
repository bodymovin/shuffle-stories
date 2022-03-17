import { LoaderFunction } from "remix";
import { convertColors } from "../animationTransformer.server";
import { loadJson } from "../fileLoader.server";

export const loader: LoaderFunction = async ():Promise<any> => {
  const animationData = await loadJson('animations/animation.json');
  const convertedAnimation = convertColors(animationData)
  return {
    animation: JSON.stringify(convertedAnimation),
  }
}
