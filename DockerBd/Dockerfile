FROM postgres
ENV POSTGRES_DB suppBuddyDB
ENV POSTGRES_USER suppBuddy
ENV POSTGRES_PASSWORD suppBuddyTesting
EXPOSE 5432

# Para levantar el contenedor ejecutar en consola parada en esta carpeta:
# docker build -t "suppbuddydb:latest" .
# docker run -p 5432:5432 --name "supp" -d suppbuddydb

# Para hostearlo en la lan del equipo que levanta el contenedor:
# docker run -p {ipDelHost}:5432:5432 --name "supp" -d suppbuddydb
# Se sustituye {ipDelHost} con la ip en la red lan conectada. Para trabajo local no es necesario
# EJ: docker run -p 10.13.233.80:5432:5432 --name "supp" -d  suppbuddydb

# Para traer el log del container al host:
# docker cp supp:/var/lib/postgresql/data/log/postgresql-{fecha_del_log}.csv {ruta_destino_en_host}
# La Fecha del log es de formato = YYYY-MM-DD
# La ruta_destino_en_host es relativa a donde este ejecutando la consola

# Aca va el dump/script_creacion de la bd
COPY tableCreation.sql /docker-entrypoint-initdb.d/

RUN /etc/init.d/postgresql restart