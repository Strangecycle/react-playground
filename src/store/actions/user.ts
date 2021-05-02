import { Dispatch } from 'redux'
import { getUserInfo, SignInfo, userLogin } from '../../api/user'
import { setToken } from '../../utils/auth'
import { HttpResponse } from '../../utils/request'
import { CLEAR_USER, SET_USER } from '../constants/user'
import { UserState } from '../reducers/user'
import { Creator } from '../types'

const setUserCreator = (payload: UserState): Creator => ({ type: SET_USER, payload }) 

export const clearUserCreator = (): Creator => ({ type: CLEAR_USER })

export const userLoginCreator = (signInfo: SignInfo) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data: token }: HttpResponse = await userLogin(signInfo)
      setToken(token)
      const { data: userInfo }: HttpResponse = await getUserInfo()
      dispatch(setUserCreator(userInfo))
    } catch (error) {
      console.error(`error`, error)
    }
  }
}
