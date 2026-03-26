# Plan de Diseño RNF — Unidad Principal

## Contexto
Unidad única: sitio de marketing Angular 19 estático desplegado en GitHub Pages.
Basado en los artefactos de Requisitos RNF y Decisiones de Stack Tecnológico aprobados.

## Evaluación de Necesidad de Preguntas

### Categorías Evaluadas
| Categoría | ¿Aplicable? | Razón |
|---|---|---|
| Resiliencia | ❌ No | Sitio estático, sin backend ni servicios que requieran fault tolerance |
| Escalabilidad | ❌ No | GitHub Pages maneja la distribución, sin servidor propio |
| Rendimiento | ✅ Sí | Patrones definidos en NFR Requirements — sin ambigüedades |
| Seguridad | ✅ Sí | CSP, validación, supply chain — patrones claros |
| Componentes Lógicos | ❌ No | Sin colas, caches, bases de datos ni infraestructura adicional |

### Decisión
**No se requieren preguntas adicionales.** Todas las decisiones técnicas están resueltas:
- Stack tecnológico definido (7 decisiones en tech-stack-decisions.md)
- Métricas de rendimiento específicas (Core Web Vitals, bundle budgets)
- Estrategia de accesibilidad completa (WCAG 2.1 AAA)
- Seguridad definida (CSP, validación, supply chain)
- Testing definido (Jest + Angular Testing Library)

## Plan de Ejecución

- [x] Generar `nfr-design-patterns.md` — Patrones de diseño para rendimiento, accesibilidad, seguridad y tema oscuro/claro
- [x] Generar `logical-components.md` — Componentes lógicos y servicios de infraestructura frontend
- [x] Validar completitud y presentar para aprobación
