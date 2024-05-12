import { RouteRecordRaw } from 'vue-router'
import { checkLogin } from '@/middleware/checkLogin'

const authRouter: Array<RouteRecordRaw> = [
    {
        path: '/auth/login',
        name: 'login',
        meta: {
            middleware: [checkLogin],
        },
        component: () => import('@/views/auth/login/index.vue'),
    },
    {
        path: '/page-error',
        name: 'page_error',
        component: () => import('@/views/page-error/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/page-error',
    },
]

export default authRouter
