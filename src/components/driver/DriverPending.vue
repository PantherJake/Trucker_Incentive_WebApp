<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Driver Dashboard </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body>
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
  <h1> {{this.name}}'s Pending Driver Dashboard </h1>
  <br>
  <div class="mainbox">
    <p>Pending Applications at these Organizations :</p>
    {{this.appObj.body["Applications"]["Pending"]}}
  </div>
  </body>
  </html>
</template>

<script>
import {Auth} from "aws-amplify";
import router from "@/router";
export default {
  name: 'DriverDashboard',
  data() {
    return {
      userObj: '',
      user: [],
      name: '',
      appObj: ''
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
    this.application()
  },
  methods: {
    async application(){
      //function to get points of a driver for many organizations
      try{
        console.log("Getting Application information from DB")
        this.appObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/pending", {
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
                useremail: this.user.username,
              },
              path: {},
              header: {
                username: this.user.username
              }
            },
          })
        }).then((response) => response.json()).catch(e => console.log(e));
        console.log(this.appObj)
      } catch (error) {
        console.log(error);
      }
      if(this.appObj.statusCode === 200) {
        console.log("Successfully got the Applications json!")
      }
    },
    async signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('Error signing out: ', error);
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