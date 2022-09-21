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

try:
    conn = pymysql.connect(host=rds_host, user=name,passwd=password, db=db_name)

except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
client = boto3.client("lambda")
def sql(event, context):
    
    with conn.cursor() as cur:
        # data from the json input file 
        userfname = event['fname']
        usermname = event['mname']
        userlname = event['lname']
        roleID = event['roleID']
        userEmail = event['email']
        orgID = event['orgID']
        # insert query to insert to user table with param array
        query = 'insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id) values(%s, %s, %s, %s, %s, %s)'
        param = (userfname, usermname, userlname, roleID, userEmail, orgID)
        cur.execute(query, param)
        conn.commit()
        # find the last inserted ID in the user table 
        query2 = "select LAST_INSERT_ID()"
        cur.execute(query2)
        result = cur.fetchone()
        logger.info(result)
        returnresult = "no user found"
        item_count = 0
        for row in result:
            item_count += 1
            logger.info(row)
            returnresult = getuser({'id' : row})
            logger.info(returnresult)
        # conn.close
    return returnresult

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
