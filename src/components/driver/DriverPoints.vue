<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Driver Dashboard </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body>
  <router-link :to="{ name: 'CartPage'}">
    <i class="fa fa-shopping-cart" style="font-size:70px;color:black"></i>
  </router-link>
  <div class="dot">
    <router-link :to="{ name: 'ProfilePage' }">
      <div class="dot-text">Profile</div>
    </router-link>
  </div>
  <div class="dot" @click="signOut">
    <router-link :to="{ name: 'LogInPage' }">
      <div class="dot-text">Sign Out</div>
    </router-link>
  </div>
  <img class="logo" src="../../assets/appLogoSmall.png" alt=""/>
  <h1> {{this.name}}'s Points Information: </h1>
  <div class="topnav">
    <router-link :to="{ name: 'DriverDashboardPage'}">
      <a href="/driverdashboard">Home</a>
    </router-link>
    <router-link :to="{ name: 'DriverPointsPage'}">
      <a class="active" href="driverdashboard/points">Points</a>
    </router-link>
    <router-link :to="{ name: 'DriverCatalogPage'}">
      <a href="driverdashboard/catalog">Catalog</a>
    </router-link>
  </div>
  <br>
  <div class="mainbox">
    <p class="mainbox-text">My Points</p>
    {{this.pntObj.body["Points"]}}
  </div>
  <div class="mainbox">
    <p class="mainbox-text">Your Ranking: </p>
    Rank: {{this.rankObj.body}}
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

      rankObj: '',
      rank: [],

      pntObj: '',
      points: [],

      topObj: '',
      top: [],

      dbObj: '',
      db: []
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
      // this.db = JSON.parse(this.dbObj)
      console.log("User data retrieved succesfully:")
      console.log(this.dbObj.body.users)
      // console.log(this.db)
      // console.log(this.user.username)
      // console.log(this.dbObj.body.users[`${this.user.username}`]['user_id'])
    }

    this.driverID = this.dbObj.body.users[`${this.user.username}`]["user_id"]
    this.orgID = this.dbObj.body.users[`${this.user.username}`]["org_id"]

//    function to get rank of a driver:
    try {
      console.log("Getting rank information from DB")
      this.rankObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgID + "/drivers/" + this.driverID + "/rank", {
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
      // console.log(this.rank)
    } catch (error) {
      console.log(error);
    }
    if(this.rankObj.statusCode === 200) {
      console.log("Successfully got the rank:")
    }
    console.log(this.rankObj)

    //function to get points of a driver for many organizations
    try{
      console.log("Getting point information from DB")
      this.pntObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgID + "/drivers/" + this.driverID + "/points", {
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
      console.log(this.pntObj)
      // this.points = JSON.parse(this.pntObj)

      // console.log(this.points)
    } catch (error) {
      console.log(error);
    }
    if(this.pntObj.statusCode === 200)
      console.log("Successfully got the Points json!")
  },
  methods: {
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
style>
Body {
  font-family: Calibri, Helvetica, sans-serif;
  background-color: #008037;
  font-size: 20px;
}
.topnav {
  margin-left: auto;
  margin-right: auto;
  width: 600px;
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
  right: 0;
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
  background: #7ed957;
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
.mainbox {
  background-color: #7ed957;
  width: 800px;
  height: 25rem;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color: #c9e265;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  text-align: center;
}
.logo {
  display: block;
  margin-left: 42rem;
  margin-right: auto;
}
p {
  text-align: center;
}
</style>
