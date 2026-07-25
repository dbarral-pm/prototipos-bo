import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/css/tabler-flags.min.css'
import '@tabler/core/dist/libs/litepicker/dist/css/litepicker.css'
import { bootstrap } from '@tabler/core/dist/js/tabler.esm.min.js'
import '@tabler/core/dist/libs/litepicker/dist/litepicker.js'
import '@tabler/core/dist/libs/fslightbox/index.js'

// El build ESM de Tabler exporta `bootstrap` como módulo en vez de colgarlo en window
// (a diferencia del build UMD). Los prototipos usan bootstrap.Modal/.Toast, Litepicker
// y fsLightbox desde <script> planos (no módulos), así que se exponen acá una sola vez.
window.bootstrap = bootstrap
