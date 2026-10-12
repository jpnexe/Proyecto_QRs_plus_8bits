# HOJA DE RUTA SECUENCIAL DE EJECUCIÓN (TASKS)

> **Proyecto:** Proyecto_QR_plus
> **Ecosistema:** Astro (SSG / Islands Architecture) | Ninguno (Solo Frontend Estático / Jamstack) | Ninguna (Sitio Estático / Sin BD)
> **Patrón Arquitectónico:** SSG (Static Site Generation / Jamstack) (`Generación Estática en Compilación`)
> **Metodología:** Desarrollo Iterativo e Incremental Asistido por Inteligencia Artificial

---

## 📌 INSTRUCCIONES OPERATIVAS VINCULANTES PARA LA IA

1. **Secuencialidad Estricta:** Abordar las tareas en estricto orden secuencial fase por fase. Queda prohibido avanzar a fases posteriores si la fase activa presenta tareas pendientes o pruebas fallidas.
2. **Protocolo de Aprobación:** Solicitar confirmación al usuario antes de modificar el estado de cada tarea a `- [x]`.
3. **Comandos Recomendados del Stack:**
```bash
# Servidor de Desarrollo
npx astro dev

# Verificación de Tipos y Linter
npx tsc --noEmit && npm run lint

# Compilación de Producción
npx astro build
```

---

### Fase 1: Fase 1: Setup & Inicialización Jamstack
- [x] Inicializar repositorio con Astro (SSG / Islands Architecture) utilizando TypeScript + JavaScript + CSS con tipado estricto
- [x] Configurar Tailwind CSS v4 / v3 con variables del sistema de diseño (pixel_art) y paleta principal
- [x] Instalar y configurar conjunto de iconos con Remix Icon, Iconify (Framework Universal), Octicons (GitHub Primer)
- [x] Establecer scripts de build estático (SSG) y verificación de compilación limpia

#### Criterios de Aceptación y Definición de Terminado (DoD) de la Fase 1:
- [x] Todas las tareas de esta fase cuentan con pruebas unitarias o de integración operativas.
- [x] No existen errores de tipado en TypeScript (`npx tsc --noEmit` exitoso).
- [x] Los componentes construidos respetan los tokens y estética de `Pixel Art / Arcade UI (8-bit / 16-bit)`.
- [x] El usuario ha confirmado la revisión satisfactoria de este hito antes de iniciar la siguiente fase.

---

### Fase 2: Fase 2: Estructura de Contenido & Colecciones
- [x] Estructurar colecciones de contenido estático (Markdown / MDX / JSON) con validación de esquemas tipados (Zod / Frontmatter)
- [x] Estructurar colecciones de contenido y enrutamiento estático por archivos (File-based routing)
- [x] Crear plantillas maestras (Layouts) con metadatos de SEO, Open Graph y favicon dinámico
- [x] Configurar sitemap.xml y robots.txt automáticos para indexación en buscadores

#### Criterios de Aceptación y Definición de Terminado (DoD) de la Fase 2:
- [x] Todas las tareas de esta fase cuentan con pruebas unitarias o de integración operativas.
- [x] No existen errores de tipado en TypeScript (`npx tsc --noEmit` exitoso).
- [x] Los componentes construidos respetan los tokens y estética de `Pixel Art / Arcade UI (8-bit / 16-bit)`.
- [x] El usuario ha confirmado la revisión satisfactoria de este hito antes de iniciar la siguiente fase.

---

### Fase 3: Fase 3: Componentes UI & Sistema de Diseño
- [x] Construir componentes atómicos y reutilizables con estética pixel_art e iconos Remix Icon, Iconify (Framework Universal), Octicons (GitHub Primer)
- [x] Integrar microinteracciones y efectos reactivos con AutoAnimate (@formkit), Tailwind CSS Animate
- [x] Implementar componente para requerimiento: "Ventana para crear QRs"
- [x] Crear vistas principales responsivas con hidratación selectiva de islas cliente (client:visible/load)
- [x] Implementar conmutador de tema claro/oscuro sin salto de renderizado (FOUC)

#### Criterios de Aceptación y Definición de Terminado (DoD) de la Fase 3:
- [x] Todas las tareas de esta fase cuentan con pruebas unitarias o de integración operativas.
- [x] No existen errores de tipado en TypeScript (`npx tsc --noEmit` exitoso).
- [x] Los componentes construidos respetan los tokens y estética de `Pixel Art / Arcade UI (8-bit / 16-bit)`.
- [x] El usuario ha confirmado la revisión satisfactoria de este hito antes de iniciar la siguiente fase.

---

### Fase 4: Fase 4: Optimización SEO, Performance & Assets
- [x] Optimizar imágenes en formatos modernos (WebP/AVIF) con compresión y dimensiones explícitas
- [x] Purgar CSS no utilizado y auditar tree-shaking para lograr tamaño mínimo de JavaScript
- [x] Implementar buscador client-side ligero o indexación estática local si aplica
- [x] Auditar puntuación de Google Lighthouse (objetivo: 95+ en Rendimiento, Accesibilidad y SEO)

#### Criterios de Aceptación y Definición de Terminado (DoD) de la Fase 4:
- [x] Todas las tareas de esta fase cuentan con pruebas unitarias o de integración operativas.
- [x] No existen errores de tipado en TypeScript (`npx tsc --noEmit` exitoso).
- [x] Los componentes construidos respetan los tokens y estética de `Pixel Art / Arcade UI (8-bit / 16-bit)`.
- [x] El usuario ha confirmado la revisión satisfactoria de este hito antes de iniciar la siguiente fase.

---

### Fase 5: Fase 5: Despliegue en Edge CDN & Verificación
- [x] Configurar pipeline de CI/CD para compilación atómica continua con verificación de tipos
- [x] Desplegar artefactos estáticos en GitHub Pages con cabeceras de seguridad CSP y caché HTTP
- [x] Verificar ausencia de llamadas no autorizadas a servidores de backend en runtime
- [x] Auditoría final de accesibilidad WCAG AA y comprobación de enlaces rotos

#### Criterios de Aceptación y Definición de Terminado (DoD) de la Fase 5:
- [x] Todas las tareas de esta fase cuentan con pruebas unitarias o de integración operativas.
- [x] No existen errores de tipado en TypeScript (`npx tsc --noEmit` exitoso).
- [x] Los componentes construidos respetan los tokens y estética de `Pixel Art / Arcade UI (8-bit / 16-bit)`.
- [x] El usuario ha confirmado la revisión satisfactoria de este hito antes de iniciar la siguiente fase.

