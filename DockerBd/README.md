# Contenedor Docker de la Base de Datos

### Requisitos:
- Docker instalado
- Docker en ejecución
- Docker en el PATH del host

Para levantar el contenedor ejecutar en consola parada en esta carpeta:
> docker build -t "suppbuddydb:latest" .    

> docker run -p 5432:5432 --name "supp" -d suppbuddydb

Para hostearlo en la lan del equipo que levanta el contenedor:
> docker run -p {ipDelHost}:5432:5432 --name "supp" -d suppbuddydb     

Se sustituye {ipDelHost} con la ip en la red LAN conectada. Para trabajo local no es necesario
> EJ: docker run -p 10.13.233.80:5432:5432 --name "supp" -d  suppbuddydb

Para traer el log del container al host:
> docker cp supp:/var/lib/postgresql/data/log/postgresql-{fecha_del_log}.csv {ruta_destino_en_host}   

La Fecha del log es de formato = YYYY-MM-DD   
La ruta_destino_en_host es relativa a donde este ejecutando la consola