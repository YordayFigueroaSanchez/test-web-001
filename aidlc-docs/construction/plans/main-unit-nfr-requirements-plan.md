# Plan de Requisitos RNF — Unidad Principal

## Contexto
Unidad única de trabajo: sitio de marketing Angular 19 completo.
Basado en los artefactos de Diseño Funcional y Requisitos aprobados.

## Análisis Previo
Los requisitos ya definen métricas específicas para:
- ✅ Accesibilidad (WCAG 2.1 AAA, ratios de contraste 7:1)
- ✅ Rendimiento (Lighthouse 90+, FCP <1.5s, LCP <2.5s, CLS <0.1, bundle <200KB)
- ✅ Compatibilidad de navegadores (últimas 2 versiones de Chrome, Firefox, Safari, Edge)
- ✅ Seguridad (CSP, HSTS, validación de entrada, supply chain)
- ✅ SEO (títulos dinámicos, Open Graph, JSON-LD)
- ✅ Estrategia de testing (80% cobertura)

## Preguntas de Clarificación

Las siguientes preguntas abordan gaps específicos no cubiertos por los requisitos existentes:

---

### P1: Framework de Testing
Los requisitos mencionan "Jest o testing por defecto de Angular (Jasmine + Karma)". ¿Cuál prefiere?

- **A)** Jest — Framework moderno, ejecución más rápida, amplio ecosistema de plugins
- **B)** Vitest — Nativo ESM, compatible con Vite, configuración mínima para Angular 19
- **C)** Jasmine + Karma — Default de Angular CLI, sin configuración adicional
- **D)** Sin preferencia — Decidir basado en compatibilidad con Angular 19

[Answer]:A

---

### P2: Estrategia de Fuentes Tipográficas
Las fuentes impactan rendimiento (FOUT/FOIT) y el diseño visual "audaz y moderno" (RF-07). ¿Cuál estrategia prefiere?

- **A)** Google Fonts (vía CDN) — Mayor variedad, fácil de integrar, dependencia externa
- **B)** Fuentes auto-alojadas (self-hosted) — Sin dependencia externa, mejor privacidad, control total de carga
- **C)** Fuentes del sistema (system fonts) — Rendimiento máximo (0 KB de fuentes), aspecto nativo por plataforma
- **D)** Sin preferencia — Decidir basado en el diseño visual

[Answer]:B

---

### P3: Versión de Tailwind CSS
Tailwind v4 (lanzado enero 2025) introduce cambios significativos: CSS-first config, nuevo motor de detección, migración de clases.

- **A)** Tailwind CSS v4 — Última versión, CSS-first config, mejor rendimiento de build
- **B)** Tailwind CSS v3.4 — Versión estable probada, amplia documentación y compatibilidad de plugins
- **C)** Sin preferencia — Usar la versión más estable para Angular 19

[Answer]:B

---

### P4: Estrategia de Format de Imágenes
Los requisitos mencionan "WebP/AVIF con fallbacks". ¿Qué nivel de optimización de imágenes aplica?

- **A)** Solo WebP con fallback JPEG/PNG — Buen balance soporte/tamaño, amplia compatibilidad
- **B)** AVIF prioritario con fallback WebP y JPEG/PNG — Máxima compresión, soporte creciente
- **C)** Imágenes mínimas — El sitio usará principalmente íconos SVG y pocos assets fotográficos
- **D)** Sin preferencia — Decidir según el contenido real del sitio

[Answer]:B

---

### P5: Pipeline CI/CD de GitHub Actions
¿Qué nivel de automatización desea en el pipeline de CI/CD?

- **A)** Básico — Build + deploy a GitHub Pages en push a main
- **B)** Estándar — Lint + Test + Build + Deploy + npm audit en cada PR y push a main
- **C)** Completo — Lint + Test + Cobertura + Lighthouse CI + Build + Deploy + npm audit + Dependabot
- **D)** Sin preferencia — Implementar el pipeline más práctico para el proyecto

[Answer]:A

---

### P6: Presupuesto de Bundle por Ruta
El requisito establece <200KB carga inicial (gzipped). ¿Desea presupuestos por ruta para lazy loading?

- **A)** Sí — Definir límites por chunk lazy-loaded (ej. max 50KB por ruta)
- **B)** No — Solo el presupuesto global de 200KB es suficiente
- **C)** Sin preferencia — Usar los defaults de Angular CLI budgets

[Answer]:B

---

### P7: Herramienta de Testing de Componentes
Los requisitos mencionan "Angular Testing Library o Spectator". ¿Cuál prefiere para testing de comportamiento?

- **A)** Angular Testing Library — Enfoque centrado en el usuario, promueve buenas prácticas de accesibilidad
- **B)** Spectator — API fluida, reduce boilerplate de TestBed, popular en la comunidad Angular
- **C)** TestBed nativo — Sin librería adicional, máximo control
- **D)** Sin preferencia — Decidir basado en compatibilidad con el framework de testing elegido (P1)

[Answer]:A

---

## Plan de Ejecución

- [x] Recopilar respuestas del usuario a las 7 preguntas
- [x] Analizar respuestas en busca de ambigüedades
- [x] Generar `nfr-requirements.md` — Requisitos no funcionales consolidados con métricas
- [x] Generar `tech-stack-decisions.md` — Decisiones tecnológicas con justificación
- [x] Validar completitud y presentar para aprobación
