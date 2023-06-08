FROM postgres
ENV POSTGRES_DB suppBuddyDB
ENV POSTGRES_USER suppBuddy
ENV POSTGRES_PASSWORD suppBuddyTesting
#EXPOSE 5432

# Aca va el dump de la bd
COPY tableCreation.sql /docker-entrypoint-initdb.d/