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

def getRanks(event, context):
    
    conn = connect()    

    querystr = 'select U.user_id from driver_data D inner join users U on D.user_id = U.user_id inner join organization O on U.user_org_id = O.organization_id'
	
    querywhere = "where U.user_state = %s and O.organization_id = %s order by %s"
    param = ("active", event['orgid'], "pts_balance DESC")
    
    querystr = querystr + " " + querywhere
    logger.info(querystr)

    retval = ""
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        rank = 1
        for row in cur:
            logger.info("Rank : " + str(rank) + " " + str(row))
            cnt = 0
            
            # retval = retval + '"Rank: ' + str(rank) + ' '
            for col in row:
                # retval = retval +'"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                logger.info(names[cnt][0])
                if(names[cnt][0] == "user_id"):
                    if(str(col) == event['driverid']):
                        retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ',' + "Rank" + '":"' + str(rank) + '"'
                        return "{" + retval + "}"
                cnt = cnt + 1
            rank = rank +1
    cur.close()
    # if the last value is a , remove it.
    if retval == "":
        retval = '{"status":404, "message":"User/Rank Not Found"}'
    conn.close()
    return retval