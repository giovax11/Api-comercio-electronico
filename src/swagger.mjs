export const swaggerConfig = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API de Gestión de Productos y Órdenes de Compra",
      description:
        "La API de Gestión de Productos y Órdenes de Compra es un servicio que permite gestionar los productos ofrecidos en una plataforma de comercio electrónico, así como también administrar las órdenes de compra realizadas por los usuarios. Tambien cuenta con un servicio de autenticación de usuarios de permite que solo los usuarios logueados permitan realizar peticiones a la API.",
      version: "1.0.0",
    },
    host: process.env.URL,
    base: "/api",
    schemes: ["https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    showCommonExtension: true,
    servers: [
      {
        url: process.env.URL,
      },
    ],
    paths: {
      "/api/auth/register ": {
        post: {
          tag: "Autenticación",
          tags: ["Autenticación"],
          summary: "Registra un nuevo usuario",
          description: "Registra un nuevo usuario en el sistema",
          consumes: ["application/json"],
          requestBody: {
            description: "Información del usuario a registrar",
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Se debe proporcionar un email válido",
                      example: "user@example.com",
                    },
                    password: {
                      type: "string",
                      minLength: 8,
                      description:
                        "La contraseña debe tener al menos 8 caracteres, contener una mayuscula y un caracter especial",
                      example: "Hola123.",
                    },
                  },
                  required: ["email", "password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuario registrado con éxito",
            },
            400: {
              description: "Contraseña o correo electrónico no válidos",
            },
          },
        },
      },
      "/api/auth/login": {
        post: {
          summary: "Inicia sesión de usuario",
          tags: ["Autenticación"],
          description: "Inicia sesión de usuario en el sistema",
          consumes: ["application/json"],
          requestBody: {
            name: "credentials",
            description: "Credenciales de usuario",
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description:
                        "El usuario debe estar registrado previamente en el sistema",
                      example: "user@example.com",
                    },
                    password: {
                      type: "string",
                      minLength: 8,
                      description:
                        "La contraseña debe tener al menos 8 caracteres, contener una mayuscula, un numero y un caracter especial",
                      example: "Hola123.",
                    },
                  },
                  required: ["email", "password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Sesión iniciada con éxito",
            },
            401: {
              description: "Credenciales incorrectas",
            },
          },
        },
      },
      "/api/products/": {
        get: {
          tags: ["Productos"],
          summary: "Obtiene productos ",
          description: "Obtiene productos registrados en el sistema",
          consumes: ["application/json"],
          parameters: [
            {
              in: "query",
              name: "page",
              description: "Número de página a recuperar.",
              required: false,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
              },
            },
            {
              in: "query",
              name: "pageSize",
              description: "Tamaño de la página.",
              required: false,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
                maximum: 100,
              },
            },
          ],
          responses: {
            200: {
              description: "Lista de productos recuperada con éxito",
            },
            401: {
              description: "Error de autenticación",
            },
            500: {
              description:
                "Ocurrio un error al intentar recuperar los productos",
            },
          },
        },
      },
      "/api/products": {
        post: {
          tags: ["Productos"],
          summary: "Registra un nuevo producto",
          description: "Registra un nuevo producto en el sistema",
          consumes: ["application/json"],
          requestBody: {
            name: "product",
            description: "Nuevo producto",
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "float" },
                description: { type: "string" },
                stock: { type: "int" },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      minLength: 1,
                      maxLength: 100,
                      description:
                        "El nombre no debe estar vacío y debe tener menos de 100 caracteres",
                      example: "Producto",
                    },
                    price: {
                      type: "number",
                      minimum: 0.01,
                      description: "El precio debe ser mayor a 0",
                      example: 10.99,
                    },
                    description: {
                      type: "string",
                      maxLength: 250,
                      description:
                        "La descripcion no de ser mayor a 250 caracteres",
                      example: "Este es un producto",
                    },
                    stock: {
                      type: "number",
                      minimum: 0,
                      description: "La cantidad debe ser un número positivo",
                      example: 600,
                    },
                  },
                  required: ["name", "price", "description", "stock"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Producto creado con éxito",
            },
            500: {
              description: "Ocurrio un erro al intentar insertar el producto",
            },
            400: {
              description: "Los datos ingresados son inválidos",
            },
            401: {
              description: "Error de autenticación",
            },
          },
        },
      },
      "/api/products/{id_product}/": {
        delete: {
          tags: ["Productos"],
          summary: "Elimina un producto",
          description: "Elimina un producto registrado en el sistema",
          consumes: ["application/json"],
          parameters: [
            {
              in: "path",
              name: "id_product",
              description: "Id del producto a eliminar.",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
                example: 1,
                description:
                  "El id suministrado debe pertenecer a un prodcuto que se encuentre resgistrado en el sistema",
              },
            },
          ],
          responses: {
            200: {
              description: "Producto eliminado con éxito",
            },
            500: {
              description: "Ocurrio un erro al intentar eliminar el producto",
            },
            400: {
              description: "Los datos ingresados son inválidos",
            },
            401: {
              description: "Error de autenticación",
            },
          },
        },
      },
      "/api/products/{id_product}": {
        put: {
          tags: ["Productos"],
          summary: "Actualizar un producto",
          description: "Actualiza un producto registrado en el sistema",
          consumes: ["application/json"],
          parameters: [
            {
              in: "path",
              name: "id_product",
              description: "Id del producto a actualizar.",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
                example: 1,
                description:
                  "El id suministrado debe pertenecer a un prodcuto que se encuentre resgistrado en el sistema",
              },
            },
          ],
          requestBody: {
            name: "product",
            description: "Producto actualizado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      minLength: 1,
                      maxLength: 100,
                      description:
                        "El nombre no debe estar vacío y debe tener menos de 100 caracteres",
                      example: "Producto actualizado",
                    },
                    price: {
                      type: "number",
                      minimum: 0.01,
                      description: "El precio debe ser mayor a 0",
                      example: 10.99,
                    },
                    description: {
                      type: "string",
                      maxLength: 250,
                      description:
                        "La descripcion no de ser mayor a 250 caracteres",
                      example: "Este es un producto actualizado",
                    },
                    stock: {
                      type: "number",
                      minimum: 0,
                      description: "La cantidad debe ser un número positivo",
                      example: 10,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Producto actualizado con éxito",
            },
            500: {
              description:
                "Ocurrio un error al intentar actualizar el producto",
            },
            400: {
              description: "Los datos ingresados son inválidos",
            },
            401: {
              description: "Error de autenticación",
            },
          },
        },
      },
      "/api/orders": {
        get: {
          tags: ["Pedidos"],
          summary: "Obtener pedidos ",
          description:
            "Obtiene los pedidos del usuario que se encuentra logueado",
          consumes: ["application/json"],
          parameters: [
            {
              in: "query",
              name: "page",
              description: "Número de página a recuperar.",
              required: false,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
              },
            },
            {
              in: "query",
              name: "pageSize",
              description: "Tamaño de la página.",
              required: false,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
                maximum: 100,
              },
            },
          ],
          responses: {
            200: {
              description: "Lista de pedidos recuperada con éxito",
            },
            500: {
              description: "Ocurrio un error al intentar recuperar los pedidos",
            },
            401: {
              description: "Error de autenticación",
            },
          },
        },
      },
      "/api/orders/": {
        post: {
          tags: ["Pedidos"],
          summary: "Crear una orden",
          description: "Crea una orden para el usuario logueado",
          consumes: ["application/json"],
          requestBody: {
            name: "Pedido",
            description: "Nuevo pedido",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      minLength: 1,
                      maxLength: 100,
                      description:
                        "El pedido debe tener ser uno de los siguientes 3 estados: PENDING, COMPLETED, CANCELED",
                      example: "PENDING",
                    },
                    products: {
                      type: "array",
                      required: true,
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer",
                            format: "int32",
                            description:
                              "Debe ser un id de producto que este registrado en el sistema",
                            example: 1,
                          },
                          quantity: {
                            type: "integer",
                            format: "int32",
                            description:
                              "Cantidad de productos debe ser mayor a 0",
                            minimum: 1,
                            example: 10,
                          },
                        },
                        required: ["quantity,id"],
                      },
                    },
                  },
                  required: ["status", "products"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Producto actualizado con éxito",
            },
            500: {
              description:
                "Ocurrio un error al intentar actualizar el producto",
            },
            400: {
              description:
                "Los datos ingresados son inválidos o no hay suficiente inventario para la cantidad solicitada de productos",
            },
            401: {
              description: "Error de autenticación",
            },
          },
        },
      },
      "/api/orders/{id_order}": {
        put: {
          tags: ["Pedidos"],
          summary: "Actualizar una orden",
          description: "Actualiza una orden del usuario logueado",
          consumes: ["application/json"],
          parameters: [
            {
              in: "path",
              name: "id_order",
              description: "Id del pedido a actualizar.",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
                example: 1,
                description:
                  "El id suministrado debe pertenecer a una orden del usuario que esta logueado en el sistema",
              },
            },
          ],
          requestBody: {
            name: "Pedido",
            description: "Pedido a actualizar",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      minLength: 1,
                      maxLength: 100,
                      description:
                        "El pedido debe tener ser uno de los siguientes 3 estados: PENDING, COMPLETED, CANCELED",
                      example: "COMPLETED",
                    },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer",
                            format: "int32",
                            description: "id del producto que esta en la orden",
                            example: 1,
                          },
                          quantity: {
                            type: "integer",
                            format: "int32",
                            description: "Cantidad de productos actualizada",
                            example: 10,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Pedido actualizado con éxito",
            },
            500: {
              description: "Ocurrio un error al intentar actualizar el Pedido",
            },
            400: {
              description:
                "Los datos ingresados son inválidos o no hay suficiente inventario para la cantidad solicitada de productos",
            },
            401: {
              description: "Error de autenticación",
            },
          },
        },
      },
      "/api/orders/{id_order}/": {
        delete: {
          tags: ["Pedidos"],
          summary: "Eliminar un pedido",
          description: "Elimina un pedido del usuario logueado",
          consumes: ["application/json"],
          parameters: [
            {
              in: "path",
              name: "id_order",
              description: "Id del pedido a eliminar",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                minimum: 1,
                example: 1,
                description:
                  "El id suministrado debe pertenecer a una orden del usuario que esta logueado en el sistema",
              },
            },
          ],
          responses: {
            200: {
              description: "Producto eliminado con éxito",
            },
            500: {
              description: "Ocurrio un error al intentar eliminar el producto",
            },
            400: {
              description:
                "Los datos ingresados son inválidos, el ID suminstrado no pertenece a una orden del usuario",
            },
            401: {
              description: "Error de autenticación",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Autenticación",
        description: "Endpoints relacionados con la autenticación de usuarios",
      },
      {
        name: "Productos",
        description: "Endpoints relacionados con la gestión de productos",
      },
      {
        name: "Pedidos",
        description: "Endpoints relacionados con la gestión de ordenes",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
