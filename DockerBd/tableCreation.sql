--FOR TESTING PURPOSES--
-- DATABASE CREATION SCRIPT (EMPTY) --

CREATE USER client WITH PASSWORD 'user'; 

CREATE TABLE  IF NOT EXISTS usuarios (
	ci VARCHAR(8) PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	hashpwd VARCHAR(255) NOT NULL,
	dispuesto_ayudar BOOLEAN NOT NULL,
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
	user_ci VARCHAR(8) PRIMARY KEY REFERENCES usuarios(ci) ON DELETE CASCADE,
	contacto VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS habilidades(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS habilidades_usuarios(
	user_ci VARCHAR(8) PRIMARY KEY REFERENCES usuarios(ci) ON DELETE CASCADE,
	habilidad_id SERIAL NOT NULL,
	nivel SMALLINT NOT NULL CHECK (nivel < 6 AND nivel > 0)
);

CREATE TABLE IF NOT EXISTS ubicaciones(
id SERIAL PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
latitud FLOAT NOT NULL,
longitud FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS solicitudes_ayuda(
	id SERIAL PRIMARY KEY,
	habilidad_requerida SERIAL NOT NULL REFERENCES habilidades(id),
	ubicacion_id SERIAL NOT NULL REFERENCES ubicaciones(id),
	nivel_requerido SMALLINT NOT NULL CHECK (nivel_requerido < 6 AND nivel_requerido > 0),
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
usuario_id VARCHAR(8) PRIMARY KEY REFERENCES usuarios(ci),
solicitud_id SERIAL NOT NULL UNIQUE REFERENCES solicitudes_ayuda(id),
comentario VARCHAR(100),
estrellas SMALLINT NOT NULL CHECK (estrellas > 0 AND estrellas < 6)
);

CREATE TABLE IF NOT EXISTS 	postulaciones(
	id SERIAL PRIMARY KEY,
	postulante_id VARCHAR(8) NOT NULL REFERENCES usuarios(ci) ON DELETE CASCADE,
	solicitud_id SERIAL NOT NULL REFERENCES solicitudes_ayuda(id) ON DELETE CASCADE,
	fecha DATE NOT NULL,
	fue_aceptada BOOLEAN NOT NULL
)
