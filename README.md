# ShopPanel

Panel de usuario para una plataforma de pedidos de productos, desarrollado con React + Vite, TailwindCSS y DummyJSON.

## Funcionalidades

- Login con API externa (`/auth/login`).
- Persistencia de sesion en `localStorage`.
- Listado y busqueda de productos (`/products`, `/products/search`).
- Detalle de producto (`/products/{id}`).
- Seleccion de productos como pedidos.
- Cambio de estado de pedidos (`pendiente`, `reservado`, `cancelado`, `reagendado`).
- Consulta de pedidos con filtro por estado.

## Estructura

- `src/pages`
- `src/components`
- `src/services`
- `src/context`
- `src/utils`

## Ejecutar en local

```bash
npm install
npm run dev
```

App local: `http://localhost:5173`

## Credenciales de prueba

- Usuario: `dario.gonzalez` (Dario Gonzalez)
- Contrasena: `DarioGonzalez2026!`

Tambien puedes usar otras credenciales validas de DummyJSON como:
- `emilys` / `emilyspass`
- `michaelw` / `michaelwpass`

## Build

```bash
npm run build
```
