import axios from '@/api/axios'
import { LoginRequest, LoginResponse, UserDetail } from './types'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        return await axios.post('/login', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getUserProfile = async (): Promise<UserDetail> => {
    try {
        const { data: response } = await axios.get('/auth/profile')

        return response
    } catch (error) {
        return Promise.reject(error)
    }
}
