import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginEslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), vitePluginEslint(), tailwindcss()],
    base: '/instructor/',
    server: {
        port: 5174,
        host: true,
    },
});