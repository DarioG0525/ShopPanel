# ShopPanel - Documento Tecnico (Unidad II)

## 1. Analisis funcional del caso
ShopPanel resuelve la necesidad de un panel de usuario para consultar productos, seleccionar pedidos y gestionar su estado en un entorno SPA.

Modulos funcionales implementados:
- Inicio de sesion contra API externa (`/auth/login`).
- Consulta y busqueda de productos (`/products`, `/products/search`).
- Visualizacion de detalle de producto (`/products/{id}`).
- Seleccion de producto como pedido.
- Cambio de estado del pedido: `pendiente`, `reservado`, `cancelado`, `reagendado`.
- Consulta de pedidos seleccionados con filtro por estado.

Flujo del usuario:
1. El usuario inicia sesion en la vista Login.
2. Se valida en DummyJSON y se guarda sesion en `localStorage`.
3. Ingresa al panel principal y navega a productos.
4. Consulta listado, busca productos y revisa detalle.
5. Selecciona productos para generar pedidos.
6. En la vista Pedidos, cambia estado o filtra por estado.

## 2. Diseno arquitectonico y seleccion tecnica
Patron adoptado:
- Arquitectura modular por capas para front-end SPA.
- Separacion por responsabilidades: vistas, componentes reutilizables, servicios de API y estado global.

Estructura implementada:
- `src/pages`: vistas principales (`LoginPage`, `DashboardPage`, `ProductsPage`, `OrdersPage`).
- `src/components`: componentes UI reutilizables (`AppLayout`, `ProductCard`, `ProductDetailModal`, `OrderItem`, `StatusBadge`, `ProtectedRoute`).
- `src/services`: acceso a endpoints REST (`authService`, `productService`).
- `src/context`: manejo de estado compartido (`AuthContext`, `OrdersContext`).
- `src/utils`: persistencia y utilidades (`storage`).

Manejo de estado:
- Base con hooks (`useState`) y `Context API` para compartir autenticacion y pedidos entre pantallas.
- Justificacion: evita prop drilling y mantiene la solucion simple para el alcance de la actividad.

## 3. Implementacion tecnica
Endpoints y metodos HTTP usados:
- `POST https://dummyjson.com/auth/login`: autenticacion.
- `GET https://dummyjson.com/products`: listado de productos.
- `GET https://dummyjson.com/products/search?q=...`: busqueda.
- `GET https://dummyjson.com/products/{id}`: detalle de producto.

Flujo de datos:
1. El formulario de login envia credenciales al servicio de autenticacion.
2. El contexto de auth guarda usuario/token en estado global y `localStorage`.
3. La vista de productos consume API y renderiza cards con imagen, descripcion y precio.
4. La seleccion de producto crea un pedido en estado `pendiente`.
5. La vista de pedidos permite cambiar estado y persistirlo en `localStorage`.

Capturas sugeridas para anexar:
- Login funcional.
- Listado de productos con imagenes.
- Modal de detalle de producto.
- Confirmacion de seleccion de pedido.
- Vista de pedidos y cambio de estado.

## 4. Reflexion
Aprendizajes principales:
- Integracion de una API REST real en React usando `fetch`.
- Importancia de separar responsabilidades por carpetas y capas.
- Uso de `Context API` para estado compartido en una SPA.

Dificultades enfrentadas:
- Manejo de errores de red y feedback visual al usuario.
- Persistencia de sesion y pedidos en `localStorage`.

Decisiones tecnicas relevantes:
- Tailwind para acelerar UI con consistencia visual.
- Rutas protegidas para controlar acceso por autenticacion.
- Contextos separados para auth y pedidos para mantener claridad.

## 5. Evidencias digitales
- Repositorio GitHub: (agregar enlace cuando se publique).
- Proyecto funcional con React + Vite + Tailwind + DummyJSON.
- Credenciales de demostracion personalizadas: `dario.gonzalez` / `DarioGonzalez2026!`.

## Requisitos tecnicos verificados
- React + Vite.
- Consumo de API externa con `fetch`.
- Manejo de estado con `useState` + `Context API`.
- Persistencia minima mediante `localStorage`.
- Estructura modular (`components`, `pages`, `services`).
- Interfaz en Tailwind.
