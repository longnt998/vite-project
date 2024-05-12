<template>
    <section class="w-full h-full relative overflow-hidden sp:overflow-auto">
        <div class="flex flex-col w-full bg-neutral-0 text-[20px] leading-[30px] py-4 px-6">
            <div class="w-full mb-5">
                <h2 class="flex-1 text-neutral-100">
                    {{ $t('user.list.title') }}
                </h2>
            </div>
            <div class="w-full">
                <div class="flex sp:flex-col justify-between sp:w-full sp:py-2">
                    <div class="flex sp:flex-col sp:w-full sp:mb-2">
                        <input
                            v-model="formSearch.keyword"
                            class="h-[38px] min-w-[180px] sp:w-full [&>input]:!border-gray-800 text-body-xs hover:[&>input]:!border-gray-1000"
                            :placeholder="$t('user.list.placeholder')"
                        />
                        <div class="flex justify-end sp:mt-2 ml-2">
                            <base-button
                                tertiary
                                size="sm"
                                class="h-[38px] min-w-[55px] w-fit border-main-primary-500 !bg-main-primary-25 hover:border-main-primary-500 hover:bg-main-primary-25 text-main-primary-500 rounded-lg"
                                @click="getList()"
                            >
                                <base-icon name="sm_left_icon_primary" class="mr-1"></base-icon>
                                {{ $t('common.search') }}
                            </base-button>
                        </div>
                    </div>
                    <div class="float-right">
                        <base-button
                            size="sm"
                            primary
                            class="h-[38px] min-w-[55px] w-fit border-main-primary-500 !bg-main-primary-25 hover:border-main-primary-500 hover:bg-main-primary-25 text-main-primary-500 rounded-lg"
                            @click="handleCreate"
                        >
                            {{ $t('user.list.create') }}
                        </base-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-[calc(100vh-224px)] py-4 px-6 overflow-auto sp:overflow-visible sp:h-fit">
            <div v-if="!isLoading" class="h-[calc(100vh-268px)] sp:h-fit">
                <el-table
                    :data="data"
                    class="w-full bg-neutral-0 rounded-t-2xl"
                    header-cell-class-name="h-[59px] [&>div]:text-center !pt-1.5 !text-neutral-100 !bg-gray-25 !border-gray-50 text-body-s !font-medium [&>div]:!m-0 [&>div]:!pr-0"
                    row-class-name="w-full text-neutral-90 group [&>td>div]:!text-center"
                    :empty-text="$t('common.no_data')"
                    :scrollbar-always-on="true"
                >
                    <el-table-column
                        min-width="100"
                        height="100"
                        :label="$t('user.list.avatar')"
                        label-class-name="text-neutral-100"
                    >
                        <template #default="scope">
                            <el-avatar :title="scope.row.name" :size="35" :src="scope.row.avatar" />
                        </template>
                    </el-table-column>
                    <el-table-column min-width="200" :label="$t('user.list.name')" label-class-name="text-neutral-100">
                        <template #default="scope">
                            <p :title="scope.row.name" class="line-clamp-2">{{ scope.row.name }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="200" :label="$t('user.list.phone')" label-class-name="text-neutral-100">
                        <template #default="scope">
                            <p :title="scope.row.phone">{{ scope.row.phone }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="200" :label="$t('user.list.email')" label-class-name="text-neutral-100">
                        <template #default="scope">
                            <p :title="scope.row.email" class="line-clamp-2">{{ scope.row.email }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="200" :label="$t('user.list.created')" label-class-name="text-neutral-100">
                        <template #default="scope">
                            <p :title="scope.row.created_at">{{ scope.row.created_at }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        align="center"
                        :label="$t('user.list.action')"
                        class-name="[&>div]:!whitespace-nowrap"
                    >
                        <template #default="scope">
                            <div class="flex items-center justify-center gap-2">
                                <base-icon name="edit" class="cursor-pointer" @click="handleEdit(scope.row?.id)" />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <base-pagination
                    v-model:current-page="currentPage"
                    v-model:per-page="perPage"
                    :total="total"
                    :is-select-page-size="total > PAGE_SIZE"
                    class="w-full border-t border-gray-200 h-16 [&>div]:!mt-0 grid tablet:block tablet:h-28 [&>div]:tablet:!grid [&>div]:tablet:!grid-col-1 [&>div]:tablet:gap-1 items-center py-4 bg-neutral-0 rounded-b-2xl"
                    @change="getList()"
                />
            </div>

            <div v-else class="h-[440px] bg-neutral-0 rounded-xl w-full relative flex items-center">
                <base-loading :loading="isLoading"></base-loading>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { user } from '@/api/modules/user/index'
import { AccountUserData, FormSearchUser, ListUserResponse } from '@/api/modules/user/types'
import { PAGE_DEFAULT, PAGE_SIZE } from '@/constants'

const router = useRouter()
const isLoading = ref<boolean>(false)
const data = ref<AccountUserData[]>([])
const formSearch = ref<FormSearchUser>({
    keyword: '',
})
const total = ref<number>(0)
const currentPage = ref<number>(PAGE_DEFAULT)
const perPage = ref<number>(PAGE_SIZE)

const clearSearch = () => {
    perPage.value = PAGE_SIZE
    currentPage.value = PAGE_DEFAULT
    formSearch.value = { keyword: '' }
    getList()
}

const handleCreate = async () => {
    router.push({ name: 'user.create' })
}

const handleEdit = async (id) => {
    router.push({ name: 'user.edit', params: { id: id } })
}

const getList = async () => {
    isLoading.value = true

    try {
        const response: ListUserResponse = await user.list({
            page_size: perPage.value,
            page: currentPage.value,
            ...formSearch.value,
        })

        data.value = response.data
        total.value = response.meta?.total ?? 0
    } catch (error) {
        //handle error
    }
    isLoading.value = false
}

onMounted(async () => {
    await getList()
})
</script>
