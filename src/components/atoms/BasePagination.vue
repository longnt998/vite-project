<template>
    <div class="w-full px-4" :class="classes">
        <div class="flex items-center justify-between h-8 wrap sp:grid sp:grid-cols-1 sp:h-auto mt-4">
            <div>
                <el-pagination
                    v-model:current-page="form.currentPage"
                    v-model:page-size="form.perPage"
                    hide-on-single-page
                    background
                    :pager-count="pagerCount"
                    layout="prev, pager, next"
                    :total="form.total"
                    class="flex-1 [&_li]:!rounded-lg [&_li]:!text-body-xs [&_button]:!rounded-lg"
                    @current-change="handleChange"
                    @update:current-page="form.currentPage"
                />
            </div>
            <div v-if="isSelectPageSize && form.total" class="sp:mt-1 flex justify-end items-center">
                <span class="text-neutral-75 text-body-xs">{{ $t('common.result_per_page') }}</span>
                <el-select
                    v-model="form.perPage"
                    class="ml-2 [&>div]:h-8 [&>div]:w-20 [&>div]:rounded-lg [&>div>div>div]:rounded-lg [&>div>div>div>span]:text-gray-800"
                    placeholder="Select"
                    @change="handleChangePerPage"
                >
                    <el-option v-for="item in [10, 20, 50, 100]" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDevice } from 'next-vue-device-detector'
import { PAGE_SIZE, PAGE_DEFAULT } from '@/constants'
const props = defineProps({
    total: {
        type: Number,
        default: 0,
    },
    currentPage: {
        type: Number,
        default: 0,
    },
    perPage: {
        type: Number,
        default: PAGE_SIZE,
    },
    classes: {
        type: [String, Object],
        default: '',
    },
    isSelectPageSize: {
        type: Boolean,
        default: false,
    },
})

const form = computed(() => {
    return {
        currentPage: props.currentPage,
        perPage: props.perPage,
        total: props.total,
    }
})

const device = useDevice()
const pagerCount = computed(() => (device?.mobile || device?.ipad ? 5 : 7))
const emits = defineEmits(['change', 'update:currentPage', 'update:perPage'])
const checkTotalRecord = ref<boolean>(false)
const handleChangePerPage = () => {
    emits('update:currentPage', 1)
    emits('update:perPage', form.value.perPage)
    emits('change')
}
const handleChange = () => {
    emits('update:perPage', form.value.perPage)
    emits('update:currentPage', form.value.currentPage)
    emits('change')
}

watch(
    () => form.value.total,
    () => {
        if (form.value.total === PAGE_SIZE && checkTotalRecord.value) {
            emits('update:currentPage', PAGE_DEFAULT)
            emits('update:perPage', form.value.perPage)
            emits('change')
        } else {
            checkTotalRecord.value = true
        }
    }
)
</script>
