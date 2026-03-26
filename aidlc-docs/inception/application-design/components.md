# Inventario de Componentes

## Componentes de Layout

### HeaderComponent
- **Propósito**: Barra de navegación principal del sitio
- **Responsabilidades**:
  - Renderizar logo/marca del sitio
  - Mostrar enlaces de navegación principal (desktop)
  - Alojar el `ThemeToggleComponent` (modo oscuro/claro)
  - Alojar el `LanguageSwitcherComponent` (ES/EN)
  - Activar/desactivar `MobileMenuDrawerComponent` en breakpoints móviles
  - Resaltar ruta/sección activa
  - Incluir enlace de "Saltar navegación" para accesibilidad (WCAG AAA)
- **Interfaz**:
  - Input: ninguno (standalone, consume servicios)
  - Output: ninguno
- **Tipo**: Standalone Component

### FooterComponent
- **Propósito**: Pie de página del sitio con enlaces secundarios e información
- **Responsabilidades**:
  - Renderizar enlaces de navegación secundaria
  - Mostrar información de copyright
  - Mostrar enlaces a redes sociales
  - Renderizar información de contacto resumida
- **Interfaz**:
  - Input: ninguno
  - Output: ninguno
- **Tipo**: Standalone Component

### MobileMenuDrawerComponent
- **Propósito**: Menú lateral deslizable para navegación en dispositivos móviles
- **Responsabilidades**:
  - Mostrar/ocultar panel de navegación con animación slide-in
  - Renderizar todos los enlaces de navegación en formato vertical
  - Incluir `ThemeToggleComponent` y `LanguageSwitcherComponent`
  - Gestionar trampa de foco (focus trap) cuando está abierto
  - Cerrar al seleccionar un enlace o clic fuera del panel
  - Cerrar con tecla Escape
- **Interfaz**:
  - Input: `isOpen: Signal<boolean>`
  - Output: `closed: EventEmitter<void>`
- **Tipo**: Standalone Component

---

## Componentes de Página

### HomePageComponent
- **Propósito**: Página de inicio / landing principal
- **Responsabilidades**:
  - Renderizar sección hero con CTA principal
  - Mostrar resumen de características clave (tarjetas)
  - Bloques de llamada a la acción
  - Animaciones de entrada activadas por scroll
- **Ruta**: `/` (por defecto)
- **Tipo**: Standalone Component (lazy-loaded)

### AboutPageComponent
- **Propósito**: Página "Acerca de" / Nosotros
- **Responsabilidades**:
  - Renderizar historia de la empresa/producto
  - Mostrar sección de equipo (tarjetas de miembros)
  - Presentar misión y visión
- **Ruta**: `/about`
- **Tipo**: Standalone Component (lazy-loaded)

### FeaturesPageComponent
- **Propósito**: Página de características o servicios
- **Responsabilidades**:
  - Presentar detalladamente las ofertas del producto/servicio
  - Renderizar tarjetas de características con íconos
  - Secciones con animaciones de entrada por scroll
- **Ruta**: `/features`
- **Tipo**: Standalone Component (lazy-loaded)

### GalleryPageComponent
- **Propósito**: Página de galería / showcase visual
- **Responsabilidades**:
  - Renderizar grid responsivo de imágenes/portafolio
  - Implementar lightbox/modal para vista ampliada de imágenes
  - Carga diferida (lazy loading) de imágenes
  - Filtro o categorías (opcional)
- **Ruta**: `/gallery`
- **Tipo**: Standalone Component (lazy-loaded)

### ContactPageComponent
- **Propósito**: Página de contacto con formulario de WhatsApp
- **Responsabilidades**:
  - Renderizar formulario de contacto con campos validados
  - Al enviar, generar URL de WhatsApp con mensaje pre-formateado
  - Abrir chat de WhatsApp en nueva ventana/tab
  - Mostrar información de contacto adicional (dirección, redes sociales)
  - Validación de campos según WCAG AAA
- **Ruta**: `/contact`
- **Tipo**: Standalone Component (lazy-loaded)

---

## Componentes UI Reutilizables

### ButtonComponent
- **Propósito**: Botón reutilizable con múltiples variantes
- **Responsabilidades**:
  - Soportar variantes: primary, secondary, outline, icon
  - Estados: hover, focus, active, disabled
  - Tamaños: sm, md, lg
  - Soporte de accesibilidad (focus visible, aria-label)
- **Interfaz**:
  - Input: `variant`, `size`, `disabled`, `ariaLabel`, `type`
  - Output: `clicked: EventEmitter<void>`
- **Tipo**: Standalone Component

### CardComponent
- **Propósito**: Tarjeta reutilizable para presentar contenido
- **Responsabilidades**:
  - Variantes: feature card, team member card, testimonial card
  - Soporte de imagen, título, descripción, CTA
  - Hover effects y transiciones
- **Interfaz**:
  - Input: `variant`, `imageSrc`, `imageAlt`, `title`, `description`
  - Output: ninguno (Content projection via `<ng-content>`)
- **Tipo**: Standalone Component

### ModalComponent
- **Propósito**: Diálogo modal overlay accesible
- **Responsabilidades**:
  - Overlay con backdrop
  - Trampa de foco (focus trap) dentro del modal
  - Cerrar con Escape, clic en backdrop, o botón X
  - Animación de entrada/salida (Angular Animations)
  - ARIA roles: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Interfaz**:
  - Input: `isOpen: Signal<boolean>`, `title`
  - Output: `closed: EventEmitter<void>`
- **Tipo**: Standalone Component

### FormFieldComponent
- **Propósito**: Campo de formulario reutilizable con validación visual
- **Responsabilidades**:
  - Soportar tipos: text, email, tel, textarea, select
  - Mostrar estados de validación (error, success, pristine)
  - Label asociado al input (accesibilidad)
  - Mensajes de error descriptivos
  - Soporte para `aria-describedby` y `aria-invalid`
- **Interfaz**:
  - Input: `label`, `type`, `placeholder`, `errorMessage`, `required`
  - Output: `valueChange: EventEmitter<string>`
- **Tipo**: Standalone Component

### AccordionComponent
- **Propósito**: Panel expandible/colapsable para FAQ u otro contenido
- **Responsabilidades**:
  - Expandir/colapsar secciones con animación
  - Soporte multi-panel o single-panel (solo uno abierto a la vez)
  - ARIA: `aria-expanded`, `role="region"`, `aria-controls`
  - Navegación por teclado (Enter, Space, flechas)
- **Interfaz**:
  - Input: `items: AccordionItem[]`, `multiOpen: boolean`
  - Output: `toggled: EventEmitter<number>`
- **Tipo**: Standalone Component

### TabsComponent
- **Propósito**: Navegación por pestañas para contenido organizado
- **Responsabilidades**:
  - Renderizar pestañas horizontales con contenido asociado
  - ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`
  - Navegación por teclado (flechas izquierda/derecha)
  - Animación de transición entre tabs
- **Interfaz**:
  - Input: `tabs: TabItem[]`, `activeIndex: number`
  - Output: `tabChange: EventEmitter<number>`
- **Tipo**: Standalone Component

### BadgeComponent
- **Propósito**: Etiqueta visual pequeña para estados o categorías
- **Interfaz**:
  - Input: `text`, `variant` (success, warning, info, error)
- **Tipo**: Standalone Component

### TooltipDirective
- **Propósito**: Directiva para mostrar tooltips al hover/focus
- **Interfaz**:
  - Input: `appTooltip: string`, `tooltipPosition: 'top' | 'bottom' | 'left' | 'right'`
- **Tipo**: Standalone Directive

### SpinnerComponent
- **Propósito**: Indicador de carga visual
- **Interfaz**:
  - Input: `size: 'sm' | 'md' | 'lg'`, `ariaLabel: string`
- **Tipo**: Standalone Component

### SectionDividerComponent
- **Propósito**: Divisor visual entre secciones de contenido
- **Interfaz**:
  - Input: `variant: 'line' | 'wave' | 'gradient'`
- **Tipo**: Standalone Component

---

## Componentes Compartidos (Shared)

### ThemeToggleComponent
- **Propósito**: Botón de alternancia modo oscuro/claro
- **Responsabilidades**:
  - Mostrar ícono sol/luna según tema actual
  - Alternar tema al hacer clic
  - Animación de transición del ícono
  - Label accesible (`aria-label` dinámico)
- **Interfaz**:
  - Input: ninguno (consume `ThemeService`)
  - Output: ninguno
- **Tipo**: Standalone Component

### LanguageSwitcherComponent
- **Propósito**: Selector de idioma (ES/EN)
- **Responsabilidades**:
  - Mostrar idioma actual
  - Cambiar entre español e inglés
  - Indicar visualmente el idioma activo
  - Accesible con teclado
- **Interfaz**:
  - Input: ninguno
  - Output: ninguno (redirige a build del idioma seleccionado)
- **Tipo**: Standalone Component

### SkipNavComponent
- **Propósito**: Enlace "Saltar al contenido principal" para accesibilidad
- **Responsabilidades**:
  - Visible solo al recibir foco por teclado
  - Salta la navegación y enfoca el contenido principal
  - Requerido por WCAG AAA
- **Interfaz**:
  - Input: `targetId: string`
- **Tipo**: Standalone Component

### BackToTopComponent
- **Propósito**: Botón flotante para volver al inicio de la página
- **Responsabilidades**:
  - Aparecer después de hacer scroll hacia abajo (threshold configurable)
  - Animar scroll suave hasta el top
  - Animación de entrada/salida del botón
  - Accesible (aria-label, focus visible)
- **Interfaz**:
  - Input: `scrollThreshold: number` (default: 300px)
- **Tipo**: Standalone Component

---

## Resumen de Componentes

| Categoría | Cantidad | Componentes |
|---|---|---|
| **Layout** | 3 | Header, Footer, MobileMenuDrawer |
| **Páginas** | 5 | Home, About, Features, Gallery, Contact |
| **UI Reutilizables** | 10 | Button, Card, Modal, FormField, Accordion, Tabs, Badge, Tooltip*, Spinner, SectionDivider |
| **Compartidos** | 4 | ThemeToggle, LanguageSwitcher, SkipNav, BackToTop |
| **Total** | 22 | — |

*TooltipDirective es una directiva, no un componente.
