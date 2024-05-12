<template>
    <div class="fixed w-full h-[50px] z-50 px-5 sp:px-3 flex justify-between items-center bg-white shadow-e2">
        <div class="flex items-center gap-4">
            <base-icon name="menu" class="cursor-pointer" @click="toggleMenu" />
        </div>
        Header
        <div class="rounded-full w-[32px] h-[32px]">
            <img :src="userInfo?.user_profile?.avatar_url ?? avatar_default" alt="" :title="userInfo?.name ?? null"
                class="rounded-full w-full h-full" />
        </div>
    </div>
</template>

<script>
import avatar_default from '@/assets/img/avatar_default.png'
export default {
    name: 'DefaultHeader',
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['toggle'],
    data() {
        return {
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.auth.user
        },
    },
    methods: {
        toggleMenu() {
            this.$emit('toggle')
        },
    },
}
</script>