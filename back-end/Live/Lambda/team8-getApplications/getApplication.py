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
    try:
        conn = pymysql.connect(host=rds_host, user=name,passwd=password, db=db_name)
    
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    return conn

def main(event, context):
    
    conn = connect()    

    querystr = "select U.user_id, U.user_fname, U.user_mname, U.user_lname, U.user_email, D.dl_num, U.user_state, U.user_org_id " \
	"from users U inner join driver_data D on U.user_id = D.user_id"
	
    querywhere = "where U.user_org_id = %s and U.user_state = %s"
    # logger.info(querystr)
    param = (event['orgid'], "pending")
    
    querystr = querystr + " " + querywhere
    logger.info(querystr)

    retval = ""
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        for row in cur:
            cnt = 0
            for col in row:
                retval = retval +'"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
    cur.close()
    # if the last value is a , remove it.
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            
        retval = '{' + '"application_count":' + str(rowcnt) + ',' + retval + "}"
    else:
        retval = '{"status":404, "message":"Application(s) Not Found"}'
    conn.close()
    return retval