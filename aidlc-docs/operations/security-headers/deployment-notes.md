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
