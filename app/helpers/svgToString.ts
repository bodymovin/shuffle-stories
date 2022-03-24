import { loadString } from './fileLoader.server'
import {optimize} from 'svgo'

export const createSVG = async (path: string): Promise<string> => {
  const svgString = await loadString(path)
  return svgString
  // Optimizing on the fly is slow, I'd look for a way to do it separately
  const svgFormatted = optimize(svgString,
    {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
    
              // or disable plugins
              removeViewBox: false,
              // TODO: search for a better solutions. It could be render the svgs
              // outside react so they don't get an id attached
              cleanupIDs: false,
              
            },
          },
        },
      ],
    })
  // return svgString
  if ('data' in svgFormatted) {
    return svgFormatted.data
  } else {
    return ''
  }
}