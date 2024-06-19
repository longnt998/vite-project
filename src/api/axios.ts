import axios, { AxiosError, AxiosResponse } from 'axios'

import {
    HTTP_BAD_REQUEST,
    HTTP_DATA_INVALID,
    HTTP_UNAUTHORIZED,
    CODE_UNAUTHENTICATED,
    CODE_ACTION_CANNOT_DONE,
    ERR_NETWORK,
    ECONNABORTED,
    HTTP_NOT_FOUND,
    HTTP_NOT_ALLOWED,
    HTTP_REQUEST_TIMEOUT,
    HTTP_REQUEST_ENTITY_TOO_LARGE,
    HTTP_UNKNOW_STATUS,
    HTTP_TOO_MANY_REQUESTS,
    HTTP_SERVER_ERROR,
    HTTP_FORBIDDEN,
} from '@/constants'
import { ResponseError, ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import i18n from '@/i18n'
import store from '@/store'
import router from '@/router'
const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_PREFIX}`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use(
    (config) => {
        config.headers.apiToken = import.meta.env.VITE_API_TOKEN
        // @ts-ignore
        config.headers['Accept-Language'] = i18n.global.locale?.value
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        localStorage.removeItem('toastNetwork')
        return response.data
    },
    (error: AxiosError) => {
        // network error
        const errorResponse = error.response
        const httpCode = errorResponse?.status
        const errorData = errorResponse?.data as ResponseError

        const errorCodesToRedirect = [
            HTTP_NOT_FOUND,
            HTTP_NOT_ALLOWED,
            HTTP_REQUEST_TIMEOUT,
            HTTP_REQUEST_ENTITY_TOO_LARGE,
            HTTP_UNKNOW_STATUS,
            HTTP_TOO_MANY_REQUESTS,
            HTTP_SERVER_ERROR,
            HTTP_FORBIDDEN,
        ]

        if (typeof httpCode === 'number' && errorCodesToRedirect.includes(httpCode)) {
            return router.push({ name: 'page_error' })
        }

        switch (httpCode) {
            // validation
            case HTTP_DATA_INVALID:
                return Promise.reject(errorData.errors)

            // @TODO: pending waiting BE update format code
            case HTTP_UNAUTHORIZED:
                switch (errorData.code_error) {
                    case CODE_UNAUTHENTICATED:
                        store.dispatch('auth/logout').then(() => router.push({ name: 'login' }))
                        break
                }

                return Promise.reject(errorData)

            case HTTP_BAD_REQUEST:
                switch (errorData.code_error) {
                    case CODE_ACTION_CANNOT_DONE:
                        return Promise.reject(errorData)
                }

                return Promise.reject(errorData)
            default:

                return
        }

        // Show generic error message
        return Promise.reject(error)
    }
)

export default instance
