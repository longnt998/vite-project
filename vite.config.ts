import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from 'tailwindcss'
import { resolve } from 'path'
import inheritAttrs from 'vite-plugin-vue-setup-inherit-attrs'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 8080,
        // hmr: false,
    },
    plugins: [
        vue(),
        inheritAttrs(),
        svgLoader(),
        AutoImport({
            dts: './src/auto-imports.d.ts',
            imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', 'vuex'],

            eslintrc: {
                enabled: false,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            dts: './src/components.d.ts',
            extensions: ['vue', 'md'],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            dirs: ['src/components/'],
            resolvers: [ElementPlusResolver()],
        }),
    ],
    build: {
        assetsDir: 'static/assets',
        chunkSizeWarningLimit: 1600,
    },
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
})
