
use gooddriver;
drop table users2, address, driver_data, point_transaction_history;

CREATE TABLE users2(
user_id int NOT NULL AUTO_INCREMENT,
user_fname varchar(30) NOT NULL,
user_mname varchar(30),
user_lname varchar(30) NOT NULL,
user_role_id int NOT NULL,
user_email varchar(30) NOT NULL,
user_org_id int NOT NULL,
user_state varchar(30) NOT NULL,
PRIMARY KEY(user_id)
);

CREATE TABLE address (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(30) NOT NULL,
  `streetnumber` int not null,
  `city` varchar(30) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zipcode` int not null,
  PRIMARY KEY (`address_id`)
);



CREATE TABLE driver_data (
  `user_id` int NOT NULL,
  `pts_balance` float(8,2) NOT NULL,
  `licenseplate` varchar(30) NOT NULL,
  `dl_num` int not null,
  `driver_address_id` int not null,
  PRIMARY KEY (`user_id`),
  KEY `FK1` (`user_id`),
  KEY `FK2` (`driver_address_id`)
);

CREATE TABLE point_transaction_history (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `transaction_value` float(8,2) not null,
  `transaction_reason` varchar(30) NOT NULL,
  `date_created` datetime not null,
  `source_user_id` int not null,
  `target_user_id` int not null,
  PRIMARY KEY (`history_id`),
  CONSTRAINT `source_user_id`
    FOREIGN KEY (`source_user_id`)
    REFERENCES users2 (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `target_user_id`
    FOREIGN KEY (`target_user_id`)
    REFERENCES users2 (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

insert into users2(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values("Max", "Julius", "Hilgenberg", 1, "mhilgen@clemson.edu", 1, "active");
insert into users2(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values("Detlef", NULL, "Mark", 1, "mhilgen@clemson.edu", 2, "active");
insert into users2(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values("Karl", NULL, "Away", 1, "mhilgen@clemson.edu", 1, "active");
insert into users2(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values("notKarl", NULL, "Away", 1, "mhilgen@clemson.edu", 1, "active");
insert into users2(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values("Fahrer", NULL, "Lokomotive", 1, "mhilgen@clemson.edu", 3, "active");
insert into users2(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values("Muhammed", NULL, "Ali", 1, "mhilgen@clemson.edu", 3, "active");
insert into users2(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values("Christian", NULL, "Fist", 1, "mhilgen@clemson.edu", 3, "active");

insert into address(street, streetnumber, city, state, zipcode) values("Pelham Rd", 156, "Greenville", "SC", 29607);

insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) values(3, 10.0, "ABC157", 123456789, 1);
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) values(6, 0.0, "DEF652", 231232312, 1);
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) values(7, -5.50, "XYZ666", 3213213, 1);

insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) values (5.0, "helped another trucker on the way", "2022-01-01 15:00:00", 1, 6);
insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) values (-3.5, "bought product", "2022-05-01 8:00:00",3, 5);


select * from users2;
select * from address;
select * from driver_data;
select * from point_transaction_history;