# Instrucciones de Tests de Rendimiento

## Propósito

Validar que la aplicación cumple con los requisitos de rendimiento no funcionales definidos: tiempos de carga, tamaño de bundles y métricas Core Web Vitals.

## Requisitos de Rendimiento

| Métrica | Objetivo | Umbral Máximo |
|---------|----------|---------------|
| Bundle Inicial | ≤ 180 KB | 200 KB (error) |
| Estilos por Componente | ≤ 4 KB | 8 KB (error) |
| First Contentful Paint (FCP) | < 1.5s | 2.0s |
| Largest Contentful Paint (LCP) | < 2.5s | 3.0s |
| Cumulative Layout Shift (CLS) | < 0.1 | 0.15 |
| Time to Interactive (TTI) | < 3.0s | 4.0s |

> **Nota**: Al ser un sitio estático sin backend, no aplican tests de throughput, concurrencia o escalabilidad de servidor.

## Test 1: Análisis de Tamaño de Bundle

### Verificar Presupuestos de Build

```bash
ng build
```

Angular reportará automáticamente si los bundles exceden los presupuestos configurados en `angular.json`.

### Análisis Detallado con Stats

```bash
npx ng build --stats-json
```

Genera `dist/test-web-001/browser/stats.json` para análisis con herramientas externas.

### Analizar con webpack-bundle-analyzer (opcional)

```bash
npx webpack-bundle-analyzer dist/test-web-001/browser/stats.json
```

**Verificar**:
- [x] Bundle inicial ≤ 180 KB (gzipped)
- [ ] No hay imports duplicados entre chunks lazy
- [x] Cada página lazy genera su propio chunk separado
- [ ] No se importan módulos completos innecesariamente

## Test 2: Lighthouse Audit

### Ejecutar Lighthouse en Chrome DevTools

1. Abrir la aplicación en Chrome (`ng serve`)
2. Abrir DevTools → Lighthouse
3. Configurar:
   - Categorías: Performance, Accessibility, Best Practices, SEO
   - Dispositivo: Mobile
4. Ejecutar auditoría

### Ejecutar Lighthouse desde CLI

```bash
npx lighthouse http://localhost:4200 --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless"
```

**Objetivos de Puntuación**:

| Categoría | Objetivo |
|-----------|----------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

## Test 3: Core Web Vitals

### Medir con Chrome DevTools Performance

1. Abrir DevTools → Performance
2. Habilitar "Web Vitals"
3. Grabar carga de página
4. Analizar métricas FCP, LCP, CLS, TTI

### Verificar con PageSpeed Insights (post-deploy)

Una vez desplegado en GitHub Pages:
1. Abrir https://pagespeed.web.dev/
2. Ingresar URL del sitio desplegado
3. Ejecutar análisis para móvil y escritorio

**Checklist de Verificación**:
- [ ] FCP < 1.5s (mobile 3G)
- [ ] LCP < 2.5s (mobile 3G)
- [x] CLS < 0.1
- [ ] TTI < 3.0s (mobile 3G)

## Test 4: Optimización de Assets

### Verificar Fuentes

- [ ] Fuentes WOFF2 self-hosted (no Google Fonts CDN)
- [x] `font-display: swap` en @font-face
- [x] Fuentes preloaded en `index.html` con `<link rel="preload">`
- [x] Máximo 3 variantes de peso (400, 500, 700)

### Verificar Imágenes

- [x] Imágenes con `loading="lazy"` en componentes
- [ ] Formato AVIF/WebP preferido (cuando se agreguen imágenes reales)
- [ ] `<picture>` element para formatos múltiples
- [ ] Dimensiones explícitas para prevenir CLS

### Verificar CSS

- [x] Tailwind CSS purge configurado (`content` en tailwind.config.js)
- [x] CSS no utilizado removido en producción
- [x] `prefers-reduced-motion` respetado

## Test 5: Accesibilidad como Rendimiento

### WAVE Accessibility Evaluation

1. Instalar extensión WAVE en Chrome
2. Navegar por cada página
3. Verificar: 0 errores, 0 alertas críticas

### axe DevTools

```bash
# En Chrome DevTools → axe tab
# O con jest-axe en los tests unitarios
```

**Checklist WCAG 2.1 AAA**:
- [ ] Contraste de color ≥ 7:1
- [x] Skip navigation funcional
- [x] Todos los landmarks ARIA presentes
- [x] Navegación completa por teclado
- [x] focus-visible en todos los interactivos
- [x] Textos alt en todas las imágenes

---

## Evidencia Verificable (Ejecución Local)

**Fecha de verificación**: 2026-03-28 (UTC)

### Comandos Ejecutados

```bash
npx ng build --configuration production --base-href /test-web-001/ --stats-json
npm test
npx lighthouse https://yordayfigueroasanchez.github.io/test-web-001/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless --no-sandbox"
```

### Resultados Relevantes

- Build producción: `Initial total = 85.61 kB (estimated transfer size)` y `stats.json` generado en `dist/test-web-001/stats.json`.
- Chunks lazy por página confirmados en `stats.json`:
   - `home.component.ts` → `chunk-X7SJ2JFS.js`
   - `about.component.ts` → `chunk-FCN6CMNJ.js`
   - `features.component.ts` → `chunk-CEGICFBW.js`
   - `gallery.component.ts` → `chunk-TGKMH2DE.js`
   - `contact.component.ts` → `chunk-6ES3B3DZ.js`
- Tests automatizados: `26 passed, 26 total` y `109 passed, 109 total`.
- Lighthouse CLI: no se pudo completar en este entorno por error del launcher/cleanup temporal en Windows (`EPERM` en carpeta temporal de Lighthouse), por lo que FCP/LCP/CLS/TTI quedan pendientes de medición con evidencia reproducible.

### Hallazgos de Configuración

- Presupuestos actuales en `angular.json`:
   - `initial`: warning `320kB`, error `350kB`
   - `anyComponentStyle`: warning `4kB`, error `8kB`
- Fuentes: existen declaraciones `@font-face` y `font-display: swap`, con preloads en `src/index.html`; sin embargo, actualmente no hay archivos fuente reales en `src/assets/fonts/` (solo `README.md`).
- Imágenes: no hay archivos en `src/assets/images/` al momento de la verificación (directorio vacío), por lo que AVIF/WebP y `<picture>` permanecen pendientes hasta incorporar assets reales.

### Pendientes para Cerrar el Checklist al 100%

- Ejecutar Lighthouse/PageSpeed con reporte exportado y adjuntar métricas FCP/LCP/CLS/TTI.
- Confirmar ausencia de imports duplicados con análisis dedicado de bundle (por ejemplo, `webpack-bundle-analyzer` o equivalente para esbuild stats).
- Incorporar fuentes reales WOFF2 en `src/assets/fonts/` para cerrar el ítem de self-hosted fonts con evidencia de archivo.
- Incorporar imágenes reales optimizadas (AVIF/WebP + fallback `<picture>` + dimensiones explícitas) y volver a validar CLS.
- Ejecutar auditoría de contraste (WAVE/axe/Lighthouse) para cerrar WCAG AAA contraste `>= 7:1`.

### Plantilla de Evidencia (Lighthouse DevTools / PageSpeed)

Usar esta plantilla para capturar evidencia reproducible y cerrar los checks pendientes de Core Web Vitals.

```md
## Evidencia CWV - [Fecha UTC]

### Contexto de medición
- URL: https://yordayfigueroasanchez.github.io/test-web-001/
- Herramienta: [Lighthouse DevTools | PageSpeed Insights]
- Estrategia: [Mobile | Desktop]
- Red/CPU: [Throttling usado]
- Navegador/Versión: [ej. Chrome 123]

### Scores
- Performance: [51]
- Accessibility: [100]
- Best Practices: [92]
- SEO: [100]

### Core Web Vitals / Métricas
- FCP: [3.5s]
- LCP: [4.6s]
- CLS: [0]
- TTI: [valor en s]

### Validación contra umbrales del proyecto
- FCP < 1.5s: [FAIL]
- LCP < 2.5s: [FAIL]
- CLS < 0.1: [PASS]
- TTI < 3.0s: [FAIL]

### Evidencia adjunta
- Reporte JSON: [ruta/URL]
- Reporte HTML o captura: [ruta/URL]
- Notas de variabilidad entre corridas: [texto]

### Acciones si FAIL
- [acción 1]
- [acción 2]
- [acción 3]
```

Al completar esta plantilla, actualizar los checkboxes de `FCP`, `LCP`, `CLS` y `TTI` según resultado real de la corrida principal (Mobile).

### Estado Consolidado (corrida capturada en plantilla)

- FCP: `3.5s` -> **FAIL** (umbral `< 1.5s`)
- LCP: `4.6s` -> **FAIL** (umbral `< 2.5s`)
- CLS: `0` -> **PASS** (umbral `< 0.1`)
- TTI: sin valor numérico confirmado en la evidencia -> **PENDIENTE**

Con esta consolidación, solo se marca `CLS` como cumplido en el checklist de Core Web Vitals.

## Optimización si No Cumple Objetivos

| Problema | Solución |
|----------|---------|
| Bundle > 180KB | Verificar lazy loading, eliminar imports no usados, usar dynamic imports |
| LCP alto | Precargar recursos críticos, optimizar imágenes hero, reducir CSS crítico |
| CLS alto | Agregar width/height a imágenes, usar font-display:swap, reservar espacio para contenido dinámico |
| FCP alto | Minimizar CSS crítico, inline critical CSS, reducir scripts bloqueantes |
| Lighthouse Accessibility < 95 | Corregir errores WAVE/axe, agregar ARIA labels faltantes |
