# Plan de Generación de Código — UoW-04: Layout Premium

**Fase**: CONSTRUCCIÓN  
**Unidad**: UoW-04 — Layout Premium  
**Fecha**: 2026-03-30  
**Dependencia previa**: UoW-03 Componentes Base completada (Gate B cerrado)

---

## Contexto

- **Objetivo**: Rediseñar Header, Footer y MobileMenuDrawer con identidad Aura Studio (Bone / Matte Black / Gold)
- **Tipo**: Brownfield — modificación in-place de archivos existentes
- **Criterio de éxito**: Identidad visual premium coherente + 113+ tests verdes + build < 600 kB

## Decisiones de Diseño Aura Studio

| Elemento | Decisión |
|---|---|
| Logo | Wordmark tipográfico "AURA / STUDIO" — dos líneas, gold + matte-black/bone |
| Iconos | SVG inline (hamburger/X en header/drawer), PrimeIcons (`pi pi-*`) en social links |
| Header fondo | Transparente con bone/matte-black + backdrop-blur; border-b gold/20 al hacer scroll |
| Footer fondo | Matte black permanente — premium luxury feel, border-t gold |
| Drawer | Slide-in derecha preservado; bone en light / matte-black en dark; gold accents |
| Paleta | `gold-400`, `bone-200`, `matte-black-200`, `neutral-*` de tokens Aura Studio |

---

## Plan de Ejecución

### Paso 1 — Rediseñar HeaderComponent
- [x] Wordmark tipográfico "AURA / STUDIO" (dos líneas, tracking-widest, gold+bone)
- [x] Fondo: `bg-bone-200/80 backdrop-blur-sm` → scroll: `bg-bone-100/95 backdrop-blur-md border-b border-gold-400/20`
- [x] Nav links: `text-neutral-700 hover:text-gold-400`, active: `text-gold-400`
- [x] Hamburger: SVG thin-stroke (stroke-width 1.5) con colores Aura
- [x] aria-label logo: "Aura Studio — Home"

### Paso 2 — Actualizar header.component.spec.ts
- [x] Actualizar test "logo link" con nuevo aria-label "Aura Studio — Home"

### Paso 3 — Rediseñar FooterComponent
- [x] Background permanente: `bg-matte-black-200` + `border-t-2 border-gold-400/40`
- [x] Wordmark "AURA / STUDIO" en footer
- [x] Tagline: "Luxury. Minimal. Premium."
- [x] Social links: PrimeIcons `pi pi-github`, `pi pi-instagram`, `pi pi-linkedin`
- [x] Copyright: "© YYYY Aura Studio. All rights reserved."
- [x] Colores texto: `text-bone-200`, `text-neutral-400`, `text-gold-400`

### Paso 4 — Actualizar footer.component.spec.ts
- [x] Actualizar test "copyright" para brand "Aura Studio"

### Paso 5 — Rediseñar MobileMenuDrawerComponent
- [x] Panel: `bg-bone-200 dark:bg-matte-black-100` + `border-l border-gold-400/20`
- [x] Logo wordmark en header del drawer
- [x] Nav items: hover gold, padding premium
- [x] Backdrop: `bg-matte-black-200/70 backdrop-blur-sm`
- [x] Tagline footer del drawer: "Luxury. Minimal. Premium."

### Paso 6 — Actualizar mobile-menu-drawer.component.spec.ts
- [x] Verificar tests existentes — sin cambios de ARIA (nav label, close button preservados)

### Paso 7 — Validación
- [x] npm test: 113+ tests passing
- [x] npm run build: bundle < 600 kB
