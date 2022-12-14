/* C:\Users\xxxxx>psql -U postgres */
/* Password for user postgres: */

CREATE DATABASE auth;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(319) UNIQUE,
    password CHAR(60),
    signed_up_date TIMESTAMP WITH TIME ZONE
);

/* postgres=# \c auth postgres */
/* Password for user postgres: */
/* You are now connected to database "auth" as user "postgres". */
/* auth=# GRANT ALL PRIVILEGES ON TABLE users TO xxxxx; */
/* GRANT */
/* auth=# GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO xxxxx; */
/* GRANT */