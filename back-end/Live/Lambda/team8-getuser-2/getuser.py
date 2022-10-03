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
    logger.info("EVENT: " + str(event))
    conn = connect()
    querystr = "select u.user_id, u.user_fname, u.user_mname, u.user_lname, u.user_role_id, u.user_org_id, u.user_state, d.pts_balance, d.address_id addressID " \
    "from users u left join (select d.user_id, d.pts_balance, a.address_id, a.streetnumber, a.street, a.city , a.state, a.zipcode " \
    "from driver_data d left join address a on d.driver_address_id = a.address_id) d on u.user_id = d.user_id "
    querywhere = "where user_state = %s"
    status = "active"
    if 'status' in event and event['status'] != "":
        status = event['status']
    param = (status,)
    logger.info(event)
    if 'orgid' in event and event['orgid'] != "":
        org = event['orgid']
        querywhere = querywhere + " and u.user_org_id = %s"
        param = param+(org,)
        logger.info(param)
    else:
        org = ""
    if 'userid' in event and event['userid'] != "":
        id = event['userid']
        querywhere = querywhere + " and u.user_id = %s"
        param = param + (id,)
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
        
        rowcnt = cur.execute(querystr, param)
        names = cur.description
        logger.info(names)
        cnt = 0
        for row in cur:
            logger.info(row) 
            cnt = 0
            for col in row:
                if str(col) != "None":
                    if names[cnt][0] == "addressID":
                        address = getAddress({'address_id':col})
                        retval = retval + '"address":' + address + ','
                    if names[cnt][0] == "user_org_id" and 'orgid' not in event:
                        orgInfo = getorgfromFn({'orgid' : col})
                        retval = retval + '"organization":' + orgInfo + ','
                    else:
                        retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                    logger.info(retval)
                cnt = cnt + 1
            
    cur.close()
    
    # checkDriver()
    
    # if the last value is a , remove it.
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            if 'orgid' in event and event['orgid'] != "":
                orgInfo = getorgfromFn({'orgid' : event['orgid']})
                retval = '{' '"org:"' + orgInfo + ',"users:"' + '"user_count":' + str(rowcnt) + ',' + retval + "}"
            else:
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
    
def getAddress(inputParams):
        #inputParams = { 'id' : '1'}
    
    org = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8-getAddress",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    
    responsefromorg = json.load(org['Payload'])
    print("\n")
    print(responsefromorg)
    return responsefromorg
    
    