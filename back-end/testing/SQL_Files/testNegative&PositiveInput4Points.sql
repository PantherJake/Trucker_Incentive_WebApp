use testing;

select * from point_transaction_history where target_user_id = 23;
select * from driver_data where user_id = 23;
-- initially no transaction history for user 23 and the balance of user 23 is 0

insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) 
	values (25, "helped another trucker on the way", "2022-01-01 15:00:00", 4, 23);
UPDATE driver_data SET pts_balance = (select SUM(transaction_value) from point_transaction_history where target_user_id = 23) WHERE user_id = 23;

select * from point_transaction_history where target_user_id = 23;
select * from driver_data where user_id = 23;
-- now the transaction history for user 23 has a new log and the balance of user 23 is 25
    
insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) 
	values (5.25, "helped another trucker on the way", "2022-01-01 15:00:00", 4, 23);
UPDATE driver_data SET pts_balance = (select SUM(transaction_value) from point_transaction_history where target_user_id = 23) WHERE user_id = 23;
    
select * from point_transaction_history where target_user_id = 23;   
select * from driver_data where user_id = 23; 
-- again a new log for the transaction history for user 23 and the balance of user 23 is 30.25
-- this showed that adding points if ints or floats, is not an issue at all
    
insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) 
	values (-7.0, "helped another trucker on the way", "2022-01-01 15:00:00", 4, 23);
UPDATE driver_data SET pts_balance = (select SUM(transaction_value) from point_transaction_history where target_user_id = 23) WHERE user_id = 23;
    
select * from point_transaction_history where target_user_id = 23;   
select * from driver_data where user_id = 23; 
-- again a new log for the transaction history for user 23 with a negative change and the balance of user 23 is 23.25

insert into point_transaction_history(transaction_value, transaction_reason, date_created,source_user_id, target_user_id) 
	values (-100.0, "helped another trucker on the way", "2022-01-01 15:00:00", 4, 23);
UPDATE driver_data SET pts_balance = (select SUM(transaction_value) from point_transaction_history where target_user_id = 23) WHERE user_id = 23;
    
select * from point_transaction_history where target_user_id = 23;   
select * from driver_data where user_id = 23; 
-- again a new log for the transaction history for user 23 with a negative change and the balance of user 23 is -76.25
-- this shows that you can also remove points from a user and log negative numbers. It should not matter if the numbers are int or flaots either
