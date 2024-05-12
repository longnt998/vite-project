module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
        browser: true,
    },
    globals: {
        defineEmits: true,
        document: true,
        localStorage: true,
        GLOBAL_VAR: true,
        window: true,
        defineProps: true,
        defineExpose: true,
        withDefaults: true,
    },
    extends: [
        './.eslintrc-auto-import.json',
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint', 'import'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'warn',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'max-len': [
            'warn',
            {
                code: 120,
            },
        ],
        'no-empty-function': 'warn',
        '@typescript-eslint/ban-ts-comment': ['warn'],
    },
}
