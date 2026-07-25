# FEAT-2570 — Módulo Contenido Ecommerce · Contexto para Claude Code

PRD completo: https://assist-365.atlassian.net/wiki/spaces/PPYF/pages/898465797

---

## Qué es y por qué se hizo

Este módulo permite al equipo de Marketing de ASSIST 365 gestionar de forma autónoma el contenido visual y textual de los componentes de la home del ecommerce, sin depender del equipo de ingeniería. Resuelve dos problemas concretos:

- **PS1:** Los textos de los banners se actualizaban mediante un archivo XLSX procesado solo a las 00:01 hs. Ante un error o cambio urgente, la corrección tardaba horas.
- **PS2:** Las imágenes (hero, banners) estaban en AWS S3 con nombres fijos y se aplicaban igual a todos los mercados. No había forma de cargar creatividades distintas por país sin intervención técnica.

El módulo vive dentro del **nuevo BO** de ASSIST 365 (admin backoffice), bajo la sección "Contenido Ecommerce".

---

## Qué fue construido

Cinco componentes de la sección **Home**, cada uno editable **por mercado** (Argentina, Chile, México, Brasil, Portugal, Colombia, EE.UU., Resto del mundo):

### 1. Hero
Solo imágenes. Dos campos de carga: imagen Desktop (JPG, 1600×347 px, 40 KB máx.) e imagen Mobile (JPG, 834×252 px, 20 KB máx.). El backend renombra el archivo automáticamente al nombre correcto en S3.

### 2. Marquesina Top
Un campo de texto libre (sin límite de caracteres) con un preview en vivo debajo que muestra el ticker animado tal como se verá en el sitio. Los íconos separadores (✈) son del Design System y no son editables por el usuario.

### 3. Banners (3 slides)
Carrusel con 3 slides, cada uno en un acordeón independiente (colapsados por defecto). Cada slide tiene sus propios campos de texto con contador de caracteres (verde/amarillo/rojo según % del límite) y campos de imagen de fondo (desktop + mobile). Los campos de texto y sus límites varían por slide (ver prototipo). También incluye campo de URL del CTA por slide.

### 4. Marquesina Bottom
Similar a Marquesina Top en cuanto al campo de texto + preview en vivo, pero con estructura visual diferente (gradiente azul, ícono de descuento).

### 5. FAQs
Lista de preguntas frecuentes con drag & drop para reordenar, modal para agregar nueva pregunta (pregunta + respuesta), y modal de confirmación para eliminar. Los cambios en FAQs siempre se publican de forma inmediata (sin opción de programar).

### 6. Historial de cambios
Vista de tabla completa (no modal) accesible desde el sidebar y desde el botón "Historial de cambios" en el header de cada componente. Registra todos los cambios publicados con: fecha/hora, componente, país, tipo de publicación, estado y usuario. Incluye:
- Filtros por componente y por país (dropdowns)
- Paginación (8 filas por página)
- Botón **"Ver"** por fila: abre modal readonly con los campos exactos guardados en ese registro, incluido preview de imágenes cuando aplica
- Botón **"Cancelar"** por fila: habilitado solo para registros en estado **Pendiente**. Abre modal de confirmación. Al confirmar, el registro pasa a estado **Cancelado** y queda registrado quién lo canceló.

---

## Patrones transversales del prototipo

**Tabs de país:** presente en todos los componentes (excepto Historial). Al cambiar de tab se carga el contenido guardado para ese mercado.

**Publicación:** selector Inmediato / Programado en el footer de cada card (excepto FAQs). Al elegir "Programado" aparece un datetime picker. La fecha debe ser futura.

**Modal de confirmación antes de guardar:** siempre. Muestra: sección + componente, país, modo de publicación. El usuario confirma o cancela.

**Toast de éxito:** aparece tras confirmar el guardado. Transitorio, sin interacción requerida.

**Tarjeta de preview de imagen:** cuando ya existe una imagen cargada, el campo muestra un thumbnail con nombre de archivo, formato y dimensiones. Botón "Cambiar" para reemplazar.

**Contador de caracteres (char counter):** en todos los campos de texto con maxlength. Estados: normal (verde), advertencia ≥85% (amarillo), superado (rojo, input bloqueado, guardado bloqueado).

**Sidebar CMS:** navegación de dos niveles. Nivel 1: secciones (Home con chevron expandible, más secciones futuras en estado "próximamente"). Nivel 2: componentes dentro de cada sección (Hero, Marquesina Top, Banners, Marquesina Bottom, FAQs, Historial de cambios). El ítem activo se resalta visualmente.

**Estados del historial:**
- `Activo` — badge verde
- `Pendiente` — badge amarillo (publicación programada futura)
- `Finalizado` — badge gris (cambio aplicado y reemplazado)
- `Cancelado` — badge rojo (publicación programada dejada sin efecto)

---

## Archivo de referencia actual

```
bo/modulo_gestion_de_contenido/bo_contenido_ecommerce_prototipo.html
```

Prototipo HTML monolítico construido con CSS custom que aproxima Tabler UI. Está 100% funcional como referencia de comportamiento, campos, interacciones y estructura. Es el source of truth de QUÉ construir.

---

## Tarea a ejecutar

> **Objetivo:** rehacer el prototipo usando Tabler UI nativo (npm `@tabler/core`) en un proyecto Vite, siguiendo la skill activa del workspace.

### Pasos:

1. **Leer la skill primero:**
   Abrí y leé completamente el archivo `skills/bo-prototipo/SKILL.md` de este workspace. Ese archivo contiene los lineamientos de cómo construir con Tabler nativo. Seguí esas instrucciones.

2. **Leer el prototipo actual exhaustivamente:**
   Leé `bo_contenido_ecommerce_prototipo.html` de punta a punta, sin saltear nada. Registrá mentalmente cada componente, cada campo, cada interacción, cada modal, cada función JS, cada regla de negocio. El objetivo es **no perder ni un solo detalle funcional** en la migración.

3. **Inicializar el proyecto Vite:**
   En la carpeta `bo/modulo_gestion_de_contenido/`, inicializá un proyecto Vite (vanilla JS) e instalá `@tabler/core` como dependencia npm. Tomá como referencia la estructura del proyecto en `bo/modulo_reintegros/` que ya fue construido con esta misma metodología.

4. **Reconstruir todo el prototipo con Tabler nativo:**
   - Toda funcionalidad del HTML actual debe estar presente: sidebar CMS, tabs de país, todos los componentes (Hero, Marquesinas, Banners, FAQs, Historial), modales, toasts, char counters, live previews, publicación programada, paginación, botones Ver/Cancelar del historial, lógica de cancelación con actualización de estado.
   - Usá componentes nativos de Tabler siempre que existan (modales, dropdowns, toasts, forms, badges, alerts, empty states, etc.).
   - Lo que Tabler no resuelve nativamente (sidebar CMS de dos niveles, char counter, live preview de marquesinas), construilo custom y marcalo con `<!-- CUSTOM: razón -->`.
   - No cambies ningún contenido de ejemplo (textos de banners, valores de campos, datos del historial, imágenes de referencia). El contenido es correcto, solo cambia la forma de ejecutarlo.

5. **El resultado esperado:**
   Un proyecto Vite funcional que, al correr `npm run dev`, muestre el mismo prototipo que el HTML actual, pero construido sobre Tabler UI real.
