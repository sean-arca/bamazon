DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT(11) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY (item_id)
);


SELECT * FROM products;

SELECT product_name, price, year FROM products
	WHERE department_name = "electronics";
	
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nvidia GTX1080Ti", "Graphics Cards", 899, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nvidia GTX1070", "Graphics Cards", 599, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nvidia GTX1060", "Graphics Cards", 399, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nvidia GTX1050Ti", "Graphics Cards", 299, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nvidia GTX980Ti", "Graphics Cards", 299, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intel i9-7920x", "Processors", 1099, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intel i7-8800k", "Processors", 399, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intel i7-8700", "Processors", 339, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intel i7-7800k", "Processors", 349, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intel i7-7700k", "Processors", 299, 10);
