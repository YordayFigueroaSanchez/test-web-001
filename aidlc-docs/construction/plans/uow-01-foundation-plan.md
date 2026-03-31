# Plan de Generación de Código — UoW-01: Foundation
# Tailwind v4 + Aura Studio Design Tokens

**Fase**: CONSTRUCCIÓN  
**Unidad**: UoW-01 — Foundation  
**Fecha**: 2026-03-28  
**Gate de aprobación**: Build exitoso + tests verdes + revisión visual manual

---

## Contexto de la Unidad

- **Tipo**: Brownfield — modificación de archivos existentes
- **Alcance**: Stack de estilos completo (Tailwind v4 + tokens CSS)
- **Riesgo**: Alto — cambio de build pipeline que afecta toda la app
- **Restricción crítica**: hash routing y base-href NO se modifican

### Archivos a modificar
| Archivo | Acción |
|---|---|
| `package.json` | Actualizar tailwindcss → v4, agregar @tailwindcss/postcss |
| `postcss.config.js` | Reemplazar plugin tailwindcss por @tailwindcss/postcss |
| `tailwind.config.js` | Vaciar/eliminar (v4 no usa config JS) |
| `src/styles.scss` | Reemplazar directivas @tailwind por @import "tailwindcss" |
| `src/styles/_variables.scss` | Reemplazar theme() por variables CSS nativas |
| `src/styles/_typography.scss` | Mantener @font-face, ajustar para v4 |
| `src/styles/_animations.scss` | Mantener animaciones, compatibilizar con v4 |
| `src/index.html` | Actualizar clases body para tokens Aura Studio |
| `public/theme-init.js` | Mantener sin cambios (independiente de Tailwind) |

### Archivos a crear
| Archivo | Propósito |
|---|---|
| `src/styles/_tokens.scss` | Design tokens Aura Studio (paleta, tipografía, superficies) |

---

## Plan de Ejecución

### Paso 1 — Instalar Tailwind CSS v4
- [x] Actualizar `package.json`: tailwindcss `4.1.3`, agregar `@tailwindcss/postcss 4.1.3`
- [x] Crear `.postcssrc.json` con `@tailwindcss/postcss` (Angular lee este archivo, no postcss.config.js)
- [x] Actualizar `postcss.config.js` (para tooling externo)

### Paso 2 — Limpiar configuración v3
- [x] Vaciar `tailwind.config.js` — exporta objeto vacío con comentario explicativo
- [x] Verificado: ningún archivo en `src/` importa directamente `tailwind.config.js`

### Paso 3 — Migrar styles.scss a Tailwind v4
- [x] Reemplazar directivas `@tailwind` por `@import "tailwindcss"` (después de @use SCSS)
- [x] Agregar `@custom-variant dark (&:where(.dark, .dark *))` para configurar modo oscuro clase
- [x] Agregar `@layer base`, `@utility` y `@media reduced-motion` después del import

### Paso 4 — Crear Design Tokens Aura Studio (_tokens.scss)
- [x] `_tokens.scss` creado con `@theme {}` completo: paleta, tipografía, superficies, bordes, sombras, transiciones, animaciones, z-index
- [x] Paleta Aura Studio: bone (50-500), matte-black (50-500), gold (50-500), neutral scale
- [x] Colores de feedback: success, error, warning
- [x] Modo oscuro: `.dark {}` selector con overrides de tokens de superficie/texto/borde

### Paso 5 — Actualizar _variables.scss
- [x] `_variables.scss` reemplazado: usa `var(--color-*)` de tokens en lugar de `theme('colors.xxx')`
- [x] Eliminada paleta antigua (primary/secondary/accent blue-gray)
- [x] Aliases semánticos: `--color-bg-primary`, `--color-accent-base`, etc.

### Paso 6 — Actualizar index.html (clases body)
- [x] Eliminadas clases Tailwind del body (ahora usa `background-color: var(--color-surface-primary)` en @layer base)
- [x] `<title>` actualizado a `Aura Studio`
- [x] `<meta description>` actualizado para Aura Studio

### Paso 7 — Verificar compatibilidad de animaciones
- [x] `_animations.scss`: keyframes son CSS puro — sin cambios necesarios
- [x] `@utility animate-fade-up/in/slide-*` registradas en `styles.scss` vía `@utility`

### Paso 8 — Build de verificación
- [x] `npm install` — Tailwind v4.1.3 + @tailwindcss/postcss 4.1.3 instalados
- [x] `npm run build` — exitoso, 0 errores (1 warning cosmético de deprecación @import en SCSS)
- [x] `npm test` — 109/109 tests pasan, 26 suites

---

## Dependencias de UoW-02
- UoW-02 (PrimeNG) necesita que los tokens CSS estén listos para sobreescribir el tema PrimeNG
- Los nombres de variables CSS de esta UoW son contractos: `--color-bone`, `--color-gold`, `--color-matte-black`, `--color-surface-*`

---

## Criterios de Éxito (Gate B)
- [x] `npm install` sin errores de compatibilidad
- [x] `npm run build` exitoso — 0 errores, 0 warnings de budget
- [x] `npm test` — todos los tests pasan (los tests no usan clases Tailwind directamente)
- [x] Revisión visual manual: la app carga en `ng serve` con fondo Bone/Matte-Black según el modo
- [x] Modo oscuro funcional: toggle cambia entre fondo Bone (claro) y Matte Black (oscuro)
