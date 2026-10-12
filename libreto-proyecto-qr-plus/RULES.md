# REGLAS DE COMPORTAMIENTO VINCULANTES PARA LA INTELIGENCIA ARTIFICIAL

> **Documento Legal y Operativo de Cumplimiento Innegociable**
> **Proyecto:** Proyecto_QR_plus
> **Stack Ratificado:** Astro (SSG / Islands Architecture) + Ninguno (Solo Frontend Estático / Jamstack) + Ninguna (Sitio Estático / Sin BD)
> **Lenguajes:** TypeScript, JavaScript, CSS

---

## ⚡ REGLA DE ORO OBLIGATORIA (MÁXIMA PRIORIDAD OPERATIVA)

> ### 🛑 REGLA DE ORO INAMOVIBLE:
> **«La Inteligencia Artificial DEBE preguntar siempre y solicitar aprobación explícita al usuario ANTES de instalar dependencias, ejecutar comandos en terminal, crear nuevos archivos o modificar funcionalidad existente. Debe presentar siempre un resumen previo con los archivos afectados y el impacto del cambio antes de tocar el código».**

Cualquier acción unilateral en la que el asistente instale librerías no pactadas, sobreescriba configuraciones de entorno o modifique archivos estructurales sin autorización previa constituye una violación crítica de este protocolo.

---

## 📋 DIRECTIVAS TÉCNICAS OBLIGATORIAS DE INGENIERÍA

### Directiva 1: Modificaciones Atómicas y Quirúrgicas
- **Prohibición de Sobrescrituras Masivas:** Queda terminantemente prohibido reescribir archivos enteros cuando solo se requiere modificar un bloque acotado de líneas.
- **Técnica Obligatoria:** Utilizar reemplazos dirigidos y preservar rigurosamente todos los comentarios, documentación y tipos existentes no relacionados con la modificación.

### Directiva 2: Tipado Estricto Sin Excepciones
- **Prohibición de Any:** Queda prohibido el uso de `any`, conversiones arbitrarias (`as unknown as T`) o tipados implícitos no verificados.
- **Contratos Explícitos:** Cada parámetro de función, valor de retorno, estado reactivo y carga útil de API debe contar con una interfaz o tipo explícito exportado.

### Directiva 3: Manejo Obligatorio y Defensivo de Excepciones
- **Bloques Try/Catch:** Toda operación asíncrona, llamada a API o mutación de base de datos debe encapsularse en bloques `try/catch` estructurados.
- **Códigos Semánticos:** Mapear excepciones a códigos HTTP semánticos (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Error) evitando responder 200 OK con cuerpos que contengan mensajes de falla.

### Directiva 4: Modularidad Estricta y Límite de 50 Líneas Útiles
- **Límite por Función:** Ninguna función, método o componente individual debe exceder las 50 líneas de código útil.
- **Descomposición:** Si una función crece más allá de este límite, DEBE descomponerse en funciones auxiliares puras, custom hooks o subcomponentes desacoplados.

### Directiva 5: Estándar Conventional Commits
- Todo mensaje de commit debe seguir la convención internacional:
  - `feat:` Nueva funcionalidad para el usuario.
  - `fix:` Corrección de un defecto o error reportado.
  - `refactor:` Reestructuración de código sin alterar su comportamiento externo.
  - `docs:` Modificaciones exclusivas en documentación.
  - `test:` Creación o ajuste de pruebas unitarias o de integración.
  - `chore:` Mantenimiento de configuración, dependencias o tooling.

### Directiva 6: Mandato de Cobertura de Pruebas Automatizadas
- Cada nuevo módulo de lógica empresarial, utilidad matemática o formateador debe acompañarse de su correspondiente archivo de pruebas unitarias (`*.test.ts` o `*.spec.ts`).


### Directiva 7: Estándares Obligatorios de Lenguaje (TypeScript + JavaScript + CSS)
- **Tipado Fuerte y Contratos:** Todo código escrito en TypeScript / JavaScript / CSS debe apegarse a las directivas idiomáticas oficiales, tipos explícitos y contratos inmutables.
- **Validación con Linter:** El código debe superar las reglas de linter y formateador oficial antes de integrarse en producción.


### Directiva 8: Tokens y Librerías de Diseño Ratificadas
- **Tokens del Estilo (Pixel Art / Arcade UI (8-bit / 16-bit)):** Prohibido el uso de colores hexadecimales arbitrarios o márgenes fuera de la escala de `Tailwind CSS v4 / v3`.
- **Librerías de Animación Autorizadas:** Queda terminantemente prohibido instalar motores de animación concurrentes; usar exclusivamente: **`AutoAnimate (@formkit), Tailwind CSS Animate`**.
- **Librerías de Iconos Autorizadas:** Utilizar únicamente la familia ratificada: **`Remix Icon, Iconify (Framework Universal), Octicons (GitHub Primer)`**.



---

## 🛡️ PROTOCOLO ESTÁNDAR DE INTERACCIÓN ANTES DE CADA ACCIÓN

Antes de sugerir o aplicar cualquier cambio sobre el código fuente, el asistente IA debe emitir una propuesta con la siguiente estructura de 4 puntos:

1. **🎯 Objetivo y Razón del Cambio:**
   Explicación concisa y técnica de qué se va a resolver y por qué es necesario.
2. **📁 Archivos Afectados:**
   Lista explícita de rutas de archivo que se crearán, editarán o eliminarán.
3. **📦 Dependencias / Comandos CLI Requeridos (si aplica):**
   Comando exacto a ejecutar y justificación técnica del paquete solicitado.
4. **❓ Solicitud Formal de Confirmación:**
   *"¿Autorizas la ejecución de estos cambios según lo descrito?"*
