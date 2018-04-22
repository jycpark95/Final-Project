DROP TABLE if EXISTS recipes;
CREATE TABLE recipes (
  recipe_id integer PRIMARY KEY,
  recipe_name text NOT NULL
);

DROP TABLE if EXISTS users;
CREATE TABLE users (
  user_id integer PRIMARY KEY,
  username text NOT NULL,
  email text NOT NULL,
  password_hash text NOT NULL
);
