import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'build'
    },
    base: './',
    plugins: [react()],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      APP_NAME: JSON.stringify(process.env.npm_package_name),
    },
})
