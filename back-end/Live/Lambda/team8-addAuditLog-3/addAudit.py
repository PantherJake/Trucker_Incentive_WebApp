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
    
    
def addAudit(event, context):
    conn = connect();
    
    retval = '{"status":404, "message":"User does not exist"}'
    
    user = event['user_id']
    operation = event['operation']
    state = event['state']
    message = event['message']
    # logger.info("User: " + str(checkUser(user)))
    
    # if(checkUser(user) == False):
    #     return retval;
        
    
    
    insertquery = "insert into audits(user_id, operation, state, message, created_date)" \
    "values (%s, %s, %s, %s, now()) "
    param = (user, operation, state, message)
    logger.info(str(insertquery) + " " + str(param))
    with conn.cursor() as cur:
        rowcnt = cur.execute(insertquery, param)
        conn.commit()
        idquery = "select LAST_INSERT_ID()"
        cur.execute(idquery)
        logger.info("Success or not: " + str(rowcnt))
        if(rowcnt == 1):
            retval = '{"status":000, "message":"Successfully added a new Audit Log '
        result = cur.fetchone()
        logger.info("result: " +str(result))
        cnt = 0
        for row in result:
            cnt +=1
            logger.info("row: " +str(row))
            id = row
        conn.close()
    
    
    retval = retval + '"}'
    logger.info(retval)
    return retval
            
def getDriver(inputParams):
        #inputParams = { 'id' : '1'}
    user = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8-getPoints",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    
    responsefromorg = json.load(user['Payload'])
    print("\n")
    print(responsefromorg)
    return responsefromorg
            
        
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
