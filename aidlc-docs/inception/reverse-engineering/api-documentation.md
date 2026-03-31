# Documentación de APIs e Interfaces

## APIs HTTP
- **Estado actual**: no existen endpoints REST/GraphQL internos en este repositorio.
- **Implicación**: es una SPA de contenido con lógica de presentación y utilidades cliente.

## APIs Internas (Servicios)
### ThemeService
- `initTheme()`: inicializa tema por preferencia guardada/sistema.
- `toggleTheme()`: alterna light/dark y persiste.
- `currentTheme`, `isDark`: señales derivadas de estado de tema.

### ScrollService
- `scrollY`, `isScrolled`, `showBackToTop`: estado reactivo de scroll.
- `scrollToTop()`: navegación suave al inicio.
- `observeElement(...)`: helper de IntersectionObserver para animaciones/visibilidad.

### SeoService
- `setPageSeo(config)`: set de título y meta tags por página.
- `updateTitle`, `updateMetaTags`, `updateOgTags`: operaciones atómicas.

### WhatsAppService
- `validatePhone(phone)`: validación de formato.
- `buildUrl(config, formData)`: construye enlace wa.me.
- `openChat(config, formData)`: abre chat en nueva pestaña.

## Modelos de Datos Relevantes
- Tipos de navegación (`NavItem`), galería (`GalleryImage`), formulario (`ContactFormData`), SEO (`PageSeoConfig`) y variantes UI.
- Validaciones clave en formulario de contacto: required, email, min/max length.
