FROM postgres
ENV POSTGRES_DB suppBuddyDB
ENV POSTGRES_USER suppBuddy
ENV POSTGRES_PASSWORD suppBuddyTesting
EXPOSE 5432

# Para ejecutar correr en esta carpeta:
# docker build -t "suppbuddydb:latest" .
# docker run -p 5432:5432 suppbuddydb

# Para hostearlo en la lan del equipo que levanta el contenedor, se sustituye
# [ipDelHost] con la ip en la red lan conectada. Para trabajo local no es necesario
# docker run -p {[ipDelHost]:}5432:5432 suppbuddydb
# EJ: docker run -p 192.168.1.25:5432:5432 suppbuddydb



# Aca va el dump de la bd
COPY tableCreation.sql /docker-entrypoint-initdb.d/

RUN /etc/init.d/postgresql restart