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
def addUser(event, context):
    conn = connect()
    with conn.cursor() as cur:
        # data from the json input file 
        userfname = event['fname']
        usermname = event['mname']
        userlname = event['lname']
        roleID = event['role_id']
        Email = event['email']
        orgID = event['org_id']
        state = event['state']
        
        query = 'insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values(%s, %s, %s, %s, %s, %s, %s)'
        param = (userfname, usermname, userlname, roleID, Email, orgID, state)
        cur.execute(query, param)
        conn.commit()
        # find the last inserted ID in the user table 
        getID = "select LAST_INSERT_ID()"
        cur.execute(getID)
        result = cur.fetchone()
        logger.info(result)
        returnresult = "no user found"
        item_count = 0
        userID = 0
        for row in result:
            item_count += 1
            logger.info("RoleID: " + str(roleID))
            if(roleID == "3"):
                logger.info("\nthis is a driver\n")
                address = addAddress(event)
                addDriverInfo(event, row, address)
            returnresult = getuser({'id' : row})
            logger.info(returnresult)
        conn.close
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

def addAddress(event):
    conn = connect()
    query = 'insert into address(street, streetnumber, city, state, zipcode) values(%s, %s, %s, %s, %s)'
    with conn.cursor() as cur:
        param = (event['street'], event['streetnumber'], event['city'], event['USstate'], event['zipcode'])
        cur.execute(query, param)
        conn.commit()
        # find the last inserted ID in the user table 
        getID = "select LAST_INSERT_ID()"
        cur.execute(getID)
        result = cur.fetchone()
        logger.info(result)
        returnresult = "no user found"
        item_count = 0
        userID = 0
        for row in result:
            item_count += 1
            logger.info("AddressID: " + str(row))
            return row
        conn.close
    return 0
    
def addDriverInfo(event, user, address):
    conn = connect()
    query = 'insert into driver_data(user_id, pts_balance, licenseplate, dl_num, driver_address_id) values(%s, %s, %s, %s, %s)'
    with conn.cursor() as cur:
        param = (user, event['pts_balance'], event['licenseplate'], event['dl_num'], address)
        cur.execute(query, param)
        conn.commit()
        conn.close