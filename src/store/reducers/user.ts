import { CLEAR_USER, SET_USER } from '../constants/user'
import { Creator } from '../types'

export interface UserState {
  id?: number
  username?: string
  phone?: string
  avatar?: string
  email?: string
  sentence?: string
  createdAt?: string
  updatedAt?: string
}

const user = (state: UserState = {}, action: Creator) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload
    }
    case CLEAR_USER: {
      return {}
    }
    default:
      return state
  }
}

export default user
