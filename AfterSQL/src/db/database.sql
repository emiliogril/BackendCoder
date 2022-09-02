CREATE DATABASE ecommerce;
/* 1 2 3 4 5 */

CREATE TABLE carrito(
    id_carrito SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    precioTotal float NOT NULL
);

CREATE TABLE productoCarrito(
    id_productoCarrito SERIAL PRIMARY KEY,
    id_producto INT,
    id_carrito INT,
    precio FLOAT NOT NULL,
    cantidad INT NOT NULL);

ALTER TABLE productoCarrito ADD FOREIGN KEY(id_producto) REFERENCES producto(id_producto);

ALTER TABLE carrito ADD FOREIGN KEY(id_carrito) REFERENCES carrito(id_carrito);

CREATE TABLE producto(
    id_producto SERIAL PRIMARY KEY,
    precio FLOAT NOT NULL,
    stock INT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    marca VARCHAR(40) NOT NULL
);
