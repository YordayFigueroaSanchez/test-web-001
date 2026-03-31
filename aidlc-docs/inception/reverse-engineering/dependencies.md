# Dependencias

## Dependencias Internas (modulares)
- Páginas dependen de UI reusable y servicios compartidos.
- Layout depende de servicios de scroll/tema y tipos de navegación.
- Servicios son mayormente independientes entre sí; SEO/tema impactan toda la experiencia.

## Dependencias Externas Clave
- `@angular/*` 19.x: runtime framework.
- `tailwindcss` 3.4 + `postcss` + `autoprefixer`: pipeline de estilos.
- `@fontsource/inter`: actualmente instalado pero la app ya usa fuente self-hosted personalizada.
- `sharp`: utilidad de optimización de imágenes usada en flujo de assets.

## Riesgos de Dependencias
- Mantener `@fontsource/inter` sin uso efectivo aumenta superficie de mantenimiento.
- Migrar Tailwind 3 -> 4 requiere ajustar configuración/postcss y utilidades potencialmente usadas.
- Incorporar PrimeNG v19 implica armonizar tokens Prime con diseño existente y tamaños de bundle.
