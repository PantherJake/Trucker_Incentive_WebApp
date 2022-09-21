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
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    return conn

def getAddress(event, context):
 
    conn = connect()
    
    AddressID = event['address_id']

    querystr = "select address_id id, street street, streetnumber numb, city, city, state state, zipcode zip " \
                "from address "
    querywhere = "where address_id = %s"
    querystr = querystr + " " + querywhere
    logger.info(querystr)
  
    retval = ""
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, AddressID)
        names = cur.description
        logger.info(names)
        cnt = 0
        for row in cur:
            logger.info(row) 
            cnt = 0
            for col in row:
                logger.info("Address: " + str(col))
                retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
    conn.close()
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            
        retval = '{' + '"AddressInfo":' + retval + "}"
    else:
        retval = '{"status":404, "message":"Address Not Found"}'
    return retval