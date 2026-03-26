# Diseño Detallado de Componentes Frontend

---

## 1. Componentes de Layout

### HeaderComponent
**Estado interno:**
- `isMenuOpen: Signal<boolean>` — estado del menú móvil
- `isScrolled: Signal<boolean>` — si el usuario ha scrolleado (para efecto de sombra)

**Interacciones del usuario:**
- Clic en logo → navegar a Home
- Clic en enlace de navegación → activar ruta via Router
- Clic en botón hamburguesa → toggle `isMenuOpen`
- Cambiar tamaño de ventana → responsive visibility automática via CSS

**Estructura HTML:**
```
<header role="banner">
  <skip-nav targetId="main-content"/>
  <nav role="navigation" aria-label="Navegación principal">
    <a [routerLink]="'/'" class="logo">Logo</a>
    <!-- Desktop nav links (ocultos < lg) -->
    <ul class="hidden lg:flex">
      @for (item of navItems; track item.route) {
        <li><a [routerLink]="item.route" routerLinkActive="active">{{ item.label }}</a></li>
      }
    </ul>
    <theme-toggle />
    <language-switcher />
    <!-- Botón hamburguesa (oculto ≥ lg) -->
    <button class="lg:hidden" (click)="toggleMobileMenu()" 
            [attr.aria-expanded]="isMenuOpen()"
            aria-controls="mobile-menu"
            aria-label="Abrir menú">
      <!-- Ícono hamburguesa/X -->
    </button>
  </nav>
</header>
<mobile-menu-drawer [isOpen]="isMenuOpen()" (closed)="isMenuOpen.set(false)" />
```

### MobileMenuDrawerComponent
**Estado interno:**
- Referencia al primer/último elemento focusable para focus trap

**Interacciones:**
- Clic en enlace → navegar + cerrar drawer
- Clic en backdrop (overlay) → cerrar drawer
- Presionar Escape → cerrar drawer
- Tab/Shift+Tab → ciclar foco dentro del drawer (focus trap)

**Animación:**
- Entrada: slide-in desde la derecha (300ms ease-out)
- Salida: slide-out hacia la derecha (200ms ease-in)
- Backdrop: fade-in/fade-out (200ms)

### FooterComponent
**Estado**: Sin estado interno (presentacional puro).

**Estructura:**
```
<footer role="contentinfo">
  <nav aria-label="Navegación secundaria">
    <!-- Enlaces de navegación -->
  </nav>
  <div><!-- Redes sociales --></div>
  <div><!-- Copyright --></div>
</footer>
```

---

## 2. Componentes de Página

### HomePageComponent
**Estado:**
- Datos estáticos de features, testimonios, CTAs (constantes o i18n)

**Secciones:**
1. **Hero**: Título principal, subtítulo, botón CTA, imagen/ilustración
2. **Features Overview**: Grid de 3-4 FeatureItem cards
3. **CTA intermedio**: Bloque de llamada a la acción
4. **Testimonios** (opcional): Carousel o grid de testimonial cards

**Animaciones de scroll:**
- Cada sección registrada con `ScrollService.observeElement()`
- Al entrar en viewport: clase `animate-fade-up` aplicada
- Stagger de 100ms entre cards

**SEO**: En `ngOnInit`, llamar `SeoService.updateTitle()` y `updateMetaTags()`

### AboutPageComponent
**Secciones:**
1. **Nuestra Historia**: Texto + imagen
2. **Misión y Visión**: Dos columnas con íconos
3. **Equipo**: Grid de TeamMember cards

**SEO**: Actualización de meta tags en `ngOnInit`

### FeaturesPageComponent
**Secciones:**
1. **Encabezado**: Título + descripción general
2. **Feature Cards**: Grid detallado de FeatureItem con descripciones expandidas
3. **CTA**: Bloque de llamada a la acción final

**Animaciones**: Scroll-triggered stagger en feature cards

### GalleryPageComponent
**Estado:**
- `images: Signal<GalleryImage[]>` — lista de imágenes
- `selectedImageIndex: Signal<number | null>` — imagen seleccionada en lightbox
- `isLightboxOpen: computed(() => selectedImageIndex() !== null)`

**Interacciones:**
- Clic en thumbnail → `openLightbox(index)`
- Flechas teclado en lightbox → `navigateImage('prev'|'next')`
- Escape/backdrop/X → `closeLightbox()`

**Grid responsivo:**
- Móvil: 1 columna
- Tablet: 2 columnas
- Desktop: 3 columnas
- Large desktop: 4 columnas

### ContactPageComponent
**Estado:**
- `contactForm: FormGroup` — formulario reactivo con validadores
- `isSubmitted: Signal<boolean>` — feedback de éxito post-envío
- `formErrors: Signal<Record<string, string>>` — errores de validación

**Campos del formulario:**

| Campo | Type | Validadores | ARIA |
|---|---|---|---|
| name | text | required, minLength(2), maxLength(100), pattern | aria-required, aria-invalid, aria-describedby |
| email | email | required, email, maxLength(254) | aria-required, aria-invalid, aria-describedby |
| message | textarea | required, minLength(10), maxLength(1000) | aria-required, aria-invalid, aria-describedby |

**Flujo de envío:**
1. Validar formulario
2. Si válido → `WhatsAppService.openChat(formData)`
3. Mostrar feedback de éxito (mensaje i18n)
4. Resetear formulario después de 3 segundos

---

## 3. Componentes UI Reutilizables

### ButtonComponent
**Inputs:**

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `ButtonVariant` | `'primary'` | Estilo visual |
| `size` | `ButtonSize` | `'md'` | Tamaño |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `ariaLabel` | `string` | `undefined` | Label accesible |
| `type` | `'button' \| 'submit'` | `'button'` | Tipo HTML |

**Clases Tailwind por variante:**
- primary: `bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500`
- secondary: `bg-secondary-600 text-white hover:bg-secondary-700`
- outline: `border-2 border-primary-600 text-primary-600 hover:bg-primary-50`
- icon: `p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`

### CardComponent
**Inputs:**

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `CardVariant` | `'feature'` | Tipo de tarjeta |
| `imageSrc` | `string` | `undefined` | URL imagen |
| `imageAlt` | `string` | `''` | Alt text |
| `title` | `string` | `undefined` | Título |
| `description` | `string` | `undefined` | Descripción |

**Estructura**: Content projection via `<ng-content>` para flexibilidad adicional.

### ModalComponent
**Inputs:**

| Input | Tipo | Descripción |
|---|---|---|
| `isOpen` | `boolean` | Controla visibilidad |
| `title` | `string` | Título del modal (aria-labelledby) |

**Animaciones (Angular Animations):**
- Backdrop: `void → *` opacity 0→0.5, `* → void` opacity 0.5→0
- Panel: `void → *` scale 0.95→1 + opacity 0→1, `* → void` inverso

**Accesibilidad:**
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`
- `body` scroll deshabilitado cuando modal está abierto
- Focus trap activo

### FormFieldComponent
**Inputs:**

| Input | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | requerido | Etiqueta del campo |
| `type` | `'text' \| 'email' \| 'tel' \| 'textarea' \| 'select'` | `'text'` | Tipo de input |
| `placeholder` | `string` | `''` | Placeholder |
| `errorMessage` | `string` | `''` | Mensaje de error actual |
| `required` | `boolean` | `false` | Si es requerido |
| `id` | `string` | auto-generated | ID para label/aria |

**Estado visual:**
- Pristine: borde neutral
- Focus: borde de acento + ring
- Error: borde rojo + mensaje de error visible + `aria-invalid="true"`
- Valid (touched): borde verde (sutil)

### AccordionComponent
**Comportamiento de teclado:**
- Enter/Space en header → toggle panel
- ArrowDown → siguiente header
- ArrowUp → header anterior
- Home → primer header
- End → último header

### TabsComponent
**Comportamiento de teclado:**
- ArrowRight → siguiente tab
- ArrowLeft → tab anterior
- Home → primer tab
- End → último tab
- Tab key → mueve foco al panel activo

---

## 4. Componentes Compartidos

### ThemeToggleComponent
**Visualización:**
- Tema light: muestra ícono luna (🌙) → "Cambiar a modo oscuro"
- Tema dark: muestra ícono sol (☀️) → "Cambiar a modo claro"
- Transición de ícono: rotate + fade (200ms)

### LanguageSwitcherComponent
**Visualización:**
- Muestra bandera o código de idioma alternativo
- ES: "EN" clickeable para cambiar a inglés
- EN: "ES" clickeable para cambiar a español
- `aria-label="Cambiar idioma a {targetLanguage}"`

### BackToTopComponent
**Estilo:**
- Botón circular, fixed en esquina inferior derecha
- `bottom: 24px`, `right: 24px`
- `z-index: 40` (debajo de modales z-50)
- Tailwind: `bg-primary-600 text-white rounded-full shadow-lg`
- Hover: `bg-primary-700`, scale 1.1
- Icono: flecha arriba (↑)

**Animación de visibilidad:**
- Aparición: fade-in + slide-up (200ms)
- Desaparición: fade-out + slide-down (150ms)
