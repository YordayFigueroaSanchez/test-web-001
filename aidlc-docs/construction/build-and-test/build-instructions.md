# Instrucciones de Build

## Prerrequisitos

| Requisito | Versión | Verificación |
|-----------|---------|-------------|
| Node.js | 20+ | `node --version` |
| npm | 10+ | `npm --version` |
| Angular CLI | 19.2+ | `npx ng version` |
| Git | 2.x | `git --version` |

### Requisitos del Sistema
- **SO**: Windows 10+, macOS 12+, Ubuntu 20.04+
- **Memoria**: Mínimo 4 GB RAM (recomendado 8 GB)
- **Disco**: Mínimo 1 GB libre
- **Red**: Necesaria para instalación de dependencias

## Pasos de Build

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd test-web-001
```

### 2. Instalar Dependencias

```bash
npm install
```

> **Nota**: Si hay conflictos de dependencias con `@testing-library/angular`, usar:
> ```bash
> npm install --legacy-peer-deps
> ```

### 3. Verificar Instalación

```bash
npx ng version
```

Debe mostrar Angular CLI 19.2.x y todas las dependencias resueltas.

### 4. Build de Desarrollo

```bash
ng serve
```

- Abre `http://localhost:4200/`
- Hot-reload habilitado
- Source maps habilitados
- Sin optimizaciones de producción

### 5. Build de Producción (Locale Único — ES)

```bash
ng build
```

- Output: `dist/test-web-001/browser/`
- Optimizaciones: tree-shaking, minificación, bundling
- Source maps: deshabilitados
- Hashing de archivos: habilitado

### 6. Build de Producción con Localización (ES + EN)

```bash
npm run build:es
```

Equivalente a:
```bash
ng build --configuration production --localize
```

- Output ES: `dist/test-web-001/browser/es/`
- Output EN: `dist/test-web-001/browser/en/`

### 7. Verificar Build Exitoso

#### Indicadores de Éxito
- Mensaje: "Build at: [timestamp] - Hash: [hash] - Time: [Xs]"
- Sin errores de compilación
- Advertencias de presupuesto dentro de límites:
  - **Initial bundle**: Warning ≤ 180KB, Error ≤ 200KB
  - **Component styles**: Warning ≤ 4KB, Error ≤ 8KB

#### Artefactos Generados
```text
dist/test-web-001/browser/
├── es/                    # Locale español (si --localize)
│   ├── index.html
│   ├── main-[hash].js
│   ├── polyfills-[hash].js
│   ├── styles-[hash].css
│   └── chunk-[hash].js   # Lazy-loaded pages
├── en/                    # Locale inglés (si --localize)
│   └── ...
├── 3rdpartylicenses.txt
└── assets/
    └── fonts/
```

## Troubleshooting

### Error: Conflicto de Dependencias (npm ERESOLVE)
- **Causa**: Incompatibilidad de peerDependencies entre @testing-library/angular y @angular/animations
- **Solución**:
  ```bash
  npm install --legacy-peer-deps
  ```

### Error: Presupuesto Excedido (Budget Error)
- **Causa**: Bundle inicial supera 200KB
- **Solución**:
  1. Verificar que todas las páginas usan lazy loading (`loadComponent`)
  2. Revisar imports innecesarios en componentes
  3. Confirmar que no se importan módulos completos
  4. Ejecutar `npx ng build --stats-json` para analizar con webpack-bundle-analyzer

### Error: SCSS Compilation
- **Causa**: Variable SCSS no encontrada o import incorrecto
- **Solución**:
  1. Verificar que `src/styles/` contiene `_variables.scss`, `_typography.scss`, `_animations.scss`
  2. Verificar imports en `src/styles.scss`

### Error: Fuentes No Encontradas
- **Causa**: Archivos WOFF2 no presentes en `src/assets/fonts/`
- **Solución**: Agregar archivos de fuente WOFF2 según indicaciones en `src/assets/fonts/README.md`

### Warning: Angular Localize Not Found
- **Causa**: `@angular/localize` no instalado o no inicializado
- **Solución**:
  ```bash
  npx ng add @angular/localize
  ```
