-- CREATE TABLE orders(id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), status VARCHAR);
CREATE TABLE orders(id SERIAL PRIMARY KEY, user_id VARCHAR, status VARCHAR);