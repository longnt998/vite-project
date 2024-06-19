<template>
    <div class="relative">
        <slot name="suffix">
            <div
                v-if="iconLeft && !addonLeft"
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
                <BaseIcon :name="iconLeft" class="text-gray-800 cursor-pointer" />
            </div>
            <div
                v-if="iconLeft && !addonLeft"
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                @click="iconClick"
            >
                <BaseIcon :name="iconLeft" class="text-gray-800 cursor-pointer" />
            </div>
            <div
                v-if="addonLeft && !iconLeft"
                class="absolute text-body-xs text-gray-800 inset-y-1 left-0 flex items-center justify-center px-2.5 rounded-lg addonLeft"
                :class="addonClass"
                @click="iconClick"
            >
                {{ addonLeft }}
            </div>
        </slot>
        <input
            :id="id"
            ref="inputRef"
            :value="modelValue"
            :type="type"
            class="text-neutral-75 h-12 w-full px-4 py-2 rounded-lg border border-gray-75 text-body-xs caret-functional-info-500 placeholder:text-neutral-50 focus:ring-2 focus:ring-offset-0 focus:ring-functional-info-75 focus:border focus-visible:outline-main-primary-500 focus:border-main-primary-500 disabled:text-neutral-50 disabled:bg-gray-75"
            :class="{
                '!border-functional-danger-500 !ring-functional-danger-75': isError(),
                'pl-11 pr-3.5 ': iconLeft,
                'pr-11 pl-3.5': iconRight,
                '!px-11': iconLeft && iconRight,
                '!py-1.5 !pl-8': isSmall,
            }"
            style="outline: none"
            v-bind="attrs"
            @compositionupdate="compositionupdate"
            @input="updateValue"
        />
        <slot name="suffix">
            <div
                v-if="iconRight && !addonRight"
                class="absolute right-0 inset-y-1 flex items-center pl-3 pr-4"
                @click="iconClick"
            >
                <BaseIcon :name="iconRight" class="text-gray-800 cursor-pointer" />
            </div>
            <div
                v-if="addonRight && !iconRight"
                :class="addonClass"
                class="absolute text-gray-800 inset-y-1 right-1 flex items-center justify-center px-4 rounded-lg addonRight"
                @click="iconClick"
            >
                {{ addonRight }}
            </div>
        </slot>
    </div>
    <base-helper-text
        v-show="isError()"
        color="error"
        :value="errorField.value ?? props.error"
        :class="customClassHelperText"
        icon="warning"
    ></base-helper-text>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { useAttrs } from 'vue'
import { MAX_TEXT_INPUT } from '@/constants'

const props = defineProps({
    id: {
        type: String,
        default: '',
    },
    delay: {
        type: Number,
        default: null,
    },
    modelValue: {
        type: null as never,
        default: null,
    },
    type: {
        type: String,
        default: 'text',
    },
    iconRight: {
        type: String,
        default: '',
    },
    addonLeft: {
        type: String,
        default: '',
    },
    addonRight: {
        type: String,
        default: '',
    },
    iconLeft: {
        type: String,
        default: '',
    },
    addonClass: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    isSmall: {
        type: Boolean,
        default: false,
    },
    rules: {
        type: [String, Array],
        default: '',
    },
    fieldName: {
        type: String,
        default: '',
    },
    customClassHelperText: {
        type: String,
        default: '',
    },
    isFocus: {
        type: Boolean,
        default: false,
    },
})

const inputRef = ref<HTMLElement | null>(null)

onUpdated(() => {
    valueField.value = props?.modelValue ?? undefined

    if (props.isFocus) {
        nextTick(() => {
            inputRef.value?.focus()
        })
    }
})

const rule = ref(props.rules)
onMounted(() => {
    valueField.value = props?.modelValue ?? undefined
    if (props.rules === '') {
        rule.value = 'max:' + MAX_TEXT_INPUT
    }

    if (!props.rules?.includes('max:') && props.rules !== '') {
        rule.value = `${props.rules}|max:` + MAX_TEXT_INPUT
    }
})

const attrs = useAttrs()

const { value: valueField, errorMessage } = useField(
    props.fieldName !== '' ? props.fieldName : (attrs.placeholder as string),
    rule
)
// Use a single field to display the error message.
// If two fields are used, there is a possibility of duplication when both props.error and errorMessage have values.
const errorField = reactive({
    value: errorMessage.value,
})

watch(errorMessage, (after) => {
    if (props.rules !== '') {
        errorField.value = after
    }
})

const emits = defineEmits(['update:modelValue', 'iconClick', 'input', 'handleChange'])
watch(valueField, (newValue) => {
    valueField.value = newValue
})

const updateValue = (event) => {
    emits('update:modelValue', event.target.value)
    valueField.value = event.target.value
    emits('handleChange')
}

const iconClick = () => {
    emits('iconClick')
}

const compositionupdate = () => {
    emits('input')
}

const isError = () => {
    return !!errorField.value || props.error
}
</script>

<style scoped>
/* Removing input background colour for Chrome autocomplete */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}
</style>
