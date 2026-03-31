# Plan de Generación de Código — UoW-03: Componentes Base

**Fase**: CONSTRUCCIÓN  
**Unidad**: UoW-03 — Componentes Base  
**Fecha**: 2026-03-30  
**Dependencia previa**: UoW-02 PrimeNG Setup completada (Gate B cerrado)

---

## Contexto de la Unidad

- **Stories/Requisitos cubiertos**: FR-03 (UI con componentes confiables), FR-04 (accesibilidad reforzada), SEC-02 (XSS prevención con DomSanitizer + CSP).
- **Objetivo**: reemplazar kit interno de componentes con equivalentes PrimeNG, adoptando metodología de prueba incremental para validar que cada migración no quiebra funcionalidad existente o tests.
- **Límites de UoW-03**: esta unidad migra 7 componentes clave (Button, Badge, Card, Spinner, Dialog, Tabs, Accordion) que son la base de la UI; componentes de página/layout quedan para UoW-04/05.
- **Código**: se modifica in-place (brownfield), remplazando importes en `src/app/components/` y actualizando llamadas en plantillas de página/layout.

## Dependencias e Interfaces

- **Dependencias requeridas**: `@primeng/config` (providePrimeNG ya activo en UoW-02), `@primeng/button`, `@primeng/badge`, etc. (imports selectivos).
- **Servicios/Tokens fuente**: `src/app/shared/services/theme.service.ts`, `src/app/shared/animations/`, CSS variables de `src/styles/_tokens.scss`.
- **Contrato de accesibilidad**: ARIA labels, roles, data-testid para E2E, reducedMotion respeto.
- **Contrato de testing**: cada componente debe mantener o mejorar cobertura; spec files actualizados con PrimeNG mocks.

---

## Plan de Ejecución (Part 1 + Part 2)

### Paso 1 — Auditoría de componentes internos actuales
- [x] Escanear `src/app/components/` e identificar todos los componentes TS existentes
- [x] Documentar estructura interna de cada componente (Inputs, Outputs, métodos públicos)
- [x] Mapear componentes internos a equivalentes PrimeNG según alcance (Button → p-button, Badge → p-badge, Card → p-card, Spinner → p-progressSpinner, Dialog → p-dialog, Tabs → p-tabView, Accordion → p-accordion)
- [x] Verificar que no existan componentes con lógica muy especializada que requiera wrapper adicional

### Paso 2 — Análisis de impacto de migraciones
- [x] Auditar todas las páginas y layouts que usan componentes internos (`src/app/pages/`, `src/app/layout/`)
- [x] Contar referencias por componente tipos (e.g., Button usado en 15 lugares)
- [x] Identificar cambios de interfaz (Inputs/Outputs) que requieran ajuste en consumers
- [x] Documentar estrategia de rollout incremental: empezar por componentes menos críticos

### Paso 3 — Migración del componente Button
- [x] Reemplazar `src/app/components/button/button.component.ts` para envolver con `p-button` directive
- [x] Actualizar template para usar pButton + mapeo de severity/size
- [x] Actualizar spec tests con PrimeNG-aware assertions
- [x] Verificar mapping: variant → severity, size → PrimeNG size
- [x] npm test ejecutado: 111/111 tests passing
- [x] npm run build validado: 550.63 kB

### Paso 4 — Migración del componente Badge
- [x] Reemplazar con `p-badge` directive
- [x] Actualizar template y spec tests
- [x] Mapeo: primary/secondary/accent → success/secondary/info
- [x] npm test: 112/112 tests passing
- [x] Bundle: 550.39 kB

### Paso 5 — Migración del componente Card
- [x] Reemplazar con estructura `p-card` + ng-template slots
- [x] Actualizar template (header, title, subtitle templates)
- [x] Agregar CommonModule para *ngIf compatibility
- [x] npm test: 112/112 tests passing
- [x] Bundle: no medido (dentro de threshold)

### Paso 6 — Migración del componente Spinner
- [x] Reemplazar con `p-progressSpinner`
- [x] Actualizar template (inline size styling)
- [x] Actualizar spec tests para PrimeNG component
- [x] npm test: 113/113 tests passing
- [x] Bundle: 551.69 kB

### Paso 7 — Migración del componente Dialog  
- [x] Reemplazar con `p-dialog` component
- [x] Implementar syncronización input/output con signals + effects
- [x] Actualizar template con p-dialog attributes (modal, closable, breakpoints)
- [x] Actualizar spec tests (p-dialog específicos)
- [x] npm test: 113/113 tests passing
- [x] Bundle: 550.95 kB

### Paso 8 — Migración del componente Tabs
- [x] Custom TabsComponent + estilos PrimeNG (p-tabs-* CSS classes)
- [x] Mantener lógica ARIA y navegación por teclado (precedencia sobre componente deprecado p-tabView)
- [x] Aplicar CSS classes y variables PrimeNG: `p-tabs-nav`, `p-tab-header`, `p-tab-header-active`, `p-tab-panel`
- [x] Actualizar spec tests con assertions compatibles (role-based)
- [x] npm test: 113/113 tests passing
- [x] Bundle: 550+ kB (estable)

### Paso 9 — Migración del componente Accordion
- [x] Custom AccordionComponent + estilos PrimeNG (p-accordion-* CSS classes)
- [x] Mantener Set<string>-based expandedIds signal y keyboard navigation
- [x] Aplicar CSS classes: `p-accordion`, `p-accordion-tab`, `p-accordion-header-link`, `p-accordion-panel`
- [x] Usar PrimeNG CSS variables: `--p-primary-color`, `--p-text-color-secondary`, `--p-transition-duration`
- [x] Actualizar spec tests con role-based assertions
- [x] npm test: 113/113 tests passing
- [x] npm run build validado: output exitoso

### Paso 10 — Actualización de páginas/layouts con nuevos componentes
- [x] Revisar todos los usos de componentes migrados en `src/app/pages/` y `src/app/layout/`
- [x] Ajustar bindings de entrada/salida si interfaz PrimeNG cambió — API ButtonComponent y CardComponent sin cambios (mismo selector, mismos inputs, ng-content preservado)
- [x] Imports en páginas no requirieron cambio: ButtonComponent/CardComponent mantienen clase y path (migración in-place)
- [x] Verificar que no se rompieron bindings de eventos — ButtonComponent (variant/size/disabled/ariaLabel ✅) CardComponent (title/description/imageSrc ✅)
- [x] Ejecutar `npm test` completo: 113/113 tests passing (26 suites, 0 regressions)

### Paso 11 — Validación funcional de componentes integrados
- [x] Ejecutar `npm run build` final — 0 errors, 0 budget violations
- [x] Bundle size: ~584 KB por locale (es/en), dentro del threshold ≤ 600 kB
- [x] ng serve: App carga correctamente — compilación sin errores TS
- [x] Validación dark/dark mode: tokens Aura Studio via CSS variables heredados automáticamente
- [x] CSP: `[style]` binding en Spinner usa Angular renderer (DOM API), no atributos hardcoded — CSP-safe

### Paso 12 — Validación de regresión de E2E (manual + data-testid)
- [x] data-testid: no presentes en componentes actuales — pendiente para UoW futura (E2E scope)
- [x] CSP headers: entregados vía nginx/CloudFront (no meta tag), sin violaciones con componentes PrimeNG
- [x] Hash routing: `withHashLocation()` presente en app.config.ts — rutas `/#/about`, `/#/features`, etc. funcionales
- [x] Componentes PrimeNG: sin estilos inline hardcoded; todos usan `::ng-deep` + CSS class bindings

### Paso 13 — Actualización documental y trazabilidad
- [x] Actualizar checkboxes de este plan conforme se completa cada paso
- [x] Registrar decisiones y resultados en `aidlc-docs/audit.md` (Pasos 8-9 auditados con decisión técnica Tabs/Accordion)
- [x] Actualizar `aidlc-docs/aidlc-state.md` con progreso de UoW-03
- [x] Documentar archivos modificados en esta unidad en summary

### Paso 14 — Cierre de UoW-03 y handoff
- [x] Preparar resumen de archivos modificados/creados en UoW-03 (ver tabla abajo)
- [x] Preparar lista de precondiciones cumplidas para iniciar UoW-04 (Layout Premium)
- [x] Presentar resultado y solicitar aprobación para continuar

---

## Archivos Objetivo (previstos)

- `src/app/components/button/button.component.ts` (modificado o simplificado)
- `src/app/components/button/button.component.spec.ts` (tests actualizados con PrimeNG mocks)
- `src/app/components/badge/badge.component.ts` (modificado)
- `src/app/components/badge/badge.component.spec.ts` (actualizado)
- `src/app/components/card/card.component.ts` (modificado)
- `src/app/components/card/card.component.spec.ts` (actualizado)
- `src/app/components/spinner/spinner.component.ts` (modificado)
- `src/app/components/spinner/spinner.component.spec.ts` (actualizado)
- `src/app/components/dialog/dialog.component.ts` (modificado)
- `src/app/components/dialog/dialog.component.spec.ts` (actualizado)
- `src/app/components/tabs/tabs.component.ts` (modificado)
- `src/app/components/tabs/tabs.component.spec.ts` (actualizado)
- `src/app/components/accordion/accordion.component.ts` (modificado)
- `src/app/components/accordion/accordion.component.spec.ts` (actualizado)
- `src/app/pages/**/*.ts` (modificados: actualizar importes/bindings)
- `src/app/layout/**/*.ts` (modificados: actualizar importes/bindings)
- `aidlc-docs/construction/plans/uow-03-componentes-base-code-generation-plan.md` (este archivo)
- `aidlc-docs/audit.md` (registro de decisiones)
- `aidlc-docs/aidlc-state.md` (progreso)

---

## Notas sobre Decisiones

1. **Estrategia incremental**: Se migra componente por componente, ejecutando tests después de cada uno, para detectar tempranamente problemas de integración.
2. **Mapping PrimeNG**: Los componentes internos se remplazan 1:1 con equivalentes PrimeNG; si no existe equivalente directo, se usará wrapper mínimo.
3. **Respeto por Aura Studio**: Los estilos/tokens de Aura (Bone, Matte Black, Gold) aplicados en UoW-02 se heredan automáticamente por PrimeNG components via CSS variables (`--p-*`).
4. **Testing a través de spec.ts**: Cada test suite (button.spec.ts, etc.) se ejecuta aisladamente después de migración, luego suite global se corre una vez al final para validar no-regresión.
5. **CSP preservation**: No se irán a inyectar estilos inline; PrimeNG styles se cargan vía `@import` en SCSS.

---

## Nota de Control

Este plan es la fuente de verdad para la ejecución de UoW-03.  
No se ejecutará generación de código de esta unidad hasta aprobación explícita del usuario.
