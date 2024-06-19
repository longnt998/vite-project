import { Store } from 'vuex'
import authModule from './modules/auth'
import { AuthState } from '@/types'
import loadingModule from './modules/loading'

export interface RootState {
    auth: AuthState
}

const store: Store<RootState> = createStore({
    modules: {
        auth: authModule,
        loading: loadingModule,
    },
})

export default store
