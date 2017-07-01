CREATE TABLE "infos" ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "key" VARCHAR (150) NOT NULL, "language" VARCHAR(6) NOT NULL, "value" TEXT );
CREATE TABLE "experiences" ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "type" VARCHAR(30),"start_date" INTEGER, "end_date" INTEGER, establishment VARCHAR(150) ,"location" VARCHAR (150));
CREATE TABLE "experiences_values" ("id" INTEGER NOT NULL , "language" VARCHAR(6) NOT NULL, "title" VARCHAR (150), "description" TEXT);
CREATE TABLE "key_skills" ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT);
CREATE TABLE "key_skills_values" ("id" INTEGER NOT NULL, "language" VARCHAR(6) NOT NULL, "name" VARCHAR (150), "description" TEXT);