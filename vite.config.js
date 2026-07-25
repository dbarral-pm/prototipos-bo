import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ command }) => ({
  appType: 'mpa',
  // GitHub Pages sirve este proyecto bajo /prototipos-bo/ (no en la raíz del dominio).
  // Solo aplica al build de producción — `npm run dev` sigue sirviendo en la raíz local.
  base: command === 'build' ? '/prototipos-bo/' : '/',
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        reintegrosFormularioWeb: resolve(root, 'bo_reintegros_formulario_web_prototipo_2.html'),
        reintegrosSolicitudes: resolve(root, 'bo_reintegros_solicitudes_prototipo_1.html'),
        reintegrosSolicitudDetalle: resolve(root, 'bo_reintegros_solicitud_detalle_prototipo_1.html'),
      },
    },
  },
}))
