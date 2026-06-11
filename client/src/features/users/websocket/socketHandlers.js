import { deleteHandler } from './handlers/deleteHandler'
import { followHandler } from './handlers/followHandler'

export const socketHandlers = {
  FOLLOW: followHandler,
  DELETE: deleteHandler,
}


export default socketHandlers