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
    message = logPoints(event, context)
    
    conn = connect()
    
    # querystr = "select history_id historyID, transaction_value value, transaction_reason reason, date_created date, source_user_id source, target_user_id target " \
    #             "from point_transaction_history "
    # querywhere = "where history_id = %s"
    # querystr = querystr + " " + querywhere
    # logger.info(querystr)
    # retval = ""
    # with conn.cursor() as cur:
    #     rowcnt = cur.execute(querystr, str(history_id))
    #     names = cur.description
    #     logger.info(names)
    #     cnt = 0
    #     retval = ""
    #     for row in cur:
    #         # logger.info(row) 
    #         cnt = 0
    #         # logger.info(returnresult)
    #         for col in row:
    #             retval = retval + '{' + names[cnt][0] + '":"' + str(col) + '"' + ','
    #             cnt = cnt + 1
    #     logger.info(retval)
    # conn.close()
    
    target = event['target_user_id']
    logger.info("Target: " + str(target))
    Sum = sumPoints(target)
    updateDriver(Sum, target)
    
    # if retval != "":
    #     if retval[len(retval)-1] == ',':
    #         retval = retval[0:len(retval)-1]
    #     retval = retval + "}"
    # else:
        # retval = '{"status":404, "message":"Driver Data not found"}'
    return message
            
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
            
def logPoints(event, context):
 
    conn = connect();
    
    value = event['transaction_value']
    reason = event['transaction_reason']
    date = event['date_created']
    source = event['source_user_id']
    target = event['target_user_id']
    message = "Failure"
    insertquery = "insert into point_transaction_history(transaction_value, transaction_reason, date_created, source_user_id, target_user_id) \
    values (%s, %s, now(), %s, %s)"
    
    param = (value, reason, source, target)
    logger.info(param)
    logger.info(str(insertquery) + " " + str(param))
    id = 0
    with conn.cursor() as cur:
        rowcnt = cur.execute(insertquery, param)
        conn.commit()
        # historyidquery = "select LAST_INSERT_ID()"
        # num = cur.execute(historyidquery)
        logger.info("Success or not: " + str(rowcnt))
        if(rowcnt == 1):
            message = Success
        # result = cur.fetchone()
        # logger.info("result: " +str(result))
        # cnt = 0
        # for row in result:
        #     cnt +=1
        #     logger.info("row: " +str(row))
        #     id = row
    conn.close()
    return message

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
            logger.info(row)
            sumUser = row
    conn.close()
    return sumUser