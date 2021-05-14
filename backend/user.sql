CREATE DATABASE IF NOT EXISTS test;
USE test;
CREATE TABLE users ( 
	id int AUTO_INCREMENT,
	name varchar(255),
	email varchar(255) UNIQUE,
	password varchar(255),
	PRIMARY KEY (id)
);
