
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
