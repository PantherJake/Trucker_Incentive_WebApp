-- Test inserts for driver information input
use testing;
select * from driver_data;
-- adds the data to the data_table, if run again duplicate data will be prevented to be logged
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(3, 10.0, "ABC157", 123456789, 1);
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(6, 0.0, "DEF652", 231232312, 1);
-- even a negative point balance is permitted 
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(7, -5.50, "XYZ666", 3213213, 1);
-- organization 100 does not exist so this cannot be logged since it is a foreign key
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(8, -5.50, "XYZ666", 3213213, 100);
-- user 100 does not exist so this cannot be logged since it is a foreign key
insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) 
	values(100, -5.50, "XYZ666", 3213213, 1);
