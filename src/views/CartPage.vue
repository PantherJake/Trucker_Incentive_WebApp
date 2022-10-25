<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Driver Dashboard </title>
  </head>
  <body>
  <img src="@/assets/appLogoSmall.png" alt=""/>
  <h1> User's Cart </h1>
  <div class="mainbox">
<!--  Implement Shopping Cart  -->
  </div>
  <button>Checkout</button>
  <router-link :to="{ name: 'DriverDashboardPage'}">
    <button>Return to Dashboard</button>
  </router-link>
  </body>
  </html>
</template>

<script>
import {Auth} from "aws-amplify";
import router from "@/router";

export default {
  name: "CartPage",
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
  },
}
</script>

<style>
h1 {
  text-align: center;
}
img {
  display: block;
  margin-left: 42rem;
  margin-right: auto;
}
p {
  text-align: center;
}
.mainbox {
  background-color: #7ed957;
  width: 600px;
  height: 300px;
  padding: 5px 5px 5px 5px;
  border-style: solid;
  border-color: #c9e265;
  margin-left: auto;
  margin-right: auto;
}
button {
  background-color: #c9e265;
  width: 600px;
  color: black;
  padding: 15px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>