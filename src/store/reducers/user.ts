import { getStorageItem } from '../../utils';
import { CLEAR_USER, EDIT_USER, SET_AVATAR, SET_USER } from '../constants/user';
import { Creator } from '../types';

export interface UserState {
  id?: number;
  username?: string;
  phone?: string;
  avatar?: string;
  email?: string;
  sentence?: string;
  createdAt?: string;
  updatedAt?: string;
}

const user = (state: UserState = {}, action: Creator) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload;
    }
    case SET_AVATAR: {
      return Object.assign({}, state, { avatar: action.payload });
    }
    case EDIT_USER: {
      return Object.assign({}, state, { ...action.payload });
    }
    case CLEAR_USER: {
      return {};
    }
    default:
      return getStorageItem('user') || state;
  }
};

export default user;
