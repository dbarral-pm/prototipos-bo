# ASSIST 365 — Company Overview

> Documento de referencia interno · Product & Strategy · Última revisión: abril 2026

---

## Tabla de contenidos

1. [Quiénes somos](#1-quiénes-somos)
2. [Qué vendemos](#2-qué-vendemos)
3. [Modelo de negocio](#3-modelo-de-negocio)
4. [Dónde opera](#4-dónde-opera)
5. [Plataforma tecnológica](#5-plataforma-tecnológica)
6. [Backoffice (BO)](#6-backoffice-bo)
7. [Secciones clave del sitio](#7-secciones-clave-del-sitio)
8. [Estrategia de producto: Framework OPI](#8-estrategia-de-producto-framework-opi)
9. [Principales ejes estratégicos](#9-principales-ejes-estratégicos)
10. [Experiencia del cliente](#10-experiencia-del-cliente)
11. [Prácticas de producto: PRDs y documentación](#11-prácticas-de-producto-prds-y-documentación)
12. [Posicionamiento competitivo](#12-posicionamiento-competitivo)
13. [Visión de producto](#13-visión-de-producto)

---

## 1. Quiénes somos

**ASSIST 365** ([assist-365.com](https://assist-365.com)) es una empresa de **asistencia al viajero** que comercializa sus servicios principalmente a través de **canales digitales**, con un modelo centrado en ecommerce y afiliados.

La compañía se posiciona como una marca **digital-first** que simplifica el acceso a la asistencia al viajero, ofreciendo planes de cobertura internacional para proteger a los viajeros frente a imprevistos durante sus viajes.

A diferencia de las aseguradoras tradicionales, ASSIST 365 se enfoca en:

- Venta directa online
- Escalabilidad digital
- Estrategias de adquisición mediante afiliados e influencers
- Experiencias de autogestión para el cliente

**Competidores directos:** Assist Card, Pax Assistance, Universal Assistance.

---

## 2. Qué vendemos

ASSIST 365 comercializa **servicios de asistencia al viajero** que brindan cobertura frente a distintos incidentes que pueden ocurrir durante un viaje.

### Coberturas principales

| Categoría | Ejemplos |
|-----------|---------|
| Salud | Asistencia médica internacional, hospitalización, medicamentos, repatriación sanitaria |
| Viaje | Pérdida o demora de equipaje, cancelación de viaje, demora y cancelación de vuelo |
| Legal y seguridad | Asistencia legal, cobertura por robo de aparatos tecnológicos |
| Especiales | Cobertura COVID / enfermedades, deportes, mascotas |

### Factores de precio

El precio de cada plan depende de:

- Destino del viaje
- Duración del viaje
- Edad de los viajeros
- Monto de cobertura del plan

La contratación se realiza online a través del ecommerce de la marca.

---

## 3. Modelo de negocio

El modelo de negocio de ASSIST 365 se basa en tres pilares:

### 3.1 Ecommerce directo

Los usuarios compran sus coberturas directamente en el sitio web.

**Flujo típico:**
1. Cotización (destino, edad de viajeros, fecha de salida y regreso)
2. Selección del producto en la product page
3. Checkout
4. Emisión del voucher

---

### 3.2 Canal de afiliados

Más del **50% de las ventas de ASSIST 365 proviene del programa de afiliados**. Es el principal motor de adquisición de la empresa.

**Perfiles del ecosistema:**
- Influencers y figuras públicas
- Bloggers de viaje
- Partners digitales

**Mecánica de promoción:**
- Links personalizados con UTMs y código de descuento embebido en la URL (impacta directamente en el precio de cotización del usuario)
- Códigos de descuento
- Contenido en redes sociales

**Compensación de afiliados:**

Los afiliados reciben comisiones por cada venta generada. La estructura de compensación incluye:

- Comisión base por venta
- **Bonus de Venta (BO):** escala de incentivos por volumen mensual de ventas, con 12 niveles (Nivel 1 a Nivel 12). Cada nivel define un rango de ventas en USD y un porcentaje de bonus adicional. Los pagos se realizan en USD.
- Incentivos especiales (Golden Tickets, canjes, viajes, etc.)

**Portal de afiliados** ([assist-365.com/afiliados](https://assist-365.com/afiliados)):
- Alta automática
- Dashboard de métricas: ventas, comisiones, incentivos
- Solicitud de retiro de comisiones (con carga de datos bancarios)
- Creación de UTMs personalizadas con campañas
- Sección de enlaces y campañas
- Notificaciones web y en BO

---

### 3.3 Proveedores de asistencia (modelo white label / reseller)

ASSIST 365 **no presta directamente los servicios médicos**. Trabaja con dos proveedores especializados que ejecutan la asistencia durante el viaje:

| Proveedor | Estado de integración |
|-----------|----------------------|
| **WTA** | Integrado vía SOAP (activo) |
| **WMMS** | Sin integración técnica aún; acceso por credenciales cruzadas |

**Lógica multiproveedor:**

- Un mismo plan (ej: "WORLD COVER") puede estar asociado a WTA en un mercado (Chile) y a WMMS en otro (Argentina). El viajero nunca lo sabe ni le importa.
- La asignación de proveedor por plan/mercado es una **decisión interna de negocio**, invisible para el cliente final.
- Trabajar con dos proveedores simultáneamente permite: leverage de negociación, competencia entre proveedores, flexibilidad de pricing y coberturas.

**Responsabilidades de los proveedores:**
- Red médica internacional
- Central de emergencias (el viajero llama directamente a ellos)
- Coordinación y administración de casos médicos

**Responsabilidades de ASSIST 365:**
- Marca comercial
- Plataforma de venta y gestión de clientes
- Marketing, canales de venta, atención y producto digital (ecommerce incluido)

---

## 4. Dónde opera

ASSIST 365 comercializa sus productos principalmente en **Latinoamérica** y el mercado hispanohablante.

**Mercados principales (por volumen):**

| Mercado | Relevancia |
|---------|-----------|
| Argentina 🇦🇷 | Principal |
| Chile 🇨🇱 | Alto |
| Brasil 🇧🇷 | Alto |
| México 🇲🇽 | En crecimiento |
| Colombia 🇨🇴 | En crecimiento |
| Uruguay, RDM, España, Australia, USA | Mercados satélite |

**Cobertura del servicio:** mundial, excepto el país de residencia del beneficiario.

**Expansión activa:** foco de hunting en Colombia y México (2026). Evaluación de nuevos mercados geográficos.

---

## 5. Plataforma tecnológica

El negocio de ASSIST 365 se apoya fuertemente en tecnología digital.

### Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | PHP, Laravel, arquitectura web propia, MySQL |
| Frontend | HTML / CSS / JS (React), componentes web propios |

### Integraciones externas

| Categoría | Herramientas |
|-----------|-------------|
| Proveedores de asistencia | WTA (SOAP), WMMS |
| Pasarelas de pago | Mercado Pago, PayPal, Dlocal, Prisma, Rebill |
| Analítica | GA4, Hotjar, Tag Manager |
| Marketing y CRM | Emblue (email), Zendesk (soporte y pagos) |
| ERP | Migración a Odoo en curso (Q2 2026) |

### Equipo de Ingeniería de Producto

| Rol | Persona |
|-----|---------|
| CPO | Martín |
| Product Manager | Denise (Denu) |
| Product Designer | Rosario |
| Tech Leader | Giancarlo |
| Developers | 2 frontend + 2 backend |
| QA | Leonardo |

---

## 6. Backoffice (BO)

ASSIST 365 cuenta con un sistema interno de gestión (BO) utilizado por operaciones, soporte, ventas y producto.

### Funcionalidades principales

- Visualización de reservas
- Emisión manual de vouchers
- Gestión de cambios
- Información de clientes
- Control de operaciones
- Cambio de promociones, reglas de oferta de productos y precios
- **Gestión de Códigos de Descuento** (módulo en producción)
- **Bonus de Venta:** módulo de configuración de la escala de incentivos por afiliado (FEAT-1939 area)
- Notificaciones para afiliados
- Identificación de proveedor por plan

### Roles y permisos en el BO

| Rol | Permisos |
|-----|---------|
| Marketing | Edición |
| Producto | Edición |
| Otros roles | Solo lectura |

---

## 7. Secciones clave del sitio

### 7.1 Ecommerce (venta)

Permite cotizar planes, comparar coberturas y comprar asistencia. El flujo finaliza con la **emisión del voucher**, que es el contrato del servicio.

### 7.2 Mi Voucher

Portal de autogestión post-compra. Permite al usuario:

- Visualizar su voucher
- Acceder a información del viaje y coberturas contratadas
- Gestionar cambios en su reserva (fechas, destino, datos de viajeros, upgrades de plan)
- Acceder a asistencia durante el viaje
- Integración con Zendesk para gestiones post-compra (WIP)

Actualmente en **rediseño** para mejorar UX, aumentar autogestión y reducir carga en soporte.

### 7.3 Portal de Afiliados

Autogestión completa del afiliado: métricas, comisiones, retiro de fondos, creación de campañas.

---

## 8. Estrategia de producto: Framework OPI

ASSIST 365 utiliza el **framework OPI** para organizar su estrategia de producto.

```
Oportunidades → Problemas → Iniciativas
```

| Nivel | Descripción |
|-------|-------------|
| **Oportunidades** | Grandes áreas de impacto para el negocio |
| **Problemas** | Bloqueos o limitaciones que impiden aprovechar esas oportunidades |
| **Iniciativas** | Soluciones o proyectos concretos que resuelven esos problemas |

**Beneficios del framework:**
- Alinea a todas las áreas de la empresa
- Prioriza problemas estructurales
- Planifica el roadmap de producto
- Mide impacto real de mejoras implementadas

---

## 9. Principales ejes estratégicos

### 9.1 Retención de clientes

Fortalecer la relación con clientes actuales y aumentar la recompra.

Iniciativas clave: mejorar experiencia post-compra, facilitar autogestión, optimizar experiencia durante el viaje, aumentar confianza en la marca.

---

### 9.2 Personalización y prevención

Conocer mejor al cliente para ofrecer experiencias más personalizadas y anticipar problemas.

Capacidades a desarrollar: centralizar información del cliente, comprender el ciclo de vida completo, analizar comportamiento y patrones de uso, ofrecer recomendaciones adaptadas a cada perfil.

Objetivo a largo plazo: estrategia **data-driven** basada en información real del cliente.

---

### 9.3 Potenciar el ecosistema de afiliados

Fortalecer el programa de afiliados mejorando su experiencia y capacidad de generar ventas.

Objetivos: mejorar herramientas y recursos, optimizar conversión de ventas, aumentar rentabilidad del canal, fortalecer relación con afiliados actuales.

Iniciativas activas (2026): unificación de procesos ES/PT, módulo de bonus de venta en BO, dashboards de métricas, notificaciones, gestión de códigos de descuento.

---

### 9.4 Expansión de mercados

Expandir la presencia hacia nuevos mercados y regiones.

Acciones: apertura de nuevos mercados geográficos, adaptación del producto, nuevas alianzas comerciales, optimización del modelo de venta internacional.

Foco activo: Colombia 🇨🇴 y México 🇲🇽.

---

### 9.5 IA como capacidad transversal

**IA Enablement Program** (Marzo–Julio 2026): programa estructurado para convertir la IA en una capacidad always-on, no en un proyecto puntual.

**Problem statements identificados:**
- Velocidad de automatización insuficiente
- Mayoría de procesos manuales, no escalables
- Conocimiento de IA reducido y concentrado en pocas personas
- Falta de estándares comunes para aplicación de IA
- Datos descentralizados y desestructurados
- Riesgo competitivo creciente

**Objetivo del programa:** diseñar, prototipar e implementar automatizaciones con impacto económico medible. Acelerar la cultura de adopción de IA.

**Estructura:** 4 Champions + 4 Co-Leaders seleccionados, con implementación de iniciativas a partir de mayo 2026.

---

## 10. Experiencia del cliente

### Ciclo de vida

```
Compra → Post-compra → Durante el viaje → Post-viaje
```

#### 1. Compra
El usuario cotiza y adquiere un plan online. Completa el checkout y recibe su **voucher** (contrato del servicio).

#### 2. Post-compra
Accede a **Mi Voucher** para consultar coberturas, gestionar cambios en la reserva (fechas, destino, datos de viajeros, upgrades) y preparar su viaje.

> Primera interacción real del cliente con el servicio.

#### 3. Durante el viaje
El cliente puede solicitar asistencia médica, contactar la central de emergencias (operada por WTA o WMMS), recibir derivaciones a centros médicos y gestionar situaciones de cobertura.

> Momento más crítico de la experiencia: impacta directamente en la percepción de la marca.

#### 4. Post-viaje
El cliente puede gestionar reintegros por gastos médicos o servicios cubiertos, presentar documentación y hacer seguimiento de casos abiertos durante el viaje.

> Una gestión clara y eficiente de reintegros contribuye a mantener la confianza y favorecer la recompra.

---

## 11. Prácticas de producto: PRDs y documentación

### 11.1 Template de PRD v2.0

ASSIST 365 mantiene un **template de PRD** publicado en Confluence con siete secciones estándar:

| # | Sección | Descripción |
|---|---------|-------------|
| 1 | Contexto | Antecedentes y motivación del feature |
| 2 | Objetivo | Qué se busca lograr y cómo se mide |
| 3 | Historias de usuario | Qué necesita cada actor del sistema |
| 4 | Pantallas involucradas | Descripción detallada de UI, elementos interactivos, reglas de negocio y edge cases |
| 5 | KPIs de éxito | Métricas para validar el impacto del feature |
| 6 | Eventos de tracking | **Requerimiento obligatorio para el cierre de tickets en Jira** |
| 7 | Dependencias | Integraciones, equipos y prerrequisitos técnicos |

> ⚠️ **Los eventos de tracking son obligatorios para el cierre de tickets Jira.** Esta regla está embebida en el template.

### 11.2 Herramientas y plataformas de documentación

| Herramienta | Uso |
|-------------|-----|
| **Confluence** | PRDs, templates, reglas de negocio, documentación técnica |
| **Jira** | Gestión de tickets y features (ej: FEAT-1939 para Bonus de Venta) |
| **Figma / FigJam** | Diseño de producto y diagramas |
| **Google Drive** | Documentos de contexto y estrategia |

### 11.3 Convenciones de publicación en Confluence

- Formato de escritura: **ADF** para publicaciones, **Markdown** para lecturas
- Colores de header en tablas: `#0052CC` con texto blanco explícito (`#FFFFFF`)
- Los colores deben declararse explícitamente en cada nodo (Confluence no hereda estilos de elementos padre)
- Republicar el cuerpo ADF completo en cada actualización (los números de versión se autoincrementan)

---

## 12. Posicionamiento competitivo

ASSIST 365 busca posicionarse como una **marca digital-first de asistencia al viajero**, diferenciándose de aseguradoras tradicionales por:

| Dimensión | ASSIST 365 | Competencia tradicional |
|-----------|-----------|------------------------|
| Canal de venta | 100% online / ecommerce | Offline + brokers |
| Adquisición | Afiliados + digital | Agencias de viaje, seguros |
| Autogestión | Portal Mi Voucher | Atención telefónica |
| Modelo operativo | White label / reseller (WTA, WMMS) | Producto propio |
| Foco | Experiencia digital end-to-end | Cobertura tradicional |

**Competidores directos:** Assist Card, Pax Assistance, Universal Assistance, IATI, Go Assistance.

**Ventajas competitivas:**
- Canal de afiliados consolidado (+50% de ventas)
- Modelo multiproveedor que permite flexibilidad y negociación
- Presencia y crecimiento sostenido en LATAM
- Capacidades data y IA en construcción

---

## 13. Visión de producto

La visión de producto de ASSIST 365 busca evolucionar hacia una plataforma que:

- Entienda el **ciclo de vida completo del cliente**
- Ofrezca **autogestión en tiempo real**
- Reduzca fricción operativa
- Permita decisiones **data-driven**
- Fortalezca la recompra

Uno de los grandes desafíos actuales es **centralizar y conectar la información del cliente**, dado que hoy los datos provienen de múltiples fuentes desconectadas.

**Roadmap en curso (Q1–Q2 2026):**

| Iniciativa | Estado |
|-----------|--------|
| Módulo Gestión de Códigos de Descuento | En producción ✅ |
| Módulo Bonus de Venta (BO) | En desarrollo |
| Gestión de Usuarios + base para recompra | En desarrollo |
| Integración Zendesk → Mi Voucher | WIP |
| Migración tecnológica con WTA | En desarrollo |
| Integración Emblue (email marketing) | Deployado ✅ |
| Notificaciones para afiliados (Web + BO) | Deployado ✅ |
| Autogestión Mi Voucher: cambio de fechas + upgrades | WIP |
| Mapa Mundial 2026 | Deployado ✅ |
| Migración ERP a Odoo | Q2 2026 |
| IA Enablement Program | En curso (Mar–Jul 2026) |

---

*Documento mantenido por el equipo de Producto · ASSIST 365 · 2026*
