import { UserDetail } from '@/api/modules/auth/types'

export interface AuthState {
    access_token: string | null
    user: UserDetail | null
}

export interface LoadingState {
    isLoading: boolean
}
