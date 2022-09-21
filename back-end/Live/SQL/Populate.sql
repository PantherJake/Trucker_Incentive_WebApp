use testing;

insert into roles(role_name, role_perm) 
	values("Admin", 3);
insert into roles(role_name, role_perm) 
	values("Sponsor Admin", 2);
insert into roles(role_name, role_perm) 
	values("Driver", 1);
    
insert into catalog(catalog_name, catalog_url, created_date, created_by, last_updated_date, last_updated_by) 
	values("ebay", "ebay.com", "2022-09-03", 1, "2022-09-05", 3);
    
insert into address(street, streetnumber, city, state, zipcode) 
	values("McMillian Rd", 821, "Greenville", "SC", 29607);
insert into address(street, streetnumber, city, state, zipcode) 
	values("Tiger Blvd Rd", 1, "Clemson", "SC", 29632);

insert into organization(organization_name, organization_addressid, catalog_id) 
	values("Driver Inventitive Network", 1, 1);
insert into organization(organization_name, organization_addressid, catalog_id) 
	values("Driver Clemson Network", 2, 1);
    
insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) 
	values("Max", "Julius", "Hilgenberg", 1, "mhilgen@clemson.edu", 1, "active");
insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) 
	values("Detlef", NULL, "Mark", 1, "mhilgen@clemson.edu", 2, "active");
insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) 
	values("Karl", NULL, "Away", 3, "mhilgen@clemson.edu", 1, "active");
insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) 
	values("notKarl", NULL, "Away", 1, "mhilgen@clemson.edu", 1, "active");
insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) 
	values("Fahrer", NULL, "Lokomotive", 3, "mhilgen@clemson.edu", 1, "active");
insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) 
	values("Muhammed", NULL, "Ali", 3, "mhilgen@clemson.edu", 1, "active");
insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) 
	values("Christian", NULL, "Fist", 3, "mhilgen@clemson.edu", 2, "active");

insert into audits(user_id, operation, state, message, created_date) 
	values(1, "adduser", "completed", "created user Test", "2022-09-18 15:00:00");
    
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(3, 10.0, "ABC157", 123456789, 1);
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(6, 0.0, "DEF652", 231232312, 1);
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(7, -5.50, "XYZ666", 3213213, 1);
    
-- no invoice detail yet

-- no invoice header yet

-- no org_catalog_rules yet
-- no org_configs yet

insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) 
	values (5.0, "helped another trucker on the way", "2022-01-01 15:00:00", 1, 6);
insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) 
	values (-3.5, "bought product", "2022-05-01 8:00:00",3, 5);

-- no sales detail yet

-- no sales detail yet


