import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        reintegrosFormularioWeb: resolve(root, 'bo_reintegros_formulario_web_prototipo_2.html'),
      },
    },
  },
})
