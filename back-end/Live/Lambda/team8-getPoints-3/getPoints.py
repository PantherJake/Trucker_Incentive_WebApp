#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import json
from pprint import pprint
import boto3

"""
Team 8
Max Hilgenberg
"""
rds_host  = rds_config.db_endpoint
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
port = 3306

logger = logging.getLogger()
logger.setLevel(logging.INFO)

client = boto3.client("lambda")
def connect():
    conn = ""
    try:
        conn = pymysql.connect(host=rds_host, user=name,passwd=password, db=db_name)
    
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    return conn
def getPoints(event, context):
 
    conn = connect();
    
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    
    querystr = "select U.user_id, U.user_fname, U.user_lname, U.user_role_id, D.pts_balance, U.user_org_id, U.user_state " \
                "from driver_data D inner join users U on D.user_id = U.user_id inner join roles R on U.user_role_id = R.role_id"
    querywhere = "where U.user_state = %s and D.user_id = %s and R.role_id = %s "
    param = ("active", event['driverid'], str(3))
    logger.info(param)
    querystr = querystr + " " + querywhere
    logger.info(querystr)
  
    driverinfo = ""
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        returnresult = "error not found"
        for row in cur:
            logger.info(row) 
            cnt = 0
            for col in row:
                driverinfo = driverinfo + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
    cur.close()
    # if the last value is a , remove it.
    if driverinfo[len(driverinfo)-1] == ',':
        driverinfo = driverinfo[0:len(driverinfo)-1]
        
    retval = '{' + '"driver_count":' + str(rowcnt) + ',' + driverinfo + "}"
    conn.close()
    return driverinfo
