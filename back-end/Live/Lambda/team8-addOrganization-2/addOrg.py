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
    
    
def addOrganization(event, context):
    conn = connect();
    
    retval = '{"status":404, "message":"Organization could not be saved"}'
    
    if(checkAdmin(event) == False):
        return retval
    
    name = event['name']
    catalog = event['catalog']
    address = addAddress(event)
    logger.info("Address: " + str(address))
    if(address == 0):
        retval = '{"status":404, "message":"Address could not be saved"}'
        return retval
    
    insertquery = "insert into organization(organization_name, organization_addressid, catalog_id)" \
    "values (%s, %s, %s) "
    param = (name, address, catalog)
    logger.info(str(insertquery) + " " + str(param))
    with conn.cursor() as cur:
        rowcnt = cur.execute(insertquery, param)
        conn.commit()
        idquery = "select LAST_INSERT_ID()"
        cur.execute(idquery)
        logger.info("Success or not: " + str(rowcnt))
        if(rowcnt == 1):
            cur.execute(idquery)
            cnt = 0
            for row in cur:
                for col in row:
                    logger.info("Organization: " +str(col))
                    retval = getorgfromFn({'id':str(col)})
                    cnt = cnt + 1
            
        conn.close()
    logAudit({'user_id': event['user'], 'operation' : 'addOrganization', 'state' : 'created', 'message' : str(event) })
    logger.info("Event: " + str(event))
    retval = "{"  + str(retval) + "}"
    logger.info(retval)
    return retval
        
def addAddress(event):
    if ('street' not in event) or ('streetnumber' not in event) or ('city' not in event) or ('USstate' not in event) or ('zipcode' not in event):
        return 0
        
    conn = connect()
    query = 'insert into address(street, streetnumber, city, state, zipcode) values(%s, %s, %s, %s, %s)'
    with conn.cursor() as cur:
        param = (event['street'], event['streetnumber'], event['city'], event['USstate'], event['zipcode'])
        rowcnt = cur.execute(query, param)
        conn.commit()
        logger.info("Cnt" +str(rowcnt))
        # if(rowcnt != 1):
        #     return 0
        # find the last inserted ID in the user table 
        getID = "select LAST_INSERT_ID()"
        cur.execute(getID)
        result = cur.fetchone()
        logger.info(result)
        item_count = 0
        userID = 0
        for row in result:
            item_count += 1
            logger.info("AddressID: " + str(row))
            return row
        conn.close
    return 0

def getorgfromFn(inputParams):
        #inputParams = { 'id' : '1'}
    
    org = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8getorg",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    
    responsefromorg = json.load(org['Payload'])
    print("\n")
    print(responsefromorg)
    return responsefromorg
    
def checkAdmin(event):
    conn = connect()
    querystr = "select user_role_id from users U inner join roles R on U.user_role_id = R.role_id "
    querywhere = "where user_id = %s and user_state = %s"
    param = (event['user'], "active")
    
    querystr = querystr + " " + querywhere
    
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        for row in cur:
            logger.info(row) 
            cnt = 0
            userID=0
            for col in row:
                if names[cnt][0] == "user_role_id":
                    logger.info("role ID: " + str(col))
                    if col == 1:
                        return True
                cnt = cnt + 1
    cur.close()
    return False
    
def logAudit(inputParams):
    user = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8-addAuditLog",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    responsefromorg = json.load(user['Payload'])
    logger.info("Audit: " +str(responsefromorg))