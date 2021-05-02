create database database_links;
use database_links;

CREATE TABLE users(
    id INT(11) not null,
    username VARCHAR(16) not null,
    password VARCHAR(60) not null,
    fullname VARCHAR(100) not null
);

show databases; /* Para ver las bases de datos existentes */


alter table users 
    add primary key (id);

alter table users 
    modify id int(11) not null AUTO_INCREMENT ,  AUTO_INCREMENT = 2;

describe users; /* Esto es para ver una tabla en este caso llamada users, y a demas nos permite ver sus atributs y tipo de datos  */


create table links(
    id int(11) not null  ,
    title varchar( 150 ) not null ,
    url varchar( 255 ) not null ,
    description text ,
    user_id int(11),
    created_at timestamp not null default current_timestamp , 
    constraint fk_user foreign key (user_id) references users(id) 
);

alter table links add primary key (id);

alter table links 
    modify id int(11) not null AUTO_INCREMENT , AUTO_INCREMENT = 2;

describe links; 



show tables;  /* Para ver las tablas creadas */