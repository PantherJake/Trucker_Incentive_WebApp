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
