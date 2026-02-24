import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.js',
            formats: ['es'],
            fileName: () => '[name].js',
        },
        rollupOptions: {
            external: ['electron', 'path', 'node:path', 'node:url'],
        },
    },
});
