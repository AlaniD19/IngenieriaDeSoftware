-- script for database of MATHEBASICS
-- team 1 / software engeneering - 3cv / 22.1

-- create database - if exist ignore the next line
CREATE DATABASE IF NOT EXISTS mathebasics;
USE mathebasics;

-- create basic tables, each one verify if exist
-- verify help to clean and create a full database

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id_user INT(10) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(15) NOT NULL,
    user_password VARCHAR(60) NOT NULL,
    user_email VARCHAR(30) NOT NULL,
    type_course INT(1) DEFAULT NULL,
    PRIMARY KEY (id_user)
);

DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
    id_admin INT(5) NOT NULL AUTO_INCREMENT,
    admin_name VARCHAR(10) NOT NULL,
    admin_password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id_admin)
);

DROP TABLE IF EXISTS unit;
CREATE TABLE unit (
    id_unit INT(10) NOT NULL AUTO_INCREMENT,
    unit_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_unit)
);

INSERT INTO unit (unit_name) VALUES ('1'), ('2'), ('3'),
                        ('4'), ('5'), ('6');

DROP TABLE IF EXISTS topic;
CREATE TABLE topic (
    id_topic INT(10) NOT NULL AUTO_INCREMENT,
    topic_name VARCHAR(50) NOT NULL,
    unit INT(10) NOT NULL,
    PRIMARY KEY (id_topic),
    CONSTRAINT FOREIGN KEY (unit) REFERENCES unit(id_unit) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO topic (topic_name, unit) VALUES ('1','1'), ('2','1'), ('3','1'),
                        ('1','2'), ('2','2'), ('3','2'),
                        ('1','3'), ('2','3'), ('3','3'), ('4','3'), ('5','3'),
                        ('1','4'), ('2','4'),
                        ('1','5'), ('2','5'),
                        ('1','6'), ('2','6'), ('3','6'), ('4','6');

DROP TABLE IF EXISTS exam;
CREATE TABLE exam (
    id_exam INT(10) NOT NULL AUTO_INCREMENT,
    unit INT(5) NOT NULL,
    PRIMARY KEY (id_exam),
    CONSTRAINT FOREIGN KEY (unit) REFERENCES unit(id_unit) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO exam (unit) VALUES ('1'), ('2'), ('3'),
                        ('4'), ('5'), ('6');

DROP TABLE IF EXISTS user_exam;
CREATE TABLE user_exam (
    id_user_exam INT(10) NOT NULL AUTO_INCREMENT,
    user INT(10) NOT NULL,
    exam INT(10) NOT NULL,
    score INT(10) NOT NULL,
    passed INT(10) NOT NULL,
    PRIMARY KEY (id_user_exam),
    CONSTRAINT FOREIGN KEY (user) REFERENCES user(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (exam) REFERENCES exam(id_exam) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS user_topic;
CREATE TABLE user_topic (
    id_user_topic INT(10) NOT NULL AUTO_INCREMENT,
    user INT(10) NOT NULL,
    topic INT(10) NOT NULL,
    PRIMARY KEY (id_user_topic),
    CONSTRAINT FOREIGN KEY (user) REFERENCES user(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (topic) REFERENCES topic(id_topic) ON DELETE CASCADE ON UPDATE CASCADE
);