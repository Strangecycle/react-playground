import request from '../utils/request';

export interface SignInfo {
  phone: string;
  captcha: string;
}

export interface CaptchaParam {
  phone: string;
}

export interface UserInfoParams {
  phone?: string;
  email?: string;
}

export interface EditParams {
  username?: string;
  email?: string;
  phone?: string;
  sentence?: string;
}

const PREFIX = '/user';

export const sendCaptcha = (params: CaptchaParam) => {
  return request({
    url: `${PREFIX}/send`,
    method: 'GET',
    params,
  });
};

export const userLogin = (data: SignInfo) => {
  return request({
    url: `${PREFIX}/login`,
    method: 'POST',
    data,
  });
};

export const getUserInfo = (params?: UserInfoParams) => {
  return request({
    url: `${PREFIX}/info`,
    method: 'GET',
    params,
  });
};

export const editUserInfo = (id: number, data?: EditParams) => {
  return request({
    url: `${PREFIX}/${id}`,
    method: 'PUT',
    data,
  });
};
