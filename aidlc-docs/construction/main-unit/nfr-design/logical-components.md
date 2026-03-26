# Componentes Lógicos — Unidad Principal

---

## Visión General

Este proyecto es un sitio estático desplegado en GitHub Pages. No requiere componentes de infraestructura backend (bases de datos, colas, caches de servidor, load balancers). Los "componentes lógicos" se limitan a servicios frontend Angular y configuración de build/deploy.

---

## 1. Servicios Angular (Componentes Lógicos de Frontend)

### 1.1 ThemeService
**Tipo**: Singleton (`providedIn: 'root'`)
**Responsabilidad**: Gestión de tema oscuro/claro
**Patrón RNF aplicado**: Class-Based Dark Mode, Prevención FOUC

| Propiedad/Método | Tipo | Descripción |
|---|---|---|
| `currentTheme` | `Signal<ThemeMode>` | Tema activo ('light' \| 'dark') |
| `initTheme()` | `void` | Lee localStorage → prefers-color-scheme → default |
| `toggleTheme()` | `void` | Alterna tema, persiste en localStorage, actualiza DOM |
| `isDark` | `computed<boolean>` | Computed signal para uso en templates |

**Dependencias**: Ninguna (standalone)
**Storage**: `localStorage` key `'theme'`

### 1.2 ScrollService
**Tipo**: Singleton (`providedIn: 'root'`)
**Responsabilidad**: Observación de scroll y animaciones de viewport
**Patrón RNF aplicado**: IntersectionObserver Scroll-Triggered

| Propiedad/Método | Tipo | Descripción |
|---|---|---|
| `scrollY` | `Signal<number>` | Posición vertical de scroll actual |
| `isScrolled` | `computed<boolean>` | `scrollY() > 0` para efecto header |
| `showBackToTop` | `computed<boolean>` | `scrollY() > 300` |
| `observeElement(el, opts)` | `void` | Registra IntersectionObserver en elemento |
| `scrollToTop()` | `void` | Scroll suave a posición 0 |

**Dependencias**: Ninguna
**Cleanup**: Desconectar observers en `ngOnDestroy`

### 1.3 SeoService
**Tipo**: Singleton (`providedIn: 'root'`)
**Responsabilidad**: Gestión dinámica de meta tags y títulos
**Patrón RNF aplicado**: SEO dinámico por ruta

| Propiedad/Método | Tipo | Descripción |
|---|---|---|
| `updateTitle(title)` | `void` | Actualiza `<title>` via Angular `Title` |
| `updateMetaTags(tags)` | `void` | Actualiza/crea meta tags via Angular `Meta` |
| `updateOgTags(data)` | `void` | Actualiza tags Open Graph |
| `setPageSeo(config)` | `void` | Método combinado: title + meta + OG |

**Dependencias**: `Title`, `Meta` (de `@angular/platform-browser`)

### 1.4 WhatsAppService
**Tipo**: Singleton (`providedIn: 'root'`)
**Responsabilidad**: Construcción y apertura de URL WhatsApp
**Patrón RNF aplicado**: Sanitización de URL

| Propiedad/Método | Tipo | Descripción |
|---|---|---|
| `buildUrl(config, formData)` | `string` | Construye URL wa.me sanitizada |
| `openChat(config, formData)` | `void` | Abre chat en nueva ventana |
| `validatePhone(phone)` | `boolean` | Valida formato de teléfono |

**Dependencias**: Ninguna
**Seguridad**: `encodeURIComponent()`, validación de dígitos, `noopener,noreferrer`

### 1.5 AnimationService
**Tipo**: Singleton (`providedIn: 'root'`)
**Responsabilidad**: Configuraciones de animación reutilizables
**Patrón RNF aplicado**: Route Transitions, Respeto prefers-reduced-motion

| Propiedad/Método | Tipo | Descripción |
|---|---|---|
| `prefersReducedMotion` | `Signal<boolean>` | Detecta preferencia del usuario |
| `routeTransition` | `AnimationTriggerMetadata` | Animación de cambio de ruta |
| `fadeIn(duration?)` | `AnimationMetadata[]` | Fade in configurable |
| `slideUp(duration?)` | `AnimationMetadata[]` | Slide up configurable |

**Dependencias**: `@angular/animations`

---

## 2. Componente de Build y Empaquetado

### 2.1 Angular CLI Build Pipeline
```
Entrada: src/
  → TypeScript Compiler (strict mode)
  → esbuild (bundling + minification)
  → PostCSS pipeline
    → Tailwind CSS v3.4 (utility generation)
    → Autoprefixer (vendor prefixes)
    → PurgeCSS (eliminación de clases no usadas)
  → @angular/localize (i18n extraction + generation)
  → Output: dist/es/ + dist/en/
```

### 2.2 Configuración de Budgets (angular.json)
```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "180kB",
      "maximumError": "200kB"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "4kB",
      "maximumError": "8kB"
    }
  ]
}
```

---

## 3. Componente de Despliegue

### 3.1 GitHub Actions Workflow
```
Trigger: push a main
  → Checkout código
  → Setup Node.js 20
  → npm ci (install dependencias)
  → ng build --configuration production --localize
  → Copiar 404.html en cada subdirectorio (es/, en/)
  → Deploy a gh-pages via peaceiris/actions-gh-pages
```

### 3.2 Estructura de Deploy
```
gh-pages branch root/
├── es/
│   ├── index.html        (build español)
│   ├── 404.html           (copia de index.html para SPA routing)
│   ├── main-[hash].js
│   ├── polyfills-[hash].js
│   ├── styles-[hash].css
│   └── assets/
│       ├── fonts/         (WOFF2 compartidas)
│       └── images/        (AVIF/WebP/JPEG)
├── en/
│   ├── index.html        (build inglés)
│   ├── 404.html
│   ├── main-[hash].js
│   ├── polyfills-[hash].js
│   ├── styles-[hash].css
│   └── assets/
│       ├── fonts/
│       └── images/
└── index.html             (redirect a /es/ por defecto)
```

---

## 4. Diagrama de Componentes Lógicos

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (Cliente)                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │ ThemeService │  │ ScrollService│  │ AnimationSvc  │   │
│  │ ┌─────────┐ │  │ ┌──────────┐ │  │ ┌───────────┐ │   │
│  │ │localStorage│ │ │Intersection│ │  │ │prefers-   │ │   │
│  │ │ Signal   │ │  │ │Observer  │ │  │ │reduced-   │ │   │
│  │ └─────────┘ │  │ └──────────┘ │  │ │motion     │ │   │
│  └─────────────┘  └──────────────┘  │ └───────────┘ │   │
│                                      └───────────────┘   │
│  ┌──────────────┐  ┌───────────────┐                     │
│  │  SeoService   │  │WhatsAppService│                    │
│  │ ┌──────────┐ │  │ ┌───────────┐ │                    │
│  │ │Title/Meta│ │  │ │wa.me URL  │ │                    │
│  │ │Services  │ │  │ │Builder    │ │                    │
│  │ └──────────┘ │  │ └───────────┘ │                    │
│  └──────────────┘  └───────────────┘                     │
│                                                           │
├─────────────────────────────────────────────────────────┤
│                    BUILD PIPELINE                         │
│  TypeScript → esbuild → PostCSS/Tailwind → @angular/     │
│  localize → dist/es/ + dist/en/                          │
├─────────────────────────────────────────────────────────┤
│                    DEPLOY PIPELINE                        │
│  GitHub Actions → gh-pages branch → GitHub Pages CDN     │
└─────────────────────────────────────────────────────────┘
```

---

## 5. APIs Externas

| Servicio | Tipo | URL | Uso |
|---|---|---|---|
| **WhatsApp** | URL scheme | `https://wa.me/{phone}?text={msg}` | Formulario de contacto → chat directo |
| **GitHub Pages** | CDN estático | `https://{user}.github.io/{repo}/` | Hosting de producción |

**Nota**: No hay APIs REST, GraphQL, WebSockets ni servicios de terceros adicionales.
