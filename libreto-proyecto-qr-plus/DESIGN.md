# SISTEMA DE DISEÑO & PAUTAS UI/UX: PIXEL ART / ARCADE UI (8-BIT / 16-BIT)

> **Proyecto:** Proyecto_QR_plus
> **Estilo Visual Seleccionado:** **Pixel Art / Arcade UI (8-bit / 16-bit)** (`Retro & Arcade`)
> **Framework de Estilos:** `Tailwind CSS v4 / v3`
> **Tipografía Principal:** `Inter, system-ui, sans-serif`
> **Estrategia de Modo Oscuro:** Predeterminado en Modo Oscuro (Dark First)

---

## 1. FILOSOFÍA VISUAL Y LENGUAJE DE DISEÑO

### 1.1 Declaración Estética
Estética retro de videojuegos arcade de 8 y 16 bits con bordes pixelados escalonados y tipografías bitmap clásicas.

### 1.2 Reglas de CSS Mandatorias del Estilo
Para reproducir fielmente la estética **Pixel Art / Arcade UI (8-bit / 16-bit)**, la IA y el equipo deben emplear obligatoriamente las siguientes reglas CSS:
```css
/* Reglas fundamentales de Pixel Art / Arcade UI (8-bit / 16-bit) */
border: 4px solid #000000;
box-shadow: 4px 4px 0px #000000;
image-rendering: pixelated;
```

---

## 2. ARQUITECTURA DE COLOR & TOKENS SEMÁNTICOS

La interfaz utiliza un sistema de diseño con nombres de tokens semánticos desacoplados de los valores hexadecimales para facilitar temas y coherencia:

| Token Semántico | Código Hexadecimal | Rol de Interfaz y Aplicación |
| :--- | :--- | :--- |
| **Color Primario (Brand)** | `#3B82F6` | Botones de acción principal (CTA), enlaces activos, estados destacados |
| **Color Secundario / Acento** | `#10B981` | Badges, indicadores de estado, bordes focales, microdestellos |
| **Paleta del Estilo #1** | `#101010` | Superficie, fondo, contraste o tarjeta de Pixel Art / Arcade UI (8-bit / 16-bit) |
| **Paleta del Estilo #2** | `#E03B24` | Superficie, fondo, contraste o tarjeta de Pixel Art / Arcade UI (8-bit / 16-bit) |
| **Paleta del Estilo #3** | `#2B59C3` | Superficie, fondo, contraste o tarjeta de Pixel Art / Arcade UI (8-bit / 16-bit) |
| **Paleta del Estilo #4** | `#F2C94C` | Superficie, fondo, contraste o tarjeta de Pixel Art / Arcade UI (8-bit / 16-bit) |
| **Paleta del Estilo #5** | `#56C596` | Superficie, fondo, contraste o tarjeta de Pixel Art / Arcade UI (8-bit / 16-bit) |

### 2.1 Tokens Específicos del Estilo Pixel Art / Arcade UI (8-bit / 16-bit)
| Token Específico | Valor CSS | Función en Componentes |
| :--- | :--- | :--- |
| **Arcade Red** | `#E03B24` | Botones y vidas |
| **Arcade Gold** | `#F2C94C` | Monedas y bordes |
| **Arcade Dark** | `#101010` | Fondo |

---

## 3. SISTEMA TIPOGRÁFICO Y ESCALA MODULAR

- **Familia Tipográfica:** `Inter, system-ui, sans-serif`
- **Pauta Tipográfica del Estilo:** Press Start 2P o VT323 monoespaciada bitmap.

### 3.1 Escala Modular de Texto
| Nivel | Tamaño (rem / px) | Peso (Font Weight) | Tracking / Interletrado | Uso en Interfaz |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `3.0rem / 48px` | 800 (Bold / Black) | `-0.025em` | Héroes visuales y grandes cifras |
| **H1** | `2.25rem / 36px` | 700 (Bold) | `-0.02em` | Título principal de página |
| **H2** | `1.75rem / 28px` | 600 (Semibold) | `-0.015em` | Títulos de secciones principales |
| **H3** | `1.25rem / 20px` | 600 (Semibold) | `-0.01em` | Encabezados de tarjetas y modales |
| **Body** | `1.0rem / 16px` | 400 (Regular) | `0em` | Párrafos de lectura estándar |
| **Small / Caption** | `0.875rem / 14px` | 500 (Medium) | `+0.01em` | Badges, metadatos y notas |
| **Code / Mono** | `0.875rem / 14px` | 500 (Medium) | `0em` | Identificadores, comandos y métricas |

---

## 4. ESPECIFICACIÓN DE COMPONENTES ATÓMICOS

Las directivas de maquetación para los componentes clave son:

### 4.1 Directiva de Componente: Botones escalonados y marcos con texturas de tablero de juego retro.

### 4.4 Estados Interactivos Obligatorios
Todo componente accionable (botones, enlaces, filas interactivas) DEBE implementar 4 estados visuales distintos:
1. **Estado Normal (`default`):** Cumple los tokens de color y elevación base.
2. **Estado Hover (`:hover`):** Cambio sutil de luminosidad (escala 1.02x o desplazamiento -2px según estilo).
3. **Estado Focus-Visible (`:focus-visible`):** Anillo de enfoque de 2px con offset de 2px (`ring-2 ring-primary ring-offset-2`) para usuarios de teclado.
4. **Estado Activo / Presionado (`:active`):** Reducción de elevación o escala (0.98x) para retroalimentación táctil inmediata.
5. **Estado Deshabilitado (`:disabled`):** Opacidad reducida al 50%, cursor `not-allowed` e interactividad desactivada (`pointer-events-none`).

---

## 5. PERFIL DE ANIMACIÓN Y MICROINTERACCIONES

- **Perfil Dinámico del Estilo:** Animaciones de fotogramas discretos (step-end) a 8 FPS.
- **Duraciones Estándar:**
  - Microinteracciones rápidas (hovers, tooltips): `150ms` a `200ms`.
  - Transiciones de componentes (modales, drawers): `250ms` a `350ms`.
  - Animaciones de entrada de página: `400ms` a `500ms`.
- **Curva de Atenuación Recomendada:** `cubic-bezier(0.16, 1, 0.3, 1)` (curva suave de aceleración inicial y frenado fluido).

---

## 6. LIBRERÍAS DE ANIMACIÓN E ICONOGRAFÍA SELECCIONADAS

### 🎬 AutoAnimate (@formkit)
- **Descripción:** Animaciones automáticas de inserción, ordenamiento y eliminación en una sola línea de código sin configuración.
- **Repositorio Oficial:** [https://github.com/formkit/auto-animate](https://github.com/formkit/auto-animate)
- **Comando de Instalación:**
```bash
npm install @formkit/auto-animate
```
- **Ejemplo de Código:**
```tsx
const [parentRef] = useAutoAnimate(); <ul ref={parentRef}>{items.map(...)}</ul>
```

### 🎬 Tailwind CSS Animate
- **Descripción:** Plugin oficial para componer animaciones fluidas con clases de utilidad en Tailwind (fade-in, slide, zoom).
- **Repositorio Oficial:** [https://github.com/jamiebuilds/tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Comando de Instalación:**
```bash
npm install tailwindcss-animate
```
- **Ejemplo de Código:**
```tsx
<div className="animate-in fade-in slide-in-from-bottom duration-300" />
```


---

### 🎨 Remix Icon
- **Descripción:** Más de 2800 iconos de estilo neutro y equilibrado disponibles en versiones Line y Fill para producto digital.
- **Repositorio Oficial:** [https://github.com/Remix-Design/RemixIcon](https://github.com/Remix-Design/RemixIcon)
- **Comando de Instalación:**
```bash
npm install remixicon-react
```
- **Ejemplo de Importación:**
```tsx
import ShieldKeyholeLineIcon from "remixicon-react/ShieldKeyholeLineIcon";
```

### 🎨 Iconify (Framework Universal)
- **Descripción:** Acceso bajo demanda a más de 200,000 iconos de más de 100 colecciones sin engordar el bundle.
- **Repositorio Oficial:** [https://github.com/iconify/iconify](https://github.com/iconify/iconify)
- **Comando de Instalación:**
```bash
npm install @iconify/react
```
- **Ejemplo de Importación:**
```tsx
import { Icon } from "@iconify/react"; <Icon icon="mdi:shield-bug" />
```

### 🎨 Octicons (GitHub Primer)
- **Descripción:** Sistema iconográfico oficial utilizado por GitHub en toda su plataforma y herramientas de desarrollo.
- **Repositorio Oficial:** [https://github.com/primer/octicons](https://github.com/primer/octicons)
- **Comando de Instalación:**
```bash
npm install @primer/octicons-react
```
- **Ejemplo de Importación:**
```tsx
import { ShieldLockIcon, GitPullRequestIcon } from "@primer/octicons-react";
```


---

## 7. CRITERIOS DE ACCESIBILIDAD Y RESPONSIVIDAD (WCAG 2.1 AA)

1. **Ratio de Contraste:** Todo texto debe mantener un ratio de contraste mínimo de 4.5:1 respecto a su fondo (o 3:1 para titulares grandes).
2. **Soporte de Movimiento Reducido:** Respetar la preferencia del sistema `prefers-reduced-motion: reduce` suprimiendo traslaciones y rebotes exagerados.
3. **Breakpoints Responsivos (Mobile-First):**
   - `sm` (≥ 640px): Teléfonos en orientación horizontal / Phablets.
   - `md` (≥ 768px): Tabletas en vertical.
   - `lg` (≥ 1024px): Laptops y tabletas en horizontal.
   - `xl` (≥ 1280px): Monitores de escritorio estándar.
   - `2xl` (≥ 1536px): Pantallas panorámicas (contenedor centrado con `max-w-7xl`).


### Directrices Específicas de Diseño:
Diseño limpio, espacios respirables, accesibilidad AA y soporte completo para modo oscuro y claro.

