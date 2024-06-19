<template>
    <p
        class="whitespace-pre-line custom_text"
        :class="[theme.spacing, theme.colors[color], theme.sizes, theme.withIcon[icon ? 'on' : 'off']]"
    >
        <slot v-if="icon" name="icon">
            <base-icon :name="`${icon}_${color}`" class="min-w-[14px]" />
        </slot>

        <slot v-if="!value" />

        <span v-else>{{ value }}</span>
    </p>
</template>

<script setup lang="ts">
defineProps({
    color: {
        type: String,
        values: ['default', 'success', 'error', 'disabled'],
        default: 'default',
    },
    value: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: 'warning',
    },
})

const theme = computed(() => {
    const styles = {
        spacing: 'mt-1',
        colors: {
            default: 'text-gray-800',
            success: 'text-functional-success-500',
            error: 'text-functional-danger-500',
            disabled: 'text-neutral-50',
        },
        sizes: 'text-body-xs',
        withIcon: {
            on: 'flex items-center gap-1',
            off: '',
        },
    }
    return styles
})
</script>
