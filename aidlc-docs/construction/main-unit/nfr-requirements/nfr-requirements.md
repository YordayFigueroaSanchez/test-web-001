# Requisitos No Funcionales — Unidad Principal

---

## 1. Rendimiento

### 1.1 Métricas Core Web Vitals
| Métrica | Objetivo | Umbral Máximo | Herramienta de Medición |
|---|---|---|---|
| **First Contentful Paint (FCP)** | < 1.0s | < 1.5s | Lighthouse |
| **Largest Contentful Paint (LCP)** | < 2.0s | < 2.5s | Lighthouse |
| **Cumulative Layout Shift (CLS)** | < 0.05 | < 0.1 | Lighthouse |
| **Interaction to Next Paint (INP)** | < 100ms | < 200ms | Lighthouse |
| **Time to First Byte (TTFB)** | < 200ms | < 600ms | WebPageTest |
| **Lighthouse Performance Score** | 95+ | 90+ | Lighthouse |

### 1.2 Presupuesto de Bundle
| Tipo | Límite (gzipped) |
|---|---|
| **Carga inicial (main + polyfills + styles)** | < 200KB |
| **Bundle total (todas las rutas cargadas)** | < 500KB |

**Nota**: No se aplican presupuestos por ruta individual. Se usará el presupuesto global de Angular CLI.

### 1.3 Optimización de Imágenes
| Aspecto | Requisito |
|---|---|
| **Formato prioritario** | AVIF (máxima compresión) |
| **Fallback nivel 1** | WebP |
| **Fallback nivel 2** | JPEG/PNG (navegadores legacy) |
| **Implementación** | Elemento `<picture>` con `<source>` por formato |
| **Carga** | Lazy loading nativo (`loading="lazy"`) excepto imágenes above-the-fold |
| **Dimensiones** | `srcset` responsivo con múltiples tamaños (320w, 640w, 960w, 1280w) |
| **Placeholder** | Skeleton placeholder o blur-up para evitar CLS |
| **Alt text** | Obligatorio en todas las imágenes (WCAG AAA) |

### 1.4 Optimización de Fuentes
| Aspecto | Requisito |
|---|---|
| **Estrategia** | Auto-alojadas (self-hosted) en `/assets/fonts/` |
| **Formato** | WOFF2 (compresión óptima, soporte universal moderno) |
| **Carga** | `font-display: swap` para evitar FOIT |
| **Preload** | `<link rel="preload">` para la fuente principal del body |
| **Variantes** | Subconjuntos latinos + caracteres especiales español (ñ, á, é, etc.) |
| **Peso máximo** | < 100KB total para todas las variantes de fuentes |

### 1.5 Estrategias de Rendimiento Adicionales
- **Tree-shaking**: Habilitado automáticamente vía Angular CLI + esbuild
- **PurgeCSS**: Tailwind CSS v3.4 elimina clases no utilizadas en producción
- **Lazy loading de rutas**: Todas las páginas son lazy-loaded
- **Preconnect/DNS-prefetch**: Para dominios externos si los hay
- **Cache**: Archivos estáticos con hashing para cache busting largo (Angular CLI default)

---

## 2. Accesibilidad — WCAG 2.1 AAA

### 2.1 Criterios de Contraste
| Tipo de Texto | Ratio Mínimo | Norma |
|---|---|---|
| **Texto normal** (< 18px / < 14px bold) | 7:1 | WCAG 2.1 AAA (1.4.6) |
| **Texto grande** (≥ 18px / ≥ 14px bold) | 4.5:1 | WCAG 2.1 AAA (1.4.6) |
| **Componentes UI e íconos** | 3:1 | WCAG 2.1 AA (1.4.11) |

### 2.2 Navegación por Teclado
| Requisito | Implementación |
|---|---|
| **Skip navigation** | Primer elemento focusable, enlace a `#main-content` |
| **Focus visible** | Outline de 2px con offset, visible en ambos temas |
| **Orden de foco** | Lógico y secuencial (tabindex natural del DOM) |
| **Focus trap** | En modales y drawers abiertos |
| **No trap de teclado** | Escape siempre disponible para cerrar overlays |
| **Navegación de componentes** | Arrow keys en tabs, accordion, galería (WAI-ARIA patterns) |

### 2.3 ARIA y Semántica
| Requisito | Detalle |
|---|---|
| **Landmarks** | `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` con aria-label |
| **Roles** | `role="dialog"`, `role="banner"`, `role="contentinfo"`, `role="navigation"` |
| **Live regions** | `aria-live="polite"` para cambios de tema e idioma |
| **Idioma** | `lang="es"` / `lang="en"` en `<html>`, `lang` en fragmentos de idioma diferente |
| **Imágenes** | `alt` descriptivo obligatorio, `alt=""` + `role="presentation"` para decorativas |

### 2.4 Objetivos Táctiles
- Tamaño mínimo: **44x44px** (WCAG 2.5.5 AAA: Target Size Enhanced)
- Aplica a: botones, enlaces, toggles, tabs, elementos de navegación

---

## 3. Seguridad

### 3.1 Headers de Seguridad (via meta tags en index.html)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

**Nota**: `Strict-Transport-Security` y `X-Frame-Options` requieren control de headers del servidor. GitHub Pages habilita HTTPS por defecto pero no permite headers personalizados. Se documentará como limitación.

### 3.2 Validación de Entrada
| Campo | Validación Client-Side |
|---|---|
| **Nombre** | Required, 2-100 chars, patrón letras/espacios/guiones |
| **Email** | Required, patrón RFC 5322 simplificado, max 254 chars |
| **Mensaje** | Required, 10-1000 chars |
| **URL WhatsApp** | `encodeURIComponent()` para todos los valores del usuario |
| **Teléfono en config** | Solo dígitos, validación de formato |

### 3.3 Cadena de Suministro
| Control | Implementación |
|---|---|
| **Lock file** | `package-lock.json` con versiones exactas |
| **Auditoría** | `npm audit` como parte del build |
| **Source maps** | Deshabilitados en producción |
| **Dependencias** | Mínimas, solo las necesarias |

---

## 4. Compatibilidad de Navegadores

### 4.1 Navegadores Soportados
| Navegador | Versiones | Plataforma |
|---|---|---|
| Chrome | Últimas 2 | Desktop + Android |
| Firefox | Últimas 2 | Desktop |
| Safari | Últimas 2 | Desktop + iOS |
| Edge | Últimas 2 | Desktop |

### 4.2 Configuración Browserslist
```
last 2 Chrome versions
last 2 Firefox versions
last 2 Safari versions
last 2 Edge versions
```

---

## 5. SEO

### 5.1 Meta Tags por Página
| Página | Title Pattern | Description |
|---|---|---|
| Home | `{Nombre} — {Tagline}` | Descripción general del producto/servicio |
| About | `Nosotros — {Nombre}` | Historia, misión y equipo |
| Features | `Características — {Nombre}` | Descripción de servicios/features |
| Gallery | `Galería — {Nombre}` | Portafolio visual |
| Contact | `Contacto — {Nombre}` | Información de contacto |

### 5.2 Open Graph Tags
Cada página incluirá: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`

### 5.3 Datos Estructurados
- JSON-LD `Organization` en la página Home
- JSON-LD `WebSite` con `SearchAction` (si aplica)
- JSON-LD `BreadcrumbList` en todas las páginas

---

## 6. Testing

### 6.1 Framework y Herramientas
| Herramienta | Propósito |
|---|---|
| **Jest** | Framework de testing principal (unit + component tests) |
| **Angular Testing Library** | Testing de componentes centrado en el usuario |
| **@testing-library/jest-dom** | Matchers adicionales para aserciones DOM |

### 6.2 Cobertura y Alcance
| Métrica | Objetivo |
|---|---|
| **Cobertura global** | ≥ 80% (líneas, ramas, funciones) |
| **Componentes UI** | Tests de renderizado, interacción y accesibilidad |
| **Servicios** | Tests unitarios de lógica de negocio |
| **Pipes/Directivas** | Tests unitarios de transformación |

### 6.3 Categorías de Tests
| Categoría | Alcance | Ejemplo |
|---|---|---|
| **Unit tests** | Servicios, pipes, funciones puras | ThemeService.toggleTheme() |
| **Component tests** | Componentes UI aislados | ButtonComponent renderiza variantes |
| **Integration tests** | Interacción entre componentes | ContactPage → WhatsAppService |
| **Accessibility tests** | ARIA, roles, keyboard | Modal focus trap funciona |

---

## 7. Mantenibilidad

### 7.1 Calidad de Código
| Herramienta | Configuración |
|---|---|
| **TypeScript** | `strict: true` |
| **ESLint** | `@angular-eslint` + reglas recomendadas |
| **Prettier** | Formateo automático consistente |
| **Convención de nombres** | PascalCase componentes, camelCase variables/funciones, kebab-case archivos |

### 7.2 Estructura y Organización
- Standalone components (sin NgModules)
- Lazy loading para todas las rutas de páginas
- Servicios inyectados vía `providedIn: 'root'`
- Interfaces y tipos en archivos dedicados (`models/`)

---

## 8. Despliegue — GitHub Pages

### 8.1 Pipeline CI/CD (Básico)
```
Push a main → GitHub Actions → ng build --configuration production → Deploy a gh-pages
```

| Paso | Detalle |
|---|---|
| **Trigger** | Push a rama `main` |
| **Build** | `ng build --configuration production` (dos builds: ES y EN) |
| **Output** | `dist/` con subdirectorios `/es/` y `/en/` |
| **Deploy** | GitHub Actions `peaceiris/actions-gh-pages` o similar |
| **URL** | `https://{user}.github.io/{repo}/` |

### 8.2 Configuración de Despliegue
| Aspecto | Valor |
|---|---|
| **Routing** | HashLocationStrategy (`useHash: true`) |
| **404.html** | Copia de index.html para fallback SPA |
| **Base href** | `/{repo}/` (configurado per-build) |
| **Source maps** | Deshabilitados en producción |
