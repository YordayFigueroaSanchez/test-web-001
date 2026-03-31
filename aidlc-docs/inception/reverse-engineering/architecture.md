# Arquitectura del Sistema

## Resumen
Aplicación web Angular 19 standalone, con enrutamiento por páginas públicas y rendering client-side. Se usa Tailwind CSS (configuración actual v3.4) + SCSS modular para estilos globales. El estado de UI es liviano y local, gestionado principalmente con Signals.

## Componentes Principales
- **Root**: App shell con header/footer, router outlet y componentes de accesibilidad.
- **Layout**: header, footer, menú móvil.
- **Páginas**: home, about, features, gallery, contact.
- **UI reusable**: button, card, tabs, modal, accordion, etc.
- **Servicios**: theme, scroll, seo, whatsapp, animation.

## Flujo de Datos
1. Ruta activa selecciona componente standalone lazy (loadComponent).
2. Componente de página consume datos estáticos tipados o Signals locales.
3. Servicios compartidos aplican side effects (document title/meta, class dark, scroll, window.open).
4. Interacciones de usuario actualizan Signals para estado efímero (drawer, lightbox, submitted).

## Integraciones Externas
- **Navegador**: localStorage, matchMedia, Meta/Title APIs, window.open.
- **WhatsApp**: URL wa.me construida dinámicamente para iniciar chat.
- **No backend/API propia**: no hay capa HTTP ni store global remoto.

## Restricciones y Observaciones
- Routing actual usa `withHashLocation()` y `APP_BASE_HREF` dinámico, crítico para GitHub Pages.
- No se detecta PrimeNG en dependencias ni en plantillas.
- Sistema de color actual usa paleta azul/gris, no alineada a la paleta objetivo Hueso/Negro Mate/Dorado.
