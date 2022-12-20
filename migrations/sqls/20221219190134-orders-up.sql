-- CREATE TABLE orders(id SERIAL PRIMARY KEY, userId bigint REFERENCES users(id), status VARCHAR);
CREATE TABLE orders(id SERIAL PRIMARY KEY, userId VARCHAR, status VARCHAR);