DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
in_stock INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, in_stock) VALUES
("Pioneer CDJ 2000 Nexus", "Decks", 2000.00, 1000),
("Technics SL 1200 MK2", "Decks", 500.00, 200),
("Audio Technica LP-1240", "Decks", 450.00, 300),
("Pioneer DJM 900 NXS2", "Mixers", 2200.00, 250),
("Allen & Heath Xone 96", "Mixers", 2000.00, 150),
("PLAYdifferently Model-1", "Mixers", 1000.00, 500),
("Native Instruments Kontrol S8", "Controllers", 3250.00, 1500),
("Native Instruments Kontrol F1", "Controllers", 150.00, 2000),
("Pioneer DDJ-1000 ", "Controllers", 1200.00, 1000),
("Allen & Heath Xone K2", "Controllers", 250.00, 750);

SELECT * FROM products;