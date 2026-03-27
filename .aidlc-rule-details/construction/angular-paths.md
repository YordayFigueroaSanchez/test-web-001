# Regla: Validacion de Subpath en Rutas Angular

## Objetivo
Evitar perdida del subdirectorio del repositorio en GitHub Pages (por ejemplo, `/test-web-001/`) al construir rutas de navegacion, i18n o redirecciones.

## Regla Obligatoria
Toda URL generada por componentes, servicios o utilidades de enrutamiento debe preservar el subpath del repositorio antes de aplicar locale o hash route.

## Checklist de Cumplimiento
- Verificar que el `base href` de produccion incluya el subpath del repositorio.
- Verificar que los enlaces de cambio de idioma mantengan `/<repo>/` al alternar entre `/en/` y `/es/`.
- Verificar que la ruta hash actual (`#/...`) se conserve tras cambiar de idioma.
- Verificar que cualquier normalizacion de paths elimine locale solo cuando corresponda, sin eliminar el subpath del repo.

## Evidencia Minima Requerida
- Al menos un test automatizado que valide una URL final con formato: `/<repo>/<locale>/#/ruta`.
- Registro en `aidlc-docs/audit.md` cuando se aplique una correccion de path i18n.
