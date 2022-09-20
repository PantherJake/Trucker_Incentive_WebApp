#!/usr/bin/python
import sys
import logging
import rds_config
import pymysql
import json
from pprint import pprint

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

try:
    conn = pymysql.connect(host=rds_host, user=name,passwd=password, db=db_name)

except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
def getorg(event, context):
    """
    This function will return the org given a provided filter
    The filter should be and can be combined:
        None = Return all orgs in the system
        { "id" : "<value>"  Return users of an org
    """

    querystr = "select org_id, org_name " \
                "from organization "
    querywhere = ""
    param = ""

    if 'id' in event:
        id = event['id']
        querywhere = "where org_id = %s"
        param = (id)
    else:
        id = ""

    # put all the pieces together
    querystr = querystr + " " + querywhere

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
        cnt = 0
        for row in cur:
            for col in row:
                retval = retval + '"' + names[cnt][0] + '":"' + str(col) + '"' + ','
                logger.info(row)    
                cnt = cnt + 1
                
    # if the last value is a , remove it.
    if retval[len(retval)-1] == ',':
        retval = retval[0:len(retval)-1]
    retval = '{' + '"org_count":' + str(rowcnt) + ',' + retval + "}"
    #conn.close()
    return retval
