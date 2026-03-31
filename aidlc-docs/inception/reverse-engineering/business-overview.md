# Visión de Negocio

## Descripción General
- **Dominio**: Sitio web institucional/marketing para estudio creativo (Aura Studio).
- **Objetivo de negocio**: Presentar servicios, portafolio y canal de contacto con experiencia premium, accesible y rápida.
- **Canales de conversión**: Formulario de contacto y apertura de chat de WhatsApp.

## Transacciones de Negocio Implementadas
1. **Descubrimiento de propuesta de valor**: recorrido Home -> Features.
2. **Construcción de confianza**: recorrido About (misión, visión, equipo).
3. **Exploración de portafolio**: Gallery con lightbox y navegación entre piezas.
4. **Conversión**: Contact con validación de formulario y potencial envío a WhatsApp.
5. **Preferencias de experiencia**: cambio de tema (light/dark), navegación desktop/móvil.

## Diccionario de Negocio
- **Lead**: usuario que completa intención de contacto.
- **Portfolio Item**: pieza visual presentada en galería.
- **Luxury Minimalism**: estilo visual premium, limpio y sobrio.
- **Conversión**: acción final (contacto enviado o chat iniciado).

## Descripción por Componente
### Aplicación Angular SPA
- **Propósito**: Renderizar páginas públicas del sitio y coordinar UX.
- **Responsabilidades**: routing, SEO por página, temas, animaciones y estados UI.

### Capa de Presentación (layout/pages/components)
- **Propósito**: componer interfaz reusable para marketing y branding.
- **Responsabilidades**: navegación, cards, formularios, galería, CTA.

### Capa de Servicios Compartidos
- **Propósito**: encapsular lógica transversal.
- **Responsabilidades**: SEO, tema, scroll, WhatsApp, animación.

### Activos Estáticos
- **Propósito**: soportar identidad visual y performance.
- **Responsabilidades**: fuentes WOFF2, imágenes gallery (WebP + fallback), estilos SCSS/Tailwind.
