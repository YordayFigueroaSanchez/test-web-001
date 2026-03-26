# Patrones de Diseño RNF — Unidad Principal

---

## 1. Patrones de Rendimiento

### 1.1 Patrón: Lazy Loading de Rutas
**Problema**: Reducir el tamaño del bundle inicial para cumplir <200KB gzipped.
**Solución**: Todas las páginas se cargan bajo demanda via `loadComponent` en la configuración de rutas.

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'features', loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent) },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];
```

**Impacto**: Cada página genera un chunk separado (~10-30KB) cargado solo cuando el usuario navega a esa ruta.

### 1.2 Patrón: Imagen Progresiva con `<picture>`
**Problema**: Ofrecer imágenes AVIF/WebP con fallbacks sin romper navegadores legacy.
**Solución**: Componente wrapper que genera el elemento `<picture>` con múltiples `<source>`.

```html
<!-- Patrón de implementación -->
<picture>
  <source type="image/avif"
          srcset="image-320.avif 320w, image-640.avif 640w, image-960.avif 960w, image-1280.avif 1280w"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw">
  <source type="image/webp"
          srcset="image-320.webp 320w, image-640.webp 640w, image-960.webp 960w, image-1280.webp 1280w"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw">
  <img src="image-640.jpg"
       srcset="image-320.jpg 320w, image-640.jpg 640w, image-960.jpg 960w, image-1280.jpg 1280w"
       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
       alt="Descripción"
       loading="lazy"
       width="640" height="480"
       class="w-full h-auto">
</picture>
```

**Reglas**:
- Imágenes above-the-fold: `loading="eager"` + `fetchpriority="high"`
- Imágenes below-the-fold: `loading="lazy"`
- Siempre incluir `width` y `height` para evitar CLS

### 1.3 Patrón: Preload de Fuentes Críticas
**Problema**: Evitar FOIT/FOUT que impacta FCP y CLS.
**Solución**: Preload explícito + `font-display: swap`.

```html
<!-- index.html <head> -->
<link rel="preload" href="assets/fonts/primary-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/primary-bold.woff2" as="font" type="font/woff2" crossorigin>
```

```scss
// fonts.scss
@font-face {
  font-family: 'PrimaryFont';
  src: url('/assets/fonts/primary-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 1.4 Patrón: Animaciones Scroll-Triggered con IntersectionObserver
**Problema**: Activar animaciones al hacer scroll sin afectar rendimiento (sin listener de scroll convencional).
**Solución**: `ScrollService` usa `IntersectionObserver` para observar elementos y emitir visibilidad.

```
ScrollService.observeElement(element, options)
  → Crear IntersectionObserver con threshold y rootMargin
  → Cuando isIntersecting === true:
    → Añadir clase CSS de animación (ej. 'animate-fade-up')
    → Desconectar observer (animación one-shot)
```

**Configuración**:
- `threshold: 0.15` — trigger cuando 15% del elemento es visible
- `rootMargin: '0px 0px -50px 0px'` — ligero offset hacia abajo
- Usar `will-change: transform, opacity` solo durante la animación
- Respetar `prefers-reduced-motion: reduce` — deshabilitar animaciones

---

## 2. Patrones de Accesibilidad (WCAG 2.1 AAA)

### 2.1 Patrón: Focus Management
**Problema**: Mantener foco coherente en interacciones modales, drawers y navegación.
**Solución**: Patrón de Focus Trap reutilizable.

```
Modal/Drawer se abre:
  → Guardar elemento previamente enfocado (document.activeElement)
  → Mover foco al primer elemento focusable dentro del modal
  → Activar focus trap (Tab/Shift+Tab cicla dentro del contenedor)
  → Escape cierra el modal

Modal/Drawer se cierra:
  → Desactivar focus trap
  → Restaurar foco al elemento guardado
```

**Elementos focusables detectados**: `a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])`

### 2.2 Patrón: Skip Navigation
**Problema**: Permitir a usuarios de teclado/screen reader saltar la navegación repetitiva.
**Solución**: Enlace oculto visualmente, visible al enfocar.

```html
<a class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
          focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
   href="#main-content">
  Saltar al contenido principal
</a>
```

### 2.3 Patrón: Anuncio de Cambios Dinámicos
**Problema**: Notificar a screen readers sobre cambios de tema, idioma y estado.
**Solución**: Live region con `aria-live="polite"`.

```html
<!-- En app.component.html -->
<div class="sr-only" aria-live="polite" aria-atomic="true" #announcer>
  <!-- Mensajes dinámicos inyectados vía service -->
</div>
```

```
ThemeService.toggleTheme()
  → Cambiar tema
  → announcer.textContent = 'Tema cambiado a modo oscuro'

FormValidation succeeds
  → announcer.textContent = 'Mensaje enviado correctamente'
```

### 2.4 Patrón: Componentes WAI-ARIA
**Tabs**: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, Arrow keys para navegación.

**Accordion**: `aria-expanded`, `aria-controls`, `aria-labelledby`, Enter/Space para toggle.

**Modal**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap activo.

**Gallery Lightbox**: `role="dialog"`, Arrow keys para navegación, `aria-label` dinámico con descripción de imagen.

---

## 3. Patrones de Tema (Dark/Light Mode)

### 3.1 Patrón: Class-Based Dark Mode con Tailwind
**Problema**: Alternar tema sin recargar la página, con persistencia.
**Solución**: Clase `dark` en `<html>` + Tailwind `darkMode: 'class'`.

```
Flujo de inicialización:
  1. Leer localStorage('theme')
  2. Si no existe → leer prefers-color-scheme
  3. Aplicar clase 'dark' al <html> si corresponde
  4. Emitir valor via Signal<ThemeMode>

Componentes reactivos:
  - Tailwind: dark:bg-gray-900 dark:text-white
  - SCSS: :host-context(.dark) { ... } para estilos complejos
```

### 3.2 Patrón: Colores Semánticos con CSS Custom Properties
**Problema**: Mantener consistencia visual entre temas sin duplicar clases Tailwind.
**Solución**: Variables CSS que cambian según el tema.

```css
/* styles.scss */
:root {
  --color-bg-primary: theme('colors.white');
  --color-bg-secondary: theme('colors.gray.50');
  --color-text-primary: theme('colors.gray.900');
  --color-text-secondary: theme('colors.gray.600');
  --color-border: theme('colors.gray.200');
}

.dark {
  --color-bg-primary: theme('colors.gray.900');
  --color-bg-secondary: theme('colors.gray.800');
  --color-text-primary: theme('colors.gray.50');
  --color-text-secondary: theme('colors.gray.400');
  --color-border: theme('colors.gray.700');
}
```

### 3.3 Patrón: Prevención de Flash (FOUC de tema)
**Problema**: Evitar flash de tema incorrecto al cargar la página.
**Solución**: Script inline en `<head>` que se ejecuta antes del renderizado.

```html
<!-- index.html, antes de cualquier CSS -->
<script>
  (function() {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

---

## 4. Patrones de Seguridad

### 4.1 Patrón: Content Security Policy via Meta Tag
**Problema**: Prevenir XSS y ataques de inyección en un sitio estático sin control de headers.
**Solución**: Meta tag CSP en `index.html`.

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:; 
               font-src 'self';
               connect-src 'self';
               frame-ancestors 'none';">
```

**Notas**:
- `'unsafe-inline'` en script-src necesario para el script de tema anti-FOUC
- `'unsafe-inline'` en style-src necesario para estilos inline de Angular y Tailwind
- `frame-ancestors 'none'` equivale a `X-Frame-Options: DENY`

### 4.2 Patrón: Sanitización de URL WhatsApp
**Problema**: Prevenir inyección de código via concatenación de strings en URL.
**Solución**: Sanitización estricta en `WhatsAppService`.

```
WhatsAppService.buildUrl(config, formData):
  1. Validar teléfono: solo dígitos (/^\d+$/)
  2. Sanitizar nombre: trim()
  3. Sanitizar email: trim().toLowerCase()
  4. Sanitizar mensaje: trim()
  5. Construir texto: template predefinido con valores
  6. Codificar: encodeURIComponent(texto)
  7. Retornar: `https://wa.me/${phone}?text=${encodedText}`
  8. Abrir: window.open(url, '_blank', 'noopener,noreferrer')
```

---

## 5. Patrones de i18n (Build-Time)

### 5.1 Patrón: Builds Separados por Idioma
**Problema**: Servir contenido en el idioma correcto sin overhead de runtime.
**Solución**: `@angular/localize` genera builds independientes.

```
Build process:
  ng build --localize
  → dist/
     ├── es/          # Build completo en español
     │   ├── index.html
     │   ├── main.js
     │   └── ...
     └── en/          # Build completo en inglés
         ├── index.html
         ├── main.js
         └── ...
```

### 5.2 Patrón: Cambio de Idioma
**Problema**: Cambiar idioma requiere cargar un build diferente.
**Solución**: Navegación al build alternativo con recarga.

```
LanguageSwitcher click:
  → Determinar idioma actual (ej. 'es')
  → Construir URL del build alternativo (ej. '/en/' + currentPath)
  → window.location.href = newUrl  // Recarga completa
```

---

## 6. Patrones de Animación

### 6.1 Patrón: Route Transition (Angular Animations)
**Problema**: Transición suave entre páginas.
**Solución**: Trigger de animación en el `<router-outlet>`.

```
Route change detected:
  → :leave animation: fadeOut (opacity 1→0, 150ms ease-in)
  → :enter animation: fadeIn (opacity 0→1, 200ms ease-out)
  → Secuencial: leave completa antes de enter
```

### 6.2 Patrón: Respeto de Preferencias del Usuario
**Problema**: Algunos usuarios tienen `prefers-reduced-motion` activado.
**Solución**: Media query que deshabilita animaciones.

```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

En Angular Animations: consultar `window.matchMedia('(prefers-reduced-motion: reduce)')` para usar `NoopAnimationsModule` condicionalmente.

---

## 7. Patrones de Testing

### 7.1 Patrón: Testing Centrado en el Usuario (Angular Testing Library)
**Principio**: Testear lo que el usuario ve e interactúa, no detalles de implementación.

```
// Patrón de test de componente
render(MyComponent, { inputs: {...} })
  → screen.getByRole('button', { name: /enviar/i })
  → userEvent.click(button)
  → expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument()
```

### 7.2 Patrón: Tests de Accesibilidad en Componentes
**Principio**: Cada componente interactivo incluye tests de roles ARIA y navegación por teclado.

```
// Checklist de test por componente interactivo:
1. Verificar role ARIA correcto
2. Verificar aria-label/aria-labelledby presente
3. Verificar navegación por teclado funciona
4. Verificar focus visible en estados interactivos
5. Verificar aria-expanded/aria-selected en estados dinámicos
```
