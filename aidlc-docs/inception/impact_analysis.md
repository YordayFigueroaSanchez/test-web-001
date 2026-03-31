# Análisis de Impacto — Aura Studio (Brownfield)

## Resumen Ejecutivo
El sistema actual ya usa una base técnica moderna de Angular 19 (standalone + signals + @if/@for), pero su identidad visual y parte del stack no coinciden con el objetivo solicitado para Aura Studio (minimalismo de lujo y adopción/mantenimiento de Tailwind v4 + PrimeNG v19). Los cambios requeridos impactan principalmente capa visual, design tokens, shell de navegación y componentes UI clave.

## Objetivo del Cambio
- Elevar identidad visual a una dirección premium consistente (Hueso, Negro Mate, Dorado).
- Alinear stack con lineamientos objetivo (validar migración a Tailwind v4 y adopción selectiva de PrimeNG v19).
- Mantener robustez actual de accesibilidad, performance y compatibilidad con GitHub Pages.

## Impacto Arquitectónico
### 1) Capa de Estilos y Tokens (Impacto: Alto)
- Archivos impactados: `src/styles.scss`, `src/styles/_variables.scss`, `src/styles/_typography.scss`, `tailwind.config.js`, potencialmente `postcss.config.js`.
- Riesgo: regresiones visuales globales por cambio de paleta/tokens.
- Mitigación: migración por etapas (tokens base -> layout -> componentes -> páginas).

### 2) Shell de Layout y Navegación (Impacto: Medio)
- Archivos candidatos: `src/app/layout/header/header.component.ts`, `src/app/layout/mobile-menu-drawer/mobile-menu-drawer.component.ts`, `src/app/layout/footer/footer.component.ts`.
- Riesgo: pérdida de contraste/legibilidad o coherencia responsive.
- Mitigación: revisar contraste AA/AAA y breakpoints por componente.

### 3) Componentes UI Reusables (Impacto: Alto)
- Archivos candidatos: `src/app/components/*` (button, card, modal, tabs, accordion, form-field, etc.).
- Riesgo: inconsistencia de variantes y estados si se mezcla estilo legado con nuevo sistema.
- Mitigación: definir matriz de variantes y estados antes de refactor.

### 4) Integración PrimeNG v19 (Impacto: Medio-Alto, Condicional)
- Estado actual: PrimeNG no está instalado ni usado.
- Riesgo: incremento de bundle y colisiones visuales con utilidades Tailwind.
- Mitigación: adopción incremental solo en componentes donde aporte valor real (por ejemplo dialog, tabs o inputs complejos).

### 5) Migración Tailwind v4 (Impacto: Alto, Condicional)
- Estado actual: Tailwind 3.4.
- Riesgo: cambios de configuración/utilidades y posibles rupturas de build.
- Mitigación: rama controlada + smoke test visual + build/test por checkpoint.

### 6) Flujo Funcional de Contacto (Impacto: Medio)
- Archivo candidato: `src/app/pages/contact/contact.component.ts` + `src/app/shared/services/whatsapp.service.ts`.
- Riesgo: degradar conversión si WhatsApp queda inválido por configuración de número.
- Mitigación: parametrizar número y validar fallback UX si no existe.

### 7) Despliegue GitHub Pages (Impacto: Crítico)
- Archivos sensibles: `package.json`, `src/index.html`, `src/app/app.config.ts`.
- Riesgo: romper `base-href` y carga de assets.
- Mitigación: preservar `--base-href /test-web-001/`, verificar assets relativos y hash routing tras cada unidad.

## Impacto en Calidad (NFR)
- **Accesibilidad**: debe conservarse o mejorar (foco visible, contraste, roles/labels).
- **Performance**: cuidar tamaño de CSS/JS al introducir PrimeNG.
- **Mantenibilidad**: centralizar tokens y evitar estilos ad-hoc por componente.
- **SEO**: mantener `SeoService` y metadatos por página.

## Evaluación de Riesgo
- **Riesgo Global**: Medio-Alto.
- **Rollback**: Moderado (principalmente visual), bajo impacto de datos al no existir backend propio.
- **Superficie de cambio**: transversal en frontend, baja en lógica de negocio.

## Conclusión
Se recomienda un enfoque incremental por unidades visuales/arquitectónicas pequeñas con validación continua de build, accesibilidad y rutas de Pages. No se recomienda una reescritura masiva.
