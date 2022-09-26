-- Get Top drivers of organization
use testing;
SET @i = 0;
select U1.rank, U1.user_fname, U1.user_lname, U1.pts_balance, U1.user_email, U1.organization_name, U1.catalog_id from users u2 inner join (
	select U.user_id, U.user_fname, U.user_lname, D.pts_balance, U.user_email, O.organization_name, O.catalog_id, @i := @i + 1 AS "rank"
	from driver_data D inner join users U on D.user_id = U.user_id inner join organization O on U.user_org_id = O.organization_id
	where U.user_state = "active" and O.organization_id = 1
	order by pts_balance DESC limit 10) as U1 on u2.user_id = U1.user_id;
    
Set @r = 0;
select U1.rank, U1.user_fname, U1.user_lname, U1.pts_balance, U1.user_email, U1.organization_name, U1.catalog_id from users u2 inner join (
	select U.user_id, U.user_fname, U.user_lname, D.pts_balance, U.user_email, O.organization_name, O.catalog_id, @r := @r + 1 AS "rank"
	from driver_data D inner join users U on D.user_id = U.user_id inner join organization O on U.user_org_id = O.organization_id
	where U.user_state = "active" and O.organization_id = 1
	order by pts_balance DESC) as U1 on u2.user_id = U1.user_id;
    