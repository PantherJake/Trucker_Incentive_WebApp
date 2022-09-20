
use gooddriver;
select user_id id, user_fname fname, user_mname mname, user_lname lname, user_role_id role, user_email email, user_org_id org_id, R.role_name rolename
from users U inner join roles R on U.user_role_id = R.role_id;
select user_role_id from users where user_id = 2;
select * from point_transaction_history;

select SUM(transaction_value) from point_transaction_history where target_user_id = 3;

select * from driver_data;

-- UPDATE driver_data
-- 	SET pts_balance = 50
-- 	WHERE user_id = 3;  

-- select * from driver_data; 