# Loom
Meu projeto integrador 
banco de dados 
create database LoomSite;
use LoomSite;

create table usuarios(
id INT auto_increment primary KEY,
nome varchar(100) Not null,
email varchar(250),
senha varchar(250)
);
select * from usuarios;

create table postagens(
id_postagem INT auto_increment primary key,
data_postagem datetime default current_timestamp,
usuario_id INT,
nota int NOT NULL,
comentario text,
constraint fk_postagem_usuario
foreign key(usuario_id) references usuarios(id),
CONSTRAINT chk_nota CHECK(nota >=1 AND nota <=5)
);

select * from postagens;

drop table usuarios;

drop table postagens;

truncate table usuarios;
	
truncate table postagens;
