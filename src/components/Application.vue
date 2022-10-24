<template>
  <html>
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title> Application Page </title>
  </head>    
    <body>
    <img src="../assets/appLogoSmall.png"  alt=""/>
    <h1> Driver Incentive Application </h1>
        <form>
          <div class="container">
              <label>Role : </label><br>
              <input type="radio" v-model="role" value="Driver">Driver<br>
              <input type="radio" v-model="role" value="Sponsor">Sponsor<br><br>

              <label>Username : </label>
              <input type="text" v-model="username" placeholder="Enter Username" name="username" required>
              <label>Password : </label>
              <input type="password" v-model="password" placeholder="Enter Password" name="password" required>

              <label>First name: </label>
              <input type="text" v-model="fname" placeholder="Enter First Name" name="fname" required>
              <label>Middle name: </label>
              <input type="text" v-model="mname" placeholder="Enter Middle Name" name="mname" required>
              <label>Last name: </label>
              <input type="text" v-model="lname" placeholder="Enter Last Name" name="lname" required>
              <label>Drivers License #:</label>
              <input type="text" v-model="DLnumber" placeholder="Enter DL#" name="dl" required>
              <label>Phone Number:</label>
              <input type="text" v-model="phone" placeholder="Home/Mobile Phone" name="phone" required>
              <label>Home Address:</label>
              <input type="text" v-model="address" placeholder="Home Address" name="address" required>
              {{ this.errorMessage }}

              <button @click="createAccount">Submit Application</button>
              <button type="button" class="cancelbtn">Cancel</button>
          </div>
        </form>
    <router-link :to="{ name: 'Home'}">
      <button>Return to Homepage</button>
    </router-link>
    </body>    
  </html> 
</template> 

<script>
import {Auth} from "aws-amplify";

export default {
  name: 'ApplicationPage',
  data: function () {
    return {
      username: '',
      password: '',
      fname: '',
      mname: '',
      lname: '',
      DLnumber: '',
      phone: '',
      address: '',
      role: '',
      isRemember: false,

      registering: false,
      registered: false,
      errorMessage: '',
    }
  },
  methods: {
    async loadUser() {
      try {
        const response = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fname: this.fname,
            mname: this.mname,
            lname: this.lname,
            roleID: 1,
            email: this.username,
            orgID: 1
          })
        });
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    },
    async createAccount() {
      this.registering = true
      this.errorMessage = ''

      try {
        await Auth.signUp({
          username: this.username,
          password: this.password,
          attributes: {
            email: this.username,
            name: `${this.fname} ${this.lname}`,
            given_name: this.fname,
            family_name: this.lname,
            middle_name: this.mname,
            phone_number: this.phone
          }
        })
        await this.loadUser()

        this.registering = false
        this.registered = true
      } catch (error) {
        console.log(error)

        this.errorMessage = error.message
      }
    }
  },
}
</script>

<style>
Body {
  font-family: Calibri, Helvetica, sans-serif;
  background-color: #008037;
  font-size: 20px;
}
button {
  background-color: #c9e265;
  width: 100%;
  color: black;
  padding: 15px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
form {
  border: 3px solid #7ed957;
}
input[type=text], input[type=password] {
  width: 100%;
  margin: 8px 0;
  padding: 12px 20px;
  display: inline-block;
  border: 2px solid #c9e265;
  box-sizing: border-box;
}
button:hover {
  opacity: 0.7;
}
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  margin: 10px 5px;
}
.container {
  padding: 25px;
  background-color: #7ed957;
}
h1 {
  text-align: center;
}
</style>