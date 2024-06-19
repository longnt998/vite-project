<template>
    <div class="text-left mb-4 text-body-s">
        <div class="items-center flex space-x-1.5">
            <div class="font-medium">Email</div>
        </div>
        <base-input-field
            id="email"
            v-model="state.email"
            type="text"
            :placeholder="'Email'"
            :rules="'required|email'"
            :field-name="'Email'"
            :error="errorMsg.email"
        />
    </div>
    <base-button
        :disabled="hasErrors"
        size="lg"
        class="flex w-full bg-main-primary-850 justify-center items-center rounded-xl font-medium"
        @click="handleSubmit"
    >
        Submit
    </base-button>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate'

import { clearObject, isObjectEmpty } from '@/utils/helper'
import { showToast } from '@/utils/toastHelper'
import { ToastType } from '@/types'

const state = reactive({
    email: undefined,
})

const errorMsg = reactive({
    email: '',
    password: '',
    role: '',
})

const { validate, errors } = useForm()
const hasErrors = ref(false)

watch(errors, (newErrors) => {
    hasErrors.value = isObjectEmpty(newErrors)
})

const handleSubmit = async () => {
    const { valid } = await validate()
    if (!valid) {
        return false
    }

    try {
        clearObject(errorMsg)
        console.log(123213)
    } catch (error: any) {
        showToast(error.message, ToastType.ERROR)
    }
}
</script>
