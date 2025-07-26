# Red Social - Backend

Este repositorio contiene el desarrollo de una red social con una arquitectura de microservicios, utilizando Node.js para el backend, PostgreSQL como base de datos, y todo orquestado con Docker.

## Tecnologías Utilizadas

-   **Backend**: Node.js, Express.js
-   **Base de Datos**: PostgreSQL
-   **ORM**: Prisma
-   **Contenerización**: Docker, Docker Compose

## Requisitos Previos

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone <git@github.com:juanpernett1299/RedSocial.git>
    cd RedSocial
    ```

2.  **Construye y levanta los contenedores:**
    Desde la raíz del proyecto, ejecuta el siguiente comando. Esto construirá las imágenes de Docker para cada microservicio, descargará la imagen de PostgreSQL y los iniciará en segundo plano.
    ```bash
    docker compose up -d --build
    ```

3.  **Verifica que todos los servicios estén corriendo:**
    Puedes comprobar el estado de los contenedores con:
    ```bash
    docker compose ps
    ```
    Deberías ver los servicios `auth-service`, `posts-service`, `users-service` y `db` en estado `Up`.

4.  **Crea las tablas en la Base de Datos:**
    El siguiente comando ejecuta el esquema de Prisma contra la base de datos, creando las tablas `users`, `posts` y `likes`.
    ```bash
    docker compose exec users-service npx prisma db push
    ```

5.  **Puebla la base de datos con datos de prueba:**
    Este comando ejecuta el script de seeding para crear usuarios y publicaciones de ejemplo.
    ```bash
    docker compose exec users-service npx prisma db seed
    ```

## Uso

El entorno está completamente configurado. Para interactuar con los endpoints protegidos, primero necesitas obtener un token de autenticación.

1.  **Inicia sesión para obtener un token JWT:**
    Puedes usar las credenciales de los usuarios creados en el script de seeding (por ejemplo, `jane_doe` con contraseña `password123`).

    ```bash
    curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "jane_doe", "password": "password123"}' \
    http://localhost:3001/auth/login
    ```

    La respuesta será un objeto JSON con el token:
    ```json
    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
    ```

2.  **Usa el token para acceder a rutas protegidas:**
    Copia el token de la respuesta anterior y guárdalo en una variable de entorno. Luego, úsalo en la cabecera `Authorization` para hacer peticiones a los endpoints protegidos, como el de listar publicaciones.

    ```bash
    # Reemplaza "tu_token_aqui" con el token que recibiste
    TOKEN="tu_token_aqui"

    curl -H "Authorization: Bearer $TOKEN" http://localhost:3002/posts
    ```
    Esto devolverá la lista de publicaciones en la red social.
