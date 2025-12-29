import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig, type PluginOption } from 'vite';
import { vtjumpReact19, vtjumpReact19Babel } from './resources/js/vtjump/react19';

export default defineConfig(({ command }) => {
    const isDev = command === 'serve';
    const plugins: PluginOption[] = [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler', ...(isDev ? [vtjumpReact19Babel] : [])],
            },
        }),
        tailwindcss(),
        ...(isDev ? [vtjumpReact19()] : []),
        wayfinder({
            formVariants: true,
        }),
    ];

    return {
        plugins,
        esbuild: {
            jsx: 'automatic',
        },
    };
});
