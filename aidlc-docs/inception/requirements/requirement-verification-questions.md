# Preguntas de Clarificación de Requisitos

Por favor responda las siguientes preguntas para ayudar a clarificar el alcance del proyecto, las preferencias de diseño y los requisitos técnicos. Complete la etiqueta `[Answer]:` de cada pregunta con su letra de elección (A, B, C, etc.) o describa su preferencia si elige "Otro".

---

## Pregunta 1
¿Cuál es el propósito/dominio principal de esta aplicación web Angular?

A) Portafolio personal / sitio de presentación de desarrollador
B) Página de aterrizaje / sitio de marketing para un producto o servicio
C) Panel de control / panel de administración con visualización de datos
D) Comercio electrónico / catálogo de productos
E) Blog / sitio orientado a contenido
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: B

---

## Pregunta 2
¿Quién es el público objetivo principal de esta aplicación?

A) Consumidores del público general (audiencia amplia)
B) Profesionales de negocios / usuarios empresariales
C) Desarrolladores / comunidad técnica
D) Equipo interno / miembros de la organización
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: A

---

## Pregunta 3
¿Cuántas páginas/vistas principales prevé para la versión inicial?

A) 1-3 páginas (simple: ej., Inicio, Acerca de, Contacto)
B) 4-6 páginas (moderado: secciones de landing, características, galería, etc.)
C) 7-10 páginas (sustancial: aplicación multipágina completa)
D) 10+ páginas (complejo: aplicación grande con muchas rutas)
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: B

---

## Pregunta 4
¿Qué versión y características de Angular prefiere?

A) Angular 19 (última versión) con componentes standalone, signals y nueva sintaxis de flujo de control (@if, @for, @switch)
B) Angular 18 con componentes standalone y patrones tradicionales
C) Angular 17+ con componentes standalone y SSR (renderizado del lado del servidor)
D) Sin preferencia fuerte — usar la última versión estable con mejores prácticas modernas
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: A

---

## Pregunta 5
Confirme la estrategia de CSS/estilos. Mencionó Tailwind CSS. ¿Qué enfoque prefiere?

A) Solo Tailwind CSS — clases utility-first en todo el proyecto, sin estilos de componentes separados
B) Tailwind CSS + estilos de componentes Angular (SCSS) — Tailwind para layout/utilidades, SCSS para estilos específicos de componentes
C) Tailwind CSS + una librería de componentes (ej., Angular Material, PrimeNG, Spartan UI) — Tailwind para personalización, librería para componentes preconstruidos
D) CSS/SCSS puro sin Tailwind — sistema de diseño personalizado desde cero
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: B

---

## Pregunta 6
¿Qué nivel de arquitectura basada en componentes espera?

A) Básico — layout compartido (header, footer, sidebar) + componentes a nivel de página con anidamiento mínimo
B) Estándar — componentes compartidos + componentes UI reutilizables (botones, tarjetas, modales, formularios) + componentes de página
C) Sistema de diseño completo — metodología de diseño atómico (átomos, moléculas, organismos, plantillas, páginas) con una librería de componentes dedicada
D) Sin preferencia fuerte — diseñar la arquitectura según las necesidades de la aplicación
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: B

---

## Pregunta 7
¿Cuáles son los breakpoints objetivo para el diseño responsivo?

A) Solo Móvil + Escritorio (2 breakpoints)
B) Móvil + Tablet + Escritorio (3 breakpoints, valores por defecto de Tailwind: sm, md, lg)
C) Breakpoints completos — Móvil, Tablet vertical, Tablet horizontal, Escritorio, Escritorio grande (5 breakpoints)
D) Usar los breakpoints por defecto de Tailwind tal cual (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: C

---

## Pregunta 8
¿La aplicación necesita obtener datos de APIs externas o servicios backend?

A) No — sitio estático/solo contenido, no se necesitan llamadas a APIs
B) Mínimo — unas pocas llamadas REST API (ej., formulario de contacto, obtención simple de datos)
C) Moderado — varias integraciones con APIs con gestión de estado necesaria
D) Intensivo — datos en tiempo real, WebSockets, gestión de estado compleja (NgRx, store basado en Signals)
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: A

---

## Pregunta 9
¿Cuáles son los requisitos de autenticación/autorización?

A) Ninguno — sitio público sin cuentas de usuario
B) Autenticación básica — login/registro simple (email + contraseña)
C) Login social — proveedores OAuth2 (Google, GitHub, etc.)
D) SSO empresarial — SAML, OIDC o proveedor de identidad corporativo
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: A

---

## Pregunta 10
¿Cuál es la estrategia de despliegue y hosting?

A) GitHub Pages — solo sitio estático (SPA con hash routing o pre-renderizado)
B) Vercel o Netlify — hosting estático con edge functions para SSR
C) Hosting en la nube (AWS, Azure, GCP) — infraestructura completa con soporte SSR
D) Contenerizado — despliegue basado en Docker
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: A

---

## Pregunta 11
¿Cuál es el nivel de requisitos de accesibilidad (a11y)?

A) Básico — HTML semántico, texto alt para imágenes, soporte de navegación por teclado
B) Cumplimiento WCAG 2.1 AA — auditoría completa de accesibilidad, etiquetas ARIA, soporte de lectores de pantalla, ratios de contraste
C) Cumplimiento WCAG 2.1 AAA — nivel más alto de estándares de accesibilidad
D) Sin requisito específico — seguir mejores prácticas generales
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: C

---

## Pregunta 12
¿Necesita internacionalización (i18n) / soporte multi-idioma?

A) No — solo un idioma (inglés)
B) No — solo un idioma (español)
C) Sí — múltiples idiomas desde el inicio (especifique cuáles)
D) Ahora no, pero quiero que la arquitectura lo soporte en el futuro
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: C, español e inglés

---

## Pregunta 13
¿Qué estrategia de testing prefiere?

A) Solo pruebas unitarias (Jasmine + Karma o Jest)
B) Pruebas unitarias + pruebas de componentes (Angular Testing Library o Spectator)
C) Unitarias + componentes + pruebas E2E (Cypress o Playwright)
D) Testing mínimo — enfocarse en la entrega de código, pruebas después
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: B

---

## Pregunta 14
¿Cuáles son los elementos clave de diseño UI/UX que desea enfatizar?

A) Limpio y minimalista — mucho espacio en blanco, tipografía simple, animaciones sutiles
B) Audaz y moderno — colores vibrantes, diseño con movimiento, micro-interacciones atractivas
C) Corporativo/profesional — layouts estructurados, denso en datos, aspecto profesional
D) Creativo/artístico — layouts únicos, ilustraciones personalizadas, efectos parallax/scroll
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: B

---

## Pregunta 15
¿Tiene un lenguaje de diseño existente o guías de marca a seguir?

A) No — empezar desde cero, definir nueva paleta de colores, tipografía y tokens de diseño
B) Sí — tengo colores de marca y fuentes para proporcionar (compartiré detalles)
C) Usar un sistema de diseño popular como punto de partida (Material, Ant, etc.)
D) Quiero un toggle de modo oscuro / modo claro como característica principal
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: D

---

## Pregunta 16: Extensiones de Seguridad
¿Se deben aplicar las reglas de extensión de seguridad para este proyecto?

A) Sí — aplicar todas las reglas de SEGURIDAD como restricciones bloqueantes (recomendado para aplicaciones de grado producción)
B) No — omitir todas las reglas de SEGURIDAD (adecuado para PoCs, prototipos y proyectos experimentales)
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: A

---
