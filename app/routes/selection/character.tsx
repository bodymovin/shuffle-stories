import { ActionFunction, LoaderFunction } from 'remix'
import {action as selectionActionFunction} from '~/helpers/selection/actionFunction'
import {loader as selectionLoaderFunction} from '~/helpers/selection/loaderFunction'
import View from '~/components/selection/View'

export const loader: LoaderFunction = selectionLoaderFunction
export const action: ActionFunction = selectionActionFunction


export default View