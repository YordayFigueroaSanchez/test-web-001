# Instrucciones de Tests de Integración

## Propósito

Verificar que los componentes y servicios interactúan correctamente entre sí cuando se combinan en el contexto de la aplicación completa.

> **Nota**: Este es un sitio estático de marketing sin backend. Los tests de integración se enfocan en la interacción entre componentes frontend y servicios compartidos.

## Escenarios de Integración

### Escenario 1: Navegación Completa (Router + Layout + Pages)

**Descripción**: Verificar que la navegación entre páginas funciona correctamente con lazy loading.

**Componentes Involucrados**: AppComponent, HeaderComponent, Router, todas las páginas

**Pasos de Test**:
1. Renderizar AppComponent con rutas completas
2. Verificar que la página Home se carga por defecto
3. Hacer clic en cada enlace de navegación
4. Verificar que la página correcta se renderiza
5. Verificar que la URL cambia (HashLocationStrategy)
6. Verificar que el título SEO se actualiza en cada página

**Resultado Esperado**: Navegación fluida entre las 5 páginas con lazy loading, títulos SEO actualizados.

### Escenario 2: Tema Oscuro (ThemeService + ThemeToggle + Layout)

**Descripción**: Verificar que el cambio de tema se propaga a todos los componentes.

**Componentes Involucrados**: ThemeService, ThemeToggleComponent, HeaderComponent, todos los componentes con clases dark:

**Pasos de Test**:
1. Renderizar la aplicación
2. Verificar tema claro por defecto (o sistema)
3. Hacer clic en el toggle de tema
4. Verificar que `<html>` tiene la clase `dark`
5. Verificar que localStorage almacena la preferencia
6. Recargar la página y verificar persistencia

**Resultado Esperado**: El tema oscuro se aplica globalmente y persiste entre recargas.

### Escenario 3: Formulario de Contacto (ContactComponent + WhatsAppService + FormFieldComponent)

**Descripción**: Verificar el flujo completo del formulario de contacto con validación y WhatsApp.

**Componentes Involucrados**: ContactComponent, FormFieldComponent, ButtonComponent, WhatsAppService

**Pasos de Test**:
1. Navegar a la página Contact
2. Verificar que el formulario se renderiza con 3 campos
3. Intentar enviar formulario vacío → verificar que no envía
4. Llenar campos con datos inválidos → verificar errores de validación
5. Llenar campos con datos válidos → enviar
6. Verificar mensaje de éxito
7. Hacer clic en "Send another message" → formulario se resetea
8. Verificar botón de WhatsApp abre URL correcta

**Resultado Esperado**: Validación funcional, feedback de éxito, reset del formulario, WhatsApp URL correcta.

### Escenario 4: Galería con Lightbox (GalleryComponent + Keyboard Navigation)

**Descripción**: Verificar la galería con apertura de lightbox y navegación por teclado.

**Componentes Involucrados**: GalleryComponent (lightbox modal interno)

**Pasos de Test**:
1. Navegar a la página Gallery
2. Verificar que se renderizan 8 imágenes en grid
3. Hacer clic en una imagen → lightbox se abre
4. Verificar modal con imagen, contador, botones de navegación
5. Navegar con flechas izquierda/derecha → imagen cambia
6. Presionar Escape → lightbox se cierra
7. Verificar navegación circular (última → primera)

**Resultado Esperado**: Lightbox funcional con navegación por teclado y accesibilidad.

### Escenario 5: Scroll y Back-to-Top (ScrollService + BackToTopComponent + HeaderComponent)

**Descripción**: Verificar comportamiento del scroll, sombra del header y botón back-to-top.

**Componentes Involucrados**: ScrollService, HeaderComponent, BackToTopComponent

**Pasos de Test**:
1. Renderizar la aplicación
2. Verificar que back-to-top NO es visible al inicio
3. Simular scroll hacia abajo (> 300px)
4. Verificar que back-to-top aparece
5. Verificar que el header muestra sombra (isScrolled)
6. Hacer clic en back-to-top
7. Verificar que se hace scroll al top

**Resultado Esperado**: Back-to-top aparece/desaparece según scroll, header shadow reactivo.

### Escenario 6: Menú Móvil (HeaderComponent + MobileMenuDrawerComponent)

**Descripción**: Verificar la interacción del menú hamburguesa con el drawer móvil.

**Componentes Involucrados**: HeaderComponent, MobileMenuDrawerComponent

**Pasos de Test**:
1. Renderizar header en viewport móvil
2. Verificar que el botón hamburguesa es visible
3. Hacer clic en hamburguesa → drawer se abre
4. Verificar overlay de backdrop
5. Verificar que los enlaces de navegación están presentes
6. Hacer clic en un enlace → drawer se cierra + navegación
7. Abrir drawer, presionar Escape → se cierra

**Resultado Esperado**: Drawer abre/cierra correctamente, navegación funcional, Escape key funciona.

## Cómo Ejecutar Tests de Integración

### Opción A: Tests de Integración con Jest

Crear archivos de test en `src/app/__tests__/integration/`:

```bash
# Ejecutar tests de integración específicos
npx jest --testPathPattern="__tests__/integration"

# O incluirlos en la ejecución general
npm test
```

### Opción B: Tests E2E Manuales

Para escenarios que requieren browser real:

```bash
# Iniciar servidor de desarrollo
ng serve

# Ejecutar tests manualmente en el navegador:
# 1. Abrir http://localhost:4200/
# 2. Seguir los pasos de cada escenario
# 3. Verificar resultados esperados
```

## Notas

- Los tests de integración frontend se pueden implementar como tests Jest más amplios que renderizan componentes padres con sus hijos
- No se requiere mock de backend (sitio estático sin API)
- La única interacción externa es WhatsApp (URL scheme `wa.me`) que se puede verificar sin abrir la ventana
- Se recomienda implementar tests E2E con Playwright o Cypress en una fase futura
