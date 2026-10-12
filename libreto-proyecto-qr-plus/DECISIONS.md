# REGISTRO DE DECISIONES DE ARQUITECTURA (ADR)

> **Proyecto:** Proyecto_QR_plus
> **Propósito:** Documentar formalmente las elecciones tecnológicas fundamentales y prevenir desviaciones no autorizadas en el desarrollo asistido por IA.

---

## 🚫 DIRECTIVA VINCULANTE A LA INTELIGENCIA ARTIFICIAL

> **PROHIBICIÓN ESTRICTA DE MIGRACIÓN:**
> La IA tiene **estrictamente prohibido** sugerir, iniciar o ejecutar migraciones a tecnologías, frameworks, gestores de estado o librerías alternativas distintas a las ratificadas en este documento, a menos que el usuario lo solicite de forma explícita y documentada.

---


### ADR-001: Lenguajes de Programación y Tipado: TypeScript, JavaScript, CSS
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** Se requiere un estándar estricto de tipado y ergonomía de desarrollo para minimizar defectos en tiempo de ejecución en la plataforma STATIC.
- **Decisión:** Se ratifica el uso oficial de **TypeScript, JavaScript, CSS** con configuración de tipado estricto y contratos de datos inmutables.
- **Consecuencias:** Todo código nuevo debe apegarse a contratos tipados; prohibido el uso de tipos implícitos ambiguos.
- **Alternativas Descartadas:** Lenguajes no tipados o dialectos no compatibles con el pipeline de compilación.

---

### ADR-002: Adopción del Framework Frontend: Astro (SSG / Islands Architecture)
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** Se requiere una solución visual de alto rendimiento, excelente experiencia de desarrollo y sólida modularidad.
- **Decisión:** Se adopta de forma oficial y vinculante **Astro (SSG / Islands Architecture)** (Generador de Sitios Estáticos & Arquitectura de Islas) bajo el paradigma `Content-driven SSG + Partial Hydration (Islands Architecture)`.
- **Consecuencias:** Todas las vistas, componentes y estados de cliente deben implementarse exclusivamente conforme a las convenciones de este framework. Queda prohibida la introducción de librerías visuales concurrentes que inflen el bundle.
- **Alternativas Descartadas:** Frameworks no consensuados o librerías legacy incompatibles con el stack ratificado.

---

### ADR-003: Estrategia de Backend y Runtime: Ninguno (Solo Frontend Estático / Jamstack)
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** La lógica de negocio y persistencia requiere un entorno de procesamiento confiable y escalable que se comunique a través de Archivos Estáticos Locales (Markdown / MDX / JSON).
- **Decisión:** Se selecciona **Ninguno (Solo Frontend Estático / Jamstack)** como el motor de backend oficial.
- **Consecuencias:** Garantiza contratos de API uniformes, validación robusta y cumplimiento de los patrones de desacoplamiento.
- **Alternativas Descartadas:** Monolitos no estructurados, servidores desprovistos de tipado estricto o servicios no pactados.

---

### ADR-004: Motor de Persistencia y Base de Datos: Ninguna (Sitio Estático / Sin BD)
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** El sistema requiere persistencia segura y transaccional acorde a la naturaleza de los requerimientos funcionales del proyecto.
- **Decisión:** Se implementa **Ninguna (Sitio Estático / Sin BD)** (Sin Persistencia Externa / Contenido en Archivos) como la capa de persistencia autorizada.
- **Consecuencias:** Todas las consultas, migraciones de esquema e índices deben optimizarse específicamente para las capacidades nativas de este motor.
- **Alternativas Descartadas:** Bases de datos no acordadas que requieran infraestructuras o licencias no autorizadas por el equipo.

---

### ADR-005: Sistema de Diseño Visual, Animaciones e Iconografía
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** Garantizar coherencia estética ejecutiva, accesibilidad WCAG y velocidad de maquetación en el equipo.
- **Decisión:** Se establece el estilo visual **Pixel Art / Arcade UI (8-bit / 16-bit)** con el framework **Tailwind CSS v4 / v3**, tipografía **Inter, system-ui, sans-serif**, animaciones en **AutoAnimate (@formkit), Tailwind CSS Animate** e iconografía en **Remix Icon, Iconify (Framework Universal), Octicons (GitHub Primer)**.
- **Consecuencias:** Queda terminantemente prohibido escribir CSS en línea desordenado fuera de los tokens semánticos definidos en `DESIGN.md`.
- **Alternativas Descartadas:** Librerías pesadas de componentes que impidan la personalización de los tokens visuales del estilo.

---

### ADR-006: Protocolo de Integración y Conexión: Archivos Estáticos Locales (Markdown / MDX / JSON)
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** Definir el canal de transporte e intercambio de datos entre cliente y servidor.
- **Decisión:** Se adopta el protocolo **Archivos Estáticos Locales (Markdown / MDX / JSON)** con contratos estandarizados de serialización.
- **Consecuencias:** Toda comunicación externa debe fluir a través de este estándar con manejo defensivo de fallas de red.
- **Alternativas Descartadas:** Protocolos propietarios o no compatibles con la infraestructura de red del proyecto.

---

### ADR-007: Patrón Arquitectónico del Software: SSG (Static Site Generation / Jamstack)
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** Para evitar la deuda técnica y permitir la evolución desacoplada de la base de código.
- **Decisión:** Se ratifica el patrón **SSG (Static Site Generation / Jamstack)** como la directiva estructural obligatoria.
- **Consecuencias:** El código debe segregarse estrictamente por capas funcionales según el árbol canónico de carpetas documentado en `ARCHITECTURE.md`.
- **Alternativas Descartadas:** Estructuras planas sin separación de responsabilidades ("Código Espagueti").

---

### ADR-008: Gestión de Seguridad, Variables de Entorno y Secretos
- **Estado:** ✅ Aprobado y Ratificado
- **Contexto:** Prevenir filtraciones de credenciales de infraestructura o claves de APIs privadas en repositorios de código abierto o compartidos.
- **Decisión:** Se establece una política de cero secretos comiteados en Git, uso obligatorio de `.env.example` y almacenamiento de tokens de sesión exclusivamente en cookies HttpOnly o bóvedas nativas.
- **Consecuencias:** Toda variable requerida debe documentarse y auditarse en revisiones de código previas a la integración.
- **Alternativas Descartadas:** Hardcodear cadenas de conexión o llaves de API directamente en el código fuente.



