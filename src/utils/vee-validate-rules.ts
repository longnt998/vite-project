import { configure, defineRule } from 'vee-validate'
import {
    required,
} from '@vee-validate/rules'
import i18n from '@/i18n'

configure({
    generateMessage: (context) => {
        const field = context.field
        const params = context?.rule?.params ?? {}
        const rule = context.rule ?? { name: '' }
        const messages = {
            required: (field) => i18n.global.t('validation.required', { field }),
        }

        return messages[rule.name]?.(field) || i18n.global.t('validation.default', { field })
    },
})
export default () => {
    defineRule('required', required)
}
