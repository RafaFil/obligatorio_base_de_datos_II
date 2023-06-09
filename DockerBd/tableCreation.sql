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

CREATE FUNCTION check_request_active()
  RETURNS trigger AS
$func$
BEGIN
   IF (SELECT esta_activa FROM solicitudes_ayuda s WHERE s.id = NEW.solicitud_id) = false THEN
    RAISE EXCEPTION 'Esta solicitud esta inactiva.';
   END IF;
   RETURN NEW;
END
$func$  LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER solicitud_abierta BEFORE INSERT ON postulaciones
FOR EACH ROW EXECUTE PROCEDURE check_request_active();

CREATE FUNCTION check_has_skill()
  RETURNS trigger AS
$func$
DECLARE
cant_habilidades_utiles_user INTEGER;
cant_habilidades_solicitud INTEGER;

BEGIN
    SELECT COUNT(*) INTO cant_habilidades_utiles_user
    FROM habilidades_usuarios hu
	INNER JOIN habilidades_solicitudes hs ON hs.habilidad_id = hu.habilidad_id
    WHERE hs.solicitud_id = NEW.solicitud_id AND hu.user_ci = NEW.ayudante_ci AND hs.habilidad_id = hu.habilidad_id;
   
   
   SELECT COUNT(*) INTO cant_habilidades_solicitud
		FROM habilidades_solicitudes hs
		WHERE hs.solicitud_id = NEW.solicitud_id;

	IF cant_habilidades_solicitud > cant_habilidades_utiles_user
    	THEN
    	RAISE EXCEPTION 'El usuario no tiene la/s habilidad/es necesarias.';
    	END IF;
   RETURN NEW;
END
$func$  LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cumple_habilidades_necesarias BEFORE INSERT ON postulaciones
FOR EACH ROW EXECUTE PROCEDURE check_has_skill();

CREATE FUNCTION check_not_auto_apply()
  RETURNS trigger AS
$func$
BEGIN
   IF EXISTS (SELECT * FROM solicitudes_ayuda s 
   WHERE s.id = new.solicitud_id AND s.solicitante_ci = NEW.ayudante_ci)
   THEN
    RAISE EXCEPTION 'No se puede postular a su propia solicitud';
   END IF;
   RETURN NEW;
END
$func$  LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER auto_postularse_si_mismo BEFORE INSERT ON postulaciones
FOR EACH ROW EXECUTE PROCEDURE check_not_auto_apply();

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
	('55555555', 'Lionel', 'Messi', '$2b$10$F7FOmB8duokUVOwHwJ0dOuUdm33DkPIQTESPGwjof6kx6OxzerogW' , true, 'soy yo, el jugador numero 1'),
	('66666666', 'Pepe', 'Argento', '$2b$10$F7FOmB8duokUVOwHwJ0dOuUdm33DkPIQTESPGwjof6kx6OxzerogW' , true, 'Goleador máximo de las inferiores de Racing');

INSERT INTO habilidades(id, nombre)
	VALUES(DEFAULT, 'Carpintería'),
	(DEFAULT, 'Informática'),
	(DEFAULT, 'Sanitaria'),
	(DEFAULT, 'Derecho'),
	(DEFAULT, 'Deporte');

INSERT INTO habilidades_usuarios(user_ci, habilidad_id, nivel)
	VALUES('11111111', 1, 5),
	('22222222', 2, 5),
	('22222222', 4, 2),
	('33333333', 1, 1),
	('33333333', 4, 5),
	('33333333', 2, 2),
	('66666666', 5, 4),
	('66666666', 1, 3),
	('55555555', 5, 5);

INSERT INTO amistades(usuario1_ci, usuario2_ci)
	VALUES('11111111', '55555555'),
	('22222222', '33333333'),
	('22222222', '44444444'),
	('66666666', '11111111'),
	('33333333', '11111111');

INSERT INTO solicitudes_ayuda(id, latitud, longitud, solicitante_ci, esta_activa, fue_resuelta, fecha_publicacion, titulo, descripcion)
	VALUES(DEFAULT, -34.906553, -56.2024196, '11111111', true, false, '2023-06-15', 'No puedo poner canal 5', 'Mi hijo me dijo que es algo de achedemi, no se que es.'),
	(DEFAULT, -34.8912374, -56.1898434, '11111111', true, false, '2023-06-15', 'Ayuda no sé que dicta la ley 18331', 'Estoy en el palacio legislativo y estan agregándole un artículo nuevo a la ley y no entiendo nada...'),
	(DEFAULT, -34.9071837, -56.2049127, '44444444', true, false, '2023-06-16', 'No me sale la tesis', 'No entiendo las leyes de datos, algun ingeniero o abogado o similar?'),
	(DEFAULT, -34.8893193, -56.1599348, '22222222', true, false, '2023-06-16', 'Me dieron pollo crudo', 'Quiero demandar al restaurante después de haberme entregado semejante peligro para la salud'),
	(DEFAULT, -34.8930337, -56.1566015, '55555555', true, false, '2023-06-16', 'somos 9', 'falta uno pa fuvol 5 preferiblemente arquero'),
	(DEFAULT, -34.8885897, -56.1970776, '66666666', true, false, '2023-06-16', 'Coqui tapó el baño', 'Por favor ayuda de urgencia que se inunda la casa y quiero ver a Racing.'),
	(DEFAULT, -34.8887756, -56.1619971, '33333333', true, false, '2023-06-16', 'Ayuda con Cámara oscura', 'Tengo un prototipo de cámara oscura, quiero hacer la carcaza de madera.');
	
INSERT INTO habilidades_solicitudes(solicitud_id, habilidad_id, nivel) 
	VALUES(1, 2, 5),
	(2, 4, 5),
	(2, 2, 3),
	(3,2,3),
	(3,4,3),
	(4,4,5),
	(5,5,5),
	(6,3,5),
	(7,1,2);

INSERT INTO postulaciones(ayudante_ci, solicitud_id, fecha, fue_aceptada)
	VALUES('22222222', 1, '2023-06-16', true),
	('33333333', 2, '2023-06-16', false);
