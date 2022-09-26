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
    
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()
    return conn
def getPoints(event, context):
 
    conn = connect();
    
    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
    
    # I would suggest this be reversed.
    # Go after the user first - Passing role of driver
    # then get the points for that driver.
    # Return value will be json of driver with empty points section.
    # { driver info, "points":{"point_balance":x}}
    # then maybe another function getpointtransactions
    # { driver info, "points":{"point_balance":x, "transactions":{ transaction info list }}}
    
    #Steps to approach this:
    # Step 1 get info of the driver:
    userID = event['id']
    driverinfo = getuser({'id' : userID})
    
    #Step 2 check if the roleID is 3
    check = checkDriver(userID)
    if check == False :
        return '{"status":404, "message":"User does not seem to be a driver"}'
        
    #Step 3 if the roleID is a driver then run driver_data query:
    
    querystr = "select pts_balance Points " \
                "from driver_data "
    querywhere = "where user_id = %s"
    param = event['id']
    logger.info(param)
    querystr = querystr + " " + querywhere
    logger.info(querystr)
  
    retval = ""
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        returnresult = "error not found"
        for row in cur:
            logger.info(row) 
            cnt = 0
            # Removed this section.  Why are you getting the user info again and not using it?
            #returnresult = getuser({'userID' : row})
            #logger.info(returnresult)
            for col in row:
                logger.info("Points: " + str(col))
                driverinfo = driverinfo + '{ "driver_data":' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
    cur.close()
    # if the last value is a , remove it.
    if driverinfo[len(driverinfo)-1] == ',':
        driverinfo = driverinfo[0:len(driverinfo)-1]
        
    driverinfo = driverinfo + "}"
    conn.close()
    retval = driverinfo
    return retval

def checkDriver(userID):
    conn = connect()
    checkquery = "select user_role_id roleID from users "
    querywhere = "where user_id = %s and user_role_id = 3"
    param = str(userID)
    logger.info(param)
    checkquery = checkquery + " " + querywhere
    logger.info(checkquery)
    retval = ""
    with conn.cursor() as cur:
        rowcnt = cur.execute(checkquery, param)
        cnt = 0
        for row in cur:
            # put the condition in the sql statement, if you get anything back the user has role=3
            #logger.info('checkDriver:' + str(row))
            #cnt = 0
            #for col in row:
            #    logger.info("role ID: " + str(col))
            #if (row != 3):
            return True
                
            #    if (col != 3):
            #        return False
            #    cnt = cnt + 1
    cur.close()
    return False;
    
    

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