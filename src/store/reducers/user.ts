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
    default:
      return state
  }
}

export default user
