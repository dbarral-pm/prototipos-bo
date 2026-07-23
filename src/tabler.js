import '@tabler/core/dist/css/tabler.min.css'
import { bootstrap } from '@tabler/core/dist/js/tabler.esm.min.js'

// El build ESM de Tabler exporta `bootstrap` como módulo en vez de colgarlo en window
// (a diferencia del build UMD). Los prototipos usan bootstrap.Modal/.Toast desde <script>
// planos (no módulos), así que lo exponemos acá una sola vez.
window.bootstrap = bootstrap
