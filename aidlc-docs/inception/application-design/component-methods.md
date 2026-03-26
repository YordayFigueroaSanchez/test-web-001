# Métodos de Componentes

> **Nota**: Este documento define firmas de métodos de alto nivel. Las reglas de negocio detalladas
> y la lógica de implementación se definirán en la etapa de **Diseño Funcional** (Fase de Construcción).

---

## Componentes de Layout

### HeaderComponent
| Método | Firma | Propósito |
|---|---|---|
| `toggleMobileMenu` | `(): void` | Alternar visibilidad del menú móvil |
| `isMenuOpen` | `Signal<boolean>` | Signal que indica si el menú móvil está abierto |

### FooterComponent
Sin métodos públicos — componente puramente presentacional.

### MobileMenuDrawerComponent
| Método | Firma | Propósito |
|---|---|---|
| `close` | `(): void` | Cerrar el drawer y emitir evento |
| `onKeydown` | `(event: KeyboardEvent): void` | Manejar tecla Escape y trampa de foco |
| `trapFocus` | `(): void` | Establecer trampa de foco dentro del drawer |

---

## Componentes de Página

### HomePageComponent
| Método | Firma | Propósito |
|---|---|---|
| `onScrollAnimation` | `(): void` | Activar animaciones de entrada basadas en scroll position |

### AboutPageComponent
Sin métodos públicos — componente puramente presentacional con datos estáticos.

### FeaturesPageComponent
| Método | Firma | Propósito |
|---|---|---|
| `onScrollAnimation` | `(): void` | Activar animaciones de entrada por scroll |

### GalleryPageComponent
| Método | Firma | Propósito |
|---|---|---|
| `openLightbox` | `(imageIndex: number): void` | Abrir modal lightbox con imagen seleccionada |
| `closeLightbox` | `(): void` | Cerrar modal lightbox |
| `navigateImage` | `(direction: 'prev' \| 'next'): void` | Navegar entre imágenes en lightbox |
| `selectedImageIndex` | `Signal<number>` | Índice de imagen actualmente seleccionada |

### ContactPageComponent
| Método | Firma | Propósito |
|---|---|---|
| `onSubmit` | `(): void` | Validar formulario y abrir chat de WhatsApp |
| `buildWhatsAppUrl` | `(): string` | Construir URL de WhatsApp con mensaje del formulario |
| `isFormValid` | `Signal<boolean>` | Signal que indica si el formulario es válido |
| `formErrors` | `Signal<Record<string, string>>` | Signal con errores de validación por campo |

---

## Componentes UI Reutilizables

### ButtonComponent
| Método | Firma | Propósito |
|---|---|---|
| `onClick` | `(event: MouseEvent): void` | Manejar clic y emitir evento si no está disabled |

### CardComponent
Sin métodos públicos — componente presentacional con content projection.

### ModalComponent
| Método | Firma | Propósito |
|---|---|---|
| `close` | `(): void` | Cerrar modal y emitir evento |
| `onKeydown` | `(event: KeyboardEvent): void` | Manejar Escape y trampa de foco |
| `onBackdropClick` | `(): void` | Cerrar al hacer clic en el backdrop |
| `trapFocus` | `(): void` | Establecer trampa de foco dentro del modal |

### FormFieldComponent
| Método | Firma | Propósito |
|---|---|---|
| `onInput` | `(event: Event): void` | Manejar cambio de valor y emitir |
| `validate` | `(): boolean` | Ejecutar validación del campo |
| `showError` | `Signal<boolean>` | Indicar si se debe mostrar error |

### AccordionComponent
| Método | Firma | Propósito |
|---|---|---|
| `toggle` | `(index: number): void` | Expandir/colapsar un panel |
| `onKeydown` | `(event: KeyboardEvent, index: number): void` | Navegación por teclado |
| `openPanels` | `Signal<Set<number>>` | Panels actualmente abiertos |

### TabsComponent
| Método | Firma | Propósito |
|---|---|---|
| `selectTab` | `(index: number): void` | Seleccionar pestaña activa |
| `onKeydown` | `(event: KeyboardEvent): void` | Navegación por flechas |
| `activeTab` | `Signal<number>` | Índice de pestaña activa |

### BadgeComponent
Sin métodos públicos — componente puramente presentacional.

### TooltipDirective
| Método | Firma | Propósito |
|---|---|---|
| `show` | `(): void` | Mostrar tooltip |
| `hide` | `(): void` | Ocultar tooltip |
| `onMouseEnter` | `(): void` | Host listener para mostrar |
| `onMouseLeave` | `(): void` | Host listener para ocultar |
| `onFocus` | `(): void` | Mostrar tooltip al recibir foco |
| `onBlur` | `(): void` | Ocultar tooltip al perder foco |

### SpinnerComponent
Sin métodos públicos — componente puramente presentacional.

### SectionDividerComponent
Sin métodos públicos — componente puramente presentacional.

---

## Componentes Compartidos

### ThemeToggleComponent
| Método | Firma | Propósito |
|---|---|---|
| `toggleTheme` | `(): void` | Alternar entre modo oscuro y claro via `ThemeService` |
| `currentTheme` | `Signal<'light' \| 'dark'>` | Tema actual (desde `ThemeService`) |

### LanguageSwitcherComponent
| Método | Firma | Propósito |
|---|---|---|
| `switchLanguage` | `(locale: 'es' \| 'en'): void` | Redirigir al build del idioma seleccionado |
| `currentLocale` | `Signal<'es' \| 'en'>` | Locale activo actual |

### SkipNavComponent
| Método | Firma | Propósito |
|---|---|---|
| `skipToContent` | `(): void` | Mover foco al elemento objetivo |

### BackToTopComponent
| Método | Firma | Propósito |
|---|---|---|
| `scrollToTop` | `(): void` | Scroll suave al top de la página |
| `isVisible` | `Signal<boolean>` | Visibilidad basada en scroll position |
