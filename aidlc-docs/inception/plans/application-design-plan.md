# Plan de Diseño de Aplicación

## Alcance del Diseño

Basado en los requisitos aprobados, este plan cubre la definición de componentes, servicios, métodos e interdependencias para un sitio de marketing Angular 19 con:
- 4-6 páginas responsivas (5 breakpoints)
- Componentes UI reutilizables (arquitectura estándar)
- Toggle modo oscuro/claro
- Internacionalización bilingüe (ES/EN)
- Despliegue estático en GitHub Pages

---

## Preguntas de Clarificación de Diseño

### Pregunta 1
¿Cuál es la estrategia preferida para la internacionalización (i18n)?

A) `@ngx-translate/core` — traducción en tiempo de ejecución, cambio de idioma sin recargar la página, archivos JSON de traducción
B) Angular i18n integrado (`@angular/localize`) — traducción en tiempo de compilación, genera un build separado por idioma, mejor rendimiento
C) Sin preferencia fuerte — elegir la mejor opción para un sitio estático en GitHub Pages
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: B

---

### Pregunta 2
¿Cómo desea estructurar las animaciones y micro-interacciones?

A) Angular Animations (`@angular/animations`) — API declarativa integrada, animaciones basadas en estado, transiciones de ruta
B) CSS/Tailwind solamente — clases de transición, `@keyframes` en SCSS, sin dependencia adicional
C) Librería de terceros (ej. GSAP, Framer Motion via wrapper) — animaciones avanzadas de scroll, parallax, timeline
D) Combinación: CSS para transiciones simples + Angular Animations para transiciones de ruta y estados complejos
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: D

---

### Pregunta 3
Para el formulario de contacto, ¿qué campos debe incluir y cuál será el comportamiento al enviar?

A) Campos básicos (nombre, email, mensaje) — mostrar mensaje de éxito simulado al "enviar"
B) Campos extendidos (nombre, email, teléfono, asunto, mensaje) — mostrar mensaje de éxito simulado
C) Campos básicos con integración a servicio externo (ej. Formspree, EmailJS) para envío real
D) Solo diseño visual del formulario sin funcionalidad de envío (placeholder para futuro)
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: X, Iniciar un chat de whatsapp con un número predefinido al enviar el formulario, pasando el mensaje como texto del chat.

---

### Pregunta 4
¿Desea incluir un componente de "Back to Top" (volver arriba) flotante para mejorar la navegación en móvil?

A) Sí — botón flotante que aparece después de hacer scroll, con animación suave al top
B) No — no es necesario para este proyecto
X) Otro (por favor describa después de la etiqueta [Answer]: abajo)

[Answer]: A

---

## Plan de Ejecución del Diseño

Una vez respondidas las preguntas, se generarán los siguientes artefactos:

- [x] Generar `components.md` — Definiciones de componentes con responsabilidades de alto nivel
- [x] Generar `component-methods.md` — Firmas de métodos por componente (reglas de negocio detalladas se definen en Diseño Funcional)
- [x] Generar `services.md` — Definiciones de servicios y patrones de orquestación
- [x] Generar `component-dependency.md` — Relaciones de dependencia y patrones de comunicación
- [x] Generar `application-design.md` — Documento consolidado del diseño de aplicación
- [x] Validar completitud y consistencia del diseño
