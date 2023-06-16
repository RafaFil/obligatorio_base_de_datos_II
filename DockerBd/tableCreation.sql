--FOR TESTING PURPOSES--

-- CONFIGS --

ALTER SYSTEM SET listen_addresses = '*';
ALTER SYSTEM SET max_connections = 10;
ALTER SYSTEM SET port = 5432;

-- LOGGING --
ALTER SYSTEM SET log_destination = 'csvlog';
ALTER SYSTEM SET logging_collector = on;
ALTER SYSTEM SET log_directory = 'log';
ALTER SYSTEM SET log_filename = 'postgresql-%Y-%m-%d.log';
ALTER SYSTEM SET log_rotation_age = 1440 ;
ALTER SYSTEM SET log_statement_sample_rate = 1.0;
ALTER SYSTEM SET log_transaction_sample_rate = 0;
ALTER SYSTEM SET log_statement = 'mod';
ALTER SYSTEM SET log_connections = on;
ALTER SYSTEM SET log_disconnections = on;


-- DATABASE CREATION SCRIPT (NO DATA) --

CREATE TABLE  IF NOT EXISTS usuarios (
	ci VARCHAR(8) PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	hashpwd CHAR(60) NOT NULL,
	confirmada_identidad BOOLEAN NOT NULL,
	carta_presentacion VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS amistades (
	usuario1_ci VARCHAR(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	usuario2_ci VARCHAR(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	PRIMARY KEY(usuario1_ci, usuario2_ci),
	CHECK (usuario1_ci != usuario2_ci)
);

CREATE TABLE IF NOT EXISTS contactos_usuarios(
	user_ci VARCHAR(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	contacto VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS habilidades(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS habilidades_usuarios(
	user_ci VARCHAR(8) NOT NULL REFERENCES usuarios(ci) ON DELETE CASCADE,
	habilidad_id SERIAL NOT NULL REFERENCES habilidades(id) ON DELETE CASCADE,
	nivel SMALLINT NOT NULL CHECK (nivel < 6 AND nivel > 0),
	PRIMARY KEY(user_ci, habilidad_id)
);

CREATE TABLE IF NOT EXISTS solicitudes_ayuda(
	id SERIAL PRIMARY KEY,
	habilidad_requerida SERIAL REFERENCES habilidades(id),
	latitud FLOAT NOT NULL,
	longitud FLOAT NOT NULL,
	solicitante_ci VARCHAR(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	nivel_requerido SMALLINT CHECK (nivel_requerido < 6 AND nivel_requerido > 0),
	esta_activa BOOLEAN NOT NULL,
	fue_resuelta BOOLEAN NOT NULL,
	fecha_publicacion DATE NOT NULL,
	titulo VARCHAR(50) NOT NULL,
	descripcion VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS comentarios_solicitudes(
	usuario_id VARCHAR(8) REFERENCES usuarios(ci),
	solicitud_id SERIAL REFERENCES solicitudes_ayuda(id),
	texto_pregunta VARCHAR(255) NOT NULL,
	texto_respuesta VARCHAR(255),
	PRIMARY KEY (usuario_id, solicitud_id)
);

CREATE TABLE IF NOT EXISTS calificaciones(
	usuario_ci VARCHAR(8) PRIMARY KEY REFERENCES usuarios(ci),
	solicitud_id SERIAL NOT NULL UNIQUE REFERENCES solicitudes_ayuda(id),
	comentario VARCHAR(100),
	estrellas SMALLINT NOT NULL CHECK (estrellas > 0 AND estrellas < 6)
);

CREATE TABLE IF NOT EXISTS 	postulaciones(
	ayudante_ci VARCHAR(8) NOT NULL REFERENCES usuarios(ci) ON DELETE CASCADE,
	solicitud_id SERIAL NOT NULL REFERENCES solicitudes_ayuda(id) ON DELETE CASCADE,
	fecha DATE NOT NULL,
	fue_aceptada BOOLEAN NOT NULL,
	PRIMARY KEY (ayudante_ci, solicitud_id)
);

CREATE TABLE IF NOT EXISTS 	mensajes(
	usuario_emisor_ci VARCHAR(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	usuario_receptor_ci VARCHAR(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	texto VARCHAR(100) NOT NULL,
	fecha_hora_enviado TIMESTAMP NOT NULL
);


-- TRIGGERS --

CREATE FUNCTION check_not_friends()
  RETURNS trigger AS
$func$
BEGIN
   IF EXISTS (SELECT * FROM amistades a WHERE a.usuario2_ci = NEW.usuario1_ci AND a.usuario1_ci = NEW.usuario2_ci) THEN
    RAISE EXCEPTION 'Estas personas ya son amigas.';
   END IF;
   RETURN NEW;
END
$func$  LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER ya_son_amigos BEFORE INSERT ON amistades
FOR EACH ROW EXECUTE PROCEDURE check_not_friends();


-- CLIENT USER --

CREATE USER client WITH PASSWORD 'user'; 
GRANT SELECT, UPDATE, DELETE, INSERT ON ALL TABLES IN SCHEMA public to client;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public to client;
