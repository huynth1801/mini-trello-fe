import AppConstants from "@/constants/AppConstants";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { config } from "process";

const axiosClient: AxiosInstance = axios.create({
    baseURL: AppConstants.API_PATH,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AppConstants.ACCESS_TOKEN)
}

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const {url} = config

        const isAuthEndpoint = url?.includes('/auth')

        if(!isAuthEndpoint) {
            const token = getAccessToken()
            console.log("token", token)
            if(token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default axiosClient