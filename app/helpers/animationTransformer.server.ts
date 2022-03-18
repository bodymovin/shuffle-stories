
const LAYER_SHAPE_TYPE = 4
const SHAPE_GROUP_TYPE = 'gr'
const SHAPE_FILL_TYPE = 'fl'
const SHAPE_STROKE_TYPE = 'st'

const iterateShapes = (shapes: any[]) => {
  shapes.forEach(shape => {
    if (shape.ty === SHAPE_GROUP_TYPE) {
      iterateShapes(shape.it)
    } else if (shape.ty === SHAPE_FILL_TYPE || shape.ty === SHAPE_STROKE_TYPE) {
      if (shape.c.k[0] === 0.20800000359 && shape.c.k[1] === 0.20800000359  && shape.c.k[2] === 0.20800000359) {
        shape.cl = 'anim-color-1'
      } else if (shape.c.k[0] === 1 && shape.c.k[1] === 0.925  && shape.c.k[2] === 0.838999968884) {
        shape.cl = 'anim-color-2'
      } else if (shape.c.k[0] === 0.952999997606 && shape.c.k[1] === 0.905999995213  && shape.c.k[2] === 0.842999985639) {
        shape.cl = 'anim-color-3'
      } else {
        // console.log(shape.c.k)
      }
    }
  })
}

const iterateLayers = (layers: any[]) => {
  layers.forEach(element => {
    if (element.ty === LAYER_SHAPE_TYPE) {
      iterateShapes(element.shapes)
    }
  });
}

const convertColors = (animation: any) => {
  const animationCopy = JSON.parse(JSON.stringify(animation))
  const layers: any[] = animationCopy.layers
  const assets: any[] = animationCopy.assets
  iterateLayers(layers)
  assets.forEach(asset => {
    if (asset.layers) {
      iterateLayers(asset.layers)
    }
  });
  return animationCopy;
}

export {
  convertColors,
}