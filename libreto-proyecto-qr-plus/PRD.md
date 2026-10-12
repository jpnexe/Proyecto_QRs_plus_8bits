# PRD & ESPECIFICACIÓN DE REQUERIMIENTOS: PROYECTO_QR_PLUS

> **Documento:** Product Requirements Document (PRD) & Master Prompt
> **Versión del Producto:** `1.0.0` | **Fecha de Emisión:** 11/10/2026 | **Última Revisión:** 11/10/2026
> **Público Objetivo:** Mi persona
> **Plataforma:** `STATIC` (⚡ Sitio Estático Jamstack / SSG)

---

## 1. RESUMEN EJECUTIVO & PROPÓSITO DEL PRODUCTO

### 1.1 Declaración del Problema y Visión de Solución
Es una aplicación que permite crear y personalizar códigos QR basados de: imágenes, links, archivos etc y además de esto agregar el logo, personalizar el estilo del QR, añade la función de modo claro y oscuro y compatibilidad para visualización y usabilidad en dispositivos móviles

### 1.2 Objetivos Estratégicos & Factores Críticos de Éxito
- **Alineación Tecnológica:** Construido sobre la base de **Astro (SSG / Islands Architecture)**, **Ninguno (Solo Frontend Estático / Jamstack)** y persistencia en **Ninguna (Sitio Estático / Sin BD)**.
- **Identidad Visual Distintiva:** Interfaz gobernada por el estilo **Pixel Art / Arcade UI (8-bit / 16-bit)** (Retro & Arcade) bajo el framework **Tailwind CSS v4 / v3**.
- **Time-to-Market:** Desarrollo incremental por fases estructuradas en `TASKS.md` con verificación continua de calidad.
- **Rendimiento de Clase Mundial:** Cumplimiento de los SLAs de latencia y disponibilidad definidos en los requerimientos no funcionales.

---

## 2. MATRIZ DE REQUERIMIENTOS FUNCIONALES (ALCANCE MVP)

El sistema debe satisfacer sin excepción los siguientes requerimientos funcionales prioritarios:

### RF-001: Ventana para crear QRs
- **Prioridad:** Crítica (MVP Bloqueante)
- **Descripción:** Implementación integral del flujo operativo correspondiente a "Ventana para crear QRs".
- **Criterios de Aceptación (BDD):**
  - **Dado que** el usuario se encuentra autenticado con los permisos requeridos (o navega en modo público si aplica),
  - **Cuando** interactúa con los controles de la interfaz para activar esta funcionalidad,
  - **Entonces** el sistema procesa la solicitud con validación estricta de esquemas y responde en menos de 200ms sin errores visuales ni excepciones no controladas.
- **Definición de Terminado (DoD):**
  - [ ] Interfaz reactiva responsiva según los lineamientos de `DESIGN.md`.
  - [ ] Validación de entradas en frontera (Zod/DTO) y manejo defensivo de errores.
  - [ ] Pruebas unitarias que validen casos de éxito y de borde (edge cases).

### RF-002: ventana para personalizar QRs
- **Prioridad:** Alta
- **Descripción:** Implementación integral del flujo operativo correspondiente a "ventana para personalizar QRs".
- **Criterios de Aceptación (BDD):**
  - **Dado que** el usuario se encuentra autenticado con los permisos requeridos (o navega en modo público si aplica),
  - **Cuando** interactúa con los controles de la interfaz para activar esta funcionalidad,
  - **Entonces** el sistema procesa la solicitud con validación estricta de esquemas y responde en menos de 200ms sin errores visuales ni excepciones no controladas.
- **Definición de Terminado (DoD):**
  - [ ] Interfaz reactiva responsiva según los lineamientos de `DESIGN.md`.
  - [ ] Validación de entradas en frontera (Zod/DTO) y manejo defensivo de errores.
  - [ ] Pruebas unitarias que validen casos de éxito y de borde (edge cases).

### RF-003: interfaz responsible
- **Prioridad:** Alta
- **Descripción:** Implementación integral del flujo operativo correspondiente a "interfaz responsible".
- **Criterios de Aceptación (BDD):**
  - **Dado que** el usuario se encuentra autenticado con los permisos requeridos (o navega en modo público si aplica),
  - **Cuando** interactúa con los controles de la interfaz para activar esta funcionalidad,
  - **Entonces** el sistema procesa la solicitud con validación estricta de esquemas y responde en menos de 200ms sin errores visuales ni excepciones no controladas.
- **Definición de Terminado (DoD):**
  - [ ] Interfaz reactiva responsiva según los lineamientos de `DESIGN.md`.
  - [ ] Validación de entradas en frontera (Zod/DTO) y manejo defensivo de errores.
  - [ ] Pruebas unitarias que validen casos de éxito y de borde (edge cases).

### RF-004: botón de descargar e historial de qr
- **Prioridad:** Media
- **Descripción:** Implementación integral del flujo operativo correspondiente a "botón de descargar e historial de qr".
- **Criterios de Aceptación (BDD):**
  - **Dado que** el usuario se encuentra autenticado con los permisos requeridos (o navega en modo público si aplica),
  - **Cuando** interactúa con los controles de la interfaz para activar esta funcionalidad,
  - **Entonces** el sistema procesa la solicitud con validación estricta de esquemas y responde en menos de 200ms sin errores visuales ni excepciones no controladas.
- **Definición de Terminado (DoD):**
  - [ ] Interfaz reactiva responsiva según los lineamientos de `DESIGN.md`.
  - [ ] Validación de entradas en frontera (Zod/DTO) y manejo defensivo de errores.
  - [ ] Pruebas unitarias que validen casos de éxito y de borde (edge cases).

---

## 3. REQUERIMIENTOS NO FUNCIONALES (NFR) & CRITERIOS DE INGENIERÍA

#### NFR-1: Tiempo de carga inicial inferior a 1.5s.
- **Estándar:** Cumplimiento estricto en todos los entornos de despliegue.
- **Métrica de Verificación:** Verificable mediante auditorías automatizadas y pruebas de carga.

#### NFR-2: Diseño responsivo optimizado para móviles y pantallas grandes.
- **Estándar:** Cumplimiento estricto en todos los entornos de despliegue.
- **Métrica de Verificación:** Verificable mediante auditorías automatizadas y pruebas de carga.

#### NFR-3: Compatibilidad con navegadores modernos (Chrome, Firefox, Safari, Edge).
- **Estándar:** Cumplimiento estricto en todos los entornos de despliegue.
- **Métrica de Verificación:** Verificable mediante auditorías automatizadas y pruebas de carga.

### 3.1 Directivas de Rendimiento del Stack Tecnológico
- **Frontend (Astro (SSG / Islands Architecture)):** Prohibido usar client:load a menos que el componente sea crítico para el renderizado inicial arriba del pliegue (above-the-fold). Utilizar client:visible para modales, carruseles y secciones inferiores. Procesar todas las imágenes mediante el componente nativo <Image /> de Astro con formatos AVIF y WebP automáticos. Asegurar un puntaje de Google Lighthouse de 98+ en Rendimiento y SEO.
- **Backend (Ninguno (Solo Frontend Estático / Jamstack)):** Latencia de primer byte (TTFB) inferior a 50ms gracias al cacheo distribuido en Edge CDN. Cero coste recurrente mensual de infraestructura de servidores.
- **Persistencia (Ninguna (Sitio Estático / Sin BD)):** Tiempos de lectura instantáneos en build; cero sobrecarga de red en runtime.

---

## 4. HISTORIAS DE USUARIO Y ESCENARIOS DE COMPORTAMIENTO (BDD)

### Historia de Usuario US-001
> **Enunciado:** "Como usuario, quiero acceder de manera rápida y segura para consultar mis datos."
- **Actor Principal:** Mi persona
- **Valor de Negocio:** Garantiza una experiencia intuitiva, fluida y predecible que incrementa la retención y reduce la tasa de abandono.
- **Condiciones Previas:** La sesión y el estado de la aplicación deben estar sincronizados.
- **Flujo Principal:** El usuario ejecuta la acción prevista recibiendo retroalimentación háptica o visual inmediata (skeletons / spinners / toast notifications).

### Historia de Usuario US-002
> **Enunciado:** "Como administrador, quiero gestionar los permisos y accesos de los usuarios."
- **Actor Principal:** Mi persona
- **Valor de Negocio:** Garantiza una experiencia intuitiva, fluida y predecible que incrementa la retención y reduce la tasa de abandono.
- **Condiciones Previas:** La sesión y el estado de la aplicación deben estar sincronizados.
- **Flujo Principal:** El usuario ejecuta la acción prevista recibiendo retroalimentación háptica o visual inmediata (skeletons / spinners / toast notifications).

---

## 5. DICCIONARIO TÉCNICO & GLOSARIO DE CONCEPTOS DEL SISTEMA

Para garantizar una comprensión unívoca entre el equipo humano y los asistentes de Inteligencia Artificial, se establecen las siguientes definiciones formales:

- **Astro (SSG / Islands Architecture):** Framework web moderno orientado a contenido que prioriza la entrega de cero JavaScript al cliente por defecto mediante Static Site Generation (SSG) y componentes de islas hidratadas bajo demanda.
  *Paradigma clave:* `Content-driven SSG + Partial Hydration (Islands Architecture)`.
- **Ninguno (Solo Frontend Estático / Jamstack):** La solución prescinde por completo de servidores dinámicos de backend tradicionales. Todo el contenido y las reglas de negocio se resuelven en tiempo de compilación o mediante APIs públicas sin estado.
  *Paradigma clave:* `Jamstack (JavaScript, APIs, Markup) - Serverless Edge`.
- **Ninguna (Sitio Estático / Sin BD):** El proyecto no requiere base de datos relacional ni documental. Toda la información reside en archivos estáticos locales versionados junto con el código fuente.
  *Paradigma clave:* `Git-backed Content Repository`.
- **SSG (Static Site Generation / Jamstack):** Patrón donde todo el marcado HTML, CSS y assets se compilan de antemano durante el build y se distribuyen en una red global CDN, eliminando la necesidad de servidores de renderizado en runtime.
  *Enfoque:* Toda la información se procesa una sola vez durante el pipeline de integración continua. El resultado es un conjunto de archivos estáticos HTML/CSS/JS inmutables con hashes de contenido para invalidación de caché instantánea.
- **Pixel Art / Arcade UI (8-bit / 16-bit):** Estética retro de videojuegos arcade de 8 y 16 bits con bordes pixelados escalonados y tipografías bitmap clásicas.

---

## 6. PROMPT MAESTRO DE INICIALIZACIÓN PARA EL ASISTENTE IA

```markdown
### INSTRUCCIONES DE IDENTIDAD, ROL Y MISIÓN PARA EL ASISTENTE IA

Actúa como el **Arquitecto de Software Principal y Desarrollador Senior Líder** del proyecto "Proyecto_QR_plus".

#### 1. MISIÓN Y CONTEXTO VINCULANTE:
- **Nombre del Producto:** Proyecto_QR_plus
- **Descripción:** Es una aplicación que permite crear y personalizar códigos QR basados de: imágenes, links, archivos etc y además de esto agregar el logo, personalizar el estilo del QR, añade la función de modo claro y oscuro y compatibilidad para visualización y usabilidad en dispositivos móviles
- **Audiencia Objetivo:** Mi persona
- **Plataforma:** STATIC
- **Pila Tecnológica Ratificada:**
  - Frontend: Astro (SSG / Islands Architecture) (Content-driven SSG + Partial Hydration (Islands Architecture))
  - Backend: Ninguno (Solo Frontend Estático / Jamstack)
  - Base de Datos: Ninguna (Sitio Estático / Sin BD)
  - Patrón Arquitectónico: SSG (Static Site Generation / Jamstack)
  - Conectividad: Archivos Estáticos Locales (Markdown / MDX / JSON)
- **Sistema de Diseño:** pixel_art (Tailwind CSS v4 / v3) con paleta: Primario (#3B82F6), Secundario (#10B981)
- **Tono y Filosofía Operativa:** Pragmático y Conciso: Código conciso y directo al grano, sin explicaciones redundantes, máxima eficiencia.

#### 2. CONTRATO DE TRABAJO Y CUMPLIMIENTO DOCUMENTAL OBLIGATORIO:
Antes de generar código, instalar dependencias o proponer cambios, DEBES leer e internalizar los 8 archivos maestros:
1. `RULES.md`: **REGLA DE ORO INAMOVIBLE**. Solicitar aprobación explícita antes de ejecutar comandos, crear archivos o instalar librerías.
2. `ARCHITECTURE.md`: Obedecer la estructura de carpetas, separación de capas y contratos de API ratificados.
3. `DESIGN.md`: Utilizar estrictamente los tokens de color, componentes y librerías visuales autorizadas.
4. `DECISIONS.md`: Respetar los registros ADR y abstenerse de proponer tecnologías descartadas.
5. `SECURITY.md`: Aplicar validación de esquemas Zod en frontera, mitigación de OWASP y cero secretos en Git.
6. `TASKS.md`: Avanzar fase por fase de forma secuencial sin saltar requerimientos ni omitir pruebas.
7. `MEMORY.md`: Consultar y actualizar la bitácora tras cada hito completado.


#### 4. PROTOCOLO OBLIGATORIO DE PRIMERA RESPUESTA:
En tu primera interacción, debes:
1. Confirmar la asimilación completa de este PRD y los archivos directivos.
2. Resumir la pila técnica seleccionada y los requerimientos funcionales críticos de la Fase 1 en `TASKS.md`.
3. Proponer el plan de acción inmediato y SOLICITAR CONFIRMACIÓN EXPLÍCITA antes de escribir cualquier archivo o ejecutar comandos.
```
