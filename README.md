# SuppBuddy (Obligatorio de bases de datos II)

## Prerrequisitos:
Es necesario tener previamente instalado
- Angular 14: https://angular.io/start
- NodeJS v16.17.0: https://nodejs.org/en/download
- Docker: https://www.docker.com/

## Como Ejecutar el proyecto:

Esta WebApp esta estructurada en 3 capas (Cliente - Servidor - Persistencia). Por lo que para poder ejecutar el proyecto es necesario ejecutar cada una de las capas.

Primero es necesario descargar el repositorio de github, para eso en una terminal ejecutar el siguiente comando:
- `git clone https://github.com/RafaFil/obligatorio_base_de_datos_II.git`

Vamos a la carpeta del proyecto con:
- `cd obligatorio_base_de_datos_II`

En la carpeta de origen abrimos tres terminales y realizamos:

### Ejecutar el cliente

- `cd frontend`
- `npm i`
- `ng serve -o`

### Ejecutar el servidor

- `cd api`
- `npm i`
- `node index.js`

### Ejecutar el contenedor con la base de datos

- `cd dockerBd`
- `docker build -t "suppbuddydb:latest" .`
- `docker run -p 5432:5432 --name "supp" -d suppbuddydb`

[Mas informacion](https://github.com/RafaFil/obligatorio_base_de_datos_II/tree/main/DockerBd)

Una vez que esten las tres capas ejecutandose, en un navegador(Preferible chrome) vamos al link:
- `http://localhost:4200/`

Realizado todos los pasos anteriores, la webapp se ejecutara sin problemas.

## Host link
- TBA
