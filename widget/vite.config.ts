import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
        define: {
            "process.env": env,
        },
        build: {
            copyPublicDir: false,
            minify: false,
            cssMinify: 'esbuild',

            lib: {
                entry: path.resolve('src/widget.element.tsx'),
                name: 'widget',
                fileName: 'widget',
                formats: ["umd"],
            },
            rollupOptions: {},
        },
        plugins: [react({})]
    });
};
