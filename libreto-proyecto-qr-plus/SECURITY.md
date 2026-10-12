# MANUAL Y DIRECTRICES DE SEGURIDAD INFORMÁTICA

> **Proyecto:** Proyecto_QR_plus
> **Stack Ratificado:** Astro (SSG / Islands Architecture) + Ninguno (Solo Frontend Estático / Jamstack) + Ninguna (Sitio Estático / Sin BD)
> **Marco de Referencia:** OWASP Top 10 & CWE Top 25
> **Nivel de Exigencia:** Grado de Producción / Máxima Resiliencia

---

## 🔒 DIRECTIVAS DE SEGURIDAD ESPECÍFICAS PARA EL STACK RATIFICADO

### 2.1 Directivas Específicas para Frontend (Astro (SSG / Islands Architecture))
- **Seguridad en Sitios Estáticos (SSG):** El bundle exportado a producción no debe incluir archivos `.env`, rutas de API locales no protegidas ni dependencias de desarrollo.
- **Aislamiento de Islas Cliente:** Limitar el uso de directivas `client:load` y `client:only` a componentes estrictamente interactivos para reducir la superficie de ataque XSS.
- **CSP Estricto en Edge CDN:** Configurar en el host estático una política Content-Security-Policy sin directivas `unsafe-inline` ni `unsafe-eval`.

### 2.2 Directivas Específicas para Backend (Ninguno (Solo Frontend Estático / Jamstack))


### 2.3 Directivas Específicas para Persistencia (Ninguna (Sitio Estático / Sin BD))
- **Validación de Esquemas de Contenido:** Todos los archivos Markdown/JSON deben validarse con esquemas tipados (Zod/Frontmatter) en tiempo de compilación.
- **Prevención de Directory Traversal:** Sanitizar rutas de acceso a archivos para impedir que parámetros de usuario lean archivos del sistema (`../../etc/passwd`).

### 2.4 Directivas Específicas para Plataforma (STATIC)
- **Cero Exposición de Credenciales:** Verificar que en el directorio de salida estático (`dist` o `build`) no figure ningún archivo `.env` ni claves privadas.
- **Cabeceras de Seguridad en Edge CDN:** Configurar en Vercel/Cloudflare/Netlify las cabeceras `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`.


---

## 🛡️ POLÍTICAS GENERALES DE SEGURIDAD DEFENSIVA

### 1. 🔐 Gestión Estricta de Variables de Entorno y Secretos
- **Cero Credenciales en Código:** Ningún token, API Key, contraseña de base de datos o secreto debe figurar en el código fuente ni en el historial de Git.
- **Plantilla Obligatoria:** Mantener actualizado `.env.example` con todas las variables requeridas asignadas a valores descriptivos ficticios.
- **Protección de Git:** Verificar que `.env`, `.env.local`, `*.pem` y `*.key` figuren expresamente en el archivo `.gitignore`.

### 2. 🛡️ Autenticación y Autorización Robusta
- **Almacenamiento Web de Tokens:** Almacenar tokens JWT y cookies de sesión exclusivamente en **cookies con flags `HttpOnly`, `Secure` y `SameSite=Strict`**. Queda prohibido el almacenamiento de tokens sensibles en `localStorage` debido a la exposición a ataques XSS.
- **Entornos Móviles:** Utilizar bóvedas de claves cifradas por hardware (`SecureStore` en Expo / Keychain en iOS / Keystore en Android).
- **Ciclo de Vida de Tokens:** Configurar Access Tokens de vida corta (15 minutos) combinados con rotación estricta de Refresh Tokens.

### 3. 🧹 Sanitización de Entradas y Validación de Esquemas
- **Validación en Frontera:** Toda solicitud entrante a la API debe validarse mediante esquemas estrictos (Zod, Pydantic, class-validator) antes de que el controlador o servicio ejecute cualquier acción.
- **Defensa contra Asignación Masiva:** Descartar propiedades no declaradas explícitamente en los esquemas (whitelist) para prevenir inyecciones de campos protegidos (ej. `isAdmin: true`).

### 4. 🛑 Protección contra Inyección SQL y Cross-Site Scripting (XSS)
- **Consultas Parametrizadas:** Queda prohibida la interpolación directa de cadenas de texto para construir sentencias SQL. Utilizar siempre consultas preparadas o el query builder del ORM.
- **Escape Automático:** Escapar todo contenido dinámico renderizado en el navegador. Prohibido el uso de `dangerouslySetInnerHTML` salvo sanitización previa obligatoria mediante librerías como `DOMPurify`.

### 5. 🌐 Políticas de CORS y Cabeceras de Seguridad HTTP
- **CORS Restrictivo:** Configurar una lista blanca explícita de dominios autorizados. Prohibido el uso de comodines (`Access-Control-Allow-Origin: *`) en rutas autenticadas.
- **Cabeceras Defensivas:** Implementar cabeceras estándar:
  - `Content-Security-Policy (CSP)`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security (HSTS)`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### 6. ⏱️ Limitación de Tasa (Rate Limiting) y Protección contra Fuerza Bruta
- Aplicar limitadores de tasa (ej. Redis sliding window o express-rate-limit) en endpoints críticos: login, registro, recuperación de contraseñas y transacciones financieras.

### 7. 🔒 Protección contra Falsificación de Peticiones en Sitios Cruzados (CSRF)
- Validar tokens antifalsificación CSRF o confiar en el aislamiento estricto de cookies `SameSite=Strict` para todas las mutaciones HTTP (POST, PUT, PATCH, DELETE).



---

## 📋 CHECKLIST EXHAUSTIVO DE AUDITORÍA PREVIO A DESPLIEGUE

Antes de promover la aplicación a entornos de producción, se debe verificar el 100% de los siguientes puntos:

- [ ] **Secretos:** Verificación mediante `git log` de que no existen credenciales hardcodeadas en ningún commit.
- [ ] **Variables de Entorno:** Comprobación de que todas las variables en `.env.example` cuentan con valores configurados en el host de producción.
- [ ] **Validación de Esquemas:** Cobertura de validación activa en el 100% de los endpoints públicos y privados.
- [ ] **Auditoría de Vulnerabilidades:** Ejecución limpia de `npm audit` / `safety check` con 0 alertas críticas o altas.
- [ ] **Cabeceras HTTP:** Verificación de calificación "A+" en escáneres de seguridad (ej. securityheaders.com).
- [ ] **Manejo de Errores:** Confirmación de que las trazas de error (stack traces) internas están ocultas al usuario final en producción.
