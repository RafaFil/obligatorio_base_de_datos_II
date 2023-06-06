--FOR TESTING PURPOSES--
-- DATABASE CREATION SCRIPT (EMPTY) --

CREATE TABLE  IF NOT EXISTS usuarios (
	ci varchar(8) PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	hashpwd varchar(255) NOT NULL,
	dispuesto_ayudar boolean NOT NULL ,
	confirmada_identidad boolean NOT NULL,
	carta_presentacion varchar(150),
);

CREATE TABLE IF NOT EXISTS amistades (
	usuario1_ci varchar(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	usuario2_ci varchar(8) REFERENCES usuarios(ci) ON DELETE CASCADE,
	PRIMARY KEY(usuario1_ci, usuario2_ci),
	CHECK (usuario1_ci != usuario2_ci)
);

CREATE TABLE IF NOT EXISTS habilidades(
	id SERIAL PRIMARY KEY,
	nombre varchar(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS habilidades_usuarios(
	user_id varchar(8) PRIMARY KEY REFERENCES usuarios(ci),
	habilidad_id SERIAL NOT NULL
);

CREATE TABLE IF NOT EXISTS ubicaciones(
id SERIAL PRIMARY KEY,
nombre varchar(100) NOT NULL,
latitud FLOAT NOT NULL,
longitud FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS solicitudes_ayuda(
	id SERIAL PRIMARY KEY,
	habilidad_requerida SERIAL NOT NULL REFERENCES habilidades(id),
	ubicacion_id SERIAL NOT NULL REFERENCES ubicaciones(id),
	nivel_requerido SMALLINT NOT NULL CHECK (nivel_requerido < 6 AND nivel_requerido > 0),
	esta_activa boolean NOT NULL,
	fue_resuelta boolean NOT NULL,
	fecha_publicacion date NOT NULL,
	titulo varchar(50) NOT NULL,
	descripcion varchar(150)
);

CREATE TABLE IF NOT EXISTS comentarios_solicitudes(
usuario_id varchar(8) REFERENCES usuarios(ci),
solicitud_id serial REFERENCES solicitudes_ayuda(id),
texto_pregunta varchar(255) NOT NULL,
texto_respuesta varchar(255),
PRIMARY KEY (usuario_id, solicitud_id)
);

CREATE TABLE IF NOT EXISTS calificaciones(
usuario_id varchar(8) PRIMARY KEY REFERENCES usuarios(ci),
solicitud_id Serial NOT NULL UNIQUE REFERENCES solicitudes_ayuda(id),
comentario varchar(100),
estrellas SMALLINT NOT NULL CHECK (estrellas > 0 AND estrellas < 6)
);