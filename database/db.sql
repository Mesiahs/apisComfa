
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

CREATE TABLE centros_recreacion (
    id_centro SERIAL PRIMARY KEY,
    nombre VARCHAR,
    ciudad VARCHAR,
    direccion VARCHAR,
    estado VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO centros_recreacion (nombre, ciudad, direccion, estado) 
    VALUES ('pisoje', 'popayan', 'vrd gonzales', 'activo'),
    ('caña dulce','santander', 'km 1', 'activo');

CREATE TABLE infrastructuras (
    id_infrastructuras SERIAL PRIMARY KEY,
    id_centro INT NOT NULL,
    tipo VARCHAR,
    nombre VARCHAR,
    capacidad INT,
    tarifa_plena DECIMAL(10,2),
    estado VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_infra_centro
        FOREIGN KEY (id_centro)
        REFERENCES centros_recreacion(id_centro)
);

INSERT INTO infrastructuras (id_centro, tipo, nombre, capacidad, tarifa_plena, estado)
VALUES
(1, 'HOSTAL', 'Habitación 102', 2, 100000, 'DISPONIBLE'),
(1, 'CANCHA', 'Cancha Sintética 1', 10, 80000, 'DISPONIBLE'),
(2, 'SAUNA', 'Sauna Principal', 5, 60000, 'DISPONIBLE'),
(3, 'SALON', 'Salón Eventos', 100, 200000, 'DISPONIBLE');


CREATE TABLE reservacion (
    id_reservacion SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_inicio TIMESTAMP,
    fecha_fin TIMESTAMP,
    estado_reserva VARCHAR(50),
    total DECIMAL(10,2),
    CONSTRAINT fk_reservacion_user
        FOREIGN KEY (id_user)
        REFERENCES users(id)
);


INSERT INTO reservacion (id_user, fecha_reserva, fecha_inicio, fecha_fin, estado_reserva, total)
VALUES
(1, NOW(), '2026-02-10 14:00', '2026-02-11 12:00', 'CONFIRMADA', 60000),
(2, NOW(), '2026-02-15 08:00', '2026-02-15 10:00', 'CONFIRMADA', 56000);



CREATE TABLE reservacion_detalles (
    id_detalles SERIAL PRIMARY KEY,
    id_reservacion INT NOT NULL,
    id_infrastructuras INT NOT NULL,
    tarifa_plena DECIMAL(10,2),
    descuento_porcentaje DECIMAL(5,2),
    tarifa_final DECIMAL(10,2),
    CONSTRAINT fk_detalle_reservacion
        FOREIGN KEY (id_reservacion)
        REFERENCES reservacion(id_reservacion),
    CONSTRAINT fk_detalle_infra
        FOREIGN KEY (id_infrastructuras)
        REFERENCES infrastructuras(id_infrastructuras)
);

INSERT INTO reservacion_detalles (id_reservacion, id_infrastructuras, tarifa_plena, descuento_porcentaje, tarifa_final)
VALUES
(1, 5, 100000, 40, 60000),
(2, 6, 80000, 30, 56000);


CREATE TABLE pago (
    id_pago SERIAL PRIMARY KEY,
    id_reservacion INT NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_pagado DECIMAL(10,2),
    medio_pago VARCHAR,
    punto_pago VARCHAR,
    CONSTRAINT fk_pago_reservacion
        FOREIGN KEY (id_reservacion)
        REFERENCES reservacion(id_reservacion)
);

INSERT INTO pago (id_reservacion, fecha_pago, valor_pagado, medio_pago, punto_pago)
VALUES
(1, NOW(), 60000, 'EFECTIVO', 'TAQUILLA PISOJE'),
(2, NOW(), 56000, 'TARJETA', 'WEB');



CREATE TABLE facturas (
    id_facturas SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    fecha_factura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    tipo_factura VARCHAR(20),
    CONSTRAINT fk_factura_user
        FOREIGN KEY (id_user)
        REFERENCES users(id)

    CONSTRAINT fk_factura_cierre
        FOREIGN KEY (id_cierre)
        REFERENCES cierre_caja(id_cierre)    
);


INSERT INTO facturas (id_user, fecha_factura, total, tipo_factura)
VALUES
(1, NOW(), 60000, 'RESERVA'),
(2, NOW(), 56000, 'RESERVA');



CREATE TABLE facturas_detalle (
    id_facturas_detalle SERIAL PRIMARY KEY,
    id_facturas INT NOT NULL,
    id_reservacion INT NOT NULL,
    descripcion_servicio VARCHAR,
    valor DECIMAL(10,2),
    CONSTRAINT fk_factura_detalle_factura
        FOREIGN KEY (id_facturas)
        REFERENCES facturas(id_facturas),
    CONSTRAINT fk_factura_detalle_reservacion
        FOREIGN KEY (id_reservacion)
        REFERENCES reservacion(id_reservacion)
);

INSERT INTO facturas_detalle (id_facturas, id_reservacion, descripcion_servicio, valor)
VALUES
(1, 1, 'Reserva Hostal Habitación 102 - CR Pisojé', 60000),
(2, 2, 'Reserva Cancha Sintética - CR Pisojé', 56000);


CREATE TABLE cierre_caja (
    id_cierre SERIAL PRIMARY KEY,
    fecha DATE,
    total_efectivo DECIMAL(10,2),
    total_tarjeta DECIMAL(10,2),
    total_transferencia DECIMAL(10,2),
    total_general DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cierre_caja (fecha, total_efectivo, total_tarjeta, total_transferencia, total_general)
VALUES
('2026-02-03', 60000, 56000, 0, 116000);



