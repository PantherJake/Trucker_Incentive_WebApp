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
Kyle Brown
"""
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
def getusers(event, context):
    
    conn = connect()
    querystr = "select user_id id, user_fname fname, user_mname mname, user_lname lname, user_role_id role, R.role_name rolename, user_email email, user_org_id org_id " \
                "from users U inner join roles R on U.user_role_id = R.role_id "
    querywhere = ""
    param = ""
    logger.info(event)
    if 'id' in event and event['id'] != "":
        id = event['id']
        querywhere = "where user_id = %s"
        param = (id)
        logger.info(param)
    else:
        id = ""

    # put all the pieces together
    querystr = querystr + " " + querywhere
    logger.info(querystr)
    # take this value and pass into a parameterized query to look for a particular id
    # maybe even put some smarts into is such that it looked to see if you passed a number then look based on user id or characters to search based on username
    #retval = event['id']
    retval = ""
    with conn.cursor() as cur:
        if id == "":
            rowcnt = cur.execute(querystr)
        else:
            rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        for row in cur:
            logger.info(row) 
            cnt = 0
            userID=0
            for col in row:
                
                if names[cnt][0] == "id":
                    logger.info("user ID: " + str(col))
                    userID = col
                if names[cnt][0] == "role":
                    logger.info("role ID: " + str(col))
                    if col == 3:
                        address = getAddress(userID)
                        retval = retval + '"address":' + address + ','
                if names[cnt][0] == "org_id":
                    orgdet = getorgfromFn({'id':str(col)})
                    retval = retval + '"org":' + orgdet + ','
                    logger.info("Organization: " + str(orgdet))
                else:
                    retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
    cur.close()
    
    # checkDriver()
    
    # if the last value is a , remove it.
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            
        retval = '{' + '"user_count":' + str(rowcnt) + ',' + retval + "}"
    else:
        retval = '{"status":404, "message":"User Not Found"}'
    conn.close()
    return retval

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
    
def getAddress(user):
    conn = connect()
    
    querystr = "select  streetnumber numb, street street, city city, state state, zipcode zip from driver_data D inner join address A on D.driver_address_id = A.address_id where D.user_id = %s"
 
    retval = ""
    with conn.cursor() as cur:
        rowcnt = cur.execute(querystr, user)
        names = cur.description
        logger.info(names)
        cnt = 0
        for row in cur:
            logger.info(row) 
            cnt = 0
            for col in row:
                logger.info("Driver Address: " + str(col))
                retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
    conn.close()
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            
        retval = '{' + '"Driver Address":' + retval + "}"
    else:
        retval = '{"status":404, "message":"Address Not Found"}'
    return retval
    
    