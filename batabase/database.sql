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
    type_course INT(1) NOT NULL,
    PRIMARY KEY (id_user)
) ENGINE=innidb;

DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
    id_admin INT(5) NOT NULL AUTO_INCREMENT,
    admin_name VARCHAR(10) NOT NULL,
    admin_password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id_admin)
) ENGINE=innidb;

-- ******************************************
-- next tables in checking for future changes
DROP TABLE IF EXISTS topic;
CREATE TABLE topic (
    id_topic INT(10) NOT NULL,
    topic_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_topic)
) ENGINE=innidb;


DROP TABLE IF EXISTS course;
CREATE TABLE course (
    id_course INT(10) NOT NULL,
    course_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (field) REFERENCES dest_table(field) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=innidb;


DROP TABLE IF EXISTS student;
CREATE TABLE student (
    id_student INT(10) NOT NULL,
    student_type ()
    student_course ()


    PRIMARY KEY (id),
    FOREIGN KEY (field) REFERENCES dest_table(field) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=innidb;