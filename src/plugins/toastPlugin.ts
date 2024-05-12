import { App } from 'vue'

import { showToast } from '@/utils/toastHelper'
import { ShowToastFunction } from '@/types'

export default {
    install: (app: App) => {
        app.provide('$showToast', showToast as ShowToastFunction)
    },
}
