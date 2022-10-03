#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import boto3
import json

rds_host  = rds_config.db_endpoint
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
port = 3306

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def connect():
    conn = ""
    try:
        conn = pymysql.connect(host=rds_host, user=name,passwd=password, db=db_name)
    
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    return conn

client = boto3.client("lambda")

def update(event, context):
    
    applicant = event['driverid']
    state = event['state']
    returnresult = '{"status":404, "message":"Failure to change Application"}'
    #check if Driver actually exists?
    if getuser({'id': applicant, 'status': "pending"}) == '{"status":404, "message":"User Not Found"}':
        return returnresult
    
    conn = connect()
    query = 'UPDATE users SET user_state = %s WHERE user_id = %s'
    status = state
    if state == "approved":
        status = "active"
    else:
        status = "rejected"
    param = (status, applicant)
    with conn.cursor() as cur:
        cnt = cur.execute(query, param)
        if cnt == 0:
            sys.exit()
        conn.commit()
    conn.close()
    
    logAudit({'user_id': applicant, 'operation' : 'changedDriver', 'state' : str(state), 'message' : str(event) })
    
    returnresult = getuser({'userid':applicant, 'status' : str(status)})
        
    return returnresult

def getuser(inputParams):
        #inputParams = { 'id' : '1'}
    
    user = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8-getuser",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    
    responsefromorg = json.load(user['Payload'])
    print("\n")
    print(responsefromorg)
    return responsefromorg

def logAudit(inputParams):
    user = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8-addAuditLog",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    responsefromorg = json.load(user['Payload'])
    logger.info("Audit: " +str(responsefromorg))