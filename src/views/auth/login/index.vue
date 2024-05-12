<template>
    <div class="flex h-screen mx-auto max-w-[1440px]">
        <div class="basis-1/2 h-full flex flex-col justify-center p-[20px] sp:hidden">
            <img src="@/assets/img/welcome_management.png" alt="" class="object-contain !h-[calc(100vh-40px)]" />
        </div>
        <div class="basis-1/2 relative md:w-full sp:mx-auto">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-full md:px-[30px]">
                <p class="text-black text-center text-headline-l mb-10 mt-6">
                    Login
                </p>
                <div class="px-12 w-[498px] sp:min-w-[330px] sp:w-auto md:w-full border rounded-lg pt-[22px] pb-8">
                    <div class="text-left mb-4 text-body-s">
                        <input type="text"  v-model="state.email">
                    </div>
                    <div class="text-left mb-4 text-body-s">
                        <input type="password"  v-model="state.password">
                    </div>
                </div>
                <div class="flex justify-center pt-6">
                    <button @click="handleLogin">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { LoginRequest } from '@/api/modules/auth/types'
import router from '@/router'
import { showToast } from '@/utils/toastHelper'
import { clearObject, isObjectEmpty } from '@/utils/helper'

const state = reactive({
    email: undefined,
    password: undefined,
    show_password: false,
    remember_me: false,
})

const errorMsg: LoginRequest = reactive({
    email: '',
    password: '',
})
const { validate, errors } = useForm()
const store = useStore()
const hasErrors = ref(false)

const setLoading = () => store.dispatch('loading/setLoading')
const removeLoading = () => store.dispatch('loading/removeLoading')

watch(errors, (newErrors) => {
    hasErrors.value = isObjectEmpty(newErrors)
})

const handleLogin = async () => {
    const { valid } = await validate()
    if (!valid) {
        return false
    }

    try {
        clearObject(errorMsg)
        await store.dispatch('auth/login', state)
        await store.dispatch('auth/profile')

        router.push({ name: nextRoute })
        window.location.reload() // Reload the page to update the profile language settings
    } catch (error: any) {
        showToast(error.message, ToastType.ERROR)
    }
}

onMounted(async () => {
    setLoading()
    removeLoading()
})
</script>
