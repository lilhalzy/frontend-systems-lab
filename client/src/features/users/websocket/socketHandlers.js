import { deleteHandler } from './handlers/deleteHandler'
import { followHandler } from './handlers/followHandler'
import { usersSyncHandler } from './handlers/usersSyncHandler'

export const socketHandlers = {
  FOLLOW: followHandler,
  DELETE: deleteHandler,
  USERS_SYNC: usersSyncHandler,
}


export default socketHandlers