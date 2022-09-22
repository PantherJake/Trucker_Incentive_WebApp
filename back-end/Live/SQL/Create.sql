
use testing;
-- drop table users, address, driver_data, point_transaction_history;
CREATE TABLE users(
user_id int NOT NULL AUTO_INCREMENT,
user_fname varchar(30) NOT NULL,
user_mname varchar(30),
user_lname varchar(30) NOT NULL,
user_role_id int NOT NULL,
user_email varchar(30) NOT NULL,
user_org_id int NOT NULL,
user_state varchar(30) NOT NULL,
keynum INT NOT NULL,
PRIMARY KEY(user_id)
);

CREATE TABLE organization (
  `organization_id` int NOT NULL AUTO_INCREMENT,
  `organization_name` VARCHAR(30) NOT NULL,
  `organization_addressid` int NOT NULL,
  `catalog_id` int NOT NULL,
  PRIMARY KEY (`organization_ID`)
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
  PRIMARY KEY (`user_id`)
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
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `target_user_id`
    FOREIGN KEY (`target_user_id`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE audits (
  `audit_id` int NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `operation` VARCHAR(30) NOT NULL,
  `state` VARCHAR(30) NOT NULL,
  `message` VARCHAR(30),
  `created_date` DATETIME NOT NULL,
  PRIMARY KEY (`audit_id`),
  KEY `FK1` (`user_id`)
);


CREATE TABLE roles (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(30) NOT NULL,
  `role_perm` int NOT NULL,
  PRIMARY KEY (`role_id`)
);

CREATE TABLE catalog (
  `catalog_id` int NOT NULL AUTO_INCREMENT,
  `catalog_name` VARCHAR(30) NOT NULL,
  `catalog_url` VARCHAR(30) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `created_by` INT NOT NULL,
  `last_updated_date` DATETIME,
  `last_updated_by` int,
  PRIMARY KEY (`catalog_id`)
);

CREATE TABLE org_catalog_rules (
  `catalog_id` int NOT NULL AUTO_INCREMENT,
  `org_id`int NOT NULL,
  `rule_id` int NOT NULL,
  `rule_text` VARCHAR(30) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `created_by` int NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  `last_updated_by` int NOT NULL,
  PRIMARY KEY (`catalog_id`, `org_id`, `rule_id`),
  CONSTRAINT `created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `last_updated_by`
    FOREIGN KEY (`last_updated_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE org_configs (
  `organization_id` INT NOT NULL AUTO_INCREMENT,
  `configuration_name` VARCHAR(30) NOT NULL,
  `configuration_value` VARCHAR(30) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `org_configs_created_by` INT NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  `org_configs_last_updated_by` INT NOT NULL,
  PRIMARY KEY (`organization_id`, `configuration_name`),
  CONSTRAINT `org_configs_created_by`
    FOREIGN KEY (`org_configs_created_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `org_configs_last_updated_by`
    FOREIGN KEY (`org_configs_last_updated_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE invoice_details (
  `invoice_id` INT NOT NULL,
  `sales_id` INT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `invoice_details_created_by` INT NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  `invoice_details_last_updated_by` INT NOT NULL,
  PRIMARY KEY (`invoice_id`, `sales_id`),
  CONSTRAINT `invoice_details_created_by`
    FOREIGN KEY (`invoice_details_created_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `invoice_details_last_updated_by`
    FOREIGN KEY (`invoice_details_last_updated_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE invoice_header (
  `invoice_id` INT NOT NULL AUTO_INCREMENT,
  `organization_id` INT NOT NULL,
  `invoice_start_date` DATETIME NOT NULL,
  `invoice_end_date` DATETIME NOT NULL,
  `invoice_status` VARCHAR(30) NOT NULL,
  `comission_rate` INT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `invoice_header_created_by` INT NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  `invoice_header_last_updated_by` INT NOT NULL,
  PRIMARY KEY (`invoice_id`),
  CONSTRAINT `invoice_header_created_by`
    FOREIGN KEY (`invoice_header_created_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `invoice_header_last_updated_by`
    FOREIGN KEY (`invoice_header_last_updated_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE sales_header (
  `sales_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `catalog_id` INT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `sales_header_created_by` INT NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  `sales_header_last_updated_by` INT NOT NULL,
  PRIMARY KEY (`sales_id`),
  CONSTRAINT `sales_header_created_by`
    FOREIGN KEY (`sales_header_created_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sales_header_last_updated_by`
    FOREIGN KEY (`sales_header_last_updated_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE sales_detail (
  `detail_id` INT NOT NULL,
  `sales_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `item_description` VARCHAR(30) NOT NULL,
  `item_price` FLOAT(8,2) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `sales_detail_created_by` INT NOT NULL,
  `last_updated_date` DATETIME NOT NULL,
  `sales_detail_last_updated_by` INT NOT NULL,
  PRIMARY KEY (`sales_id`, `detail_id`),
  CONSTRAINT `sales_detail_created_by`
    FOREIGN KEY (`sales_detail_created_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sales_detail_last_updated_by`
    FOREIGN KEY (`sales_detail_last_updated_by`)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- Alter tables for foreign keys
ALTER TABLE users ADD FOREIGN KEY (user_role_id) REFERENCES roles(role_id);
ALTER TABLE users ADD FOREIGN KEY (user_org_id) REFERENCES organization(organization_id);
ALTER TABLE driver_data ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE driver_data ADD FOREIGN KEY (driver_address_id) REFERENCES address(address_id);
ALTER TABLE audits ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE organization ADD FOREIGN KEY (organization_addressid) REFERENCES address(address_id);
ALTER TABLE organization ADD FOREIGN KEY (catalog_id) REFERENCES catalog(catalog_id);
ALTER TABLE org_catalog_rules ADD FOREIGN KEY (org_id) REFERENCES organization(organization_id);
ALTER TABLE invoice_header ADD FOREIGN KEY (organization_id) REFERENCES organization(organization_id);
ALTER TABLE sales_header ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE sales_header ADD FOREIGN KEY (catalog_id) REFERENCES catalog(catalog_id);




