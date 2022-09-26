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
Kyle Brown
"""
rds_host  = rds_config.db_endpoint
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
port = 3306

logger = logging.getLogger()
logger.setLevel(logging.INFO)

client = boto3.client("lambda")
def getHistory(event, context):

    try:
        conn = pymysql.connect(host=rds_host, user=name,passwd=password, db=db_name)
    
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    
    querystr = "select history_id id, transaction_value value, transaction_reason reason, date_created date, source_user_id source, target_user_id target" \
                "from point_transaction_history "
    querywhere = ""
    param = ""
    logger.info(event)
    if 'id' in event and event['id'] != "":
        id = event['id']
        querywhere = "where history_id = %s"
        param = (id)
        logger.info(param)
    else:
        id = ""

    # put all the pieces together
    querystr = querystr + " " + querywhere
    logger.info(querystr)
    # take this value and pass into a parameterized query to look for a particular id
    # maybe even put some smarts into is such that it looked to see if you passed a number then look based on user id or characters to search based on username
    #retval = event['id']
    retval = ""
    with conn.cursor() as cur:
        if id == "":
            rowcnt = cur.execute(querystr)
        else:
            rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        for row in cur:
            logger.info(row) 
            cnt = 0
            for col in row:
                retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
    cur.close()
    # if the last value is a , remove it.
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            
        retval = '{' + '"history_count":' + str(rowcnt) + ',' + retval + "}"
    else:
        retval = '{"status":404, "message":"User Not Found"}'
    conn.close()
    return retval