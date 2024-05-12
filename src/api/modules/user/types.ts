import { LinksResponse, MetaResponse } from '@/types'

export interface FormSearchUser {
    keyword: string
    page?: number
    page_size?: number
}

export interface ListUserResponse {
    data: UserData[]
    meta?: MetaResponse
    links?: LinksResponse
}

export interface UserData {
    id: number
    avatar?: string
    name?: string
    role: number
    phone?: string
    email?: string
    created_at: string
}

export interface FormUserData {
    id: number
    avatar?: string
    file_upload?: File
    name?: string
    role: number
    phone?: string
    email?: string
    birthday?: string
    password?: boolean | string
    gender: number
    address?: string
    status: number
    appointment_number: number
    salary: number
    created_at: string
}

export interface DetailAccountStaffResponse {
    code: number
    message: string
    data: FormUserData
}
