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
    
    
def changePts(event, context):
    conn = connect();
    
    retval = '{"status":404, "message":"Failure to change points"}'
    
    value = event['transaction_value']
    reason = event['transaction_reason']
    source = event['source_user_id']
    target = event['target_user_id']
    
    logger.info("\nTarget: " + getuser({'id': target}))
    logger.info("\nSource: " + getuser({'id': source}))
    
    if((getuser({'id': target}) == '{"status":404, "message":"User Not Found"}') 
        or (getuser({'id': source}) == '{"status":404, "message":"User Not Found"}')):
            return retval
    
    insertquery = "insert into point_transaction_history(transaction_value, transaction_reason, date_created, source_user_id, target_user_id) " \
    "values (%s, %s, now(), %s, %s) "
    param = (value, reason, source, target)
    logger.info(str(insertquery) + " " + str(param))
    with conn.cursor() as cur:
        rowcnt = cur.execute(insertquery, param)
        conn.commit()
        historyidquery = "select LAST_INSERT_ID()"
        cur.execute(historyidquery)
        logger.info("Success or not: " + str(rowcnt))
        if(rowcnt == 1):
            retval = '{"status":000, "message":"Successfully changed points. New Balance: '
        result = cur.fetchone()
        logger.info("result: " +str(result))
        cnt = 0
        for row in result:
            cnt +=1
            logger.info("row: " +str(row))
            id = row
        conn.close()
    
    logger.info(retval)
    target = event['target_user_id']
    logger.info("Target: " + str(target))
    Sum = sumPoints(target)
    retval = retval + str(Sum) + '"}'
    updateDriver(Sum, target)
    return retval
            
def updateDriver(Sum, target):
    conn = connect()
    query = 'UPDATE driver_data SET pts_balance = %s WHERE user_id = %s'
    param = (Sum, target)
    with conn.cursor() as cur:
        cur.execute(query, param)
        conn.commit()
        # update = getDriver({'id': target})
        # logger.info(update)
    conn.close()
    
 
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
            
def getuser(inputParams):
        #inputParams = { 'id' : '1'}
    
    user = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:getusers",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    
    responsefromorg = json.load(user['Payload'])
    print("\n")
    print(responsefromorg)
    return responsefromorg

def sumPoints(userID):
    query = "select SUM(transaction_value) from point_transaction_history "
    where = "where target_user_id = %s"
    query = query + " " + where
    conn = connect()
    param = userID
    sumUser=0
    with conn.cursor() as cur:
        cur.execute(query, param)
        for row in cur:
            for col in row:
                logger.info("Sum in sum functionr: " + str(col))
                sumUser = col
                
    conn.close()
    return sumUser