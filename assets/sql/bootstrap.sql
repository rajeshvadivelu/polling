Create table questions(
id int(11) primary key auto_increment,
question varchar(2000),
votes int(11) default 0,
likes int(11) default 0,
dislikes int(11) default 0,
createdAt datetime default now(),
updatedAt datetime default now());

Create table options (
id int(11) primary key auto_increment,
qid int(11),
name varchar(50),
createdAt datetime default now(),
updatedAt datetime default now());

Create table option_rank(
id int(11) primary key auto_increment,
qid int(11),
oid int(11),
counter int(11),
createdAt datetime default now(),
updatedAt datetime default now());

ALTER TABLE option_rank ADD CONSTRAINT CK_OPTION_RANK_UNIQUE UNIQUE (qid, oid);

Insert into questions(question) values("how are you?");
Insert into options(qid,name) values(1,"Ok");
Insert into options(qid, name) values(1,"Some What OK");
Insert into options(qid, name) values(1,"Not Ok");

Insert into questions(question) values("Where am I ?");
Insert into options(qid,name) values(2,"Chennai");
Insert into options(qid, name) values(2,"No where");
Insert into options(qid, name) values(2,"Some where");