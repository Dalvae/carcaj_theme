# Carcaj Theme Development Environment

Este repositorio contiene el tema de WordPress para Carcaj, junto con todas las herramientas necesarias para el desarrollo local.

## Prerrequisitos

- [Node.js](https://nodejs.org/) (v16 o superior)
- [pnpm](https://pnpm.io/) (v8 o superior)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalación Rápida

1. Clonar el repositorio:

```bash
git clone https://github.com/Dalvae/carcaj_theme
cd carcaj_theme
```

2. Colocar el archivo de backup (.tar.gz) en la carpeta `backup/`

3. Instalar y configurar:

```bash
pnpm install
pnpm setup
pnpm dev
```

## Comandos Disponibles

- `pnpm install`: Instala las dependencias del proyecto
- `pnpm setup`: Configura el entorno completo (incluye docker-compose down -v y up -d)
- `pnpm dev`: Inicia el entorno de desarrollo con hot-reload
- `pnpm stop`: Detiene los contenedores Docker
- `pnpm build`: Compila los assets para producción
- `pnpm clean`: Limpia todo el entorno (Docker, archivos temporales y dependencias)

## Desarrollo

El entorno de desarrollo incluye:

- Hot-reload para PHP, CSS y JavaScript
- Compilación automática de SASS
- Autoprefixer para CSS
- Babel para JavaScript
- Sourcemaps para debugging
- Optimización de imágenes
- Minificación de CSS y JavaScript

### URLs Importantes

- WordPress: http://localhost:8888
- phpMyAdmin: http://localhost:8889

## Estructura del Proyecto

```
carcaj_theme/
├── backup/            # Colocar aquí el backup (.tar.gz)
├── css/              # Archivos SCSS/CSS
├── js/               # Archivos JavaScript
├── docker/           # Configuración de Docker
├── temp/             # Archivos temporales (generado automáticamente)
└── node_modules/     # Dependencias (generado automáticamente)
```

## Archivos Ignorados

```
node_modules/
/backup/*
!/backup/.gitkeep
/temp/
.env
*.tar.gz
```

## Notas Importantes

1. **Backup**: El archivo de backup debe estar en formato .tar.gz y contener:

   - Base de datos MySQL
   - Archivos de WordPress
   - wp-config.php

2. **Base de datos**: La configuración se actualiza automáticamente para el entorno local

3. **Desarrollo**: Los cambios en archivos CSS y JavaScript se recargan automáticamente

## Solución de Problemas

1. Si hay problemas con el entorno:

   ```bash
   pnpm clean
   pnpm install
   pnpm setup
   pnpm dev
   ```

2. Si Docker no inicia:

   - Verifica que Docker Desktop esté corriendo
   - Ejecuta `pnpm clean` y luego `pnpm setup`

3. Si los cambios no se recargan:
   - Verifica la consola del navegador
   - Reinicia el entorno: `pnpm stop` seguido de `pnpm setup` y `pnpm dev`
