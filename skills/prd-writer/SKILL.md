---
name: prd-writer
description: "Redacta PRDs completos de ASSIST 365 en Confluence siguiendo el template PRD v2.0 del equipo. Usar SIEMPRE que Denu pida escribir, redactar o armar un PRD, feature spec o documento de requisitos. Activar con frases como armame el PRD, escribime el PRD, completa el PRD en Confluence, documenta el feature, necesito el PRD. La skill lee Confluence, incorpora disenos de Figma y publica el PRD en formato ADF."
---

# PRD Writer — ASSIST 365

## Contexto siempre disponible

El perfil de ASSIST 365 está en memoria (about-assist365\_overview.md): modelo de negocio, framework OPI, stack tecnológico, equipo de producto, ejes estratégicos 2026\. Usarlo para enriquecer el PRD sin necesidad de que Denu lo explique de cero.

El cloudId de Confluence es siempre: **`assist-365.atlassian.net`**

**Template oficial de referencia:** `https://assist-365.atlassian.net/wiki/x/AQCuIg` — todo PRD nuevo DEBE replicar fielmente sus componentes y estilos (ver "Reglas de estilo y componentes ADF" al final).

---

## Paso 1 — Recopilar inputs iniciales

Usar `AskUserQuestion` para pedir en una sola pregunta:

1. **URL de la página de Confluence** donde escribir el PRD (debe existir ya, aunque esté vacía o con el template pelado)  
2. **URL del section de Figma** con todos los diseños del feature  
3. **Contexto adicional** (opcional) — si Denu quiere agregar algo que no esté en Confluence

El contexto del PRD (Sección 1\) puede estar ya escrito en Confluence. Nunca pedir lo que ya esté disponible en la página.

### Pregunta obligatoria antes de redactar — Secciones 5 y 6

**Antes de comenzar a construir el PRD**, preguntar siempre a Denu (usando `AskUserQuestion`):

*"¿Este PRD requiere las secciones de KPIs de éxito (5) y Eventos de tracking (6)?"*

Opciones sugeridas:

- **Sí, incluir ambas** — PRD completo con KPIs y tracking  
- **Solo KPIs (sección 5), sin tracking**  
- **Solo tracking (sección 6), sin KPIs**  
- **No, omitir ambas** — PRD corto/concreto sin métricas ni eventos

Guardar la respuesta y actuar en consecuencia al construir el PRD:

- Si se omite la Sección 5 (KPIs): no incluirla y renumerar la Sección 6 → 5 y la Sección 7 → 6\.  
- Si se omite la Sección 6 (Tracking): no incluirla y renumerar la Sección 7 → 6 (o 5 si también se omitió la anterior).  
- Si se omiten ambas: el PRD tiene 5 secciones en total; la tabla de dependencias pasa a ser la Sección 5\.  
- Si se incluye la Sección 6 (Tracking): sigue siendo **requisito obligatorio para el cierre del ticket en Jira** — incluir el panel `error` correspondiente.

---

## Paso 2 — Leer la página de Confluence

Inmediatamente después de obtener la URL, leer la página con `getConfluencePage`:

- `cloudId`: "assist-365.atlassian.net"  
- `pageId`: extraer de la URL:  
  - Si es `/wiki/x/XXXXX` → usar el código después de `/x/` (ej: `AQCuIg`)  
  - Si es `/pages/123456/` → usar el número  
- `contentFormat`: "markdown"

Al leer, identificar y anotar:

- **Nombre del feature** (título de la página)  
- **Qué secciones tienen contenido real** escrito por Denu vs. qué es solo el placeholder del template  
- **El contexto ampliado** si ya existe — usarlo tal cual y mejorarlo si Denu lo pide  
- **Links a Figma** que ya estén mencionados en la página  
- **Versión actual** de la página (necesaria para el `updateConfluencePage`)

---

## Paso 3 — Exploración de Figma

### 3a. Vista general del section

Extraer `fileKey` y `nodeId` de la URL de Figma:

- URL formato: `https://www.figma.com/design/FILEKEY/nombre?node-id=XXXX-YYYY`  
- `fileKey` \= el segmento después de `/design/`  
- `nodeId` \= el `node-id` del query param, convirtiendo `-` a `:`  (ej: `7061-30650` → `7061:30650`)

Usar `get_screenshot` con `enableBase64Response: true` para mostrar el overview del section a Denu.

Luego preguntar: *"¿Cuáles de estas pantallas hay que documentar en el PRD? Pasame los links individuales de cada frame (clic derecho en Figma sobre el frame → 'Copy link to selection')."*

### 3b. Design context por frame

Para cada frame URL que pase Denu, extraer `fileKey` y `nodeId` y ejecutar `get_design_context`:

- `clientLanguages`: "unknown"  
- `clientFrameworks`: "unknown"  
- `excludeScreenshot`: false (siempre incluir screenshot)

`get_design_context` devuelve estructura de capas, nombres de componentes, propiedades visuales y screenshot. Usar esto como base **funcional** para construir la Sección 4\. Para cada frame, anotar:

- Nombre y propósito de la pantalla  
- Componentes identificados (inputs, botones, selects, cards, tablas, accordions, etc.)  
- Estados visibles (loading, empty, error, success)  
- A qué flujo del feature pertenece  
- Comportamiento e interacciones de cada componente

NO documentar píxeles, colores ni dimensiones exactas en el PRD. Esa información depende del breakpoint y la maneja diseño/dev. El PRD captura qué hace cada componente, no cómo se ve en píxeles.

---

## Paso 4 — Construir el PRD sección a sección

ANTES de redactar: repasar la sección "Reglas de estilo y componentes ADF" al final de este documento. Cada sección del PRD debe replicar fielmente la estructura del template oficial.

### Sección 1: Contexto

**Tabla de encabezado** (siempre presente, en la primera fila del documento):

| Campo | Valor |
| :---- | :---- |
| Producto | \[módulo: Checkout / Mi Voucher / Portal Afiliados / BO / etc.\] |
| Feature / Épica | \[nombre \+ link a Jira si disponible\] |
| PM Responsable | Denise Barral |
| Stakeholder responsable | \[preguntar si no está\] |
| Entregable Figma | \[link al section o frame principal\] |
| ¿Requiere Design QA? | **NO ❌** |
| Fecha de creación | \[nodo `date` ADF con timestamp epoch ms — fecha actual\] |
| Última actualización | \[nodo `date` ADF con timestamp epoch ms — fecha actual\] |
| Estado | \[nodo `status` ADF: `color:"yellow"`, `style:"bold"`, `text:"En revisión"`\] |

Estilos obligatorios (ver sección final):

- Header de tabla con `background:"#4c9aff"` \+ texto blanco \+ strong.  
- Columna izquierda (labels) con `background:"#deebff"` \+ strong.  
- Columna derecha sin background; placeholders en `em`.  
- "¿Requiere Design QA?" tiene valor por defecto **NO ❌** en `strong` — quedará a criterio de Denu y el equipo modificarlo.  
- "Fecha de creación" y "Última actualización" usan nodo `date` (NO texto plano).  
- "Estado" usa nodo `status` (lozenge, NO texto plano).

**Contexto ampliado**: Si Denu ya lo escribió en Confluence, mantenerlo y mejorarlo solo si lo solicita expresamente. Si está vacío, pedirlo antes de continuar. Incluir siempre:

- Eje estratégico (OPI) al que pertenece el feature  
- Si es iteración de algo existente o feature nuevo  
- Origen de la iniciativa (estrategia de producto / problem statement de área / bug / otro)  
- El problema que se quiere resolver: quién lo sufre, cuándo, cuál es el impacto medible hoy (mínimo 2 párrafos específicos)

### Sección 2: Objetivo del feature

- 1-2 oraciones concretas: qué cambia, qué mejora, para quién  
- Evitar frases vagas como "mejorar la experiencia" — ser específico sobre el cambio producido  
- **Criterios de aceptación generales** (transversales al feature, no por historia de usuario):  
  - Cada criterio debe ir en un nodo `expand` ADF (acordeón colapsable), **NO** como bullets de una lista.  
  - El criterio principal va en el `attrs.title` del `expand`.  
  - Adentro del `expand` (contenido) va un `paragraph` con detalles adicionales si aplica.  
  - Mínimo 3-4 criterios, verificables y binarios (cumple / no cumple).  
  - Cubren el comportamiento end-to-end del feature.

### Sección 3: Historias de usuario

Cada Historia de Usuario es **una tabla independiente** con la estructura del template (no una sola tabla mega-larga ni una lista). Estructura de 3 filas:

**Fila 1 — Header (tableHeader, colspan: 2):**

- Background: `#4c9aff`  
- Texto: `"US-NN  [Nombre descriptivo de la historia]"` con marks `textColor #ffffff` \+ `strong`.

**Fila 2 — Frase de la historia (tableCell, colspan: 2):**

- Sin background especial.  
- Texto en mark `em` (itálica): `"Como [rol del usuario], quiero [acción concreta] para [beneficio]."`

**Fila 3 — Criterios de aceptación (tableCell, colspan: 2):**

- Background: `#f4f5f7` (gris claro Atlassian).  
- Contenido:  
  - `paragraph` con `"Criterios de aceptación:"` en strong.  
  - `bulletList` con N `listItem`, cada uno con texto que empiece con `"✓  "` (Unicode literal, NO `taskItem` ni `decisionItem`).

Coberturas por tipo de feature:

- **BO**: rol Marketing, rol Producto (edición), otros roles (solo lectura)  
- **Portal de afiliados**: afiliado autenticado, afiliado sin datos cargados, admin  
- **Ecommerce / Mi Voucher**: visitante, usuario con cuenta, usuario en viaje

### Sección 4: Pantallas involucradas

**Panel obligatorio al inicio de la sección** — Inmediatamente después del heading "4. Pantallas involucradas" y antes de cualquier descripción de pantalla, incluir siempre el siguiente panel de tipo `warning`:

El detalle de las pantallas a continuación se basa en el entregable para el mercado ARGENTINA (idioma español/argentino), breakpoint desktop.

En el entregable de Figma, en distintas secciones, están los entregables para los mercados BRASIL (idioma PT) en los tres breakpoints disponibles (desktop, mobile y tablet) y LATAM/RESTO DEL MUNDO (idioma español neutro), también en sus tres breakpoints correspondientes.

Este panel va siempre, en todo PRD, sin excepción. En HTML: `<div data-type="panel-warning">`. En ADF: nodo `panel` con `panelType: "warning"`.

---

Para cada frame procesado con `get_design_context`:

**Encabezado:** heading nivel 2 con texto tipo `"Pantalla N: [Nombre] — [Figma →](URL del frame)"`. El texto `[Figma →]` lleva mark `textColor` con `color: "#0052cc"`.

**Descripción general** (1 párrafo): propósito de la pantalla, usuario al que va dirigida, momento del flujo en que aparece, acción principal que permite realizar.

**Una tabla por componente** identificado en el design context. Cada tabla usa `layout:"default"`, header con `#4c9aff`/blanco/strong, columna izquierda con `#deebff`/strong:

| COMPONENTE — \[Nombre del componente\] |
| :---- |
| Tipo / Requerido |
| \[Campo/Elemento 1\] |
| Estado loading |
| Estado vacío |
| Estado error |

**SÍ documentar:** tipo de componente, requerido/no, validaciones, comportamiento, estados funcionales, copys exactos, opciones de dropdowns, reglas de negocio.

**NO documentar:** píxeles exactos, colores HEX del componente, tamaños de tipografía, border-radius, box-shadow, propiedades CSS dependientes del breakpoint.

**Panel de Edge Cases** (tipo `warning`) al final de cada pantalla con casos de error de backend, restricciones por rol, comportamiento en mobile si difiere funcionalmente, casos límite de datos, flujo interrumpido.

### Sección 5: KPIs de éxito

Incluir solo si Denu lo confirmó en la pregunta inicial del Paso 1\.

- Máximo 3-4 KPIs por feature.  
- Tabla con columnas: KPI · Objetivo · Baseline · Plazo de revisión · Fuente.  
- Cada KPI requiere: nombre de la métrica, objetivo cuantificable (número concreto), baseline actual, plazo de revisión post-deploy, fuente del dato.

### Sección 6: Eventos de tracking — REQUISITO PARA CERRAR TICKET EN JIRA (si aplica)

Incluir solo si Denu lo confirmó en la pregunta inicial del Paso 1\. Si se incluye, es obligatoria y bloqueante para el cierre del ticket en Jira.

Mínimo 3-4 eventos. Precede a la tabla un panel `error` con copy: `"Requisito obligatorio para el cierre del ticket en Jira."`

| Evento | Propiedades clave | Trigger (cuándo se dispara) | KPI asociado |
| :---- | :---- | :---- | :---- |
| `nombre_evento` | user\_id, prop\_1, prop\_2 | Al \[acción concreta\] | KPI N |

Convención de nombres (snake\_case): `view_[pantalla]`, `click_[elemento]`, `complete_[flujo]`, `error_[tipo]`.

Los nombres de evento se renderizan con mark `code` inline (NO en `codeBlock`).

### Sección 7: Dependencias y consideraciones adicionales

Tabla 2 columnas con labels: Dependencias técnicas, Dependencias de diseño, Dependencias de DATA, Dependencias con otros PRDs, Rollout / activación, Internacionalización, Notas para QA, Notas para DEV.

---

## Paso 5 — Publicar en Confluence

Usar `updateConfluencePage`:

- `cloudId`: "assist-365.atlassian.net"  
- `pageId`: el mismo usado en el paso de lectura  
- `title`: mantener el título original  
- `contentFormat`: "adf"  
- `version`: versión actual leída \+ 1

---

## Reglas de estilo y componentes ADF

### Paleta cromática — solo 3 colores en tablas

- Header de tabla: `background:"#4c9aff"` \+ `textColor:"#ffffff"` \+ `strong`  
- Celda label (columna izquierda): `background:"#deebff"` \+ `strong`  
- Celda gris claro (criterios de HU): `background:"#f4f5f7"`  
- Color de link/Figma: `textColor:"#0052cc"`

**Ningún otro color está permitido.**

### Componentes nativos ADF

**Nodo `date`:**

```json
{"type":"date","attrs":{"timestamp":"1777766400000"}}
```

**Nodo `status`:**

```json
{"type":"status","attrs":{"color":"yellow","style":"bold","text":"En revisión"}}
```

**Nodo `expand`** para criterios de aceptación generales en Sección 2\.

**Nodo `panel`** con `panelType`: `info`, `note`, `success`, `warning`, `error`.

**Nodo `extension` — TOC** (OBLIGATORIO como primer nodo del documento):

```json
{
  "type": "extension",
  "attrs": {
    "extensionType": "com.atlassian.confluence.macro.core",
    "extensionKey": "toc",
    "parameters": {
      "macroParams": {},
      "macroMetadata": {
        "macroId": {"value": "toc-prd"},
        "schemaVersion": {"value": "1"},
        "title": "Tabla de contenidos"
      }
    },
    "layout": "default"
  }
}
```

### Estructura del documento

```
doc > layoutSection > layoutColumn (width: 100)
  ├── extension (macro "toc")    ← SIEMPRE el primer nodo
  ├── heading nivel 1 — "1. Contexto"
  ├── tabla (encabezado del PRD)
  ├── rule
  ├── heading nivel 1 — "2. Objetivo del feature"
  └── ...
```

- Secciones numeradas: `heading level:1`  
- Sub-secciones: `heading level:2` y `level:3`  
- Separador entre secciones: `rule`  
- Todas las tablas: `layout:"default"` (NO `full-width`)

### Componentes NO permitidos

`codeBlock`, `decisionList`, `decisionItem`, `taskList`, `taskItem`, `mention`, `mediaSingle`, `media`, `inlineCard`, `blockCard`, `emoji` (nodo), `nestedExpand`.

Los emojis son caracteres Unicode literales dentro de `text`. Los tildes ✓ son caracteres Unicode, NO `taskItem`.

---

## Reglas generales

- **Nunca inventar datos de negocio** — si algo no está claro, preguntar a Denu.  
- **Siempre incluir la macro TOC** como primer nodo del documento.  
- **Siempre preguntar antes de redactar** si se incluyen las secciones 5 y 6\.  
- **Si se incluye la Sección 6 (tracking), es obligatoria y bloqueante** para cierre de tickets en Jira.  
- **Siempre incluir el panel warning de breakpoints/mercados** al inicio de la Sección 4\.  
- **Siempre linkear los frames de Figma** en los títulos de pantalla de la Sección 4\.  
- **Redactar en español**, tono técnico-profesional, conciso y directo.  
- **Si el contexto ya está en Confluence**: usarlo, no pedirlo de nuevo.  
- **Edge cases son obligatorios** en cada pantalla de la Sección 4\.  
- Usar el framework **OPI** al referenciar el eje estratégico.  
- **No documentar píxeles ni colores específicos en la Sección 4**.  
- **La fila "¿Requiere Design QA?" siempre aparece con valor por defecto `NO ❌` en bold**.  
- **Replicar fielmente la paleta cromática y componentes ADF del template oficial**.

