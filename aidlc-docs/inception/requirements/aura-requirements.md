# Documento de Requisitos — Aura Studio (Renovación Brownfield)

**Versión**: 1.0  
**Fecha**: 2026-03-28  
**Estado**: Aprobado — listo para Workflow Planning y Construction  

---

## 1. Análisis de Intención

| Atributo | Valor |
|---|---|
| Claridad de solicitud | Alta (respuestas completas a todas las preguntas de validación) |
| Tipo de solicitud | Mejora / Renovación arquitectónica y visual |
| Alcance | Multi-componente — todo el sitio |
| Complejidad | Alta |
| Proyecto | Brownfield — Angular 19 SPA existente |

### Señales clave detectadas
- Migración de stack inmediata: Tailwind CSS v3.4 → v4
- Adopción amplia de biblioteca de UI: PrimeNG v19 (reemplaza la mayoría del UI kit interno)
- Identidad visual nueva y estricta: paleta Aura Studio (Hueso, Negro Mate, Dorado)
- Reescritura completa de contenido en todas las páginas
- Flujo de trabajo humano en el loop: gates de aprobación entre cada Unit of Work

---

## 2. Resumen de Respuestas de Validación

| ID Pregunta | Tema | Respuesta | Decisión tomada |
|---|---|---|---|
| Q1 | Tailwind version | **A** — Migrar a v4 ahora | Tailwind CSS v4 en esta iteración |
| Q2 | PrimeNG adoption | **C** — Adopción amplia | Reemplazar la mayoría del UI kit interno |
| Q3 | Paleta de colores | **B** — Estricta + neutros mínimos | Hueso/Negro Mate/Dorado + gris auxiliar para feedback |
| Q4 | Primera UoW | **A** — Tokens globales primero | UoW-01 = Foundation (tokens + tipografía + base visual) |
| Q5 | Hash routing | **A** — Conservar | `withHashLocation()` se mantiene sin cambios |
| Q6 | Copy/Branding | **C** — Reescritura completa | Todos los textos en todas las páginas se reescriben como Aura Studio |
| Q7 | Gate por UoW | **B** — Build + pruebas + revisión visual | Condición antes de aprobar cada UoW |
| Q8 | Security extension | **A** — Enforcement completo | Security Baseline como restricción bloqueante |

---

## 3. Requisitos Funcionales

### FR-01 — Migración Tailwind CSS v4
**Descripción**: Migrar la configuración de Tailwind de v3.4 (JS config) a v4 (CSS-first config).  
**Criterios de aceptación**:
- `tailwind.config.js` reemplazado o vacío; configuración central en CSS con `@theme { }`
- `styles.scss` usa `@import "tailwindcss"` en lugar de `@tailwind base/components/utilities`
- `postcss.config.js` actualizado para usar `@tailwindcss/postcss`
- Modo oscuro configurado via `@variant dark` (sin `darkMode: 'class'` en config)
- Detección de contenido automática (sin array `content:` explícito)
- Token de paleta Aura Studio definidos en `@theme { }` como variables CSS nativas

### FR-02 — Adopción amplia de PrimeNG v19
**Descripción**: Instalar y configurar PrimeNG v19 con tema personalizado Aura Studio.  
**Criterios de aceptación**:
- `primeng` instalado como dependencia en `package.json`
- `providePrimeNG({ theme: { preset: ... } })` configurado en `app.config.ts`
- Tema PrimeNG sobreescrito con tokens de la paleta Aura Studio
- Componentes internos reemplazados por equivalentes PrimeNG: Button, Badge, Card, Spinner, Dialog/Modal, Tabs, Accordion
- Formulario de contacto migrado a componentes PrimeNG (InputText, Textarea, Button)
- Integración visual perfecta entre PrimeNG y tokens Tailwind v4

### FR-03 — Sistema de Design Tokens Aura Studio
**Descripción**: Definir la identidad visual completa como tokens CSS nativos.  
**Criterios de aceptación**:
- Token de color: `--color-bone` (#F5F0E8), `--color-matte-black` (#1A1A1A), `--color-gold` (#C9A84C) + variantes
- Token neutros de apoyo (para estados/feedback): grises, error red, success green
- Token de tipografía: escala de tamaños, pesos, line-heights referenciando PrimaryFont
- Token de superficies: fondos, bordes, sombras, radios
- Modo claro/oscuro definidos como variantes CSS en lugar de clases Tailwind

### FR-04 — Reescritura completa de contenido
**Descripción**: Reemplazar todos los textos placeholder con contenido real de Aura Studio.  
**Criterios de aceptación**:
- Nombre del sitio: `test-web-001` → `Aura Studio` en todos los archivos relevantes
- Página Home: Hero nuevo (titulo, subtitulo, CTA) con voz de luxe/minimalismo
- Página About: Historia, misión, valores de Aura Studio
- Página Features: Servicios reales del estudio (productos/colecciones/filosofía)
- Página Gallery: Labels y metadata de obras/colecciones
- Página Contact: Copy de invitación + info de contacto real placeholder
- Metadatos SEO actualizados en `SeoService` para cada página
- `<title>` en `index.html` actualizado

### FR-05 — Layout premium
**Descripción**: Header, Footer y Mobile drawer rediseñados con la nueva identidad visual.  
**Criterios de aceptación**:
- Header: logo/nombre Aura Studio, navegación en fuente PrimaryFont, transición premium al hacer scroll
- Footer: diseño minimalista com datos de contacto, enlaces y marca
- Mobile drawer: menú responsive con paleta Aura Studio consistente
- Animaciones/transiciones: mantener y refinar con identidad premium

### FR-06 — Preservación de rutas GitHub Pages
**Descripción**: Conservar configuración de hash routing durante toda la migración.  
**Criterios de aceptación**:
- `withHashLocation()` en `app.config.ts` sin modificar
- `APP_BASE_HREF` factory intacta
- `--base-href /test-web-001/` en scripts de build sin cambios
- Verificación post-build que el sitio carga correctamente en GitHub Pages

### FR-07 — Corrección WhatsApp Service
**Descripción**: Resolver el bug silencioso del número de teléfono vacío en el servicio de WhatsApp.  
**Criterios de aceptación**:
- `phoneNumber` en `contact.component.ts` configurado con valor real (placeholder aceptable)
- `WhatsAppService.validatePhone()` retorna error visible si el número está vacío
- Botón de WhatsApp solo se muestra cuando hay número configurado

---

## 4. Requisitos No Funcionales

### NFR-01 — Performance (Lighthouse Mobile)
- FCP ≤ 2.0s (baseline actual: 1.38s — no regresar)
- LCP ≤ 2.5s (baseline actual: 1.73s)
- CLS = 0 (baseline actual: 0)
- TBT ≤ 150ms

### NFR-02 — Bundle size
- Chunks lazy de páginas ≤ 80KB gzip
- Chunk PrimeNG solo carga componentes usado (tree-shaking verificado)
- Tailwind v4 CSS final ≤ 30KB gzip (v4 es significativamente más pequeño que v3)

### NFR-03 — Accesibilidad (WCAG AA mínimo)
- Contraste de color ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande
- Verificar dorado `#C9A84C` sobre fondos oscuros/claros
- Navegación por teclado funcional en todos los componentes PrimeNG adoptados
- ARIA labels correctos en componentes interactivos

### NFR-04 — Compatibilidad de navegadores
- Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- CSS `@layer` y properties nativas de Tailwind v4 soportadas en targets

### NFR-05 — Mantenibilidad
- Design tokens centralizados — cambiar paleta en un solo lugar
- Componentes PrimeNG extendidos via CSS variables (no override inline)
- Documentación de tokens en `src/styles/` comentada

---

## 5. Requisitos de Seguridad

*Security Baseline extension: ACTIVA como restricción bloqueante (Q8-A)*

### SEC-01 — Content Security Policy
- CSP existente (`nginx-csp.conf`, `cloudfront-response-headers-policy.json`) debe mantenerse válido tras agregar PrimeNG
- Verificar que PrimeNG no inyecta scripts inline que rompan `script-src 'self'`

### SEC-02 — Supply chain (dependencias)
- Antes de instalar PrimeNG y `@tailwindcss/postcss`: verificar commits recientes oficiales y npm provenance
- No instalar paquetes sin `--save-exact` para las dependencias nuevas del stack

### SEC-03 — XSS / Injection
- Contenido de texto dinámico via Angular binding seguro (no `innerHTML` crudo)
- Formulario de contacto: mantener validators de Angular como única sanitización del lado cliente

### SEC-04 — `noopener noreferrer`
- Todos los `window.open()` y `<a target="_blank">` deben mantener `rel="noopener noreferrer"` (ya implementado en WhatsApp service — verificar que se mantiene)

### SEC-05 — No exposición de datos sensibles
- No incluir ni hardcodear números de teléfono, emails ni coordenadas reales en el código fuente (usar variables de entorno o placeholders documentados)

---

## 6. Restricciones

| Restricción | Descripción |
|---|---|
| Hash routing | `withHashLocation()` DEBE conservarse — GitHub Pages no soporta SPA routing sin él |
| base-href | `/test-web-001/` en todos los builds — no modificar |
| Self-hosted fonts | PrimaryFont WOFF2 no depende de servidores externos |
| TypeScript strict | Mantener `strict: true` en `tsconfig.json` |
| Angular 19 standalone | No introducir `NgModule` — mantener patrón standalone |
| Signals pattern | Mantener y extender uso de Signals API (no introducir Subject/BehaviorSubject nuevos) |
| Gate de aprobación | Build + pruebas + revisión visual manual antes de cada UoW siguiente |

---

## 7. Scope de Unidades de Trabajo (definición final)

| UoW | Nombre | Descripción resumida | Complejidad |
|---|---|---|---|
| UoW-01 | Foundation | Tailwind v4 migration + Aura Studio design tokens | Alta |
| UoW-02 | PrimeNG Setup | Instalación PrimeNG v19 + tema Aura Studio + providePrimeNG | Alta |
| UoW-03 | Componentes Base | Reemplazo de UI kit interno por PrimeNG (Button/Badge/Card/Spinner/Dialog/Tabs/Accordion) | Alta |
| UoW-04 | Layout Premium | Header, Footer, Mobile Drawer con nueva identidad visual | Media |
| UoW-05 | Páginas + Contenido | Home, About, Features, Gallery, Contact — rediseño visual + reescritura completa | Alta |
| UoW-06 | Hardening | WhatsApp fix, SEO, a11y, Lighthouse verify, GitHub Pages validation, Security check | Media |

---

## 8. Suposiciones

1. No hay backend existente — el sitio es SPA estático con GitHub Pages como hosting
2. Las imágenes de galería actuales pueden usarse como placeholder hasta tener fotos reales de Aura Studio
3. El número de teléfono de WhatsApp será un placeholder hasta que el cliente provea el real
4. PrimeNG v19 es compatible con Angular 19.2.x (verificar en construcción)
5. Tailwind v4 CSS-first config es compatible con el pipeline de build Angular CLI + PostCSS

---

## 9. Próximos Pasos

1. ✅ Requisitos aprobados
2. → Cerrar Workflow Planning (visualización final del plan de 6 UoW)
3. → Entrar a Construction: UoW-01 (Tailwind v4 + Design Tokens)
4. → Gate de aprobación humana entre cada UoW
