# Diseño de Aplicación — Documento Consolidado

---

## 1. Visión General de la Arquitectura

Este documento consolida el diseño de aplicación completo para **test-web-001**, un sitio de marketing/landing page construido con Angular 19.

### Decisiones Arquitectónicas

| Decisión | Elección | Justificación |
|---|---|---|
| **Modelo de componentes** | Standalone (sin NgModules) | Angular 19 best practice, tree-shaking mejorado |
| **Reactividad** | Angular Signals | Modelo reactivo moderno, mejor rendimiento que RxJS para estado UI |
| **Flujo de control** | @if, @for, @switch | Nueva sintaxis de Angular 19, más legible |
| **i18n** | @angular/localize (build-time) | Build separado por idioma, mejor rendimiento |
| **Animaciones** | CSS + Angular Animations | CSS para hover/focus, Angular Animations para rutas/estados |
| **Estilos** | Tailwind CSS + SCSS | Tailwind utility-first, SCSS para estilos complejos de componentes |
| **Tema oscuro** | Tailwind dark mode (class strategy) | Toggle via clase `dark` en `<html>` |
| **Routing** | HashLocationStrategy | Compatibilidad con GitHub Pages |
| **Lazy loading** | Todas las rutas de páginas | Reducir bundle inicial |
| **Formulario contacto** | Integración WhatsApp via wa.me | Sin backend, apertura directa de chat |

---

## 2. Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes UI reutilizables
│   │   ├── button/
│   │   ├── card/
│   │   ├── modal/
│   │   ├── form-field/
│   │   ├── accordion/
│   │   ├── tabs/
│   │   ├── badge/
│   │   ├── spinner/
│   │   └── section-divider/
│   ├── layout/              # Componentes de layout
│   │   ├── header/
│   │   ├── footer/
│   │   └── mobile-menu-drawer/
│   ├── pages/               # Componentes de página (lazy-loaded)
│   │   ├── home/
│   │   ├── about/
│   │   ├── features/
│   │   ├── gallery/
│   │   └── contact/
│   ├── shared/              # Servicios, directivas, pipes, interfaces
│   │   ├── components/      # Componentes compartidos pequeños
│   │   │   ├── theme-toggle/
│   │   │   ├── language-switcher/
│   │   │   ├── skip-nav/
│   │   │   └── back-to-top/
│   │   ├── directives/
│   │   │   └── tooltip/
│   │   ├── services/
│   │   │   ├── theme.service.ts
│   │   │   ├── scroll.service.ts
│   │   │   ├── seo.service.ts
│   │   │   ├── whatsapp.service.ts
│   │   │   └── animation.service.ts
│   │   ├── interfaces/
│   │   │   ├── meta-tag.interface.ts
│   │   │   ├── contact-form.interface.ts
│   │   │   ├── accordion-item.interface.ts
│   │   │   └── tab-item.interface.ts
│   │   └── animations/
│   │       ├── route.animations.ts
│   │       ├── fade.animations.ts
│   │       └── slide.animations.ts
│   ├── app.component.ts     # Componente raíz
│   ├── app.config.ts        # Configuración de la aplicación
│   └── app.routes.ts        # Definición de rutas (lazy loading)
├── assets/
│   ├── images/
│   ├── icons/
│   └── i18n/                # (si se usan archivos de traducción auxiliares)
├── styles/
│   ├── styles.scss           # Estilos globales
│   ├── _variables.scss       # Tokens de diseño / variables SCSS
│   ├── _typography.scss      # Estilos tipográficos
│   └── _animations.scss      # Keyframes y animaciones CSS globales
├── locale/                   # Archivos de traducción @angular/localize
│   ├── messages.es.xlf
│   └── messages.en.xlf
├── index.html
├── main.ts
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

---

## 3. Inventario de Componentes (Resumen)

| Categoría | Cant. | Componentes |
|---|---|---|
| **Layout** | 3 | HeaderComponent, FooterComponent, MobileMenuDrawerComponent |
| **Páginas** | 5 | HomePageComponent, AboutPageComponent, FeaturesPageComponent, GalleryPageComponent, ContactPageComponent |
| **UI Reutilizables** | 9+1 | ButtonComponent, CardComponent, ModalComponent, FormFieldComponent, AccordionComponent, TabsComponent, BadgeComponent, SpinnerComponent, SectionDividerComponent + TooltipDirective |
| **Compartidos** | 4 | ThemeToggleComponent, LanguageSwitcherComponent, SkipNavComponent, BackToTopComponent |
| **Total** | **22** | — |

> Detalle completo en: `components.md`

---

## 4. Inventario de Servicios (Resumen)

| Servicio | Responsabilidad Principal |
|---|---|
| **ThemeService** | Gestión de modo oscuro/claro con persistencia en localStorage |
| **ScrollService** | Scroll tracking, smooth scroll, Intersection Observer |
| **SeoService** | Meta tags dinámicos, títulos por ruta, Open Graph |
| **WhatsAppService** | Construcción de URL wa.me y apertura de chat desde formulario |
| **AnimationService** | Configuraciones reutilizables de Angular Animations |

> Detalle completo en: `services.md`

---

## 5. Estrategia de Routing

```typescript
// app.routes.ts (estructura conceptual)
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component') },
  { path: 'about', loadComponent: () => import('./pages/about/about.component') },
  { path: 'features', loadComponent: () => import('./pages/features/features.component') },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component') },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component') },
  { path: '**', redirectTo: '' }
];
```

- **Estrategia**: `HashLocationStrategy` para compatibilidad con GitHub Pages
- **Lazy Loading**: Todas las páginas cargadas bajo demanda
- **Animaciones de ruta**: Angular Animations trigger en cambio de ruta (fade/slide)
- **SEO**: `SeoService` actualiza título y meta tags en cada navegación

---

## 6. Estrategia de i18n (@angular/localize)

- **Enfoque**: Traducción en tiempo de compilación
- **Builds separados**: Un build para `/es/` y otro para `/en/`
- **Archivos fuente**: `locale/messages.es.xlf`, `locale/messages.en.xlf`
- **Etiquetado**: Todos los textos visibles marcados con `$localize` o atributo `i18n`
- **Cambio de idioma**: `LanguageSwitcherComponent` redirige al build alternativo
- **Despliegue**: Dos carpetas en GitHub Pages (`/es/`, `/en/`), con redirect basado en `Accept-Language` o default a español

---

## 7. Estrategia de Tema Oscuro/Claro

- **Implementación**: Tailwind CSS dark mode con estrategia `class`
- **Toggle**: Clase `dark` en el `<html>` element
- **Prioridad de inicialización**:
  1. Valor guardado en `localStorage`
  2. Preferencia del sistema (`prefers-color-scheme: dark`)
  3. Default: `light`
- **Tokens de diseño**: Definidos en `tailwind.config.js` con variantes `dark:`
- **Contraste WCAG AAA**: 7:1 para texto normal en ambos temas

---

## 8. Dependencias Principales

> Detalle completo en: `component-dependency.md`

### Patrones de Comunicación
1. **Padre → Hijo**: Input bindings (Signals y @Input)
2. **Hijo → Padre**: EventEmitter + @Output
3. **Cross-component**: Servicios singleton con Signals
4. **Router**: Navegación entre páginas y entre builds de idioma

---

## 9. Cumplimiento de Extensiones de Seguridad

| Regla | Aplicabilidad | Estado |
|---|---|---|
| SECURITY-04 (Headers HTTP) | Aplicable | Meta tags CSP en index.html; headers completos requieren CDN proxy |
| SECURITY-05 (Validación de Entrada) | Aplicable | Validación client-side en formulario de contacto; sanitización de URL WhatsApp |
| SECURITY-09 (Hardening) | Aplicable | Sin source maps en producción, sin contenido de ejemplo |
| SECURITY-10 (Supply Chain) | Aplicable | package-lock.json, npm audit en CI, Dependabot |
| SECURITY-01, 02, 03, 06, 07, 08 | N/A | Sin backend, sin authentication, sin infraestructura cloud |
