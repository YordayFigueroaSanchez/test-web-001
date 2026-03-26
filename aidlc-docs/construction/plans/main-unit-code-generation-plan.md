# Plan de Generación de Código — Unidad Principal

## Contexto de la Unidad
- **Proyecto**: test-web-001 (sitio de marketing Angular 19)
- **Tipo**: Greenfield — unidad única
- **Workspace Root**: `c:\GitHub\test-web-001`
- **Código de aplicación**: Workspace root (`src/`, `angular.json`, etc.)
- **Idioma del código**: Inglés (variables, funciones, comentarios)
- **Documentación**: `aidlc-docs/` (español)

## Dependencias y Interfaces
- Sin dependencias externas de backend/API
- API externa única: WhatsApp URL scheme (`wa.me`)
- i18n: `@angular/localize` build-time (ES/EN)
- Hosting: GitHub Pages con HashLocationStrategy

## Plan de Ejecución

---

### Paso 1: Inicialización del Proyecto Angular
- [x] Ejecutar `ng new test-web-001` con configuración: standalone, SCSS, routing, SSR=no
- [x] Configurar `angular.json`: budgets (200KB initial), output path, sourceMap off en prod
- [x] Configurar `tsconfig.json`: strict mode
- [x] Configurar `package.json` scripts: build:es, build:en, build (ambos)

### Paso 2: Instalación de Dependencias
- [x] Instalar Tailwind CSS v3.4 + PostCSS + Autoprefixer
- [x] Configurar `tailwind.config.js`: content paths, darkMode 'class', custom theme
- [x] Configurar PostCSS (`postcss.config.js`)
- [x] Instalar `@angular/localize`
- [x] Instalar dependencias de testing: Jest, jest-preset-angular, @testing-library/angular, @testing-library/jest-dom, @testing-library/user-event
- [x] Configurar Jest (`jest.config.ts`, `setup-jest.ts`)
- [x] Instalar ESLint + @angular-eslint + Prettier
- [x] Configurar ESLint (`.eslintrc.json`) y Prettier (`.prettierrc`)

### Paso 3: Estilos Globales y Fuentes
- [x] Crear `src/styles.scss` con imports de Tailwind (@tailwind base/components/utilities)
- [x] Crear `src/styles/_variables.scss` con CSS custom properties (colores semánticos light/dark)
- [x] Crear `src/styles/_typography.scss` con @font-face (WOFF2 self-hosted) y escalas tipográficas
- [x] Crear `src/styles/_animations.scss` con keyframes globales (fade-up, slide-in, etc.)
- [x] Agregar placeholder de fuentes en `src/assets/fonts/` (README indicando añadir WOFF2)
- [x] Agregar `prefers-reduced-motion` media query global

### Paso 4: Interfaces y Modelos TypeScript
- [x] Crear `src/app/shared/interfaces/navigation.interface.ts` — NavItem
- [x] Crear `src/app/shared/interfaces/contact-form.interface.ts` — ContactFormData
- [x] Crear `src/app/shared/interfaces/gallery.interface.ts` — GalleryImage
- [x] Crear `src/app/shared/interfaces/team.interface.ts` — TeamMember, SocialLink
- [x] Crear `src/app/shared/interfaces/feature.interface.ts` — FeatureItem
- [x] Crear `src/app/shared/interfaces/seo.interface.ts` — MetaTag, OpenGraphData, PageSeoConfig
- [x] Crear `src/app/shared/interfaces/whatsapp.interface.ts` — WhatsAppConfig
- [x] Crear `src/app/shared/interfaces/component.interface.ts` — AccordionItem, TabItem
- [x] Crear `src/app/shared/interfaces/animation.interface.ts` — AnimationConfig
- [x] Crear `src/app/shared/interfaces/theme.interface.ts` — ThemeMode, tipo alias
- [x] Crear `src/app/shared/interfaces/ui.interface.ts` — ButtonVariant, ButtonSize, CardVariant, etc.
- [x] Crear barrel export `src/app/shared/interfaces/index.ts`

### Paso 5: Servicios
- [x] Crear `src/app/shared/services/theme.service.ts` — Signal-based, localStorage, prefers-color-scheme
- [x] Crear `src/app/shared/services/theme.service.spec.ts` — Tests unitarios
- [x] Crear `src/app/shared/services/scroll.service.ts` — IntersectionObserver, scrollY Signal, backToTop
- [x] Crear `src/app/shared/services/scroll.service.spec.ts` — Tests unitarios
- [x] Crear `src/app/shared/services/seo.service.ts` — Title, Meta, OpenGraph dinámicos
- [x] Crear `src/app/shared/services/seo.service.spec.ts` — Tests unitarios
- [x] Crear `src/app/shared/services/whatsapp.service.ts` — URL builder, sanitización, validación
- [x] Crear `src/app/shared/services/whatsapp.service.spec.ts` — Tests unitarios
- [x] Crear `src/app/shared/services/animation.service.ts` — Configs reutilizables, prefers-reduced-motion
- [x] Crear `src/app/shared/services/animation.service.spec.ts` — Tests unitarios

### Paso 6: Animaciones
- [x] Crear `src/app/shared/animations/route.animations.ts` — fadeIn/fadeOut route transition trigger
- [x] Crear `src/app/shared/animations/fade.animations.ts` — fadeIn, fadeOut helper functions
- [x] Crear `src/app/shared/animations/slide.animations.ts` — slideUp, slideDown, slideIn helpers

### Paso 7: Componentes UI Reutilizables
- [x] Crear `src/app/components/button/` — ButtonComponent (variant, size, disabled, ariaLabel)
- [x] Crear `src/app/components/button/button.component.spec.ts` — Tests
- [x] Crear `src/app/components/card/` — CardComponent (variant, imageSrc, title, ng-content)
- [x] Crear `src/app/components/card/card.component.spec.ts` — Tests
- [x] Crear `src/app/components/modal/` — ModalComponent (isOpen, title, focus trap, animations)
- [x] Crear `src/app/components/modal/modal.component.spec.ts` — Tests
- [x] Crear `src/app/components/form-field/` — FormFieldComponent (label, type, error, ARIA)
- [x] Crear `src/app/components/form-field/form-field.component.spec.ts` — Tests
- [x] Crear `src/app/components/accordion/` — AccordionComponent (items, keyboard navigation)
- [x] Crear `src/app/components/accordion/accordion.component.spec.ts` — Tests
- [x] Crear `src/app/components/tabs/` — TabsComponent (tabs, keyboard navigation, ARIA)
- [x] Crear `src/app/components/tabs/tabs.component.spec.ts` — Tests
- [x] Crear `src/app/components/badge/` — BadgeComponent (text, variant)
- [x] Crear `src/app/components/spinner/` — SpinnerComponent (size, ariaLabel)
- [x] Crear `src/app/components/section-divider/` — SectionDividerComponent (variant)

### Paso 8: Componentes Compartidos
- [x] Crear `src/app/shared/components/theme-toggle/` — ThemeToggleComponent (ícono sol/luna, ARIA)
- [x] Crear `src/app/shared/components/theme-toggle/theme-toggle.component.spec.ts` — Tests
- [x] Crear `src/app/shared/components/language-switcher/` — LanguageSwitcherComponent (ES/EN switch)
- [x] Crear `src/app/shared/components/language-switcher/language-switcher.component.spec.ts` — Tests
- [x] Crear `src/app/shared/components/skip-nav/` — SkipNavComponent (targetId, sr-only visible on focus)
- [x] Crear `src/app/shared/components/back-to-top/` — BackToTopComponent (visibilidad con scroll, ARIA)
- [x] Crear `src/app/shared/components/back-to-top/back-to-top.component.spec.ts` — Tests
- [x] Crear `src/app/shared/directives/tooltip.directive.ts` — TooltipDirective (position, text)

### Paso 9: Componentes de Layout
- [x] Crear `src/app/layout/header/` — HeaderComponent (nav, hamburger, isScrolled Signal)
- [x] Crear `src/app/layout/header/header.component.spec.ts` — Tests
- [x] Crear `src/app/layout/footer/` — FooterComponent (nav secondary, social links, copyright)
- [x] Crear `src/app/layout/footer/footer.component.spec.ts` — Tests
- [x] Crear `src/app/layout/mobile-menu-drawer/` — MobileMenuDrawerComponent (slide-in, focus trap, backdrop)
- [x] Crear `src/app/layout/mobile-menu-drawer/mobile-menu-drawer.component.spec.ts` — Tests

### Paso 10: Páginas (Lazy-Loaded)
- [x] Crear `src/app/pages/home/` — HomeComponent (hero, features grid, CTA, scroll animations)
- [x] Crear `src/app/pages/home/home.component.spec.ts` — Tests
- [x] Crear `src/app/pages/about/` — AboutComponent (historia, misión/visión, equipo grid)
- [x] Crear `src/app/pages/about/about.component.spec.ts` — Tests
- [x] Crear `src/app/pages/features/` — FeaturesComponent (feature cards detalladas, CTA)
- [x] Crear `src/app/pages/features/features.component.spec.ts` — Tests
- [x] Crear `src/app/pages/gallery/` — GalleryComponent (grid responsivo, lightbox, keyboard nav)
- [x] Crear `src/app/pages/gallery/gallery.component.spec.ts` — Tests
- [x] Crear `src/app/pages/contact/` — ContactComponent (reactive form, validación, WhatsApp integration)
- [x] Crear `src/app/pages/contact/contact.component.spec.ts` — Tests

### Paso 11: Componente Raíz, Configuración y Rutas
- [x] Actualizar `src/app/app.component.ts` — Layout shell (header, router-outlet, footer, back-to-top, announcer)
- [x] Actualizar `src/app/app.component.html` — Template con skip-nav, header, main, footer
- [x] Crear `src/app/app.routes.ts` — Rutas con lazy loading (loadComponent)
- [x] Crear `src/app/app.config.ts` — provideRouter, provideAnimations, provideHttpClient
- [x] Actualizar `src/index.html` — Anti-FOUC script, CSP meta tag, preload fonts, lang attribute
- [x] Actualizar `src/main.ts` — Bootstrap con app.config

### Paso 12: Configuración de i18n
- [x] Configurar `angular.json` localize settings (sourceLocale: es, locales: en)
- [x] Agregar marcadores `$localize` en templates y componentes
- [x] Crear `src/locale/messages.en.xlf` (archivo de traducción base)
- [x] Documentar comandos de extracción y build dual

### Paso 13: Configuración CI/CD
- [x] Crear `.github/workflows/deploy.yml` — Build + deploy a GitHub Pages
- [x] Crear `404.html` (copia de index.html para SPA routing)

### Paso 14: Documentación del Código
- [x] Crear resumen de código en `aidlc-docs/construction/main-unit/code/code-summary.md`
- [x] Actualizar `README.md` del proyecto con setup instructions

---

## Resumen
- **Total de pasos**: 14
- **Archivos estimados**: ~70+ archivos (componentes + tests + config + estilos)
- **Scope**: Proyecto Angular 19 completo desde cero, listo para desarrollo de contenido
