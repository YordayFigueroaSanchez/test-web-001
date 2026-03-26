# Definiciones de Servicios

---

## ThemeService

- **Propósito**: Gestionar el tema de la aplicación (oscuro/claro)
- **Alcance**: Singleton (proporcionado en root)
- **Responsabilidades**:
  - Detectar preferencia de tema del sistema (`prefers-color-scheme`)
  - Cargar preferencia guardada desde `localStorage`
  - Alternar entre tema oscuro y claro
  - Aplicar clase CSS al `<html>` element (`dark` class para Tailwind dark mode)
  - Persistir preferencia del usuario en `localStorage`
  - Exponer tema actual como `Signal<'light' | 'dark'>`

| Método/Propiedad | Firma | Propósito |
|---|---|---|
| `currentTheme` | `Signal<'light' \| 'dark'>` | Tema actualmente activo |
| `toggleTheme` | `(): void` | Alternar entre light y dark |
| `setTheme` | `(theme: 'light' \| 'dark'): void` | Establecer tema específico |
| `initTheme` | `(): void` | Inicializar tema (localStorage → sistema → default) |

- **Patrón**: Estado reactivo con Angular Signals
- **Dependencias**: `DOCUMENT` token (inyección), `localStorage`

---

## ScrollService

- **Propósito**: Gestionar comportamiento de scroll de la aplicación
- **Alcance**: Singleton (proporcionado en root)
- **Responsabilidades**:
  - Rastrear posición de scroll actual
  - Proveer scroll suave a elementos o al top
  - Determinar visibilidad del botón "Back to Top" basado en threshold
  - Detectar dirección de scroll (para ocultar/mostrar header opcionalmente)
  - Gestionar scroll-triggered animations (Intersection Observer)

| Método/Propiedad | Firma | Propósito |
|---|---|---|
| `scrollPosition` | `Signal<number>` | Posición Y de scroll actual |
| `isScrolledPast` | `(threshold: number) => Signal<boolean>` | Si se ha scrolleado más allá del threshold |
| `scrollToTop` | `(): void` | Scroll suave al inicio |
| `scrollToElement` | `(elementId: string): void` | Scroll suave a un elemento por ID |
| `observeElement` | `(element: Element, callback: () => void): void` | Observar elemento para animación por Intersection Observer |

- **Patrón**: Servicio reactivo con Signals + Intersection Observer API
- **Dependencias**: `DOCUMENT` token, `window`

---

## SeoService

- **Propósito**: Gestionar metadatos SEO dinámicos por ruta
- **Alcance**: Singleton (proporcionado en root)
- **Responsabilidades**:
  - Actualizar `<title>` dinámicamente por ruta
  - Gestionar meta tags (`description`, `keywords`)
  - Configurar Open Graph tags para compartir en redes sociales
  - Gestionar datos estructurados JSON-LD
  - Configurar canonical URLs

| Método/Propiedad | Firma | Propósito |
|---|---|---|
| `updateTitle` | `(title: string): void` | Actualizar título de la página |
| `updateMetaTags` | `(tags: MetaTag[]): void` | Actualizar meta tags |
| `updateOgTags` | `(og: OpenGraphData): void` | Actualizar Open Graph tags |
| `setJsonLd` | `(data: object): void` | Inyectar datos estructurados JSON-LD |

- **Patrón**: Servicio de utilidad
- **Dependencias**: Angular `Title`, `Meta` services

---

## WhatsAppService

- **Propósito**: Construir y gestionar URLs de chat de WhatsApp para el formulario de contacto
- **Alcance**: Singleton (proporcionado en root)
- **Responsabilidades**:
  - Almacenar número de WhatsApp predefinido (configurable)
  - Formatear mensaje a partir de datos del formulario (nombre, email, mensaje)
  - Generar URL `https://wa.me/{number}?text={encodedMessage}`
  - Abrir URL en nueva ventana/tab
  - Sanitizar texto del mensaje (prevenir inyección en URL)

| Método/Propiedad | Firma | Propósito |
|---|---|---|
| `phoneNumber` | `Signal<string>` | Número de WhatsApp configurado |
| `buildMessage` | `(formData: ContactFormData): string` | Formatear datos del formulario como texto de mensaje |
| `buildWhatsAppUrl` | `(formData: ContactFormData): string` | Construir URL completa de WhatsApp |
| `openChat` | `(formData: ContactFormData): void` | Abrir chat de WhatsApp en nueva ventana |

- **Interfaz de datos**:
  ```typescript
  interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }
  ```
- **Patrón**: Servicio de utilidad con configuración inyectable
- **Dependencias**: `DOCUMENT` token, `window`

---

## AnimationService

- **Propósito**: Centralizar configuraciones de animación reutilizables
- **Alcance**: Singleton (proporcionado en root)
- **Responsabilidades**:
  - Proveer configuraciones de Angular Animations para transiciones de ruta
  - Gestionar animaciones de entrada/salida estándar (fade, slide, scale)
  - Coordinar con `ScrollService` para animaciones activadas por scroll

| Método/Propiedad | Firma | Propósito |
|---|---|---|
| `routeAnimation` | `AnimationTriggerMetadata` | Trigger de animación para transiciones de ruta |
| `fadeInAnimation` | `AnimationTriggerMetadata` | Animación de fade-in reutilizable |
| `slideInAnimation` | `(direction: 'left' \| 'right' \| 'up') => AnimationTriggerMetadata` | Animación de slide-in configurable |

- **Nota**: Las configuraciones de animación se exportan como constantes/funciones. Las transiciones simples (hover, focus) se manejan con CSS/Tailwind.
- **Dependencias**: `@angular/animations`

---

## Resumen de Servicios

| Servicio | Alcance | Propósito Principal |
|---|---|---|
| **ThemeService** | Root | Gestión de modo oscuro/claro |
| **ScrollService** | Root | Scroll tracking, smooth scroll, Intersection Observer |
| **SeoService** | Root | Meta tags, títulos, Open Graph, JSON-LD |
| **WhatsAppService** | Root | Integración de formulario de contacto con WhatsApp |
| **AnimationService** | Root | Configuraciones de Angular Animations reutilizables |
