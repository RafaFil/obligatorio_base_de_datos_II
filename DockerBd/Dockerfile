FROM postgres
ENV POSTGRES_DB suppBuddyDB
ENV POSTGRES_USER suppBuddy
ENV POSTGRES_PASSWORD suppBuddyTesting
EXPOSE 5432

#Para ejecutar correr en esta carpeta:
# docker build -t "suppbuddydb:latest" .
# docker run -p 5432:5432 suppbuddydb

# Aca va el dump de la bd
COPY tableCreation.sql /docker-entrypoint-initdb.d/