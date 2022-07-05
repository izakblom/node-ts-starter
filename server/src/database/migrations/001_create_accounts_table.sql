CREATE TABLE IF NOT EXISTS accounts(
   id                   SERIAL PRIMARY KEY,
   email                VARCHAR(60)       NOT NULL,
   firstname            VARCHAR(100)       NOT NULL,
   lastname             VARCHAR(100)       NOT NULL,
   created              TIMESTAMP WITH TIME ZONE         NOT NULL,
   updated              TIMESTAMP WITH TIME ZONE         NOT NULL
); 

CREATE UNIQUE INDEX IF NOT EXISTS accounts_email_idx ON accounts (email);