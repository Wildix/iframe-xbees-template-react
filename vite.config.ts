import {defineConfig, loadEnv} from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    return ({
        build: {
            outDir: 'build'
        },
        base: './',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            }
        },
        plugins: [react()],
        define: {
            APP_VERSION: JSON.stringify(env.npm_package_version),
            APP_NAME: JSON.stringify(env.npm_package_name),
        },
    });
})
