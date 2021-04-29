import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  timeout: 5000,
})

export interface HttpResponse<T = any> {
  data: T
  readonly err_code: number
  readonly err_msg: string
}

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config
  },
  (error: AxiosError): AxiosError => {
    return error
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): any => {
    const { data: httpResponse } = response

    return httpResponse as HttpResponse
  },
  (error: AxiosError): AxiosError => {
    return error
  }
)
