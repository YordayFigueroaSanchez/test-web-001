# Instrucciones de Tests Unitarios

## Framework de Testing

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| Jest | 29 | Test runner y assertions |
| jest-preset-angular | 14 | Preset para Angular con Jest |
| @testing-library/angular | 17 | Testing de componentes centrado en usuario |
| @testing-library/jest-dom | 6 | Matchers DOM adicionales para Jest |
| @testing-library/user-event | 14 | Simulación de eventos de usuario |

## Configuración

### jest.config.ts
- **Preset**: `jest-preset-angular`
- **Setup**: `setup-jest.ts`
- **Cobertura mínima**: 80% (statements, branches, functions, lines)
- **Archivos incluidos**: `src/app/**/*.ts` (excluye `*.module.ts`, `*.config.ts`, `index.ts`)

## Ejecutar Tests

### 1. Ejecutar Todos los Tests

```bash
npm test
```

Ejecuta Jest una vez y muestra resultados en consola.

### 2. Ejecutar Tests en Modo Watch

```bash
npm run test:watch
```

Observa cambios en archivos y re-ejecuta tests afectados automáticamente. Ideal para desarrollo.

### 3. Ejecutar Tests con Cobertura

```bash
npm run test:coverage
```

Genera reporte de cobertura en:
- **Consola**: Resumen por archivo
- **HTML**: `coverage/lcov-report/index.html`
- **LCOV**: `coverage/lcov.info`

### 4. Ejecutar Tests de un Archivo Específico

```bash
npx jest src/app/shared/services/theme.service.spec.ts
```

### 5. Ejecutar Tests por Patrón

```bash
npx jest --testPathPattern="services"
npx jest --testPathPattern="components/button"
```

## Inventario de Tests Unitarios

### Servicios (5 archivos de spec)

| Servicio | Archivo Spec | Tests Esperados |
|----------|-------------|-----------------|
| ThemeService | `shared/services/theme.service.spec.ts` | Tema por defecto, toggle, persistencia localStorage, restauración |
| ScrollService | `shared/services/scroll.service.spec.ts` | Scroll position, IntersectionObserver, scrollToTop |
| SeoService | `shared/services/seo.service.spec.ts` | updateTitle, updateMetaTags, updateOgTags, setPageSeo |
| WhatsAppService | `shared/services/whatsapp.service.spec.ts` | buildUrl, sanitización, validación teléfono, openChat |
| AnimationService | `shared/services/animation.service.spec.ts` | prefersReducedMotion, configuraciones de animación |

### Componentes UI (6 archivos de spec)

| Componente | Archivo Spec | Tests Esperados |
|-----------|-------------|-----------------|
| ButtonComponent | `components/button/button.component.spec.ts` | Renderiza texto, variantes, disabled, click events |
| CardComponent | `components/card/card.component.spec.ts` | Renderiza título/descripción, imagen lazy, variantes |
| ModalComponent | `components/modal/modal.component.spec.ts` | Abrir/cerrar, focus trap, Escape, backdrop click |
| FormFieldComponent | `components/form-field/form-field.component.spec.ts` | Label, error display, ARIA attributes |
| AccordionComponent | `components/accordion/accordion.component.spec.ts` | Expandir/colapsar, keyboard nav, ARIA |
| TabsComponent | `components/tabs/tabs.component.spec.ts` | Tab switching, keyboard nav, ARIA roles |

### Componentes Compartidos (4 archivos de spec)

| Componente | Archivo Spec | Tests Esperados |
|-----------|-------------|-----------------|
| ThemeToggleComponent | `shared/components/theme-toggle/theme-toggle.component.spec.ts` | Toggle theme, icono cambia, aria-label |
| LanguageSwitcherComponent | `shared/components/language-switcher/language-switcher.component.spec.ts` | Muestra idioma alterno, enlace correcto |
| BackToTopComponent | `shared/components/back-to-top/back-to-top.component.spec.ts` | Visible on scroll, click scrollToTop |

### Componentes de Layout (3 archivos de spec)

| Componente | Archivo Spec | Tests Esperados |
|-----------|-------------|-----------------|
| HeaderComponent | `layout/header/header.component.spec.ts` | Renderiza nav, logo, hamburger button |
| FooterComponent | `layout/footer/footer.component.spec.ts` | Renderiza links, copyright year |
| MobileMenuDrawerComponent | `layout/mobile-menu-drawer/mobile-menu-drawer.component.spec.ts` | Abre/cierra, nav items, Escape key |

### Páginas (5 archivos de spec)

| Página | Archivo Spec | Tests Esperados |
|--------|-------------|-----------------|
| HomeComponent | `pages/home/home.component.spec.ts` | Hero heading, feature cards, CTA section |
| AboutComponent | `pages/about/about.component.spec.ts` | About heading, mission/vision, team members |
| FeaturesComponent | `pages/features/features.component.spec.ts` | Features heading, feature cards, CTA button |
| GalleryComponent | `pages/gallery/gallery.component.spec.ts` | Gallery heading, images, lightbox open/close/keyboard nav |
| ContactComponent | `pages/contact/contact.component.spec.ts` | Form fields, submit, success message, WhatsApp button |

### App Root (1 archivo de spec)

| Componente | Archivo Spec | Tests Esperados |
|-----------|-------------|-----------------|
| AppComponent | `app.component.spec.ts` | Crea app, renderiza main, skip navigation |

## Resultados Esperados

- **Total de archivos spec**: ~20
- **Tests estimados**: ~60+
- **Cobertura objetivo**: ≥ 80%
- **Tiempo estimado**: < 30 segundos

## Criterios de Éxito

1. ✅ Todos los tests pasan (0 failures)
2. ✅ Cobertura ≥ 80% en statements, branches, functions, lines
3. ✅ Sin tests saltados (skipped) no justificados
4. ✅ Todos los servicios tienen tests de sus métodos públicos
5. ✅ Todos los componentes verifican renderizado y interacción básica

## Resolución de Tests Fallidos

### Si un test falla:

1. Leer el mensaje de error completo en la consola
2. Identificar el archivo y línea del fallo
3. Verificar que el componente/servicio tiene los imports correctos
4. Verificar que los providers necesarios están configurados (ej: `provideRouter([])`)
5. Ejecutar el test individual para más detalle:
   ```bash
   npx jest --verbose path/to/failing.spec.ts
   ```
6. Corregir y re-ejecutar

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|---------|
| `NullInjectorError: No provider for Router` | Falta `provideRouter` en providers | Agregar `provideRouter([])` al setup del test |
| `Component X is not a known element` | Import faltante en standalone component | Verificar imports del componente |
| `Can't bind to 'formGroup'` | Falta `ReactiveFormsModule` | Agregar `ReactiveFormsModule` a imports del test |
| `TypeError: Cannot read 'signal'` | Signal no inicializado | Verificar que signals tienen valor por defecto |
