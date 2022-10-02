#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import json
from pprint import pprint
import boto3
import datetime

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
        logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    
    return conn
    
    
def getAudit(event, context):
    conn = connect();
    
    retval = '{"status":404, "message":"User does not exist"}'
    
    #message to large to be printed as of now A.message
    querystr = "select A.audit_id, A.user_id , A.operation, A.state, A.created_date, U.user_org_id " \
                "from audits A inner join users U on A.user_id = U.user_id"
    querywhere = "where U.user_org_id = %s "
    param = (event['orgid'])
    # narrowed it down to organization, since a organization does not want to see all the logs, correct?
    if 'userid' in event and event['userid'] != "":
        querystr = "select A.audit_id, A.user_id , A.operation, A.state,A.message, A.created_date, U.user_org_id " \
                "from audits A inner join users U on A.user_id = U.user_id"
        id = event['userid']
        querywhere = querywhere + "and A.user_id = %s"
        param = (event['orgid'], id)
    else:
        id = ""
    querystr = querystr + " " + querywhere
    retval = ""
    logger.info("\Query: " + str(querywhere) + " Params: " + str(param))
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, param)
        names = cur.description
        # logger.info(names)
        cnt = 0
        for row in cur:
            logger.info(row) 
            cnt = 0
            for col in row:
                retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
                # logger.info(retval)
    cur.close()
    # if the last value is a , remove it.
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            
        retval = '{' + '"audit_count":' + str(rowcnt) + ',' + retval + "}"
    else:
        retval = '{"status":404, "message":"User/Organization Not Found"}'
    conn.close()
    return retval
        
def checkUser(inputParams):
    user = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:getusers",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    responsefromorg = json.load(user['Payload'])
    if(responsefromorg == '{"status":404, "message":"User Not Found"}'):
            return False
    else:
        return True
