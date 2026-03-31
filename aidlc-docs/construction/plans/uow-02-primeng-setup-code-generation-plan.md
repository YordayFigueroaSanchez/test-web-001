# Plan de Generación de Código — UoW-02: PrimeNG Setup

**Fase**: CONSTRUCCIÓN  
**Unidad**: UoW-02 — PrimeNG Setup  
**Fecha**: 2026-03-30  
**Dependencia previa**: UoW-01 Foundation completada (Gate B cerrado)

---

## Contexto de la Unidad

- **Stories/Requisitos cubiertos**: FR-02 (adopción PrimeNG v19), FR-03 (tokens Aura Studio), FR-06 (preservar hash/base-href), NFR-02 (bundle controlado), SEC-01/SEC-02.
- **Objetivo**: instalar y configurar PrimeNG v19 como capa estable de UI, integrado con tokens Aura Studio sin romper rutas ni CSP.
- **Límites de UoW-02**: esta unidad NO migra aún todos los componentes de negocio; la migración masiva queda para UoW-03.
- **Código**: se modifica in-place (brownfield), sin crear duplicados de archivos existentes.

## Dependencias e Interfaces

- **Dependencias requeridas**: `primeng`, `@primeng/themes`, `primeicons`.
- **Proveedor Angular esperado**: `providePrimeNG(...)` en `src/app/app.config.ts`.
- **Tokens visuales fuente**: `src/styles/_tokens.scss`.
- **Contrato de routing a preservar**: `withHashLocation()` + `APP_BASE_HREF` factory.

---

## Plan de Ejecución (Part 1 + Part 2)

### Paso 1 — Baseline técnico y seguridad de supply chain
- [x] Verificar versiones Angular/Tailwind actuales y compatibilidad con PrimeNG v19
- [x] Verificar procedencia oficial de paquetes (`primeng`, `@primeng/themes`, `primeicons`)
- [x] Confirmar que no se alterará `withHashLocation()` ni `--base-href /test-web-001/`

### Paso 2 — Instalación de dependencias PrimeNG
- [x] Instalar `primeng`, `@primeng/themes` y `primeicons` en `package.json`
- [x] Confirmar lockfile actualizado sin conflictos de peer dependencies
- [x] Documentar versiones instaladas en este plan
: `primeng@19.1.4`, `@primeng/themes@19.1.4`, `primeicons@7.0.0`, `@angular/cdk@19.2.19`.

### Paso 3 — Configuración global de PrimeNG en app config
- [x] Modificar `src/app/app.config.ts` para incluir `providePrimeNG({ theme: { preset: ... } })`
- [x] Mantener intactos `withHashLocation()`, `withViewTransitions()` y `APP_BASE_HREF`
- [x] Verificar que `provideAnimationsAsync()` sigue habilitado para PrimeNG

### Paso 4 — Integración de estilos globales PrimeNG
- [x] Actualizar `src/styles.scss` para incluir estilos necesarios de PrimeNG/PrimeIcons
- [x] Mantener orden de imports compatible con Tailwind v4
- [x] Evitar overrides inline: usar variables/tokens CSS

### Paso 5 — Capa de tema Aura Studio para PrimeNG
- [x] Crear archivo de integración temática en `src/styles/` para mapear tokens Aura Studio a variables consumidas por PrimeNG
- [x] Aplicar mapping para superficies, texto, borde, foco, primario (gold) y estados
- [x] Soportar modo oscuro con selector `.dark` sin romper `theme-init.js`

### Paso 6 — Smoke integration en UI raíz
- [x] Incorporar un uso mínimo controlado de PrimeNG en shell existente para verificar carga del tema (sin migración masiva)
- [x] Asegurar que la UI conserva identidad Aura Studio en modo claro/oscuro
- [x] Validar que no se introducen scripts inline incompatibles con CSP

### Paso 7 — Verificación técnica (gate parcial de unidad)
- [x] Ejecutar `npm install` y validar sin errores bloqueantes
- [x] Ejecutar `npm run build` y validar bundle/rutas sin regresión crítica
- [x] Ejecutar `npm test` y validar que la suite permanece en verde

### Paso 8 — Validaciones funcionales mínimas
- [x] Verificar en `ng serve` que la app carga con PrimeNG activo
- [x] Verificar que toggle dark/light sigue funcional
- [x] Verificar que navegación hash sigue operativa

### Paso 9 — Actualización documental y trazabilidad
- [x] Actualizar checkboxes de este plan conforme se complete cada paso
- [x] Registrar decisiones y resultados en `aidlc-docs/audit.md`
- [x] Actualizar `aidlc-docs/aidlc-state.md` con progreso de UoW-02

### Paso 10 — Cierre de UoW-02 y handoff
- [x] Preparar resumen de archivos modificados/creados
- [x] Preparar lista de precondiciones cumplidas para iniciar UoW-03
- [x] Presentar resultado y solicitar aprobación para continuar

---

## Archivos Objetivo (previstos)

- `package.json`
- `package-lock.json`
- `src/app/app.config.ts`
- `src/styles.scss`
- `src/styles/*` (archivo nuevo de integración de tema PrimeNG)
- `aidlc-docs/construction/plans/uow-02-primeng-setup-code-generation-plan.md`
- `aidlc-docs/audit.md`
- `aidlc-docs/aidlc-state.md`

---

## Nota de Control

Este plan es la fuente de verdad para la ejecución de UoW-02.  
No se ejecutará generación de código de esta unidad hasta aprobación explícita del usuario.
