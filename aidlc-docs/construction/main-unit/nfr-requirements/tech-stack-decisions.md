# Decisiones de Stack Tecnológico — Unidad Principal

---

## Resumen de Decisiones

| Categoría | Decisión | Versión / Detalle | Justificación |
|---|---|---|---|
| **Framework** | Angular | 19.x | Requisito del usuario, última versión con standalone components y signals |
| **Lenguaje** | TypeScript | 5.x (strict mode) | Default de Angular 19, tipado estricto |
| **Estilos** | Tailwind CSS | v3.4 | Estabilidad probada, amplia documentación, compatibilidad total con Angular |
| **Estilos adicionales** | SCSS | — | Para estilos complejos de componentes específicos |
| **i18n** | @angular/localize | Built-in Angular | Build-time i18n, builds separados por idioma |
| **Animaciones** | CSS + Angular Animations | @angular/animations | CSS para hover/transitions, Angular para rutas/estados |
| **Testing framework** | Jest | 29.x | Ejecución rápida, ESM support, ecosistema maduro |
| **Testing componentes** | Angular Testing Library | 17.x | Enfoque centrado en el usuario, promueve accesibilidad |
| **Linting** | ESLint + @angular-eslint | 18.x | Reglas específicas de Angular, integración nativa |
| **Formateo** | Prettier | 3.x | Formateo consistente automático |
| **Build** | Angular CLI + esbuild | — | Default de Angular 19, build rápido |
| **Hosting** | GitHub Pages | — | Estático, gratuito, CI/CD integrado |
| **CI/CD** | GitHub Actions | — | Pipeline básico: build + deploy |
| **Fuentes** | Self-hosted (WOFF2) | — | Sin dependencia externa, mejor privacidad, control de carga |
| **Imágenes** | AVIF > WebP > JPEG/PNG | — | Máxima compresión con fallbacks progresivos |

---

## 1. Tailwind CSS v3.4 (en lugar de v4)

### Decisión
Usar Tailwind CSS **v3.4** en lugar de la versión 4.

### Justificación
- **Estabilidad**: v3.4 es la versión más probada y documentada
- **Ecosistema**: Mayor compatibilidad con plugins de terceros (typography, forms, aspect-ratio)
- **Angular**: Integración probada con Angular CLI y PostCSS pipeline
- **Documentación**: Abundante material de referencia y ejemplos comunitarios
- **Migración**: v4 introduce CSS-first config que requiere cambio de paradigma — no aporta valor adicional para este proyecto
- **Dark mode**: Soporte completo via `class` strategy en v3.4

### Configuración Clave
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom colors, fonts, etc.
    }
  },
  plugins: []
}
```

---

## 2. Jest (en lugar de Jasmine + Karma)

### Decisión
Usar **Jest** como framework de testing principal.

### Justificación
- **Velocidad**: Ejecución paralela, transformación rápida con swc/esbuild
- **ESM**: Soporte ESM mejorado en versiones recientes
- **Snapshot testing**: Útil para componentes UI de presentación
- **Mocking**: API de mocking integrada (`jest.fn()`, `jest.mock()`)
- **Watch mode**: Modo interactivo eficiente para desarrollo
- **Angular**: Compatible via `jest-preset-angular`

### Dependencias
```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-preset-angular": "^14.0.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.2.0"
  }
}
```

---

## 3. Angular Testing Library (en lugar de Spectator)

### Decisión
Usar **Angular Testing Library** para testing de componentes.

### Justificación
- **Filosofía**: "The more your tests resemble the way your software is used, the more confidence they can give you"
- **Accesibilidad**: Queries centradas en roles ARIA (`getByRole`, `getByLabelText`) refuerzan WCAG AAA
- **Sin detalle de implementación**: No testea internals del componente, sino comportamiento visible
- **Consistencia**: Misma API que React Testing Library, facilitando onboarding
- **Complemento**: Se integra naturalmente con Jest

### Dependencias
```json
{
  "devDependencies": {
    "@testing-library/angular": "^17.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0"
  }
}
```

---

## 4. Fuentes Auto-alojadas (en lugar de CDN)

### Decisión
Servir fuentes desde `/assets/fonts/` en formato **WOFF2**.

### Justificación
- **Privacidad**: Sin solicitudes a servidores de Google u otros terceros
- **CSP simplificado**: `font-src 'self'` sin excepciones externas
- **Control de carga**: `font-display: swap` y `<link rel="preload">` optimizados
- **Offline**: Funciona sin conexión a internet (importante para service workers futuros)
- **Coherencia**: Mismo resultado en todos los entornos (dev, staging, production)

### Implementación
```css
/* src/styles/fonts.scss */
@font-face {
  font-family: 'PrimaryFont';
  src: url('/assets/fonts/primary-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PrimaryFont';
  src: url('/assets/fonts/primary-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

---

## 5. AVIF Prioritario (estrategia de imágenes)

### Decisión
Usar **AVIF** como formato prioritario, con fallbacks **WebP** y **JPEG/PNG**.

### Justificación
- **Compresión**: AVIF ofrece ~50% menos tamaño que WebP y ~80% menos que JPEG
- **Soporte**: Chrome 85+, Firefox 93+, Safari 16.4+ (cubre todos los navegadores target)
- **Fallback progresivo**: `<picture>` permite degradación elegante
- **LCP**: Imágenes más pequeñas mejoran directamente Largest Contentful Paint

### Implementación
```html
<picture>
  <source srcset="image-320.avif 320w, image-640.avif 640w, image-960.avif 960w" type="image/avif">
  <source srcset="image-320.webp 320w, image-640.webp 640w, image-960.webp 960w" type="image/webp">
  <img src="image-640.jpg" 
       srcset="image-320.jpg 320w, image-640.jpg 640w, image-960.jpg 960w"
       sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
       alt="Descripción de la imagen"
       loading="lazy"
       width="640" height="480">
</picture>
```

---

## 6. Pipeline CI/CD Básico

### Decisión
Pipeline **básico** de GitHub Actions: Build + Deploy.

### Justificación
- **Simplicidad**: Sitio estático de marketing, sin backend ni lógica compleja
- **Velocidad**: Pipeline rápido (~2-3 min), sin esperas innecesarias
- **Suficiente**: Lint y tests se ejecutan localmente durante desarrollo
- **Escalable**: Puede expandirse a estándar/completo cuando sea necesario

### Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build:es  # Build español
      - run: npm run build:en  # Build inglés
      # Combinar builds en dist/
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 7. Árbol de Dependencias Proyectado

### Dependencias de Producción
| Paquete | Propósito |
|---|---|
| `@angular/core` | Framework core |
| `@angular/router` | Routing SPA |
| `@angular/forms` | Reactive forms (contacto) |
| `@angular/animations` | Animaciones de estado/ruta |
| `@angular/localize` | i18n build-time |
| `@angular/platform-browser` | Plataforma browser |
| `rxjs` | Observables (dependency de Angular) |
| `zone.js` | Change detection (dependency de Angular) |

### Dependencias de Desarrollo
| Paquete | Propósito |
|---|---|
| `@angular/cli` | CLI de build y desarrollo |
| `@angular-devkit/build-angular` | Builder |
| `tailwindcss` (v3.4) | Utility-first CSS |
| `postcss` + `autoprefixer` | PostCSS pipeline para Tailwind |
| `sass` | SCSS compiler |
| `jest` + `jest-preset-angular` | Framework de testing |
| `@testing-library/angular` | Testing de componentes |
| `@testing-library/jest-dom` | Matchers DOM |
| `@angular-eslint/*` | Linting Angular |
| `prettier` | Formateo de código |
| `typescript` | Compilador TypeScript |

### Dependencias Totales Estimadas
- **Producción**: ~8 paquetes directos (Angular ecosystem + rxjs + zone.js)
- **Desarrollo**: ~15 paquetes directos
- **Sin dependencias de terceros para UI**: Todo construido con Angular + Tailwind
