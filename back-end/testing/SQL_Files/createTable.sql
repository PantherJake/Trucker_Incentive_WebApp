
use testing;
drop table testusers;

CREATE TABLE testusers(
userID int NOT NULL AUTO_INCREMENT,
user_fname varchar(30) NOT NULL,
user_lname varchar(30) NOT NULL,
user_org_id int NOT NULL,
PRIMARY KEY(userID)
);

select * from testusers;