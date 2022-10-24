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
  <img class="logo" src="../../assets/appLogoSmall.png" alt=""/>
  <h1> User's Points Information </h1>
  <div class="topnav">
    <router-link :to="{ name: 'DriverDashboardPage'}">
      <a class="active" href="/driverdashboard">Home</a>
    </router-link>
    <router-link :to="{ name: 'DriverPointsPage'}">
      <a href="driverdashboard/points">Points</a>
    </router-link>
    <router-link :to="{ name: 'DriverCatalogPage'}">
      <a href="driverdashboard/catalog">Catalog</a>
    </router-link>
  </div>
  <br>
  <div class="mainbox">
    <p class="mainbox-text">Top 10 Drivers by Point Amount</p>
    {{this.response}}
  </div>
  <div class="mainbox">
    <p class="mainbox-text">My Points</p>
  </div>
  </body>
  </html>
</template>

<script>
export default {
  name: 'DriverPoints',
  data() {
    return {
      orgID: '1',
      driverID: '1',
      response: []
    }
  },
  created() {
    try {
      const response = fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/orgs/" + this.orgID + "/drivers/" + this.driverID + "/topdrivers", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'username': 'jvickio@clemson.edu'
        },
      });
      console.log(response)
      this.response = response.limit
    } catch (error) {
      console.log(error);
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
  height: 300px;
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
