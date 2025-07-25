# Red Social

Este repositorio contiene el desarrollo de una red social con una arquitectura de microservicios, utilizando Node.js para el backend, PostgreSQL como base de datos, y todo orquestado con Docker.

## Tecnologías Utilizadas

-   **Backend**: Node.js, Express.js
-   **Base de Datos**: PostgreSQL
-   **ORM**: Prisma
-   **Contenerización**: Docker, Docker Compose

## Prerrequisitos

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## Instrucciones de Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
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

## ¡Proyecto Listo!

¡Eso es todo! El entorno está completamente configurado.

### Cómo Probarlo

Puedes probar el endpoint para obtener el perfil de un usuario ejecutando el siguiente comando en tu terminal:
```bash
curl http://localhost:3003/users/1
```
Deberías recibir un objeto JSON con la información del primer usuario creado en el script de seeding.
