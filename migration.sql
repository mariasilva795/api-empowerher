CREATE TYPE interests AS ENUM('transport', 'education', 'sexual_harassment',  'labor_violations', 'emotional_support', 'female_network');

CREATE TABLE users(
  id serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,  
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100),
  interests interests
)

CREATE TABLE partness(
  id serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,  
  description VARCHAR(100) NOT NULL,
  link VARCHAR(100) NOT NULL,
  image VARCHAR(100) NOT NULL,
)


CREATE TABLE partness(
  id serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,  
  description VARCHAR(100) NOT NULL,
  link VARCHAR(100) NOT NULL,
  image VARCHAR(100) NOT NULL,
)

CREATE TABLE category(
  id serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,  
  description VARCHAR(100) NOT NULL)


  CREATE TABLE partness_category(
   id SERIAL PRIMARY KEY,
   id_partness INTEGER REFERENCES partness(id),
   id_category INTEGER REFERENCES category(id)
);

INSERT INTO ejemplo (nombre, estados) VALUES ('ejemplo', ARRAY['activo', 'inactivo']);
