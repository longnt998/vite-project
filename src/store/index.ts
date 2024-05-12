import { Store } from 'vuex'
import authModule from './modules/auth'
import { AuthState } from '@/types'

export interface RootState {
    auth: AuthState
}

const store: Store<RootState> = createStore({
    modules: {
        auth: authModule,
    },
})

export default store
