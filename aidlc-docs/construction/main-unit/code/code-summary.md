# Resumen de Código Generado — test-web-001

## Descripción General

Aplicación web Angular 19 con diseño moderno, responsivo y accesible. Utiliza arquitectura basada en componentes standalone con Tailwind CSS v3.4 y soporte para modo oscuro.

## Estructura del Proyecto

```text
src/
├── app/
│   ├── components/            # Componentes UI reutilizables
│   │   ├── accordion/         # Acordeón con navegación por teclado WAI-ARIA
│   │   ├── badge/             # Insignias con variantes de color
│   │   ├── button/            # Botón con variantes (primary, secondary, outline, ghost)
│   │   ├── card/              # Tarjeta con imagen, título, descripción y proyección
│   │   ├── form-field/        # Campo de formulario con etiqueta, error y accesibilidad
│   │   ├── modal/             # Modal con trampa de foco y animaciones Angular
│   │   ├── section-divider/   # Divisor de sección (line, dots, gradient)
│   │   ├── spinner/           # Indicador de carga SVG con tamaños
│   │   └── tabs/              # Pestañas con navegación por teclado WAI-ARIA
│   ├── layout/                # Componentes de estructura
│   │   ├── header/            # Cabecera fija con navegación y scroll shadow
│   │   ├── footer/            # Pie de página con navegación y enlaces sociales
│   │   └── mobile-menu-drawer/# Menú móvil con animación slide-in
│   ├── pages/                 # Páginas (lazy-loaded)
│   │   ├── home/              # Página principal con hero, features y CTA
│   │   ├── about/             # Sobre nosotros con misión, visión y equipo
│   │   ├── features/          # Características con tarjetas detalladas
│   │   ├── gallery/           # Galería con lightbox y navegación por teclado
│   │   └── contact/           # Contacto con formulario reactivo y WhatsApp
│   ├── shared/
│   │   ├── animations/        # Animaciones Angular (route, fade, slide)
│   │   ├── components/        # Componentes compartidos (theme-toggle, language-switcher, skip-nav, back-to-top)
│   │   ├── directives/        # Directiva tooltip
│   │   ├── interfaces/        # 22+ interfaces TypeScript (barrel export)
│   │   └── services/          # 5 servicios (theme, scroll, seo, whatsapp, animation)
│   ├── app.component.ts       # Shell con skip-nav, header, router-outlet, footer, back-to-top
│   ├── app.config.ts          # Configuración con HashLocation, ViewTransitions, AnimationsAsync
│   └── app.routes.ts          # Rutas con lazy loading para todas las páginas
├── assets/
│   └── fonts/                 # Fuentes WOFF2 auto-hospedadas
├── locale/
│   └── messages.en.xlf        # Archivo de traducción al inglés (placeholder)
├── styles/
│   ├── _variables.scss        # Propiedades CSS para temas claro/oscuro
│   ├── _typography.scss       # @font-face para fuentes primarias
│   └── _animations.scss       # Keyframes y utilidades de animación
├── index.html                 # HTML con CSP, preload de fuentes, anti-FOUC
├── main.ts                    # Bootstrap de la aplicación
└── styles.scss                # Estilos globales con Tailwind y modo oscuro
```

## Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | Angular | 19 |
| Estilos | Tailwind CSS | 3.4 |
| Pre-procesador | SCSS | — |
| Testing | Jest + jest-preset-angular | 29 / 14 |
| Testing UI | Angular Testing Library | 17 |
| i18n | @angular/localize | Build-time |
| Deployment | GitHub Pages | GitHub Actions |
| Lint | ESLint | 9 |
| Formato | Prettier | 3 |

## Patrones Implementados

- **Standalone Components**: Sin NgModules, importaciones directas
- **Angular Signals**: Estado reactivo en servicios y componentes
- **Lazy Loading**: Todas las páginas cargadas bajo demanda
- **Dark Mode**: Persistencia en localStorage, detección de preferencia del sistema, anti-FOUC
- **Accesibilidad WCAG 2.1 AAA**: Skip navigation, ARIA landmarks, navegación por teclado, contraste 7:1
- **Mobile-First Responsive**: Grid adaptable con breakpoints sm/md/lg/xl
- **HashLocationStrategy**: Compatible con GitHub Pages
- **CSP Meta Tag**: Política de seguridad de contenido
- **Self-hosted Fonts**: WOFF2 con font-display:swap y preload
- **Optimización de Imágenes**: Estrategia AVIF > WebP > JPEG/PNG
- **Formularios Reactivos**: Validación con mensajes de error accesibles
- **WhatsApp Integration**: URL sanitizada con validación de teléfono

## Archivos Generados

- **Componentes**: 22 componentes (9 UI + 4 shared + 3 layout + 5 pages + 1 app)
- **Servicios**: 5 servicios
- **Interfaces**: 22+ interfaces TypeScript
- **Animaciones**: 3 archivos de animación
- **Tests**: 20+ archivos de especificaciones
- **Estilos**: 4 archivos SCSS
- **Configuración**: angular.json, tailwind.config.js, jest.config.ts, postcss.config.js, .prettierrc
- **CI/CD**: .github/workflows/deploy.yml
- **i18n**: src/locale/messages.en.xlf
