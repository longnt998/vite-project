import { configure, defineRule } from 'vee-validate'
import {
    confirmed,
    email,
    max_value,
    min_value,
    numeric,
    required,
    max,
    min,
    size,
    url,
    integer,
    length,
} from '@vee-validate/rules'
import i18n from '@/i18n'
import { isFullwidth } from './string'
import { customMessages, customRules } from './extended-validate'
import { isFullWidth } from './convertNumber'
import { arrayChildMaxLength, arrayHasNull } from './helper'

configure({
    generateMessage: (context) => {
        const field = context.field
        const params = context?.rule?.params ?? {}
        const rule = context.rule ?? { name: '' }
        const messages = {
            required: (field) => i18n.global.t('validation.required', { field }),
            required_children: (field) => i18n.global.t('validation.required_children', { field }),
            required_select: (field) => i18n.global.t('validation.required_select', { field }),
            required_select_multiple: (field) => i18n.global.t('validation.required_select', { field }),
            email: (field) => i18n.global.t('validation.email', { field }),
            min_value: (field) => i18n.global.t('validation.min_value', { field, value: params[0] }),
            max_value: (field) => i18n.global.t('validation.max_value', { field, value: params[0] }),
            numeric: (field) => i18n.global.t('validation.numeric', { field }),
            amount: (field) => i18n.global.t('validation.numeric', { field }),
            max: (field) => i18n.global.t('validation.max', { field, value: Number(params[0]).toLocaleString() }),
            max_value_format: (field) => i18n.global.t('validation.max_value_format', { field }),
            max_children: (field) =>
                i18n.global.t('validation.max_children', { field, value: Number(params[0]).toLocaleString() }),
            confirmed: () => i18n.global.t('validation.confirmed'),
            full_size_password: () => i18n.global.t('validation.full_size_password', { field }),
            check_space: () => i18n.global.t('validation.check_space', { field }),
            check_space_category: () => i18n.global.t('validation.check_space_category', { field }),
            between_length: (field) => {
                const [from, to] = (context?.rule?.params as unknown[]) ?? []

                return i18n.global.t('validation.between_length', { field, from, to })
            },
            between_length_phone: (field) => {
                const [from, to] = (context?.rule?.params as unknown[]) ?? []

                return i18n.global.t('validation.between_length_phone', { field, from, to })
            },
            min: (field) => i18n.global.t('validation.min', { field, value: params[0] }),
            size: (field) => i18n.global.t('validation.size', { field, value: params[0] }),
            integer: (field) => i18n.global.t('validation.integer', { field, value: params[0] }),
            length: (field) => i18n.global.t('validation.length', { field, value: params[0] }),
            max_value_number: (field) => i18n.global.t('validation.max_value_number', { field, value: params[0] }),
            min_value_number: (field) => i18n.global.t('validation.min_value_number', { field, value: params[0] }),
            regex_password: (field) => i18n.global.t('validation.regex', { field }),
            only_furigana_text: (field) =>
                i18n.global.t('enger_validation.only_furigana_text', { field, value: params[0] }),
            is_phone_number: (field) => i18n.global.t('validation.numeric', { field }),
            select_option: (field) => i18n.global.t('validation.select_option', { field }),
            valid_password: () => i18n.global.t('validation.valid_password'),
            url: () => i18n.global.t('validation.url', { field }),
            min_password: () => i18n.global.t('validation.min_max_password'),
            max_password: () => i18n.global.t('validation.min_max_password'),
            max_password_member: () => i18n.global.t('validation.max_min_password_member'),
            min_password_member: () => i18n.global.t('validation.max_min_password_member'),
            zero: (field) => i18n.global.t('validation.zero', { field }),
            ...customMessages,
        }

        return messages[rule.name]?.(field) || i18n.global.t('validation.default', { field })
    },
})
export default () => {
    customRules()
    defineRule('url', url)
    defineRule('required', required)
    defineRule('required_children', (value) => {
        if (value && value.length) {
            return !arrayHasNull(value)
        }

        return true
    })
    defineRule('required_select', required)
    defineRule('required_select_multiple', (value) => {
        if (Array.isArray(value) && value.length === 0) return false
        if (value === undefined) return true
        return true
    })
    defineRule('email', email)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('numeric', numeric)
    defineRule('min', min)
    defineRule('confirmed', confirmed)
    defineRule('max', max)
    defineRule('max_children', (value, [length]) => {
        if (value && value.length) {
            return !arrayChildMaxLength(value, length)
        }

        return true
    })
    defineRule('between_length', (field, [from, to]) => from <= field.length && field.length <= to)
    defineRule('min', min)
    defineRule('size', size)
    defineRule('integer', integer)
    defineRule('length', (value, [length]) => {
        if (value && value?.length !== Number(length)) return false
        return true
    })
    defineRule('fullsize', (value) => {
        return isFullwidth(value)
    })
    defineRule('full_size_password', (value) => {
        if (value) {
            return !isFullWidth(value)
        }

        return true
    })
    defineRule('check_space', (value: string) => {
        const spaceRegex = /^[^\s]*$/
        return spaceRegex.test(value)
    })
    defineRule('check_space_category', (value: string) => {
        const spaceRegex = /^[^\s]*$/
        return spaceRegex.test(value)
    })
    defineRule('fullsize_katakana', (value) => {
        return /^([ァ-ン]|ー)+$/.test(value)
    })
    defineRule('max_value_number', (value, [max]) => {
        const newValue = String(value).replaceAll(',', '')
        return newValue.length <= Number(max)
    })
    defineRule('min_value_number', (value, [min]) => {
        const newValue = String(value).replaceAll(',', '')
        return Number(newValue) >= Number(min)
    })
    defineRule('regex_password', (value: string) => {
        const regexPattern = /^[^\s\u3000\uFF01-\uFF5E\u4E00-\u9FFF\u0080-\uFFFF]*$/

        return regexPattern.test(value)
    })

    //enger
    defineRule('only_furigana_text', (value) => {
        if (value) {
            const furiganaRegex = /^[\u3040-\u309F\u30A0-\u30FFー　\s]+$/

            return furiganaRegex.test(value)
        }
        return true
    })
    defineRule('is_phone_number', (value) => {
        if (value) {
            const phoneNumber = /^[0-9-]+$/

            return phoneNumber.test(value)
        }
        return true
    })
    defineRule('between_length_phone', (value, [from, to]) => {
        const newValue = value.replaceAll('-', '')

        return from <= newValue.length && newValue.length <= to
    })
    defineRule('max_phone', (value, [max]) => {
        const newValue = value.replaceAll('-', '')
        return newValue.length <= max
    })
    defineRule('min_phone', (value, [min]) => {
        const newValue = value.replaceAll('-', '')
        return newValue.length >= min
    })
    defineRule('required_select', (value) => {
        return value?.toString().length > 0
    })
    defineRule('valid_password', (value) => {
        if (value) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

            return passwordRegex.test(value)
        }
        return true
    })

    defineRule('url', (value) => {
        if (value) {
            // eslint-disable-next-line no-control-regex
            const nonAsciiPattern = /[^\x00-\x7F]/

            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

            return !nonAsciiPattern.test(value) && urlRegex.test(value)
        }
        return true
    })

    defineRule('min_password', min)
    defineRule('max_password', max)
    defineRule('max_password_member', max)
    defineRule('min_password_member', min)
    defineRule('amount', (value: string) => {
        if (value) {
            const amount = /^[0-9,]+$/

            return amount.test(value)
        }
        return true
    })
    defineRule('max_value_format', max)
    defineRule('zero', (value) => {
        const amount = /^[0-9,]+$/
        if (value) {
            if (value <= 0 || !amount.test(value) || (typeof value === 'string' && value.startsWith('0'))) {
                return false
            }
        }

        return true
    })
}
