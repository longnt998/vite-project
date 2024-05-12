import { Module } from 'vuex'

import { RootState } from '@/store'
import { AuthState } from '@/types'

import { getUserProfile, login } from '@/api/modules/auth'
import { UserDetail } from '@/api/modules/auth/types'
import { USER_ROLE } from '@/constants'

const authModule: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        access_token: null,
        user: null,
    },
    mutations: {
        setUserProfile(state, user) {
            state.user = user
        },
        logout(state) {
            state.access_token = null
            state.user = null
            localStorage.removeItem('access_token')
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const auth = await login(credentials)

                commit('setUserProfile', auth.data)

                return auth
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async profile({ commit, getters }, payload) {
            try {
                if (getters.currentUser && (!payload?.force || payload.force === false)) {
                    return getters.currentUser
                }

                const profile: UserDetail = await getUserProfile()
                commit('setUserProfile', profile)

                return profile
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async setProfile({ commit }) {
            try {
                const profile: UserDetail = await getUserProfile()

                commit('setUserProfile', profile)
            } catch (error) {
                return Promise.reject(error)
            }
        },
        logout({ commit }) {
            commit('logout')
        },
    },
    getters: {
        isLoggedIn(state) {
            return !!localStorage.getItem('access_token')
        },
        currentUser(state) {
            return state.user
        },
    },
}

export default authModule
