<template>
    <div class="t-container flex flex-col !items-start">
        <span v-if="title"> {{ title }} </span>
        <span class="text-body-s whitespace-pre-line">{{ content }}</span>
    </div>
</template>
<script setup lang="ts">
import { ToastType } from '@/types'
import i18n from '../../i18n'
const { t } = i18n.global
const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'SUCCESS',
    },
})

const title = computed(() => {
    if (props.type === ToastType.SUCCESS) {
        return t('common.success')
    } else if (props.type === ToastType.ERROR) {
        return t('common.error')
    }

    return undefined
})
</script>
<style>
.t-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.action {
    height: 40px;
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    border: thin solid currentColor;
}
</style>
