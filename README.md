# API de comercio electrónico

Este proyecto es una API para una plataforma de comercio electrónico. Proporciona endpoints para el registro y autenticación de usuario, gestión de productos y pedidos. La API está construida con Node.js, express y Prisma ORM, garantizando interacciones robustas y eficientes con la base de datos. El proyecto tiene como objetivo proporcionar un backend escalable y seguro para aplicaciones de comercio electrónico.

## Decisiones de Diseño

**Integridad de los datos**
Para mantener la integridad de los datos en aquellas operaciones que intervienen múltiples modelos, se implementaron transacciones. Las transacciones aseguran que todas las operaciones dentro de un contexto transaccional se completen correctamente o ninguna de ellas se aplique, lo que previene inconsistencias en la base de datos.

**Servicios de Aplicación**:
Se optó por utilizar servicios para encapsular la lógica de negocio de la aplicación, con el objetivo de mejorar la escalabilidad y facilitar la adición de funcionalidades mediante la inyección de dependencias.

**Patrón de Repositorio:**

Se implementó el patrón de repositorio para manejar la lógica de acceso a datos, separando esta lógica del resto de la aplicación. Esto facilita su reutilización en otros componentes y mejora la mantenibilidad de la aplicación.

**Estrategias de Manejo de Errores**:

Se implementó un middleware de manejo de errores global con el objetivo de capturar y gestionar cualquier excepción que ocurra, asegurando que la aplicación responda con códigos de estado HTTP apropiados y mensajes descriptivos cuando se presenta un problema.

**Documentación Swagger:**

Se utilizó Swagger para documentar la API de manera detallada e interactiva. Esto con el objetivo de facilitar a los desarrolladores externos la exploración y prueba de los endpoints disponibles.

## Installation

1- Clonar el repositorio

```bash
git clone https://github.com/giovax11/Api-comercio-electronico.git

```

2- Instalar las dependencias del proyecto con npm install dentro del directorio del proyecto

```bash
cd my-project
npm install my-project

```

3- Configurar las variables de entorno tomando de referencia el archivo .env.example

```env
#PORTS

PORT=

#key
JWT_PRIVATE_KEY=

#Database config
DATABASE_URL="postgresql://postgres:admin@localhost:5432/mydb?schema=public"

#Token expiration
TOKEN_EXPIRATION=

```

4- Correr las migraciones de prisma y generar el cliente una vez se haya configurado el acceso a la bd

```env
npx prisma init
npx prisma migrate dev --name init
npx prisma generate

```

5- Ejecutar el proyecto

```env
npm run start o npm run start:dev

```

## Features

- Gestión de Usuarios: Registro y autenticación.
- Gestión de Productos: Operaciones CRUD para productos.
- Gestión de Pedidos: Gestión de Pedidos: Crear, actualizar y eliminar pedidos. Gestionar estados de pedidos y calcular costos totales de las ordenes.
- Manejo de Errores: Manejo y registro de errores.

## Tech Stack

- Node.js: Entorno de ejecución de JavaScript para construir aplicaciones del lado del servidor.
- Express.js: Framework web para Node.js para construir APIs RESTful.
- Prisma: ORM para la gestión e interacción con bases de datos.
- PostgreSQL: Base de datos relacional para almacenamiento de datos.
- JWT: JSON Web Tokens para autenticación de usuarios.
- Swagger: Herramienta para documentar la API. Permite generar y visualizar la documentación interactiva de la API.
- Express Validator: Middleware para validar y sanitizar datos en las rutas de Express.
- bcrypt: Biblioteca para el hash seguro de contraseñas.

## Documentation

Para obtener detalles completos sobre cómo utilizar la API, consulta nuestra documentación interactiva en línea. Allí encontrarás información sobre los endpoints disponibles, los parámetros requeridos y ejemplos de solicitudes y respuestas.

[Documentation](http://localhost:8080/api-doc/)

## API Reference

#### Create user

```http
  POST /api/auth/register
```

| Parameter  | Type     | Description                                                         |
| :--------- | :------- | :------------------------------------------------------------------ |
| `body`     | `object` | **requerido**.                                                      |
| `email`    | `string` | **requerido**.                                                      |
| `password` | `string` | **requerido**. **Minimo una mayuscula, caracter especial y numero** |

#### login

```http
  POST /api/auth/login
```

| Parameter  | Type     | Description                                                         |
| :--------- | :------- | :------------------------------------------------------------------ |
| `email`    | `string` | **requerido**.                                                      |
| `password` | `string` | **requerido**. **Minimo una mayuscula, caracter especial y numero** |

#### Create product

```http
  POST /api/products/
```

| Parameter     | Type     | Description                                                             |
| :------------ | :------- | :---------------------------------------------------------------------- |
| `body`        | `object` | **requerido**.                                                          |
| `name`        | `string` | **requerido**, **unique**. Debe ser mayor a 0 y menor a 100 caracteres, |
| `price`       | `string` | **requerido**. mayor o igual a 0                                        |
| `description` | `string` | **requerido**, menor a 250 caracteres                                   |
| `stock`       | `string` | **requerido**. Mayor o igual a 0                                        |

#### Get product

```http
  GET /api/products/?page=?pageSize=?
```

| Parameter  | Type  | Description   |
| :--------- | :---- | :------------ |
| `query`    | `int` | **opcional**. |
| `page`     | `int` | **opcional**  |
| `pageSize` | `int` | **opcional**  |

#### Update product

```http
  PUT /api/products/id_product
```

| Parameter     | Type     | Description                                                             |
| :------------ | :------- | :---------------------------------------------------------------------- |
| `id_product`  | `int`    | **requerido**. El producto debe existir                                 |
| `body`        | `object` | **requerido**.                                                          |
| `name`        | `string` | **requerido**, **unique**. Debe ser mayor a 0 y menor a 100 caracteres, |
| `price`       | `string` | **requerido**                                                           |
| `description` | `string` | **requerido**, menor a 250 caracteres                                   |
| `stock`       | `string` | **requerido, Mayor o igual a 0**                                        |

#### Delete product

```http
  Delete /api/products/id_product
```

| Parameter    | Type  | Description   |
| :----------- | :---- | :------------ |
| `id_product` | `int` | **requerido** |

#### Get Order

```http
  GET /api/orders/?page=?pageSize=?
```

| Parameter  | Type  | Description   |
| :--------- | :---- | :------------ |
| `query`    | `int` | **opcional**. |
| `page`     | `int` | **opcional**  |
| `pageSize` | `int` | **opcional**  |

#### Create Order

```http
  POST /api/orders/
```

| Parameter  | Type     | Description                                                                                    |
| :--------- | :------- | :--------------------------------------------------------------------------------------------- |
| `body`     | `object` | **requerido**.                                                                                 |
| `status`   | `string` | **requerido**. Debe se igual uno de los siguientes estados: PENDING, COMPLETED, CANCELED       |
| `products` | `array`  | **requerido**                                                                                  |
| `id`       | `int`    | **requerido**, representa el id del producto a ordenar, debe de estar registrado en el sistema |
| `quantity` | `int`    | **requerido**, debe se mayor a 0                                                               |

#### Update Order

```http
  PUT /api/orders/id_order
```

| Parameter  | Type     | Description                                                                                   |
| :--------- | :------- | :-------------------------------------------------------------------------------------------- |
| `id_order` | `int`    | **requerido**. representa el id de la orden a actualizar                                      |
| `body`     | `object` | **requerido**.                                                                                |
| `status`   | `string` | **opcional**. Debe se igual uno de los siguientes estados: PENDING, COMPLETED, CANCELED       |
| `products` | `array`  | **opcional**                                                                                  |
| `id`       | `int`    | **opcional**, representa el id del producto a ordenar, debe de estar registrado en el sistema |
| `quantity` | `int`    | **opcional**, debe se mayor a 0                                                               |

## Running Tests

Ejecutar el siguiente comando para correr los test de la aplicación.

```bash
  npm run test
```
