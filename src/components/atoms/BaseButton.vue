<template>
    <component :is="tag" ref="buttonRef" :class="buttonClass" :type="type" @click="click">
        <div v-if="$slots.prefix" :class="spaceBetweenClass.prefix">
            <slot name="prefix"></slot>
        </div>
        <slot>Button</slot>
        <div v-if="$slots.suffix" :class="spaceBetweenClass.suffix">
            <slot name="suffix"></slot>
        </div>
    </component>
</template>

<script setup lang="ts">
const slots = useSlots()
const emits = defineEmits(['click'])
const buttonRef = ref<HTMLElement | null>(null)

const props = defineProps({
    isShowLoading: { type: Boolean, default: false },
    tag: { type: String, default: 'button' },
    primary: { type: Boolean, default: false },
    secondary: { type: Boolean, default: false },
    tertiary: { type: Boolean, default: false },
    quaternary: { type: Boolean, default: false },
    status: {
        type: String,
        values: ['info', 'success', 'warning', 'danger'],
        default: 'info',
    },
    size: { type: String, default: 'md' },
    square: { type: Boolean, default: false },
    interactable: { type: Boolean, default: true },
    type: {
        type: String,
        values: ['button', 'submit', 'reset'],
        default: 'button',
    },
})

const styles = {
    common: 'rounded-lg disabled:cursor-not-allowed focus:ring-offset-0 focus:ring-2 active:ring-2 box-border flex justify-center items-center disabled:bg-gray-75 disabled:text-neutral-50',
    colors: {
        primary: {
            default: 'text-neutral-0',
        },
        secondary: {
            default: 'border',
        },
        tertiary: {
            default: 'border border-gray-75 bg-neutral-0 disabled:bg-neutral-0 active:!ring-0 focus:!ring-0 ',
        },
        quaternary: {
            default: 'border-none bg-neutral-0 disabled:bg-neutral-0',
        },
    },
    sizes: {
        xs: 'h-6 px-1 text-body-xxs',
        sm: 'h-8 px-2 text-body-xs',
        md: 'h-10 px-2 text-body-xs',
        lg: 'h-12 px-3 text-body-m',
        xl: 'h-14 px-4 text-body-l',
    },
    square: {
        xs: 'aspect-square !p-[6px]',
        sm: 'aspect-square !p-[9px]',
        md: 'aspect-square !p-[11px]',
        lg: 'aspect-square !p-[14px]',
        xl: 'aspect-square !p-4',
    },
    paddingX: {
        xs: {
            prefix: 'pl-2',
            suffix: 'pr-2',
        },
        sm: {
            prefix: 'pl-[10px]',
            suffix: 'pr-[10px]',
        },
        md: {
            prefix: 'pl-3',
            suffix: 'pr-3',
        },
        lg: {
            prefix: 'pl-4',
            suffix: 'pr-4',
        },
        xl: {
            prefix: 'pl-4',
            suffix: 'pr-4',
        },
    },
    spaceBetween: {
        xs: {
            prefix: 'mr-1',
            suffix: 'ml-1',
        },
        sm: {
            prefix: 'mr-[6px]',
            suffix: 'ml-[6px]',
        },
        md: {
            prefix: 'mr-2',
            suffix: 'ml-2',
        },
        lg: {
            prefix: 'mr-[10px]',
            suffix: 'ml-[10px]',
        },
        xl: {
            prefix: 'mr-3',
            suffix: 'ml-3',
        },
    },
}

const color = () => {
    if (props.quaternary) return 'quaternary'
    if (props.tertiary) return 'tertiary'
    if (props.secondary) return 'secondary'
    else return 'primary'
}

const buttonClass = computed(() => {
    return [
        styles.common,
        styles.sizes[props.size],
        styles.colors[color()].default,
        styles.colors[color()][props.status],
        props.square && styles.square[props.size],
        slots.prefix && styles.paddingX[props.size]?.prefix,
        slots.suffix && styles.paddingX[props.size]?.suffix,
        !props.interactable && 'pointer-events-none',
    ]
})

const spaceBetweenClass = computed(() => {
    return styles.spaceBetween[props.size]
})

const click = (event) => {
    if (buttonRef.value) {
        buttonRef.value.blur()
    }

    emits('click', event)
}
</script>
