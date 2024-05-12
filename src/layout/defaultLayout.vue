<template>
    <div class="w-full h-screen flex flex-col">
        <base-spinner></base-spinner>
        <DefaultHeader :is-open="isOpen" @toggle="toggleMenu" />
        <div class="flex h-full justify-start bg-main-primary-900 pt-[50px]">
            <div class="overflow-auto" :class="'w-full'">
                <div class="min-h-[calc(100vh-100px)] sp:min-h-[calc(100vh-130px)]">
                    <router-view />
                </div>
                <default-footer />
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'DefaultLayout',
    data() {
        return {
            isOpen: false,
        }
    },
    created() {
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen
        },
    },
}
</script>
<style>
.el-table__empty-text {
    font-size: 14px;
}

th.el-table__cell {
    font-size: 16px;
    color: #1b1b1b;
    font-weight: 500;
}

td.el-table__cell {
    font-size: 14px;
    color: #1b1b1b;
}

.el-select-dropdown__item {
    color: #1b1b1b !important;
}

.el-select-dropdown__item.selected {
    color: #409eff !important;
    font-weight: 700;
}

.el-select-dropdown__option-item {
    color: #1b1b1b !important;
}

.el-select-dropdown__option-item.is-selected {
    color: #409eff !important;
    font-weight: 700;
}
</style>
