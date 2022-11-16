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
    <a href="/sponsordashboard/points">Points</a>
    <a class="active" href="/catalog">Catalog</a>
    <a href="/sponsordashboard/drivers">Drivers</a>
  </div></center>
  <center><ul class="breadcrumb">
    <li><a href="/sponsordashboard/catalog">Catalog</a></li>
  </ul></center>
  <center><div class="mainbox">
    <center><p>Welcome to the Catalog Page for the Driver Incentive Application!</p></center>
    <select name="searchOption" id="searchOption">
      <option value="music">Music</option>
      <option value="movie">Movie</option>
      <option value="podcast">Podcast</option>
      <option value="musicVideo">Music Video</option>
      <option value="audiobook">Audiobook</option>
      <option value="shortFilm">Short Film</option>
      <option value="tvShow">TV Show</option>
      <option value="software">Software</option>
      <option value="ebook">Ebook</option>
      <option value="all">All</option>
    </select>
    <input v-model="songInput" placeholder="Type keywords"/>
    <button @click="getSong(songInput)">Search</button>
    <button class="addButton">Add to Catalog</button>
  </div></center>
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
      console.log("User data retrieved succesfully:")
      console.log(this.dbObj.body.users)
    }
    // this.driverID = this.dbObj.body.users[`${this.user.username}`]["user_id"]
    this.orgID = this.dbObj.body.users[`${this.user.username}`]["org_id"]
    //function to get points of a driver for many organizations
    try{
      console.log("Getting Application information from DB")
      this.AppObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgID + "/drivers/application", {
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
      console.log(this.AppObj)
    } catch (error) {
      console.log(error);
    }
    if(this.AppObj.statusCode === 200) {
      console.log("Successfully got the Applications json!")
    }
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
  width: 1000px;
  height: 1000px;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color:#c9e265;
}
input{
  height: 20px;
  font-size: 18px;
}
select{
  height: 25px;
  margin-right: 5px;
}
button{
  display: inline-block;
  height: 25px;
  width: 70px;
  font-size: 18px;
  text-align: center;
  justify-content: center;
  padding: 0px;
  margin-left: 5px;
  font-weight: bold;
  border: solid;
  border-width: 1.5px;
  background-color: #c9e265;
}
.addButton{
  display: inline-block;
  height: 25px;
  width: 150px;
  font-size: 18px;
  text-align: center;
  justify-content: center;
  padding: 0px;
  margin-left: 20px;
  font-weight: bold;
  border: solid;
  border-width: 1.5px;
  background-color: #c9e265;
}
</style> 