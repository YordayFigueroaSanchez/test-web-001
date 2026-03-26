# Documento de Requisitos

## Análisis de Intención

| Dimensión | Evaluación |
|---|---|
| **Solicitud del Usuario** | Inicializar un nuevo proyecto Angular enfocado en UI/UX moderno y diseño responsivo con arquitectura basada en componentes y Tailwind CSS para responsividad mobile-first |
| **Tipo de Solicitud** | Proyecto Nuevo (Greenfield) |
| **Estimación de Alcance** | Múltiples Componentes — 4-6 páginas, componentes UI reutilizables, componentes de layout, i18n, modo oscuro/claro |
| **Estimación de Complejidad** | Moderada — Sitio de marketing estático con accesibilidad integral (AAA), i18n bilingüe, alternancia de tema y diseño responsivo con 5 breakpoints |

---

## Resumen del Proyecto

**Nombre del Proyecto**: test-web-001  
**Dominio**: Página de aterrizaje / sitio de marketing para un producto o servicio  
**Audiencia Objetivo**: Consumidores del público general (audiencia amplia)  
**Destino de Despliegue**: GitHub Pages (SPA estática con hash routing o pre-renderizada)  
**Idiomas Principales**: Español e Inglés (i18n desde el primer día)

---

## Restricciones de Idioma del Proyecto

| Ámbito | Idioma | Detalle |
|---|---|---|
| **Documentación (aidlc-docs/)** | Español | Toda la documentación generada en aidlc-docs/ debe estar en español |
| **Código de Aplicación** | Inglés | Variables, nombres de funciones, comentarios inline y código fuente en inglés |
| **Contenido de la App (UI)** | Español + Inglés | Contenido visible al usuario internacionalizado mediante i18n |

---

## Requisitos Funcionales

### RF-01: Estructura de Páginas
La aplicación incluirá 4-6 páginas/vistas principales para la versión inicial:
- **Inicio / Landing**: Sección hero, características principales, bloques de llamada a la acción
- **Acerca de / Nosotros**: Historia de la empresa o producto, sección de equipo, misión/visión
- **Características / Servicios**: Presentación detallada de las ofertas del producto/servicio
- **Galería / Showcase**: Portafolio visual o exhibición de productos (imágenes, tarjetas)
- **Contacto**: Formulario de contacto (estático, sin backend), enlaces sociales, información de ubicación
- **Opcional — FAQ / Precios**: Acordeón de preguntas frecuentes o sección de niveles de precios

### RF-02: Navegación
- Navegación principal responsiva con menú hamburguesa en móvil
- Navegación con scroll suave para secciones de una sola página (si aplica)
- Resaltado de ruta/sección activa
- Navegación en el footer con enlaces secundarios

### RF-03: Toggle de Modo Oscuro / Claro
- Alternador de tema configurable por el usuario (oscuro/claro) accesible desde el header/navbar
- La preferencia de tema se persistirá mediante `localStorage`
- El tema por defecto respetará la preferencia del sistema del usuario (`prefers-color-scheme`)
- Todas las páginas y componentes se renderizarán correctamente en ambos temas

### RF-04: Internacionalización (i18n)
- Soporte completo para español e inglés desde la versión inicial
- Selector de idioma accesible desde el header/navbar
- Todo el texto visible (etiquetas, encabezados, párrafos, texto alt, etiquetas ARIA) será traducible
- Se utilizará el i18n integrado de Angular o la librería `@ngx-translate/core`
- La preferencia de idioma se persistirá mediante `localStorage`
- Estrategia de URL: rutas con prefijo de locale (ej., `/es/home`, `/en/home`) o parámetro de consulta — a determinar en la fase de diseño

### RF-05: Diseño Responsivo
- Enfoque mobile-first: estilos diseñados primero para móvil, luego mejorados para pantallas más grandes
- 5 breakpoints completos:
  - **Móvil**: < 640px (base)
  - **Tablet vertical**: sm (640px)
  - **Tablet horizontal**: md (768px)
  - **Escritorio**: lg (1024px)
  - **Escritorio grande**: xl (1280px) y 2xl (1536px)
- Todas las páginas y componentes serán completamente funcionales y visualmente correctos en cada breakpoint
- Objetivos táctiles amigables en móvil (mínimo 44x44px)

### RF-06: Componentes UI (Reutilizables)
Arquitectura estándar basada en componentes con estos componentes reutilizables:
- **Botones**: Variantes primarios, secundarios, outline, con íconos y estados hover/focus/active
- **Tarjetas**: Tarjetas de características, miembros del equipo, testimonios
- **Modales/Diálogos**: Modal overlay accesible con trampa de foco
- **Formularios**: Campos de entrada, textareas, dropdowns de selección con estados de validación
- **Navegación**: Navbar, menú drawer para móvil, footer
- **Layout**: Contenedor, grid, divisores de sección
- **Compartidos**: Loader/spinner, badge, tooltip, acordeón, tabs

### RF-07: Diseño Visual — Audaz y Moderno
- Paleta de colores vibrante con colores primarios y de acento fuertes
- Diseño con movimiento: animaciones activadas por scroll, transiciones hover, micro-interacciones
- Tipografía atractiva con jerarquía clara (encabezados, cuerpo, subtítulos)
- Secciones hero de alto impacto con elementos visuales
- Transiciones de página fluidas y animaciones de componentes usando Angular animations o transiciones CSS

---

## Requisitos No Funcionales

### RNF-01: Stack Tecnológico
| Capa | Tecnología |
|---|---|
| **Framework** | Angular 19 (última versión) |
| **Modelo de Componentes** | Standalone components (sin NgModules) |
| **Reactividad** | Angular Signals |
| **Flujo de Control** | Nueva sintaxis de plantilla (@if, @for, @switch) |
| **Estilos** | Tailwind CSS (utility-first) + SCSS (estilos específicos de componentes) |
| **Lenguaje** | TypeScript (modo estricto) |
| **Build** | Angular CLI con esbuild |
| **Hosting** | GitHub Pages (SPA estática) |

### RNF-02: Accesibilidad — WCAG 2.1 AAA
- Todo el contenido cumplirá el nivel de conformidad WCAG 2.1 AAA
- **Perceptible**: 
  - Ratio de contraste mejorado (7:1 para texto normal, 4.5:1 para texto grande)
  - Texto redimensionable hasta 200% sin pérdida de contenido
  - Todas las imágenes tienen texto alt descriptivo
  - Ninguna información transmitida solo mediante color
  - Lengua de señas o descripciones de audio extendidas para multimedia (si aplica)
- **Operable**: 
  - Navegación completa por teclado con indicadores de foco visibles
  - Sin trampas de teclado
  - Sin restricciones de tiempo en interacciones del usuario
  - Enlaces de saltar navegación
  - Orden de foco significativo
- **Comprensible**: 
  - Idioma de la página y sus partes declarado (atributo `lang`)
  - Patrones de navegación consistentes entre páginas
  - Asistencia de entrada: etiquetas, identificación de errores, sugerencias de errores
  - Cambios de contexto solo por solicitud del usuario
- **Robusto**: 
  - Marcado HTML5 válido
  - Landmarks, roles y propiedades ARIA usados correctamente
  - Compatible con tecnologías de asistencia (lectores de pantalla, magnificadores)

### RNF-03: Rendimiento
- Puntuación objetivo de Lighthouse performance: 90+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Tamaño total del bundle: < 200KB carga inicial (gzipped)
- Imágenes: carga diferida (lazy-loaded), formato WebP/AVIF con fallbacks, `srcset` responsivo
- Tree-shaking habilitado para utilidades no usadas de Tailwind CSS (PurgeCSS via configuración de Tailwind)

### RNF-04: Compatibilidad de Navegadores
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Mobile Safari (iOS últimas 2 versiones)
- Chrome para Android (últimas 2 versiones)

### RNF-05: Estrategia de Testing
- **Pruebas unitarias**: Jest o testing por defecto de Angular (Jasmine + Karma)
- **Pruebas de componentes**: Angular Testing Library o Spectator para testing de comportamiento de componentes
- **Objetivo de cobertura**: Mínimo 80% de cobertura de código para componentes y servicios
- **Alcance de testing**: Todos los componentes UI reutilizables, servicios, pipes y directivas

### RNF-06: Calidad de Código y Arquitectura
- Compilación TypeScript estricta (`strict: true`)
- ESLint con reglas específicas de Angular (`@angular-eslint`)
- Prettier para formateo consistente del código
- Arquitectura de componentes:
  - `src/app/components/` — Componentes UI reutilizables (buttons, cards, modals, etc.)
  - `src/app/layout/` — Componentes de layout (header, footer, sidebar)
  - `src/app/pages/` — Componentes de página a nivel de ruta
  - `src/app/shared/` — Servicios compartidos, pipes, directivas, interfaces
- Carga diferida (lazy loading) para rutas de páginas
- Standalone components en todo el proyecto (sin NgModules)

### RNF-07: Despliegue — GitHub Pages
- Salida de build SPA estática (`ng build --configuration production`)
- Estrategia de hash routing (`useHash: true` o `HashLocationStrategy`) para compatibilidad con GitHub Pages
- Despliegue automatizado via pipeline CI/CD de GitHub Actions
- Artefacto de build: carpeta `dist/` desplegada en rama `gh-pages`
- 404.html personalizado para fallback de routing SPA

### RNF-08: SEO y Meta Tags
- Títulos de página dinámicos por ruta
- Tags de meta description por página
- Meta tags Open Graph (OG) para compartir en redes sociales
- Estructura HTML semántica (header, main, nav, section, article, footer)
- Datos estructurados (JSON-LD) donde sea aplicable

---

## Requisitos de Seguridad

Las reglas de extensión de seguridad están **HABILITADAS** para este proyecto (según Pregunta 16, Respuesta A).

### SEG-01: Headers de Seguridad HTTP (SECURITY-04)
Todas las respuestas que sirvan HTML incluirán:
- `Content-Security-Policy`: Política restrictiva (`default-src 'self'`, con excepciones necesarias para fonts/CDN)
- `Strict-Transport-Security`: `max-age=31536000; includeSubDomains`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`

**Nota**: GitHub Pages tiene control limitado de headers. Se usará un archivo `_headers` o meta tags en `index.html` donde sea posible. El control total de headers requiere un proxy CDN (Cloudflare, etc.) — a evaluar en la fase de diseño.

### SEG-02: Validación de Entrada (SECURITY-05)
- Los inputs del formulario de contacto serán validados del lado del cliente (tipo, longitud, formato)
- No hay procesamiento backend en el alcance (sitio estático), pero la arquitectura del formulario se diseñará para soportar integración futura con backend con sanitización adecuada

### SEG-03: Cadena de Suministro de Software (SECURITY-10)
- Todas las dependencias npm usarán versiones exactas via `package-lock.json`
- `npm audit` se ejecutará como parte del pipeline CI
- No se incluirán dependencias no utilizadas en los builds de producción
- Se configurará Dependabot o escaneo similar de vulnerabilidades de dependencias

### SEG-04: Endurecimiento de Seguridad (SECURITY-09)
- Los builds de producción no expondrán source maps
- El manejo de errores no expondrá stack traces ni rutas internas
- No se desplegará contenido por defecto o de ejemplo a producción

### SEG-05: Reglas de Seguridad No Aplicables
Las siguientes reglas de seguridad son **N/A** para este proyecto (sitio estático sin backend/auth/storage):
- **SECURITY-01** (Cifrado en Reposo/Tránsito): Sin almacenes de datos
- **SECURITY-02** (Logging de Acceso en Intermediarios de Red): Sin load balancers/API gateways
- **SECURITY-03** (Logging a Nivel de Aplicación): Sin aplicación del lado del servidor
- **SECURITY-06** (Acceso de Mínimo Privilegio): Sin políticas IAM
- **SECURITY-07** (Configuración Restrictiva de Red): Sin infraestructura cloud/firewalls
- **SECURITY-08** (Control de Acceso a Nivel de Aplicación): Sin autenticación/autorización

---

## Restricciones y Supuestos

### Restricciones
- **Solo sitio estático**: Sin renderizado del lado del servidor, sin API backend, sin base de datos
- **Hosting en GitHub Pages**: Limitado a assets estáticos, sin procesamiento del lado del servidor, control limitado de headers HTTP
- **Sin autenticación**: Sitio público sin cuentas de usuario
- **Presupuesto**: Solo herramientas open-source/gratuitas (Angular, Tailwind, GitHub Pages)
- **Idioma de documentación**: Toda la documentación en aidlc-docs/ debe estar en español
- **Idioma de código**: Todo el código de aplicación (variables, funciones, comentarios inline) debe estar en inglés

### Supuestos
- Angular CLI se usará para scaffolding del proyecto
- Node.js 20+ LTS está disponible en el entorno de desarrollo
- Git está configurado y el repositorio está listo en `test-web-001`
- El contenido (texto, imágenes) será proporcionado por el usuario o se usarán placeholders inicialmente
- El formulario de contacto será solo un componente visual (sin envío backend) a menos que se integre un servicio de terceros (ej., Formspree) posteriormente

---

## Resumen

Este es un **sitio moderno de marketing/landing page con Angular 19** dirigido al público general, desplegado en **GitHub Pages** como SPA estática. Decisiones arquitectónicas clave:

- **Angular 19** con standalone components, signals y nueva sintaxis de flujo de control
- **Tailwind CSS + SCSS** estrategia de estilos híbrida (mobile-first, 5 breakpoints)
- **Arquitectura basada en componentes** con librería UI reutilizable (botones, tarjetas, modales, formularios)
- **WCAG 2.1 AAA** cumplimiento de accesibilidad
- **Bilingüe** (Español + Inglés) con i18n desde el primer día
- **Modo Oscuro/Claro** toggle con detección de preferencia del sistema
- **Lenguaje de diseño audaz y moderno** con colores vibrantes y diseño con movimiento
- **GitHub Actions** pipeline CI/CD para despliegue automatizado
- **Reglas de seguridad habilitadas** para estándares de grado producción
- **Documentación en español** / **Código en inglés**
