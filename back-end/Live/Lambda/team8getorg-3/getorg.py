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
def getorg(event, context):
    """
    This function will return the org given a provided filter
    The filter should be and can be combined:
        None = Return all orgs in the system
        { "id" : "<value>"  Return users of an org
    """

    conn=connect()
    
    querystr = "select organization_id, organization_name, organization_addressid, catalog_id " \
                "from organization "
    querywhere = ""
    param = ""

    if 'id' in event:
        id = event['id']
        querywhere = "where organization_id = %s"
        param = (id)
    else:
        id = ""

    sortcnt = 0
    for s in event['sort']:
        querysortcol = s + ","
        sortcnt = sortcnt + 1
    
    querysort = ""
    if sortcnt > 0:
        querysort = "sort by " + querysortcol[:len(querysortcol) -1]
        
    # put all the pieces together
    querystr = querystr + " " + querywhere + " " + querysort

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
        
        for row in cur:
            logger.info(row)
            cnt = 0
            for col in row:
                logger.info("name[cnt]:" + names[cnt][0])
                if names[cnt][0] == "organization_addressid":
                    address = getAddress({'address_id':col})
                    #address = "{1 nowhere street}"
                    logger.info("Address: " + str(address))
                    retval = retval + '"address":' + address + ','
                else: 
                    retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                cnt = cnt + 1
                
    # if the last value is a , remove it.
    if retval != "":
        if retval[len(retval)-1] == ',':
            retval = retval[0:len(retval)-1]
            
        retval = '{' + '"org_count":' + str(rowcnt) + ',' + retval + "}"
    else:
        retval = '{"status":404, "message":"Organization Not Found"}'
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
    print("\n")
    print(responsefromorg)
    return responsefromorg