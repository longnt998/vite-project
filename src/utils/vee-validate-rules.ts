import { configure, defineRule } from 'vee-validate'
import { required, max, email } from '@vee-validate/rules'
import i18n from '@/i18n'

configure({
    generateMessage: (context) => {
        const field = context.field
        const params = context?.rule?.params ?? {}
        const rule = context.rule ?? { name: '' }
        const messages = {
            required: (field) => i18n.global.t('validation.required', { field }),
            max: (field) => i18n.global.t('validation.max', { field, value: Number(params[0]).toLocaleString() }),
            email: (field) => i18n.global.t('validation.email', { field }),
        }

        return messages[rule.name]?.(field) || i18n.global.t('validation.default', { field })
    },
})
export default () => {
    defineRule('required', required)
    defineRule('max', max)
    defineRule('email', email)
}
