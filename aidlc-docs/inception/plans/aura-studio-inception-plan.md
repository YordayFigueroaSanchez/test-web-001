# Plan Adaptativo Nivel 1 — Aura Studio (Brownfield)

## Decisión de Fases (Inception)
- [x] Workspace Detection: **EJECUTAR** (brownfield confirmado).
- [x] Reverse Engineering: **EJECUTAR** (artefactos regenerados con estado actual).
- [ ] Requirements Analysis: **EJECUTAR** (preguntas de validación pendientes de respuesta).
- [ ] User Stories: **OMITIR por ahora** (cambio centrado en UI/arquitectura frontend; puede reactivarse si aparecen múltiples perfiles o journeys complejos).
- [ ] Workflow Planning: **EJECUTAR** (cerrar secuencia final tras respuestas de requisitos).
- [ ] Application Design: **CONDICIONAL** (ejecutar solo si introducimos nuevos componentes/servicios o PrimeNG como capa estable).
- [ ] Units Generation: **EJECUTAR LIGERO** (definir unidades pequeñas para control humano por lote).

## Secuencia Recomendada
1. Completar y aprobar requisitos/riesgos.
2. Congelar decisiones de stack:
   - Tailwind v4 (sí/no/gradual)
   - PrimeNG v19 (sí/no/selectivo)
3. Definir unidades de trabajo de construcción (máximo 3-5 archivos por unidad cuando sea posible).
4. Ejecutar Construction en ciclo corto: Plan > Verify > Generate.
5. Parar en cada Unit of Work para revisión/aprobación humana.

## Unidades de Trabajo — DEFINITIVAS (post-validación Q1–Q8)

| UoW | Nombre | Alcance | Complejidad |
|---|---|---|---|
| **UoW-01** | Foundation | Tailwind v4 migration + Aura Studio design tokens (paleta, tipografía, superficies, modo oscuro) | Alta |
| **UoW-02** | PrimeNG Setup | Instalación PrimeNG v19, `providePrimeNG`, tema Aura Studio sobreescrito con tokens CSS | Alta |
| **UoW-03** | Componentes Base | Reemplazo del UI kit interno por PrimeNG: Button, Badge, Card, Spinner, Dialog/Modal, Tabs, Accordion | Alta |
| **UoW-04** | Layout Premium | Header, Footer, Mobile Drawer rediseñados con identidad Aura Studio | Media |
| **UoW-05** | Páginas + Contenido | Home, About, Features, Gallery, Contact — rediseño visual + reescritura completa del copy | Alta |
| **UoW-06** | Hardening | WhatsApp fix, SEO, a11y, Lighthouse verify, GitHub Pages validation, Security Baseline check | Media |

### Gate de aprobación por UoW
**Condición mínima (Q7-B)**: Build exitoso + pruebas unitarias verdes + revisión visual manual — ANTES de avanzar a la siguiente UoW.

## Fases de Construction previstas (adaptativas)
- Functional Design: **LIGERO** (solo para reglas no triviales de componentes/estados).
- NFR Requirements: **EJECUTAR** (a11y, perf, bundle, base-href).
- NFR Design: **EJECUTAR** (patrones de theming y performance).
- Infrastructure Design: **OMITIR** (sin cambios de infraestructura cloud).
- Code Generation: **EJECUTAR** (obligatorio por unidad).
- Build and Test: **EJECUTAR** (obligatorio).

## Cumplimiento de Extensiones
- Security Baseline: **Compliant (N/A parcial)**.
  - Reglas de red/infra/API no aplican en este momento por naturaleza SPA sin backend.
  - Mantener verificación de headers/csp y supply-chain durante construcción.

## Estado Actual del Plan
- [x] Análisis inicial completado.
- [x] Ingeniería inversa completada.
- [x] Análisis de impacto generado.
- [x] Requisitos y riesgos validados (Q1-Q8 respondidas — ver `aura-requirements.md`).
- [x] Workflow Planning cerrado — 6 UoW definitivas.
- [ ] Aprobación explícita para entrar a Construction (PENDIENTE). 

## Decisiones de Stack Congeladas
| Decisión | Resolución |
|---|---|
| Tailwind CSS | **v4** — migración completa en UoW-01 |
| PrimeNG | **v19 adopción amplia** — reemplaza la mayoría del UI kit en UoW-02/03 |
| Paleta de colores | **Estricta con neutros de apoyo** — Hueso, Negro Mate, Dorado + grises para feedback |
| Hash routing | **Conservar** `withHashLocation()` — sin cambios |
| Copy/Branding | **Reescritura completa** — todos los textos en todas las páginas |
| Gate por UoW | **Build + pruebas + revisión visual** antes de avanzar |
| Security | **Enforcement completo** — blocking constraints |
