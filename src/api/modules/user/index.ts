import axios from '@/api/axios'
import { DetailUserResponse, FormSearchUser, ListUserResponse, FormUserData } from './types'

const resource = '/user'
const headers = {
    'Content-Type': 'multipart/form-data',
}

export const user = {
    list: async (params: FormSearchUser): Promise<ListUserResponse> => {
        const { data: response } = await axios.get(resource, { params })
        return response
    },
    detail: (id): Promise<DetailUserResponse> => axios.get(`${resource}/${id}`),
    create: (data: FormUserData): Promise<DetailUserResponse> => axios.post(`${resource}`, data, { headers }),
    update: async (formData: FormUserData, id: number): Promise<ResponseSuccessNoContent> => {
        return await axios.put(`${resource}/${id}`, formData)
    },
}
