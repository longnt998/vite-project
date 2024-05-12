<template>
    <component
        :is="svg"
        :class="[
            `[&>path]:!stroke-${stroke} duration-300`,
            isActiveHover ? `[&>path]:!stroke-white [&>path]:!fill-${fill}` : '',
        ]"
        v-bind="$attrs"
    />
</template>

<script lang="ts">
import * as svg from '@/assets/svg'
export default {
    props: {
        name: {
            type: String,
            default: '',
        },
        stroke: {
            type: String,
            default: 'current',
        },
        fill: {
            type: String,
            default: 'none',
        },
        isActiveHover: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        svg() {
            return svg[this.name]
        },
    },
}
</script>
<style lang="scss" scoped></style>
