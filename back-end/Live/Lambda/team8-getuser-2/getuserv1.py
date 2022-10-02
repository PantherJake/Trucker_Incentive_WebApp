#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import json
from pprint import pprint
import boto3
import getorg

"""
Team 8
Kyle Brown
Updated the method for getting user information and orgs
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
    #querystr = "select u.user_id, u.user_fname, u.user_mname, u.user_lname, u.user_role_id, u.user_org_id, u.user_state, d.pts_balance, " \
    #                  "d.address_id addressID " \
    querystr = "select u.user_id, (json_object('user_id',u.user_id, 'fname', u.user_fname, 'mname', u.user_mname, 'lname', u.user_lname, " \
          "'user_role_id', u.user_role_id, 'user_org_id', u.user_org_id, 'user_state', u.user_state, 'pts_balance', d.pts_balance, " \
          "'address_id', d.address_id))" \
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
        if org.isnumeric():
            org = str(org)
        print('ORG:' + org)
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
        
        user_json = {}    
        for row in cur:
            #print(type(row[0]))
            user_json['u' + str(row[0])] = json.loads(row[1])
        #print("Users:" + str(len(user_json)))
        #print("Type:" + str(type(user_json)))
        
        cnt = 0
        for u in user_json:
            #print(str(i))
            if user_json[u]['address_id'] != None:
                    #print("get address: " + str(user_json[i]['address_id']))
                    address = getAddress({'address_id':user_json[u]['address_id']})
                    user_json[u]['address'] = address
            if 'orgid' not in event:
                    #print("get org")
                    orgInfo = getorgfromFn({'orgid' : user_json[u]['user_org_id']}, conn)
                    #print("orgInfo:" + str(orgInfo))
                    user_json[u]['organization'] = orgInfo['orgs']
            #retval.appends(u)
    #pprint(user_json)
    cur.close()

    if 'orgid' in event and event['orgid'] != "":
        orgInfo = getorgfromFn({'orgid' : event['orgid']}, conn)

    # initialize and setup the return value
    if 'orgid' in event:
        orgInfo["orgs"]["o" + org]["users"] = user_json
        retval = orgInfo
    else:
        retval = {"users": user_json}


    conn.close()
    return retval

def getorgfromFn(inputParams, conn):
        #inputParams = { 'id' : '1'}
    
    #org = client.invoke(
        #FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8getorg",
        #InvocationType = "RequestResponse",
        #Payload = json.dumps(inputParams)
    Payload = getorg.getorg(inputParams, conn)
    #)
    
    responsefromorg = Payload
    #print("\n")
    #print(responsefromorg)
    return responsefromorg
    
def getAddress(inputParams):
        #inputParams = { 'id' : '1'}
    
    org = client.invoke(
        FunctionName = "arn:aws:lambda:us-east-1:274815321855:function:team8-getAddress",
        InvocationType = "RequestResponse",
        Payload = json.dumps(inputParams)
    )
    
    responsefromorg = json.load(org['Payload'])
    #print("\n")
    #print(responsefromorg)
    return responsefromorg
    
    