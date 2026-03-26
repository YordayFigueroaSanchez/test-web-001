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
- [ ] Bundle inicial ≤ 180 KB (gzipped)
- [ ] No hay imports duplicados entre chunks lazy
- [ ] Cada página lazy genera su propio chunk separado
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
- [ ] CLS < 0.1
- [ ] TTI < 3.0s (mobile 3G)

## Test 4: Optimización de Assets

### Verificar Fuentes

- [ ] Fuentes WOFF2 self-hosted (no Google Fonts CDN)
- [ ] `font-display: swap` en @font-face
- [ ] Fuentes preloaded en `index.html` con `<link rel="preload">`
- [ ] Máximo 3 variantes de peso (400, 500, 700)

### Verificar Imágenes

- [ ] Imágenes con `loading="lazy"` en componentes
- [ ] Formato AVIF/WebP preferido (cuando se agreguen imágenes reales)
- [ ] `<picture>` element para formatos múltiples
- [ ] Dimensiones explícitas para prevenir CLS

### Verificar CSS

- [ ] Tailwind CSS purge configurado (`content` en tailwind.config.js)
- [ ] CSS no utilizado removido en producción
- [ ] `prefers-reduced-motion` respetado

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
- [ ] Skip navigation funcional
- [ ] Todos los landmarks ARIA presentes
- [ ] Navegación completa por teclado
- [ ] focus-visible en todos los interactivos
- [ ] Textos alt en todas las imágenes

## Optimización si No Cumple Objetivos

| Problema | Solución |
|----------|---------|
| Bundle > 180KB | Verificar lazy loading, eliminar imports no usados, usar dynamic imports |
| LCP alto | Precargar recursos críticos, optimizar imágenes hero, reducir CSS crítico |
| CLS alto | Agregar width/height a imágenes, usar font-display:swap, reservar espacio para contenido dinámico |
| FCP alto | Minimizar CSS crítico, inline critical CSS, reducir scripts bloqueantes |
| Lighthouse Accessibility < 95 | Corregir errores WAVE/axe, agregar ARIA labels faltantes |
