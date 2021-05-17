import { Dispatch } from 'redux';
import {
  EditParams,
  editUserInfo,
  getUserInfo,
  SignInfo,
  userLogin,
} from '../../api/user';
import { getStorageItem, removeStorageItem, setStorageItem } from '../../utils';
import { removeToken, setToken } from '../../utils/auth';
import { HttpResponse } from '../../utils/request';
import { CLEAR_USER, EDIT_USER, SET_AVATAR, SET_USER } from '../constants/user';
import { UserState } from '../reducers/user';
import { Creator } from '../types';

export const setUserCreatorSync = (payload: UserState): Creator => ({
  type: SET_USER,
  payload,
});

export const setAvatarCreatorSync = (payload: string): Creator => ({
  type: SET_AVATAR,
  payload,
});

export const editUserCreatorSync = (payload: EditParams): Creator => ({
  type: EDIT_USER,
  payload,
});

export const clearUserCreator = (): Creator => ({ type: CLEAR_USER });

export const userLoginCreator = (signInfo: SignInfo) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data: token }: HttpResponse = await userLogin(signInfo);
      setToken(token);
      const { data: userInfo }: HttpResponse = await getUserInfo();
      setStorageItem('user', userInfo);
      dispatch(setUserCreatorSync(userInfo));
    } catch (error) {
      console.error(`error`, error);
    }
  };
};

export const editUserCreator = (id: number, editParams: EditParams) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data: affectedRow }: HttpResponse = await editUserInfo(
        id,
        editParams
      );
      if (affectedRow !== 0) {
        const userInfo = getStorageItem('user');
        Object.assign(userInfo, editParams);
        setStorageItem('user', userInfo);
        dispatch(editUserCreatorSync(editParams));
      }
    } catch (error) {
      console.error(`error`, error);
    }
  };
};

export const userSignOutCreator = () => {
  return async (dispatch: Dispatch) => {
    removeToken();
    removeStorageItem('user');
    dispatch(clearUserCreator());
  };
};
