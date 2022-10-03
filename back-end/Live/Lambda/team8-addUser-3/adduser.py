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
    
    if(checkOrg({'id':event['org_id']}) == False):
            returnresult = '{"status":404, "message":"Organization Not Found"}'    
            return returnresult
    
    if(checkSource(event['source'], event['role_id']) == False):
        returnresult = '{"status":404, "message":"Organization/User Not Found or Permitted"}'    
        return returnresult
    
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
        
        returnresult = '{"status":404, "message":"Unable to store User in database"}'    
        
        query = 'insert into users(user_fname, user_mname, user_lname, user_role_id, user_email, user_org_id, user_state) values(%s, %s, %s, %s, %s, %s, %s)'
        param = (userfname, usermname, userlname, roleID, Email, orgID, state)
        rowcnt = cur.execute(query, param)
        conn.commit()
        if(rowcnt != 1):
            return returnresult
        # find the last inserted ID in the user table 
        getID = "select LAST_INSERT_ID()"
        cur.execute(getID)
        result = cur.fetchone()
        logger.info(result)
        item_count = 0
        userID = 0
        for row in result:
            item_count += 1
            logger.info("RoleID: " + str(roleID))
            if(roleID == "3"):
                logger.info("\nthis is a driver\n")
                address = addAddress(event)
                addDriverInfo(event, row, address)
            logger.info("UserID: " + str(row))
            logAudit({'user_id': row, 'operation' : 'CreateUser', 'state' : 'created', 'message' : str(event) })
            logger.info("Event: " + str(event))
            returnresult = getuser({'id' : row, 'status' : state})
            logger.info(returnresult)
        conn.close
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

def addAddress(event):
    conn = connect()
    query = 'insert into address(street, streetnumber, city, state, zipcode) values(%s, %s, %s, %s, %s)'
    with conn.cursor() as cur:
        param = (event['street'], event['streetnumber'], event['city'], event['USstate'], event['zipcode'])
        rowcnt = cur.execute(query, param)
        if(rowcnt != 1):
             return 0
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
    query = 'insert into driver_data(user_id, pts_balance, dl_num, driver_address_id) values(%s, %s, %s, %s)'
    with conn.cursor() as cur:
        param = (user, event['pts_balance'], event['dl_num'], address)
        rowcnt = cur.execute(query, param)
        conn.commit()
        if(rowcnt != 1):
            return '{"status":404, "message":"DriverInfo not stored"}'    
        conn.close

def checkOrg(inputParams):
    user = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:getusers",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    responsefromorg = json.load(user['Payload'])
    logger.info("Organization: " +str(responsefromorg))
    if(responsefromorg == '{"status":404, "message":"User Not Found"}'): 
            return False
    else:
        return True
        
        
def checkSource(user, role):
    conn = connect()
    querystr = "select user_role_id from users U inner join roles R on U.user_role_id = R.role_id "
    querywhere = "where user_id = %s and user_state = %s"
    param = (user, "active")
    
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
                    if col == 1 or col == 2:
                        logger.info("col: " + str(col) + " role: " +str(role))
                         if (col == 1 and role == str(1)) or (col == 1 and role == str(2)) or (col == 1 and role == str(3)) or (col == 2 and role == str(2)) or (col == 2 and role == str(3)):
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