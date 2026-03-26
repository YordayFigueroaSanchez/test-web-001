# Modelo de Lógica de Negocio

---

## 1. Flujo de Gestión de Tema (Oscuro/Claro)

### Descripción
El sistema permite al usuario alternar entre modo oscuro y modo claro, con persistencia de preferencia y detección de preferencia del sistema.

### Flujo de Inicialización
```
Aplicación se carga
  → ThemeService.initTheme()
  → Verificar localStorage('theme')
    → SI existe: aplicar tema guardado
    → NO existe: verificar window.matchMedia('(prefers-color-scheme: dark)')
      → SI dark preferido: aplicar 'dark'
      → NO: aplicar 'light'
  → Aplicar clase CSS al <html> element
  → Emitir tema actual via Signal
```

### Flujo de Toggle
```
Usuario hace clic en ThemeToggleComponent
  → ThemeService.toggleTheme()
  → Calcular nuevo tema: currentTheme === 'dark' ? 'light' : 'dark'
  → Actualizar Signal<'light' | 'dark'>
  → Añadir/remover clase 'dark' en document.documentElement
  → Guardar en localStorage('theme', nuevoTema)
  → ThemeToggleComponent reactivamente actualiza ícono (sol/luna)
```

### Regla de Prioridad
1. `localStorage` (preferencia explícita del usuario)
2. `prefers-color-scheme` (preferencia del sistema operativo)
3. `'light'` (valor por defecto)

---

## 2. Flujo de Internacionalización (i18n)

### Descripción
El sistema soporta español e inglés mediante `@angular/localize` con builds separados por idioma.

### Flujo de Cambio de Idioma
```
Usuario hace clic en LanguageSwitcherComponent
  → switchLanguage(targetLocale)
  → Determinar URL base del build alternativo
    → Si locale actual es 'es': navegar a '/en/...'
    → Si locale actual es 'en': navegar a '/es/...'
  → Redirigir al build del idioma destino (recarga completa de página)
```

### Estructura de Despliegue para i18n
```
GitHub Pages root/
├── es/                    # Build en español (default)
│   ├── index.html
│   └── [assets]
├── en/                    # Build en inglés
│   ├── index.html
│   └── [assets]
└── index.html             # Redirect a /es/ (default)
```

### Detección de Idioma Inicial
```
Usuario accede a la URL raíz
  → index.html raíz evalúa:
    → Verificar localStorage('locale')
      → SI existe: redirigir a /{locale}/
    → Verificar navigator.language
      → SI empieza con 'en': redirigir a /en/
    → Default: redirigir a /es/
```

---

## 3. Flujo de Formulario de Contacto → WhatsApp

### Descripción
El formulario de contacto valida datos del usuario y abre un chat de WhatsApp con un mensaje pre-formateado.

### Flujo Completo
```
Usuario llena formulario (nombre, email, mensaje)
  → FormFieldComponent(s) emiten valueChange en cada cambio
  → ContactPageComponent mantiene FormGroup reactivo
  → Usuario hace clic en "Enviar"
  → ContactPageComponent.onSubmit()
    → Validar todos los campos
      → SI inválido: mostrar errores por campo, detener flujo
      → SI válido: continuar
    → WhatsAppService.buildMessage(formData)
      → Formatear: "Nombre: {name}\nEmail: {email}\nMensaje: {message}"
    → WhatsAppService.buildWhatsAppUrl(formData)
      → Construir: "https://wa.me/{phoneNumber}?text={encodeURIComponent(message)}"
    → WhatsAppService.openChat(formData)
      → window.open(url, '_blank')
    → Mostrar feedback visual de éxito al usuario
    → Resetear formulario
```

### Sanitización de Datos
- `encodeURIComponent()` para el texto del mensaje en la URL
- Trim de espacios en blanco al inicio y final de cada campo
- Validación de formato email antes de incluir en mensaje

---

## 4. Flujo de Navegación Responsiva

### Descripción
La navegación se adapta según el breakpoint: navbar horizontal en desktop, menú hamburguesa con drawer en móvil.

### Flujo en Desktop (≥ lg: 1024px)
```
HeaderComponent renderiza enlaces horizontales
  → routerLinkActive resalta ruta activa
  → MobileMenuDrawerComponent oculto
```

### Flujo en Móvil (< lg: 1024px)
```
HeaderComponent muestra botón hamburguesa
  → Usuario hace clic → toggleMobileMenu()
  → isMenuOpen Signal cambia a true
  → MobileMenuDrawerComponent se abre con animación slide-in
  → Focus trap se activa dentro del drawer
  → Usuario selecciona enlace:
    → Router navega a la ruta
    → Drawer se cierra automáticamente
  → Usuario presiona Escape O clic fuera:
    → Drawer se cierra
    → Focus retorna al botón hamburguesa
```

---

## 5. Flujo de Scroll y Animaciones

### Back to Top
```
Usuario hace scroll
  → ScrollService.scrollPosition Signal se actualiza
  → BackToTopComponent.isVisible = scrollPosition > threshold (300px)
    → SI visible: botón aparece con animación fade-in
    → SI no visible: botón desaparece con fade-out
  → Usuario hace clic en el botón
    → ScrollService.scrollToTop()
    → window.scrollTo({ top: 0, behavior: 'smooth' })
```

### Animaciones de Entrada por Scroll
```
Página se carga
  → ScrollService.observeElement() registra elementos con IntersectionObserver
  → Cuando un elemento entra en viewport (threshold: 0.1):
    → Callback añade clase CSS de animación ('animate-fade-in', 'animate-slide-up')
    → Observer deja de observar ese elemento (one-shot)
```

### Transiciones de Ruta
```
Router navega a nueva ruta
  → AnimationService.routeAnimation trigger se activa
  → Componente saliente: fade-out (200ms)
  → Componente entrante: fade-in (300ms)
  → SeoService.updateTitle() y updateMetaTags() actualizan metadata
```

---

## 6. Flujo de Galería / Lightbox

### Flujo de Apertura
```
Usuario hace clic en imagen de la galería
  → GalleryPageComponent.openLightbox(imageIndex)
  → selectedImageIndex Signal = imageIndex
  → ModalComponent se abre con la imagen seleccionada
  → Focus trap se activa
```

### Flujo de Navegación
```
Dentro del lightbox:
  → Flechas izquierda/derecha en teclado O botones prev/next
  → navigateImage('prev') o navigateImage('next')
  → selectedImageIndex actualizado
  → Imagen cambia con transición fade
```

### Flujo de Cierre
```
Usuario presiona Escape, clic en backdrop, o botón X
  → GalleryPageComponent.closeLightbox()
  → ModalComponent.close() emitido
  → Focus retorna al elemento que activó el lightbox
```

---

## 7. Flujo SEO

### Actualización por Ruta
```
Router detecta cambio de ruta
  → Componente de página se activa
  → ngOnInit() o afterNextRender():
    → SeoService.updateTitle(pageTitle)
    → SeoService.updateMetaTags([
        { name: 'description', content: pageDescription },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:url', content: currentUrl }
      ])
```
