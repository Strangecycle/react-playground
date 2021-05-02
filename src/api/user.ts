import request, { HttpResponse } from '../utils/request'

export interface SignInfo {
  phone: string
  captcha: string
}

export interface CaptchaParam {
  phone: string
}

export interface UserInfoParams {
  phone?: string
  email?: string
}

const PREFIX = '/user'

export const sendCaptcha = (params: CaptchaParam) => {
  return request({
    url: `${PREFIX}/send`,
    method: 'GET',
    params,
  })
}

export const userLogin = (data: SignInfo) => {
  return request({
    url: `${PREFIX}/login`,
    method: 'POST',
    data,
  })
}

export const getUserInfo = (params?: UserInfoParams) => {
  return request({
    url: `${PREFIX}/info`,
    method: 'GET',
    params,
  })
}
