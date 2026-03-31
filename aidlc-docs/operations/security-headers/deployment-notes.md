# Despliegue de CSP en Headers (Nginx y CloudFront)

## Objetivo
Mover CSP y headers de seguridad fuera de HTML y aplicarlos en infraestructura.

## Variante 1: Nginx
Archivo: `nginx-csp.conf`

1. Ajustar `server_name` y `root`.
2. Reemplazar endpoint de reporte:
   - `https://example.invalid/csp-report`
3. Recargar Nginx:
   - `nginx -t`
   - `systemctl reload nginx`

## Variante 2: CloudFront
Archivo: `cloudfront-response-headers-policy.json`

1. Crear policy:
   - `aws cloudfront create-response-headers-policy --response-headers-policy-config file://cloudfront-response-headers-policy.json`
2. Obtener `ResponseHeadersPolicy.Id` de la salida.
3. Asociar el policy a los behaviors de la distribucion CloudFront.
4. Invalidar cache:
   - `aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"`

## Nota de compatibilidad
- `frame-ancestors` y `report-to` deben vivir en headers, no en meta tags.
- El proyecto ya tiene enforcement CI para bloquear CSP en meta tags de HTML.

## GitHub Pages - limitacion verificada
- Verificacion HEAD sobre `https://yordayfigueroasanchez.github.io/test-web-001/` devuelve 200, pero sin headers de seguridad efectivos (`Content-Security-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, etc.).
- GitHub Pages no permite configurar headers HTTP personalizados por repositorio (el archivo `_headers` se genera solo como compatibilidad para otros hosts).

## Recomendacion operativa
- Para enforcement real de CSP/headers usar una capa edge delante de GitHub Pages:
   - CloudFront + Response Headers Policy (archivo JSON ya incluido)
   - Nginx reverse proxy (config ya incluida)
- Mantener en CI la politica actual: bloquear CSP meta tags en HTML y validar integridad del artefacto.
