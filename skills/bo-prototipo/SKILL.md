---
name: bo-prototipo
description: Crea prototipos de pantallas del BO (backoffice) de ASSIST 365 dentro del proyecto Vite del workspace, usando Tabler UI real (paquete npm @tabler/core) en vez de CSS custom. Usar SIEMPRE que Denu pida un prototipo, mockup, maqueta o pantalla del BO. También activar con frases como "haceme el proto del BO", "armame la pantalla del backoffice", "quiero ver cómo quedaría en el BO", "haceme el HTML del BO", "simulá la pantalla de...", o cualquier variante que implique construir una interfaz de admin para el BO de ASSIST 365.
---

# Skill: Prototipo BO — ASSIST 365

## Principio rector: Tabler nativo primero, custom solo como último recurso

El BO real usa **Tabler UI**, un admin template construido sobre Bootstrap 5 (MIT license, https://tabler.io). Los prototipos deben usar los **componentes, clases y comportamientos reales de Tabler** — no una recreación a mano que se le parezca. La fidelidad no es solo visual (colores, tipografía, íconos): también son los componentes y su comportamiento (modales, dropdowns, validación de formularios, toasts, etc.).

**Regla de prioridad para cada pieza de UI que haya que construir:**
1. **¿Tabler tiene un componente/patrón para esto?** Usalo tal cual, con sus clases reales (ver referencia de componentes más abajo). No inventes una clase `.bo-algo` si Tabler ya tiene `.algo`.
2. **¿Tabler no lo resuelve, o lo resuelve pero la UX se queda corta para lo que necesita el usuario del BO?** Entonces sí, construí algo custom — pero con la misma atención y calidad que le pondrías a cualquier otra parte: la prioridad siempre es la experiencia del usuario, no la pureza del framework. Si hay que picar código a mano para que la interacción sea la correcta, se hace sin culpa.
3. **Cuando construyas algo custom**, marcalo explícitamente con un comentario HTML justo arriba del bloque: `<!-- CUSTOM: [por qué Tabler no lo resuelve] -->`. Esto le permite a cualquiera que lea el archivo (vos, un dev, otro Claude) distinguir de un vistazo qué es Tabler puro y qué fue una decisión de diseño deliberada.

> ⚠️ **Fidelidad honesta:** el prototipo es una guía funcional acelerada producida con IA. El BO real en producción siempre tiene precedencia sobre cualquier detalle del prototipo.

### Qué SÍ suele resolver Tabler nativamente (evitar reinventar)

| Necesidad | Componente nativo de Tabler |
|---|---|
| Selección múltiple con aspecto de chips/tags | `.form-selectgroup` con `<input type="checkbox">` (no un chip-picker custom) |
| Selección única con aspecto de tarjeta/radio | `.form-selectgroup` con `<input type="radio">` |
| Modal de confirmación o formulario | `.modal` + `.modal-dialog` + Bootstrap JS (`data-bs-toggle="modal"`) |
| Notificación tipo "guardado correctamente" | `.toast` + Bootstrap JS (`bootstrap.Toast`), no un div flotante hecho a mano |
| Menú de acciones por fila (editar/eliminar) | `.dropdown` + `.dropdown-menu` + `.dropdown-item` |
| Banner informativo o de advertencia | `.alert.alert-info` / `.alert.alert-warning` con `.alert-icon` |
| Estado vacío de una lista/tabla | `.empty` + `.empty-img` + `.empty-title` + `.empty-subtitle` + `.empty-action` |
| Subida de un archivo simple | `<input type="file" class="form-control">` (validaciones de negocio van en JS propio, eso es lógica de producto, no UI) |
| Avatar / ícono circular | `.avatar`, `.avatar-sm`, `.avatar-xl`, etc. |
| Badge de estado | `.badge`, `.bg-{color}-lt` (variante suave) |

### Qué probablemente SÍ requiera algo custom (y está bien que lo sea)

Ejemplos ya identificados en features anteriores — quedan permitidos porque Tabler no tiene un componente de fondo para esto, pero SIEMPRE marcados con el comentario `<!-- CUSTOM: ... -->`:
- Validación específica de negocio (tamaño/formato/dimensiones de un ícono .svg) — es lógica, no componente, así que ni siquiera cuenta como "custom UI", pero el feedback visual de error debe usar `.is-invalid` / `.invalid-feedback` nativos de Tabler, no clases propias.
- Un layout de tarjetas con contador de vínculos (ej: "esta categoría incluye 5 subcategorías") — Tabler tiene `.card` y `.chip`/`.badge`, pero la combinación específica de card + chips vinculados es nuestra.
- **El sidebar de navegación de un módulo** (ver sección dedicada más abajo) — Tabler no tiene un patrón nativo de árbol de dos niveles con secciones expandibles y items "próximamente" deshabilitados. Este es un caso especial: dejó de ser una decisión libre por prototipo y pasó a ser **un patrón único y obligatorio para todo el BO** (ver más abajo) — así se garantiza consistencia visual entre módulos distintos (ej: Reintegros y Contenido Ecommerce comparten el mismo sidebar).

---

## Setup del proyecto (Vite + dependencia real de Tabler)

Los prototipos viven dentro de un proyecto Vite (no son archivos HTML sueltos ni se empaquetan en zip). Structure real del repo:

```
package.json          → declara @tabler/core como dependency (no devDependency: se usa en runtime del prototipo)
vite.config.js
src/tabler.js         → único entrypoint que importa Tabler:
                           import '@tabler/core/dist/css/tabler.min.css'
                           import '@tabler/core/dist/js/tabler.esm.min.js'
index.html             → índice con links a todos los prototipos
bo_[feature]_prototipo_[N].html
```

**Si `@tabler/core` no está instalado todavía en el proyecto:**
```bash
npm install @tabler/core
```

**Cada prototipo HTML** referencia el entrypoint compartido en el `<head>`:
```html
<script type="module" src="/src/tabler.js"></script>
```
Vite resuelve el import de `node_modules` tanto en `npm run dev` como en `npm run build` — no hace falta copiar ni versionar el CSS/JS de Tabler a mano.

### Íconos y tipografía: vía CDN, no vía npm (decisión intencional)

- **Tabler Icons (webfont):** vía CDN (`https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css`). El paquete npm equivalente (`@tabler/icons-webfont`) existe, pero trae ~200 paquetes de toolchain de generación de fuentes que no se necesitan en runtime (los archivos ya vienen compilados). El resultado visual es idéntico — es la misma fuente oficial — así que se prioriza un `node_modules` liviano.
- **Inter (Google Fonts):** vía CDN, igual que en cualquier proyecto web — Tabler también usa Inter como fuente por defecto.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
```

**Logo oficial ASSIST 365:**
```
https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg
```
Usar siempre en el navbar (ver estructura del navbar más abajo — reemplaza el logo SVG inline de Tabler).

**Documentación de referencia Tabler UI:**
- Componentes (demo en vivo, HTML real para copiar): https://preview.tabler.io/ — ej. `cards.html`, `modals.html`, `form-elements.html`, `tables.html`, `dropdowns.html`, `badges.html`, `buttons.html`, `alerts.html`, `toasts.html`, `settings.html` (para el patrón de sub-navegación en columna)
- Docs: https://tabler.io/docs
- Preview general: https://tabler.io/admin-template/preview

> Cuando vayas a construir un componente que no esté ya cubierto en este archivo, **andá primero a `preview.tabler.io`** y copiá el HTML real de la página de demo correspondiente, en vez de recordarlo/aproximarlo de memoria. Es la fuente de verdad.

---

## Paso a paso

### 1. Clarificar el prototipo con Denu

Antes de codear, usar `AskUserQuestion` para confirmar:
- ¿Qué pantalla/módulo del BO se quiere prototipar?
- ¿Cuál es el flujo principal (CRUD, wizard, dashboard, modal, etc.)?
- ¿Hay un PRD o issue de Jira de referencia?
- ¿Hay diseños en Figma? (si los hay, usar `get_design_context` para incorporarlos)

> Si Denu ya lo explicó en el mensaje, no preguntar lo obvio — arrancar directamente.

### 2. Construir el HTML

Cada prototipo es un archivo `.html` dentro del proyecto Vite (no autocontenido — depende de `src/tabler.js` y de los CDNs de fuente/íconos). Seguir la estructura base documentada más abajo, priorizando siempre componentes reales de Tabler por sobre CSS propio.

### 3. Guardar y probar

Guardar el archivo en la raíz del proyecto con nombre descriptivo:
```
bo_[nombre-feature]_prototipo_[N].html
```
Ejemplo: `bo_bonus_venta_prototipo_1.html`

Agregar un link al nuevo prototipo en `index.html` (el índice de navegación del proyecto).

Correr `npm run dev` y verificar en el navegador que carga bien, que los modales/dropdowns/toasts responden, y que no hay errores de consola.

---

## Estructura base del HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Nombre del módulo] — BO ASSIST 365</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
<script type="module" src="/src/tabler.js"></script>
</head>
<body>
<div class="page-wrapper">

  <!-- NAVBAR (horizontal — así es la nav real del BO) -->
  <header class="navbar navbar-expand-md d-print-none">
    <div class="container-xl">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <a href="."><img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg" height="28" alt="ASSIST 365"></a>
      </h1>
      <div class="navbar-nav flex-row order-md-last">
        <div class="nav-item dropdown">
          <a href="#" class="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown" aria-label="Open user menu">
            <span class="avatar avatar-sm">DB</span>
            <div class="d-none d-xl-block ps-2">
              <div>Denu Barral</div>
              <div class="mt-1 small text-secondary">Producto</div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <a href="#" class="dropdown-item">Perfil</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">Cerrar sesión</a>
          </div>
        </div>
      </div>
    </div>
  </header>
  <header class="navbar-expand-md">
    <div class="collapse navbar-collapse" id="navbar-menu">
      <div class="navbar">
        <div class="container-xl">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="#"><span class="nav-link-title">Dashboard</span></a></li>
            <li class="nav-item"><a class="nav-link" href="#"><span class="nav-link-title">Vouchers</span></a></li>
            <!-- Marcar "active" el módulo que se está prototipando -->
            <li class="nav-item active"><a class="nav-link" href="#"><span class="nav-link-title">[Módulo activo]</span></a></li>
            <li class="nav-item"><a class="nav-link" href="#"><span class="nav-link-title">Configuración</span></a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>

  <!-- PAGE BODY -->
  <div class="page-body">
    <div class="container-xl">

      <!-- PAGE HEADER -->
      <div class="page-header d-print-none">
        <div class="row align-items-center">
          <div class="col">
            <div class="page-pretitle">[Sección / Módulo]</div>
            <h2 class="page-title">[Título de la pantalla]</h2>
          </div>
          <div class="col-auto ms-auto d-print-none">
            <div class="btn-list">
              <button class="btn btn-primary"><i class="ti ti-plus"></i>[CTA principal]</button>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTENIDO PRINCIPAL -->
      <!-- Agregar cards, tablas, forms según la pantalla, priorizando componentes reales de Tabler -->

    </div>
  </div>
</div>

<!-- MODALES (agregar según los que necesite la pantalla) -->
<!-- TOASTS -->
<div class="toast-container position-fixed bottom-0 end-0 p-3"></div>

</body>
</html>
```

---

## Patrones de componentes frecuentes (markup real, verificado contra preview.tabler.io)

### Sidebar de módulo (patrón único y obligatorio — CUSTOM, ver justificación arriba)

> **Usar SIEMPRE que un módulo tenga más de una pantalla/sub-sección** (ej: Reintegros con "Formulario web de reintegros" + "Solicitudes de reintegros"; Contenido Ecommerce con "Home" y sus componentes). Este es EL sidebar del BO — no inventar una variante nueva por módulo, ni volver al patrón viejo de `list-group` dentro de una `card` (deprecado: rompía la consistencia visual entre módulos). Nació en el módulo "Contenido Ecommerce" y se adoptó también en "Reintegros" para unificar.

**Regla de estructura:** cada módulo tiene UN sidebar con dos niveles posibles:
- **Ítems padre** (`.cms-parent`): un destino de primer nivel. Puede ser expandible (tiene hijos) o una acción directa (sin hijos, ej. "Historial de cambios", "Solicitudes de reintegros").
- **Ítems hijo** (`.cms-child`): sub-secciones de un padre expandible, siempre anidadas dentro de un `.collapse` justo debajo de su padre.
- **Ítems deshabilitados** (`.cms-parent-disabled` + `<span class="badge bg-secondary-lt ms-auto">Pronto</span>`): secciones futuras, no clickeables.

**Si el módulo vive en varias páginas HTML distintas** (no todo cabe como secciones de una sola página): cada página es un destino de primer nivel del sidebar. En la página donde estás parado, ese ítem se muestra expandido con sus hijos reales (si los tiene) funcionando con `showSection()` dentro de esa misma página. En las demás páginas del módulo, ese mismo ítem se muestra como un link directo sin chevron ni `data-bs-toggle="collapse"` (no tiene sentido mostrar la promesa de expandir algo que no existe en el DOM de esa página) — ver los 3 archivos de Reintegros como referencia real de esto.

**CSS (agregar tal cual, sin modificar valores):**
```css
.cms-sidebar { width: 240px; flex-shrink: 0; border-right: 1px solid #e6e8eb; min-height: calc(100vh - 56px); padding: .75rem 0; }
.cms-section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; padding: .5rem 1rem .25rem; }
.cms-parent { display: flex; align-items: center; gap: .5rem; padding: .45rem .9rem; font-size: 13px; font-weight: 500; cursor: pointer; user-select: none; border-radius: 4px; margin: 0 .5rem; text-decoration: none; color: inherit; }
.cms-parent:hover, .cms-parent:focus { background: #f5f7fb; text-decoration: none !important; }
.cms-parent.active { color: #206bc4; }
.cms-parent .chev { margin-left: auto; transition: transform .18s; }
.cms-parent[aria-expanded="true"] .chev { transform: rotate(90deg); }
.cms-parent-disabled { opacity: .55; cursor: not-allowed; pointer-events: none; }
.cms-child { display: flex; align-items: center; gap: .45rem; padding: .4rem .8rem .4rem 2rem; font-size: 13px; text-decoration: none; color: inherit; border-left: 2px solid transparent; border-radius: 0 4px 4px 0; margin-right: .5rem; }
.cms-child:hover, .cms-child:focus { background: #f5f7fb; text-decoration: none !important; }
.cms-child.active { border-left-color: currentColor; }
.cms-content { flex: 1; min-width: 0; padding: 1.5rem; }
.cms-section { display: none; max-width: 960px; }
.cms-section.active { display: block; }

/* Aire entre breadcrumb/título y el resto — el CSS de Tabler se inyecta después
   (vía el módulo JS) y pisa reglas de igual especificidad definidas antes en el documento. */
.cms-content .page-pretitle { margin-bottom: .5rem !important; }
.cms-content .page-header { margin-bottom: 1.75rem !important; }
```

**Layout exterior** (reemplaza el `page-body > container-xl` tradicional — el sidebar y el contenido ocupan todo el ancho del viewport, sin `container-xl` ni `card` envolvente):
```html
<div class="page-body" style="margin:0;padding:0">
  <div class="d-flex align-items-start" style="min-height:calc(100vh - 56px)">

    <aside class="cms-sidebar">
      <div class="cms-section-label text-secondary">[Nombre del módulo]</div>

      <!-- Padre expandible con hijos (usar en la página donde estos hijos existen) -->
      <a href="#" class="cms-parent text-primary" id="nav-[padre]-parent" data-bs-toggle="collapse" data-bs-target="#ch-[padre]" role="button" aria-expanded="true" aria-controls="ch-[padre]">
        <i class="ti ti-[icono]"></i>[Nombre de la sub-sección padre]
        <i class="ti ti-chevron-right chev"></i>
      </a>
      <div class="collapse show" id="ch-[padre]">
        <a href="#" class="cms-child active text-primary" id="nav-[hijo1]" onclick="showSection('[hijo1]');return false">
          <i class="ti ti-[icono]"></i>[Hijo 1]
        </a>
        <a href="#" class="cms-child" id="nav-[hijo2]" onclick="showSection('[hijo2]');return false">
          <i class="ti ti-[icono]"></i>[Hijo 2]
        </a>
      </div>

      <!-- Padre plano, sin hijos: acción directa o link a otra página del módulo -->
      <a href="[url-u-onclick]" class="cms-parent" id="nav-[otro-destino]">
        <i class="ti ti-[icono]"></i>[Otro destino del módulo]
      </a>

      <!-- Ítem deshabilitado ("próximamente") -->
      <div class="cms-parent cms-parent-disabled">
        <i class="ti ti-[icono]"></i>[Sección futura]
        <span class="badge bg-secondary-lt ms-auto">Pronto</span>
      </div>
    </aside>

    <main class="cms-content">
      <!-- Si el módulo tiene un mensaje de "Objetivo del módulo", va acá afuera de las
           .cms-section para que se vea sin importar cuál sub-sección esté activa -->
      <div class="cms-section active" id="section-[hijo1]">
        <div class="page-header d-print-none">
          <div class="page-pretitle">[Padre] <i class="ti ti-chevron-right" style="font-size:10px"></i> [Hijo 1]</div>
          <h2 class="page-title">[Hijo 1]</h2>
        </div>
        <!-- contenido de la sub-sección -->
      </div>
      <div class="cms-section" id="section-[hijo2]"><!-- contenido --></div>
    </main>
  </div>
</div>
```

**JS de navegación** (única parte verdaderamente "lógica de interacción" — el expandir/colapsar en sí ya lo maneja el Collapse nativo de Bootstrap vía `data-bs-toggle="collapse"`, esto solo swappea qué `.cms-section` se ve y qué `.cms-child` queda resaltado):
```javascript
const allSections = ['hijo1', 'hijo2'];
const allNavIds   = ['nav-hijo1', 'nav-hijo2'];

function showSection(name) {
  allSections.forEach(s => {
    const el = document.getElementById('section-' + s);
    if (el) el.classList.toggle('active', s === name);
  });
  allNavIds.forEach(n => {
    const el = document.getElementById(n);
    if (el) el.classList.remove('active', 'text-primary');
  });
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active', 'text-primary');
  window.scrollTo(0, 0);
}
```

### Selector múltiple con chips (ej: vincular subcategorías) — `form-selectgroup`

> Reemplaza cualquier "chip-selector" custom. Es el componente nativo de Tabler para selección múltiple con aspecto de chip (ver `form-elements.html`).

```html
<div class="mb-3">
  <label class="form-label">Subcategorías vinculadas <span class="form-label-description text-danger">*</span></label>
  <div class="form-selectgroup">
    <label class="form-selectgroup-item">
      <input type="checkbox" name="subcats" value="asist-medica" class="form-selectgroup-input" checked>
      <span class="form-selectgroup-label"><i class="ti ti-stethoscope me-1"></i>Asistencia médica</span>
    </label>
    <label class="form-selectgroup-item">
      <input type="checkbox" name="subcats" value="medicamentos" class="form-selectgroup-input">
      <span class="form-selectgroup-label"><i class="ti ti-pill me-1"></i>Medicamentos</span>
    </label>
  </div>
  <small class="form-hint">Una categoría debe tener al menos una subcategoría vinculada.</small>
  <div class="invalid-feedback">Seleccioná al menos una subcategoría.</div>
</div>
```

### Selector único tipo tarjeta/radio — mismo componente, con `radio`

```html
<div class="form-selectgroup">
  <label class="form-selectgroup-item">
    <input type="radio" name="modo" value="inmediato" class="form-selectgroup-input" checked>
    <span class="form-selectgroup-label"><i class="ti ti-bolt me-1"></i>Inmediato</span>
  </label>
  <label class="form-selectgroup-item">
    <input type="radio" name="modo" value="programado" class="form-selectgroup-input">
    <span class="form-selectgroup-label"><i class="ti ti-calendar-time me-1"></i>Programado</span>
  </label>
</div>
```

### Subida de archivo simple (ej: ícono .svg)

```html
<div class="mb-3">
  <label class="form-label">Ícono <span class="form-label-description text-danger">*</span></label>
  <input type="file" class="form-control" accept=".svg,image/svg+xml" onchange="handleIconUpload(this)">
  <small class="form-hint">Formato SVG · máx. 4kb · 32x32px</small>
  <div class="invalid-feedback" id="icon-error"></div>
</div>
<span class="avatar avatar-sm" id="icon-preview"><i class="ti ti-photo-up"></i></span>
```
Las validaciones de peso/formato/dimensión son lógica de negocio (no hay componente de Tabler para eso) — se implementan en JS propio, pero el feedback de error usa las clases nativas `is-invalid` / `invalid-feedback`.

### Modal (crear/editar) — Bootstrap nativo, sin CSS propio

```html
<div class="modal modal-blur fade" id="modal-categoria" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><i class="ti ti-category-2 text-primary me-2"></i>Nueva categoría de asistencia</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- form fields -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link link-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onclick="requestSaveCategoria()"><i class="ti ti-device-floppy"></i>Guardar</button>
      </div>
    </div>
  </div>
</div>
```
Abrir/cerrar con la API real de Bootstrap (bundle incluido en `@tabler/core`), no con clases `.open` custom:
```javascript
function openModal(id) { bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).show(); }
function closeModal(id) { bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).hide(); }
```

### Modal de confirmación destructiva

```html
<div class="modal modal-blur fade" id="modal-confirm" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-status bg-danger"></div>
      <div class="modal-body text-center py-4">
        <i class="ti ti-alert-triangle icon mb-2 text-danger icon-lg"></i>
        <h3 id="confirm-title">Confirmar eliminación</h3>
        <div class="text-secondary" id="confirm-msg"></div>
      </div>
      <div class="modal-footer">
        <div class="w-100">
          <div class="row">
            <div class="col"><button type="button" class="btn w-100" data-bs-dismiss="modal">Cancelar</button></div>
            <div class="col"><button type="button" class="btn btn-danger w-100" id="confirm-btn" onclick="executeConfirmedAction()">Eliminar</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Toast de confirmación ("guardado correctamente")

```html
<div class="toast-container position-fixed bottom-0 end-0 p-3" id="toast-container"></div>
```
```javascript
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'alert');
  el.innerHTML = `<div class="toast-header"><i class="ti ti-circle-check text-success me-2"></i><strong class="me-auto">Listo</strong></div><div class="toast-body">${msg}</div>`;
  container.appendChild(el);
  const toast = new bootstrap.Toast(el, { delay: 3200 });
  toast.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}
```

### Tabla con acciones por fila (dropdown, no botones sueltos)

```html
<div class="card">
  <div class="card-header">
    <span class="card-title">[Título]</span>
    <div class="ms-auto"><input class="form-control" style="width:220px" placeholder="Buscar..."></div>
  </div>
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead><tr><th>[Col 1]</th><th>[Col 2]</th><th class="w-1"></th></tr></thead>
      <tbody>
        <tr>
          <td>[Dato]</td><td>[Dato]</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-icon" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></button>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="#"><i class="ti ti-edit me-2"></i>Editar</a>
                <a class="dropdown-item text-danger" href="#"><i class="ti ti-trash me-2"></i>Eliminar</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Panel de info / advertencia — `alert`, no un div custom

```html
<div class="alert alert-info" role="alert">
  <div class="d-flex">
    <div><i class="ti ti-info-circle alert-icon"></i></div>
    <div>[Mensaje informativo]</div>
  </div>
</div>

<div class="alert alert-warning" role="alert">
  <div class="d-flex">
    <div><i class="ti ti-alert-triangle alert-icon"></i></div>
    <div>[Mensaje de advertencia]</div>
  </div>
</div>
```

### Estado vacío

```html
<div class="empty">
  <div class="empty-icon"><i class="ti ti-inbox" style="font-size:3rem"></i></div>
  <p class="empty-title">No hay elementos todavía</p>
  <p class="empty-subtitle text-secondary">[Contexto adicional opcional]</p>
</div>
```

### Grid de cards (ej: métricas resumen)

```html
<div class="row row-cards">
  <div class="col-sm-6 col-lg-3">
    <div class="card card-sm">
      <div class="card-body">
        <div class="text-secondary" style="font-size:13px">[Label]</div>
        <div class="h1 mb-0">$0</div>
      </div>
    </div>
  </div>
</div>
```

---

## Patrones JS reutilizables

### Validación de formulario en modal (usando clases nativas de Bootstrap/Tabler)
```javascript
function validateForm() {
  let valid = true;
  const fields = [
    { id: 'input-name', check: v => v.trim().length > 0 },
  ];
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const ok = f.check(el.value);
    el.classList.toggle('is-invalid', !ok);
    if (!ok) valid = false;
  });
  return valid;
}
```

### Renderizado dinámico (estado vacío nativo)
```javascript
function renderList(items) {
  const container = document.getElementById('list-container');
  if (!items.length) {
    container.innerHTML = `
      <div class="empty">
        <div class="empty-icon"><i class="ti ti-inbox" style="font-size:3rem"></i></div>
        <p class="empty-title">No hay elementos todavía.</p>
      </div>`;
    return;
  }
  container.innerHTML = items.map(item => `<!-- HTML del item -->`).join('');
}
```

---

## Convenciones de nomenclatura (lógica de app — no cambia con el framework)

| Elemento | Patrón |
|---|---|
| IDs de modales | `modal-[accion]` — ej: `modal-new-item`, `modal-confirm-delete` |
| Variables de estado pendiente | `pending[Accion]Id` — ej: `pendingDeleteId` |
| Funciones de modal | `open[Modal]()`, `confirm[Accion]()`, `closeModal(id)` |
| Renders principales | `render[Entidad]s()` — ej: `renderCustomTables()` |
| Arrays de estado | `[entidades]` en camelCase — ej: `customTables`, `selectedAffiliates` |
| Bloques custom (cuando Tabler no alcanza) | comentario `<!-- CUSTOM: [motivo] -->` inmediatamente antes del bloque |

---

## Roles en el BO — Reglas de acceso

> No implementar ningún selector de rol en el prototipo. Cada usuario del BO real tiene su rol pre-configurado a nivel de sesión/login.

| Rol | Permisos |
|---|---|
| **Marketing** | Edición de configuraciones de producto, escalas, reglas de negocio |
| **Producto** | Edición completa (igual que Marketing) |
| **Otros roles** | Solo lectura — sin botones de edición ni CTAs destructivos |

En los prototipos, renderizar siempre la vista del **rol con más permisos** (Marketing / Producto), que es la más completa y la que el equipo necesita validar.

---

## Assets / datos de prueba recomendados

- **Países:** Argentina, Chile, Brasil, Uruguay, México, Colombia, España, Francia, EEUU
- **Monedas:** USD, EUR, ARS, BRL, CLP, UYU
- **Nombres de afiliados de prueba:** `Juan García`, `María López`, `Travel Insider`, `Viajes con Nico`
- **Valores numéricos:** usar valores realistas del negocio (comisiones en %, montos en USD, rangos de ventas)

---

## Checklist antes de entregar el prototipo

- [ ] El proyecto tiene `@tabler/core` como dependencia real (`npm ls @tabler/core` no da error)
- [ ] El HTML carga `<script type="module" src="/src/tabler.js"></script>` — no CSS custom que reimplemente a Tabler
- [ ] Cada componente usado (modal, dropdown, toast, form-selectgroup, empty state, alert, etc.) usa las clases y el JS reales de Tabler/Bootstrap, no una reimplementación
- [ ] Todo bloque genuinamente custom está marcado con `<!-- CUSTOM: [motivo] -->` y tiene la misma atención a la UX que el resto
- [ ] Si el módulo tiene más de una pantalla, usa EL sidebar único (`.cms-sidebar`/`.cms-parent`/`.cms-child`) — no un `list-group` dentro de una card ni una variante propia
- [ ] El navbar muestra el logo de ASSIST 365 (URL oficial)
- [ ] Se usa Inter como fuente y Tabler Icons para todos los iconos (vía CDN)
- [ ] El estado vacío de cada lista/tabla está implementado con `.empty`
- [ ] Los modales usan `bootstrap.Modal` (no clases `.open` custom)
- [ ] Los formularios validan con `.is-invalid` / `.invalid-feedback` nativos
- [ ] Las acciones destructivas pasan por modal de confirmación (`modal-status bg-danger`)
- [ ] El archivo se guarda con el naming convention `bo_[feature]_prototipo_[N].html` y se agrega al índice `index.html`
- [ ] Se corrió `npm run dev` y se verificó en el navegador que todo funciona sin errores de consola
