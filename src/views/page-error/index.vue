<template>
    <div v-if="isShow" class="flex flex-col justify-center items-center h-[100vh]">
        <span class="text-base font-medium mt-4 mb-9">Page error</span>
        <router-link :to="{ name: 'login' }" @click="redirectReload">
            <base-button
                class="py-2 text-body-xs h-10 bg-sky-600 text-white rounded-lg flex justify-center items-center"
            >
                <base-icon name="md_left_icon"></base-icon>

                <span class="ml-2 text-sm font-medium"> go back</span>
            </base-button>
        </router-link>
    </div>
</template>
<script setup lang="ts">
const isShow = ref(true)
const router = useRouter()

const redirectReload = async () => {
    const resolvedRoute = router.resolve({ name: 'login' })
    const url = new URL(resolvedRoute.href, window.location.origin)
    window.location.href = url.toString()
}

</script>
