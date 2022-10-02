#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import json
from pprint import pprint
import boto3
import time

"""
Team 8
Kyle Brown
2022-09-25 ksb
Updated to add sorting capabilities
example: {"sort":["organization_name","catalog_id"]}
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
    
def getorg(event, conn ):
    """
    This function will return the org given a provided filter
    The filter should be and can be combined:
        None = Return all orgs in the system
        { "id" : "<value>"  Return users of an org
    """
    #logger.info("GetOrg EVENT: " + str(event))
    

    if conn != None:
        CloseOnExit = False
    else:
        conn=connect()
        CloseOnExit=True
        
    querystr = "select organization_id, organization_name, organization_addressid, catalog_id " \
                "from organization "
    querywhere = ""
    param = ""

    id = ""
    if 'orgid' in event:
        id = event['orgid']
        querywhere = "where organization_id = %s"
        param = (id)

    querystr = "select organization_id, json_object('organization_id', organization_id, 'organization_name',organization_name, 'organization_addressid', organization_addressid, 'catlog_id', catalog_id) " \
    "from organization "
    

    sortcnt = 0
    querysortcol = ""
    if 'sort' in event:
        for s in event['sort']:
            #print("Sort:" + s)
            querysortcol = querysortcol + s + ","
            sortcnt = sortcnt + 1
    querysort = ""
    if sortcnt > 0:
        querysort = "order by " + querysortcol[:len(querysortcol) -1]
        
    # put all the pieces together
    querystr = querystr + " " + querywhere + " " + querysort
    
    #logger.info(querystr)
    # take this value and pass into a parameterized query to look for a particular id
    # maybe even put some smarts into is such that it looked to see if you passed a number then look based on user id or characters to search based on username
    #retval = event['id']
    retval = ""
    with conn.cursor() as cur:

        if id == "":
            rowcnt = cur.execute(querystr)
        else:
            rowcnt = cur.execute(querystr, param)

        org_json = {}
        for row in cur:
            org_json['o' + str(row[0])] = json.loads(row[1])
        
        #pprint(org_json)
        for org in org_json:
            #pprint(org)
            if org_json[org]['organization_addressid'] != None:
                    #print("get address: " + str(user_json[i]['address_id']))
                    address = getAddress({'address_id':org_json[org]['organization_addressid']})
                    org_json[org]['address'] = address


    if len(org_json) > 0:
        retval = {"orgs": org_json}
    else:
        retval = {"status":404, "message":"Organization Not Found"}
    
    if CloseOnExit:
        #print("Close ON Exit")
        conn.close()
    return retval

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
