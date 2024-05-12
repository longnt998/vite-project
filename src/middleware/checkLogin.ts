import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '@/store'
import { UserDetail } from '@/api/modules/auth/types'
import { LANGUAGE, USER_ROLE } from '@/constants'
import { USER_STATUS } from '@/constants'

export async function checkLogin(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> {
    const excludedRoutes = ['forgot_password', 'reset_password', 'reset_password_send_mail']
    const router = useRouter()
    const isLoggedIn = store.getters['auth/isLoggedIn']

    if (excludedRoutes.includes(to.name as string) && !isLoggedIn) {
        next()
        return
    }

    if (isLoggedIn) {
        const auth: UserDetail = await store.dispatch('auth/profile')

        if (auth.status != USER_STATUS.ACTIVE) {
            nextTick(() => {
                store.dispatch('auth/logout').then(() => router.push({ name: 'company.login' }))
            })
        }

        if (to.name === 'login' || excludedRoutes.includes(to.name as string)) {
            return next({ name: 'agent.home' })
        }

        next()
    } else {
        if (to.name === 'login') {
            return next()
        }
    }
}
