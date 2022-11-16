<template>
    <html>
    <head>  
      <meta name="viewport" content="width=device-width, initial-scale=1">  
      <title> Driver Dashboard </title>    
    </head>    
      <body>
        <div class="dot">
          <div class="dot-text"><a href="#profile">Profile</a></div>
        </div>
        <div class="dot" @click="signOut">
          <router-link :to="{ name: 'LogInPage' }">
            <div class="dot-text">Sign Out</div>
          </router-link>
        </div>
        <center> <img src="../../assets/appLogoSmall.png" /> </center>
        <center><h1> Sponsor HomePage </h1></center>
            <center><div class="topnav">
                <a href="/sponsordashboard">Home</a>
                <a class="active" href="/sponsordashboard/points">Points</a>
                <a href="/sponsordashboard/catalog">Catalog</a>
                <a href="/sponsordashboard/drivers">Drivers</a>
            </div></center>
            <center><ul class="breadcrumb">
              <li><a href="/sponsordashboard/points">Points</a></li>
            </ul></center>
            <div class="leaderboard">
              <center><p class="mainbox-text">Top 10 Drivers by Point Amount</p></center>
<!--                {{this.topObj.body["Ranking"]}}-->
            </div>
            <div class="mainbox">
              <center><p class="mainbox-text">changing Points</p></center>
<!--              TODO: If you can make this a option menut with the drivers name and then pass me the driverid that would be best -- Max-->
              <input v-model="driverptsid" placeholder="Driver to change Points"/>
              <input v-model="value" placeholder="+/- Value"/>
              <input v-model="reason" placeholder="Reasoning behind it"/>
              <button @click="changePts()">Submit</button>
              <br> {{this.chnObj.body.message}}
            </div>
      </body>     
    </html> 
</template>

<script>
import {Auth} from "aws-amplify";
import router from "@/router";

export default {
  name: 'DriverPoints',
  data() {
    return {
      orgID: '', // need to attach that to current user
      driverID: '', // need to attach that to current user

      userObj: '',
      user: [],
      name: '',

      AppObj: '',
      applications: [],

      dbObj: '',
      db: [],
      chnObj: '',
      value: '',
      reason: '',
      driverptsid: ''

    }
  },
  async created() {
    try {
      this.userObj = await Auth.currentAuthenticatedUser()
          .then(response => this.userObj = JSON.stringify(response))
          .catch(e => console.log(e))
      this.user = JSON.parse(this.userObj)
      this.name = this.user.attributes.given_name
    } catch(e) {
      console.log(e)
      console.log("FATAL: No user authenticated")
      await router.push('/login')
    }
// Max functions
//    need to specify which organization they want to see the Point data or if we should just show all of it!

    try {
      this.dbObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/me", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
          'username': this.user.username
        },
      }).then((response) => response.json()).catch(e => console.log(e))
    } catch (error) {
      console.log(error)
      this.errorMessage="Error fetching user data from database"
    }
    if(this.dbObj.statusCode === 200) {
      console.log("User data retrieved succesfully:")
      console.log(this.dbObj.body.users)
    }
    this.driverID = this.dbObj.body.users[`${this.user.username}`]["user_id"]
    this.orgID = this.dbObj.body.users[`${this.user.username}`]["org_id"]
    //function to get points of a driver for many organizations
    //function to get top 10 drivers of a driver
    try {
      console.log("Getting topOBJ information from DB")
      this.topObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgID + "/drivers/" + this.driverID + "/topdrivers", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
          'username': this.user.username
        },
      }).then((response) => response.json()).catch(e => console.log(e));
      // this.rank = JSON.parse(this.rankObj)
      console.log(this.topObj)
      // console.log(this.rank)
    } catch (error) {
      console.log(error);
    }
    if(this.topObj.statusCode === 200)
      console.log("Successfully got the top drivers")
    console.log(this.topObj.body["Ranking"])

    this.changePts()

  },
  methods: {
    async changePts(){
//TODO: need to figure out how to send data to API with passthrough
      console.log(this.driverptsid)
      console.log(this.value)
      console.log(this.reason)
      console.log(this.orgID)
      console.log(this.user.username)
      try{
        console.log("Preparing to change pts on the DB")
        this.chnObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgID + "/drivers/" + this.driverptsid + "/points", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
            'username': this.user.username
          },
          body: JSON.stringify({
            path: {},
            params: {
              querystring: {
                driverid: this.driverptsid,
                value: this.value,
                reason: this.reason,
                orgid: this.orgID
              },
              path: {},
              header: {
                username: this.user.username
              }
            },
          })
        }).then((response) => response.json()).catch(e => console.log(e));
      } catch (error) {
        console.log(error);
        this.dbError = "Could not establish database connection, please contact support";
      }
      console.log("Connection established")
      console.log(this.chnObj)
    },
    async signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
  }
}
</script>

<style>   
Body {  
  font-family: Calibri, Helvetica, sans-serif;  
  background-color: #008037; 
  font-size: 20px; 
}           
.topnav {      
    background-color: #7ed957;  
    border-style: solid;
    text-align: center;
    justify-content: center;
    display: flex;
    filter: drop-shadow(10px 8px 8px black);
}   
.topnav a {      
    color: black;
    padding: 14px 20px;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
} 
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
.topnav a.active {
  background-color: #c9e265;
  color: black;
}
.right {
  position: absolute;
  right: 0px;
  width: 300px;
  padding: 10px;
}
a {
  color: black;
  text-decoration: none;
}
a:hover{
  color: white;
}
ul.breadcrumb{
  list-style: none;
  background-color: #008037;
}
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}
ul.breadcrumb li+li:before {
  padding: 5px;
  color: black;
  content: "/\00a0";
}
.dot {
  height: 75px;
  width: 75px;
  background-color: #7ed957;
  border-radius: 50%;
  float: right;
  line-height: 0;
  position: relative;
  margin-top: 10px;
  margin-right: 20px;
  background: linear-gradient(135deg, #c9e265 10%,#008037 100%);
  filter: drop-shadow(10px 8px 8px black);
}
.dot-text{
  position: absolute;
  bottom: 50%;
  width: 100%;
  text-align: center;
  font-weight: bold;
}
.mainbox{
  background-color:#7ed957;
  width: 350px;
  height: 300px;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color:#c9e265;
  position: fixed;
  right: 400px;
  display: block;
  filter: drop-shadow(10px 8px 8px black);
}
.mainbox-text{
    font-weight: bold;
    font-size: 22px;
}
.leaderboard{
  background-color:#7ed957;
  width: 350px;
  height: 300px;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color:#c9e265;
  position: fixed;
  left: 400px;
  display: block;
  filter: drop-shadow(10px 8px 8px black);
}
</style> 