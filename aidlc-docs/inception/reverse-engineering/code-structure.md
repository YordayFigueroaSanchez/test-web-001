# Estructura de Código

## Build System
- **Gestor**: npm.
- **Framework**: Angular CLI 19.
- **Salida producción**: `ng build --configuration production --base-href /test-web-001/`.
- **Pruebas**: Jest (además de configuración Karma presente por defecto de Angular).

## Inventario Funcional (alto nivel)
- `src/app/app.config.ts`: providers globales (router, animations, base href).
- `src/app/app.routes.ts`: rutas lazy por página.
- `src/app/layout/*`: shell y navegación.
- `src/app/pages/*`: contenido de negocio/marketing.
- `src/app/components/*`: librería UI interna reusable.
- `src/app/shared/services/*`: lógica transversal.
- `src/styles.scss` + `src/styles/*`: base visual global.

## Patrones Detectados
- **Standalone-first**: componentes standalone en toda la app.
- **Signals para estado local**: menú móvil, tema, lightbox, back-to-top.
- **Control Flow moderno**: uso consistente de `@if` y `@for`.
- **Servicios de side effect**: SEO y tema centralizados.

## Deuda Técnica Relevante para Aura Studio
- Naming y branding aún en `test-web-001` en títulos/textos.
- Configuración visual no alineada al lenguaje premium solicitado.
- Stack objetivo menciona Tailwind v4 y PrimeNG v19, hoy no adoptados.
