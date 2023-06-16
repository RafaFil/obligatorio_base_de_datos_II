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
	latitud FLOAT NOT NULL,
	longitud FLOAT NOT NULL,
	solicitante_ci VARCHAR(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	esta_activa BOOLEAN NOT NULL,
	fue_resuelta BOOLEAN NOT NULL,
	fecha_publicacion DATE NOT NULL,
	titulo VARCHAR(50) NOT NULL,
	descripcion VARCHAR(150)
);
CREATE INDEX IF NOT EXISTS solicitantes ON solicitudes_ayuda (solicitante_ci);

CREATE TABLE IF NOT EXISTS habilidades_solicitudes(
	solicitud_id SERIAL NOT NULL REFERENCES solicitudes_ayuda(id) ON DELETE CASCADE,
	habilidad_id SERIAL NOT NULL REFERENCES habilidades(id) ON DELETE CASCADE,
	nivel SMALLINT NOT NULL CHECK (nivel < 6 AND nivel > 0),
	PRIMARY KEY(solicitud_id, habilidad_id)
);

CREATE TABLE IF NOT EXISTS comentarios_solicitudes(
	usuario_id VARCHAR(8) REFERENCES usuarios(ci),
	solicitud_id SERIAL REFERENCES solicitudes_ayuda(id),
	texto_pregunta VARCHAR(255) NOT NULL,
	texto_respuesta VARCHAR(255),
	PRIMARY KEY (usuario_id, solicitud_id)
);

CREATE TABLE IF NOT EXISTS calificaciones(
	usuario_ci VARCHAR(8) REFERENCES usuarios(ci),
	solicitud_id SERIAL NOT NULL UNIQUE REFERENCES solicitudes_ayuda(id),
	comentario VARCHAR(100),
	estrellas SMALLINT NOT NULL CHECK (estrellas > 0 AND estrellas < 6),
	PRIMARY KEY(usuario_ci, solicitud_id)
);


CREATE TABLE IF NOT EXISTS 	postulaciones(
	ayudante_ci VARCHAR(8) NOT NULL REFERENCES usuarios(ci) ON DELETE CASCADE,
	solicitud_id SERIAL NOT NULL REFERENCES solicitudes_ayuda(id) ON DELETE CASCADE,
	fecha DATE NOT NULL,
	fue_aceptada BOOLEAN NOT NULL,
	PRIMARY KEY (ayudante_ci, solicitud_id)
);

CREATE VIEW solicitante_solicitud_ayudante AS
	SELECT p.ayudante_ci AS helperId, p.solicitud_id AS requestId, s.solicitante_ci AS solicitantId
    FROM postulaciones p INNER JOIN solicitudes_ayuda s on p.solicitud_id = s.id ;

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


-- MOCK DATA FOR TESTING --
--todos tienen la password 'admin'--
INSERT INTO usuarios(ci,nombre,apellido,hashpwd, confirmada_identidad, carta_presentacion)
 VALUES('11111111', 'John', 'Doe', '$2b$10$F7FOmB8duokUVOwHwJ0dOuUdm33DkPIQTESPGwjof6kx6OxzerogW' , true, 'soy el primer sujeto de prueba, necesito ayuda seguido.'),
 ('22222222', 'Jane', 'Doe','$2b$10$F7FOmB8duokUVOwHwJ0dOuUdm33DkPIQTESPGwjof6kx6OxzerogW' , true, 'soy el segundo sujeto de prueba, doy ayuda seguido.'),
 ('33333333', 'Jorge', 'Doe', '$2b$10$F7FOmB8duokUVOwHwJ0dOuUdm33DkPIQTESPGwjof6kx6OxzerogW' , true, 'soy el tercer sujeto de prueba, necesito y doy ayuda seguido.'),
 ('44444444', 'Isabel', 'Doe', '$2b$10$F7FOmB8duokUVOwHwJ0dOuUdm33DkPIQTESPGwjof6kx6OxzerogW' , true, 'como descargo whatsapp'),
 ('55555555', 'Lionel', 'Messi', '$2b$10$F7FOmB8duokUVOwHwJ0dOuUdm33DkPIQTESPGwjof6kx6OxzerogW' , true, 'soy yo, el jugador numero 1');