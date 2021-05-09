import { message } from 'antd'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { removeStorageItem } from '.'
import { getToken, removeToken } from './auth'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  timeout: 5000,
})

export interface HttpResponse<T = any> {
  data?: T
  err_code?: number
  err_msg?: string
}

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError): AxiosError => {
    return error
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): any => {
    const { data }: HttpResponse = response

    if (data.err_code !== 0) {
      return Promise.reject(data)
    }

    return data
  },
  ({ response }: AxiosError): Promise<HttpResponse> => {
    // ! 登录过期
    if (response?.data.err_code === 401) {
      removeToken()
      removeStorageItem('user')
      window.location.reload()
    }
    return Promise.reject(response)
  }
)

export default axiosInstance
