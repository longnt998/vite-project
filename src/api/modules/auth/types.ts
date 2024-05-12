export interface LoginRequest {
    email: string | undefined
    password: string | undefined
    role: number
}

export interface LoginResponse {
    code: number
    message: string
    access_token: string
    data: UserDetail
}

export interface UserDetail {
    id: number
    role: number
    name: string
    email: string
    avatar: string
    status: number
}
