# Reglas de Negocio

---

## RN-01: Validación del Formulario de Contacto

### Campo: Nombre
| Regla | Descripción | Mensaje de Error |
|---|---|---|
| Requerido | Campo obligatorio, no puede estar vacío | "El nombre es obligatorio" |
| Longitud mínima | Mínimo 2 caracteres | "El nombre debe tener al menos 2 caracteres" |
| Longitud máxima | Máximo 100 caracteres | "El nombre no puede exceder 100 caracteres" |
| Formato | Solo letras, espacios, guiones y apóstrofos | "El nombre contiene caracteres no válidos" |

### Campo: Email
| Regla | Descripción | Mensaje de Error |
|---|---|---|
| Requerido | Campo obligatorio | "El email es obligatorio" |
| Formato | Debe ser un email válido (patrón RFC 5322 simplificado) | "Ingrese un email válido" |
| Longitud máxima | Máximo 254 caracteres | "El email no puede exceder 254 caracteres" |

### Campo: Mensaje
| Regla | Descripción | Mensaje de Error |
|---|---|---|
| Requerido | Campo obligatorio | "El mensaje es obligatorio" |
| Longitud mínima | Mínimo 10 caracteres | "El mensaje debe tener al menos 10 caracteres" |
| Longitud máxima | Máximo 1000 caracteres | "El mensaje no puede exceder 1000 caracteres" |

### Regla de Envío
- El botón "Enviar" se habilita solo cuando todos los campos son válidos
- Al enviar, se aplica `trim()` a todos los campos antes de construir el mensaje
- El mensaje de WhatsApp se construye con el formato: `"Nombre: {name}\nEmail: {email}\nMensaje: {message}"`
- La URL se construye como: `https://wa.me/{phoneNumber}?text={encodeURIComponent(formattedMessage)}`
- Se abre en nueva ventana/tab (`_blank`)
- Después de abrir WhatsApp, el formulario se resetea y se muestra feedback de éxito

---

## RN-02: Gestión de Tema (Oscuro/Claro)

### Reglas de Inicialización
| Prioridad | Fuente | Acción |
|---|---|---|
| 1 (más alta) | `localStorage.getItem('theme')` | Aplicar valor guardado ('light' o 'dark') |
| 2 | `window.matchMedia('(prefers-color-scheme: dark)').matches` | Si true → 'dark', si false → 'light' |
| 3 (default) | Valor por defecto | Aplicar 'light' |

### Reglas de Toggle
- Al alternar: nuevo tema = tema actual === 'dark' ? 'light' : 'dark'
- Siempre guardar en `localStorage('theme', nuevoTema)` inmediatamente
- Aplicar/remover clase `'dark'` en `document.documentElement`
- La transición entre temas debe ser suave (CSS transition en colores: `transition: color 200ms, background-color 200ms`)

### Reglas de Contraste WCAG AAA
| Elemento | Ratio Mínimo |
|---|---|
| Texto normal (< 18pt) | 7:1 |
| Texto grande (≥ 18pt o 14pt bold) | 4.5:1 |
| Elementos de UI y gráficos | 3:1 |
| Focus indicators | 3:1 contra fondo adyacente |

---

## RN-03: Navegación Responsiva

### Reglas de Visibilidad
| Breakpoint | Navbar Horizontal | Botón Hamburguesa | Mobile Drawer |
|---|---|---|---|
| < 1024px (< lg) | Oculto | Visible | Disponible |
| ≥ 1024px (lg+) | Visible | Oculto | Deshabilitado |

### Reglas de Accesibilidad del Mobile Drawer
- Al abrir: foco se mueve al primer elemento focusable dentro del drawer
- Al cerrar: foco retorna al botón hamburguesa
- Tab/Shift+Tab cicla solo dentro del drawer (focus trap)
- Escape cierra el drawer
- Clic fuera del drawer lo cierra
- `aria-expanded="true/false"` en el botón hamburguesa
- `role="navigation"` en el drawer
- `aria-label="Menú de navegación"` en el drawer

---

## RN-04: Accesibilidad Global (WCAG 2.1 AAA)

### Skip Navigation
- Enlace "Saltar al contenido principal" visible solo con foco de teclado
- Debe ser el primer elemento focusable de la página
- Al activar: foco se mueve a `<main id="main-content">`

### Imágenes
- Todas las imágenes decorativas: `alt=""`  y `role="presentation"`
- Todas las imágenes informativas: `alt` descriptivo entre 5-150 caracteres
- Imágenes de la galería: `alt` descriptivo del contenido

### Formularios
- Cada input tiene `<label>` asociado via `for`/`id`
- Errores de validación vinculados via `aria-describedby`
- Campos inválidos marcados con `aria-invalid="true"`
- Mensajes de error anunciados a screen readers via `aria-live="polite"`

### Teclado
- Todos los elementos interactivos accesibles por teclado
- Focus indicators visibles con contraste 3:1 (outline de 2px mínimo)
- Orden de tabulación lógico (sin `tabindex` > 0)
- Sin keyboard traps

### Idioma
- `<html lang="es">` para build en español
- `<html lang="en">` para build en inglés

---

## RN-05: Back to Top

### Reglas de Visibilidad
| Condición | Estado del Botón |
|---|---|
| `scrollY ≤ 300px` | Oculto (opacity: 0, pointer-events: none) |
| `scrollY > 300px` | Visible (animación fade-in) |

### Reglas de Comportamiento
- Al hacer clic: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- `aria-label="Volver al inicio"` (localizado según idioma)
- Posición: fijo en esquina inferior derecha, 24px de margen
- z-index por encima del contenido pero debajo de modales

---

## RN-06: Galería / Lightbox

### Reglas del Lightbox
- Al abrir: focus trap activado, scroll del body deshabilitado
- Navegación con flechas de teclado (ArrowLeft, ArrowRight)
- Al llegar a la primera imagen y navegar prev: ir a la última (circular)
- Al llegar a la última imagen y navegar next: ir a la primera (circular)
- Al cerrar: scroll del body restaurado, foco retorna al trigger
- `role="dialog"`, `aria-modal="true"`, `aria-label="Visor de imagen"`

---

## RN-07: SEO y Meta Tags

### Reglas por Página
| Página | Title | Description |
|---|---|---|
| Home | `"{NombreSitio} - {Tagline}"` | Descripción corta del producto/servicio (≤ 160 chars) |
| About | `"Acerca de - {NombreSitio}"` | Sobre la empresa/equipo |
| Features | `"Características - {NombreSitio}"` | Resumen de servicios/features |
| Gallery | `"Galería - {NombreSitio}"` | Portafolio visual |
| Contact | `"Contacto - {NombreSitio}"` | Información de contacto |

### Open Graph Tags (Todas las páginas)
- `og:type`: "website"
- `og:title`: Mismo que el `<title>`
- `og:description`: Mismo que meta description
- `og:url`: URL canónica de la página
- `og:image`: Imagen representativa del sitio
- `og:locale`: "es_ES" o "en_US" según build

---

## RN-08: Rendimiento de Imágenes

### Reglas de Carga
- Imágenes below-the-fold: `loading="lazy"`
- Imagen hero (above-the-fold): `loading="eager"`, `fetchpriority="high"`
- Formato preferido: WebP con fallback a JPG/PNG via `<picture>` element
- Atributo `srcset` con al menos 3 tamaños (640w, 1024w, 1920w)
- Atributo `sizes` que coincida con los breakpoints de diseño

---

## RN-09: Construcción de URL de WhatsApp

### Regla de Sanitización
- Todo input del usuario pasa por `trim()` antes de ser usado
- El mensaje se codifica con `encodeURIComponent()` para seguridad en URL
- El número de teléfono solo contiene dígitos (sin +, espacios, guiones al construir la URL)
- Formato de URL: `https://wa.me/{digitsOnly}?text={encodedMessage}`
- No se permite inyección de parámetros adicionales en la URL
