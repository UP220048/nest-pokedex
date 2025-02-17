<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# Ejecutar en Desarrollo

1. Clonar el repositorio.
2. Ejecutar el siguiente comando:

    ```bash 
    yarn install
    ```
3. Tener Nest CLI instalado globalmente:

    ```bash
    npm i -g @nestjs/cli
    ```1

4. Levantar la base de datos con Docker:

    ```bash
    docker-compose up -d
    ```

5. Reconstruir la base de datos con la semilla:

    ```bash
    http://localhost:3000/api/v2/seed
    ```

6. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

7. Ejecutar la aplicacion en dev:
```bash
    yarn start:dev
    ```

8. Reconstruit la base de datos con la semilla

```bash
    http://localhost:3000/api/v2/seed
    ```


## Stack usado
*MongoDB
*Nest