import { resolve } from 'path'
import { defineConfig } from "vite";

import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MnkiStorage',
            fileName: 'mnki-storage',
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            output: {
                exports: 'named'
            }
        },
    },
    plugins: [
        dts({
          insertTypesEntry: true,
           rollupTypes: true, 
          // Otros ajustes opcionales
        })
      ],
    test: {
        environment: 'jsdom',
    }
})