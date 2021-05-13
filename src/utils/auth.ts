import Cookies, { CookieAttributes } from 'js-cookie';

const TOKEN_KEY = 'token';

export const setToken = (val: string, option?: CookieAttributes) => {
  Cookies.set(TOKEN_KEY, val, option);
};

export const getToken = (): string => {
  return `${Cookies.get(TOKEN_KEY)}`;
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
