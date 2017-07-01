
-- reset
DROP TABLE "users";
DROP TABLE "key_skills_values";
DROP TABLE "key_skills";
DROP TABLE "experiences_values";
DROP TABLE "experiences";
DROP TABLE "infos";
DROP TABLE "oauth_access_tokens";
DROP TABLE "oauth_clients";
DROP TABLE "oauth_refresh_tokens";

-- cv tables
CREATE TABLE "infos" ("id" SERIAL PRIMARY KEY, "key" VARCHAR (150) NOT NULL, "language" VARCHAR(8) NOT NULL, "value" TEXT, UNIQUE ("key","language"));
CREATE TABLE "experiences" ("id" SERIAL PRIMARY KEY, "type" VARCHAR(30),"start_date" DATE, "end_date" DATE, establishment VARCHAR(150) ,"location" VARCHAR (150));
CREATE TABLE "experiences_values" ("id" INTEGER PRIMARY KEY, "language" VARCHAR(6) NOT NULL, "title" VARCHAR (150), "description" TEXT);
CREATE TABLE "key_skills" ("id" SERIAL PRIMARY KEY);
CREATE TABLE "key_skills_values" ("id" INTEGER PRIMARY KEY, "language" VARCHAR(6) NOT NULL, "name" VARCHAR (150), "description" TEXT);

-- work tables
-- oauth
CREATE TABLE "oauth_codes" ("value" text NOT NULL, "client_id" INTEGER NOT NULL, "user_id" INTEGER NOT NULL, "redirect_uri" text NOT NULL);
CREATE TABLE "oauth_access_tokens" ("access_token" text NOT NULL, "client_id" INTEGER NOT NULL, "user_id" INTEGER NOT NULL, "expires" TIMESTAMP WITHOUT TIME ZONE NOT NULL);
CREATE TABLE "oauth_clients" ("id" SERIAL, "uuid" UUID, "clientname" VARCHAR (30) UNIQUE NOT NULL, "secret" text NOT NULL, "redirect_uri" text NOT NULL, "created_by" INTEGER);
--CREATE TABLE "oauth_refresh_tokens" ("refresh_token" text NOT NULL, "client_id" text NOT NULL, "user_id" uuid NOT NULL, "expires" timestamp without time zone NOT NULL);
CREATE TABLE "users" ("id" SERIAL PRIMARY KEY, "uuid" UUID, "username" VARCHAR (30) UNIQUE NOT NULL, "password" VARCHAR(100) NOT NULL, "email" VARCHAR(50));

ALTER TABLE ONLY "oauth_codes"
    ADD CONSTRAINT "oauth_codes_pkey" PRIMARY KEY (value);
    
ALTER TABLE ONLY "oauth_access_tokens"
    ADD CONSTRAINT "oauth_access_tokens_pkey" PRIMARY KEY (access_token);

ALTER TABLE ONLY "oauth_clients"
    ADD CONSTRAINT "oauth_clients_pkey" PRIMARY KEY (id, secret);

ALTER TABLE ONLY "oauth_refresh_tokens"
    ADD CONSTRAINT "oauth_refresh_tokens_pkey" PRIMARY KEY (refresh_token);

CREATE INDEX "users_username_password" ON users USING btree (username, password);