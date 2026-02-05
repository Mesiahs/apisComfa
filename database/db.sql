
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    fechaC TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edad DECIMAL(2,0) NOT NULL,
    num_cc VARCHAR(255) NOT NULL UNIQUE,
    tip_documento VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(255) NOT NULL
);

INSERT INTO users (nombre, email, edad, num_cc, tip_documento, tipo_usuario)
    VALUES ('eric', 'eric@gmail.com','23', '100255', 'cedula', 'afiliado'),
    ('sebastian', 'sebastian@gmail.com','9', '332500', 'cedula', 'afiliado');

SELECT * FROM users;    