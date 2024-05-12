import { useToast, TYPE, POSITION } from 'vue-toastification'
import BaseToastMessage from '@/components/atoms/BaseToastMessage.vue'
import { ShowToastFunction, ShowToastImportFunction, ToastType } from '@/types'

export const showToast: ShowToastFunction = (message: string | object, toastType: ToastType) => {
    // for case network_error
    // @ts-ignore
    if ((typeof message === 'object' && message?.connect_network !== '') || message == undefined) {
        return true
    }

    const toast = useToast()
    const content = {
        component: BaseToastMessage,
        props: {
            content: message,
            type: toastType,
        },
    }
    toast.clear()

    toast(content, { type: TYPE[toastType], timeout: 5000, pauseOnFocusLoss: false })
}
