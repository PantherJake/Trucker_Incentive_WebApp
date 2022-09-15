#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import userinfo



rds_host  = rds_config.db_endpoint
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
port = 3306

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(host=rds_host, user=name,passwd=password, db=db_name)

except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
def sql(event, context):
    
    with conn.cursor() as cur:
        #insert specific data into the user table which is grabbed from a userinfo.py file at the moment
        query = 'insert into testusers(user_fname, user_lname, user_org_id) values("'+ str(userinfo.userfname) + '","'+str(userinfo.userlname)+'",'+str(userinfo.user_org_id)+')'
        cur.execute(query)
        print(query)
        conn.commit()
        
        cur.execute("select * from testusers")
        result = cur.fetchall()
        
        item_count = 0
        for row in result:
            item_count += 1
            logger.info(row)
       
    
    return event
