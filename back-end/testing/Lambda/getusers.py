#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import json

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
    print(rds_host)
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
def getusers(event, context):
    """
    This function will return the users given a provided filter
    The filter should be and can be combined:
        None = Return all users in the system
        { "org_id" : "<value>"  Return users of an org
        { "role_id" : "<value>  Return useres of a role
    """
    item_count = 0

    with conn.cursor() as cur:
        query = "select json_object('id', user_id, 'fname', user_fname, 'mname',user_mname, 'lname', user_lname, 'role', user_role_id, 'email', user_email, 'org', user_org_id) user_row " \
                "from users"
        cur.execute(query)
        for row in cur:
            retval = row[0]
    conn.close()
    return json.dumps(retval)
