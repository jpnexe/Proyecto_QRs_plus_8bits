# ESPECIFICACIÓN DE ARQUITECTURA TÉCNICA

> **Proyecto:** Proyecto_QR_plus
> **Versión:** `1.0.0`
> **Plataforma:** `STATIC` (⚡ Jamstack SSG)
> **Patrón Arquitectónico:** `SSG (Static Site Generation / Jamstack)`

---

## 1. MATRIZ DE LA PILA TECNOLÓGICA (TECH STACK)

| Dimensión | Tecnología Asignada | Enfoque y Justificación Técnica |
| :--- | :--- | :--- |
| **Plataforma Objetivo** | `STATIC` | ⚡ Jamstack / SSG (Cero Servidores Backend) |
| **Lenguajes** | `TypeScript, JavaScript, CSS` | Tipado estricto sin uso de `any` ni conversiones ambiguas |
| **Capa de Frontend** | `Astro (SSG / Islands Architecture)` | Generador de Sitios Estáticos & Arquitectura de Islas (`Content-driven SSG + Partial Hydration (Islands Architecture)`) |
| **Capa de Backend** | `Ninguno (Solo Frontend Estático / Jamstack)` | Arquitectura Serverless / Cero Servidores Backend |
| **Persistencia / BD** | `Ninguna (Sitio Estático / Sin BD)` | Sin Persistencia Externa / Contenido en Archivos |
| **Protocolo de Enlace** | `Archivos Estáticos Locales (Markdown / MDX / JSON)` | Archivos locales / Build-time fetch |
| **Patrón Arquitectónico** | `SSG (Static Site Generation / Jamstack)` | Generación Estática en Compilación |
| **Distribución / CDN** | `GitHub Pages` | Red perimetral Edge CDN global con alta disponibilidad |

---

## 2. FICHAS TÉCNICAS PROFUNDAS DE TECNOLOGÍAS SELECCIONADAS

### 2.1 Frontend: Astro (SSG / Islands Architecture)
- **Categoría:** Generador de Sitios Estáticos & Arquitectura de Islas
- **Paradigma Operativo:** `Content-driven SSG + Partial Hydration (Islands Architecture)`
- **Descripción:** Framework web moderno orientado a contenido que prioriza la entrega de cero JavaScript al cliente por defecto mediante Static Site Generation (SSG) y componentes de islas hidratadas bajo demanda.
- **Guía de Arquitectura:**
  Astro renderiza todo el marcado HTML en tiempo de compilación (build time). Los componentes interactivos (React, Vue, Svelte) se aíslan en "islas" independientes y solo cargan su JavaScript cuando cumplen directivas del cliente (ej. `client:visible`, `client:idle` o `client:media`). Cero JS innecesario en el hilo principal.
- **Comandos CLI Esenciales:**
```bash
# Iniciar Servidor Dev
npx astro dev

# Compilar Bundle SSG
npx astro build

# Previsualizar Build Local
npx astro preview

# Chequeo de Tipos de Contenido
npx astro check
```
- **Librerías Clave del Ecosistema:** @astrojs/tailwind, @astrojs/mdx, @astrojs/sitemap, pagefind (búsqueda estática), zod
- **Directivas de Rendimiento:**
  - Prohibido usar client:load a menos que el componente sea crítico para el renderizado inicial arriba del pliegue (above-the-fold).
  - Utilizar client:visible para modales, carruseles y secciones inferiores.
  - Procesar todas las imágenes mediante el componente nativo <Image /> de Astro con formatos AVIF y WebP automáticos.
  - Asegurar un puntaje de Google Lighthouse de 98+ en Rendimiento y SEO.
- **Buenas Prácticas de Ingeniería:**
  - Utilizar Content Collections para todo contenido editorial con tipado Zod en src/content/config.ts.
  - Separar componentes de maquetación pura (.astro) de la lógica reactiva de islas (.tsx).
  - Configurar adapter de exportación estática en astro.config.mjs.
- **Errores Comunes y Antipatrones a Evitar:**
  - ⚠️ Importar librerías que requieran el objeto window o document en la sección de frontmatter de componentes .astro.
  - ⚠️ Olvidar declarar getStaticPaths() en rutas con parámetros dinámicos [...slug].astro.

---

### 2.2 Backend: Ninguno (Solo Frontend Estático / Jamstack)
- **Categoría:** Arquitectura Serverless / Cero Servidores Backend
- **Paradigma Operativo:** `Jamstack (JavaScript, APIs, Markup) - Serverless Edge`
- **Descripción:** La solución prescinde por completo de servidores dinámicos de backend tradicionales. Todo el contenido y las reglas de negocio se resuelven en tiempo de compilación o mediante APIs públicas sin estado.
- **Guía de Arquitectura:**
  No existe servidor que mantener, parchear ni escalar. El código se compila a un bundle estático distribuido globalmente en Edge CDNs (Cloudflare Pages, Vercel, Netlify). La persistencia se basa en archivos versionados en Git (Markdown/MDX/JSON) o microservicios serverless bajo demanda.
- **Comandos CLI Esenciales:**
```bash
# Compilación Estática
npm run build

# Servidor Local de Prueba
npx serve dist
```
- **Librerías Clave:** Static CDN Hosting, Local Markdown/MDX, Client-side APIs
- **Directivas de Rendimiento:**
  - Latencia de primer byte (TTFB) inferior a 50ms gracias al cacheo distribuido en Edge CDN.
  - Cero coste recurrente mensual de infraestructura de servidores.
- **Seguridad en Backend:**
  - 🛡️ No hay superficies de ataque basadas en ejecución de código en servidor ni bases de datos expuestas en red.

---

### 2.3 Persistencia y Datos: Ninguna (Sitio Estático / Sin BD)
- **Categoría:** Sin Persistencia Externa / Contenido en Archivos
- **Paradigma Operativo:** `Git-backed Content Repository`
- **Descripción:** El proyecto no requiere base de datos relacional ni documental. Toda la información reside en archivos estáticos locales versionados junto con el código fuente.
- **Guía de Arquitectura:**
  Los datos se almacenan en archivos estructurados (.md, .mdx, .json) en la carpeta del proyecto. Durante el proceso de build, estos archivos son leídos, parseados, validados contra esquemas tipados y compilados a páginas HTML optimizadas.
- **Comandos CLI Esenciales:**
```bash
# Validar Formato JSON
npx prettier --check "src/content/**/*.json"
```
- **Buenas Prácticas de Datos:**
  - Validar el frontmatter de todos los documentos con esquemas Zod en compilación.
- **Directivas de Rendimiento:**
  - Tiempos de lectura instantáneos en build; cero sobrecarga de red en runtime.

---

## 3. FLUJO DE DATOS DE EXTREMO A EXTREMO (END-TO-END DATA FLOW)

El ciclo de vida de una petición dentro del sistema sigue un flujo unidireccional y predecible:

```mermaid
flowchart TD
    A[Usuario / Interfaz Cliente] -->|1. Evento / Petición Tipada| B[Capa de Presentación / UI Components]
    B -->|2. Validación de Entrada Zod| C[Servicios de API / State Store]
    C -->|3. Archivos Estáticos Locales (Markdown / MDX / JSON)| D[Controladores / Route Handlers]
    D -->|4. Casos de Uso / Servicios de Negocio| E[Lógica de Dominio Pura]
    E -->|5. Repositorio / Abstracción de Datos| F[Ninguna (Sitio Estático / Sin BD)]
    F -->|6. Datos Crudos Persistidos| E
    E -->|7. DTOs Sanitizados| D
    D -->|8. Carga Útil Estandarizada| C
    C -->|9. Renderizado Reactivo| B
    B -->|10. Retroalimentación Visual| A
```

1. **Interacción del Usuario:** El usuario dispara una acción en un componente visual gobernado por los tokens de `DESIGN.md`.
2. **Validación en Frontera:** Los datos del formulario o acción se validan mediante esquemas antes de salir del cliente.
3. **Transporte de Red:** La petición se emite mediante **Archivos Estáticos Locales (Markdown / MDX / JSON)** con cabeceras de autorización y trazabilidad.
4. **Capa de Control:** El backend (o función serverless/handler) valida la carga útil y la pasa a la capa de servicios.
5. **Dominio Empresarial:** Se ejecutan las reglas invariantes de negocio desacopladas de frameworks.
6. **Persistencia:** Se consulta o muta la base de datos **Ninguna (Sitio Estático / Sin BD)** utilizando transacciones atómicas si aplica.
7. **Respuesta Serializada:** Se devuelve un payload normalizado con metadatos de paginación y tiempo de procesamiento.

---

## 4. CONTRATO DE RESPUESTAS Y PROTOCOLO DE CONECTIVIDAD

Toda comunicación a través de **Archivos Estáticos Locales (Markdown / MDX / JSON)** debe cumplir el siguiente formato estándar:

### 4.1 Respuesta Exitosa Estándar (HTTP 200 / 201)
```json
{
  "success": true,
  "data": {
    "id": "uuid-v4",
    "attributes": {}
  },
  "error": null,
  "meta": {
    "timestamp": "2026-10-11T00:00:00Z",
    "version": "1.0.0",
    "executionTimeMs": 24
  }
}
```

### 4.2 Respuesta de Error Estandarizada (RFC 7807 Problem Details)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los parámetros suministrados no cumplen las restricciones del esquema.",
    "details": [
      {
        "field": "email",
        "issue": "Formato de correo electrónico inválido"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-10-11T00:00:00Z",
    "traceId": "req-987654321"
  }
}
```

---

## 5. ESTRUCTURA CANÓNICA DE DIRECTORIOS: SSG (Static Site Generation / Jamstack)

La base de código DEBE organizarse estrictamente según el siguiente árbol de carpetas comentado:

```
dist/
├── index.html
├── 404.html
├── blog/
│   └── post-1/index.html
└── assets/
```

---

## 6. NORMAS DE NOMENCLATURA & ESTILO DE CÓDIGO

- **Archivos de Componentes:** `PascalCase.tsx` (ej. `UserProfileCard.tsx`).
- **Archivos de Utilidades y Servicios:** `camelCase.ts` (ej. `authService.ts`, `formatCurrency.ts`).
- **Variables y Funciones:** `camelCase` explícito, auto-documentado y libre de abreviaturas crípticas.
- **Tipos, Interfaces y Clases:** `PascalCase` sin prefijo "I" húngaro (ej. `UserProfile` en lugar de `IUserProfile`).
- **Variables de Entorno:** `SCREAMING_SNAKE_CASE` (ej. `DATABASE_URL`, `API_SECRET_KEY`).
- **Tablas y Columnas en Base de Datos:** `snake_case` en minúsculas y plural (ej. `user_profiles`, `created_at`).

---

## 7. DIRECTIVAS ARQUITECTÓNICAS VINCULANTES PARA LA IA

1. **Separación Estricta de Capas:** La capa de presentación visual nunca debe ejecutar consultas directas de base de datos ni contener lógica SQL embebida.
2. **Inyección y Desacoplamiento:** Favorecer contratos e interfaces sobre implementaciones concretas para facilitar la sustitución de componentes y la ejecución de pruebas automatizadas.
3. **Manejo Centralizado de Excepciones:** Todas las fallas de infraestructura deben capturarse y traducirse a excepciones de dominio legibles.
4. **Cero Secretos en el Cliente:** Jamás exponer variables de entorno sensibles en componentes que compilen al navegador del usuario.


### Directivas Particulares del Proyecto:
que sea lo mas intuitiva posible

