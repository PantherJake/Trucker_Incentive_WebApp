<template>
  <html>
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title> Application Page </title>
  </head>    
    <body>
    <img src="../assets/appLogoSmall.png"  alt=""/>
    <h1> Driver Incentive Application </h1>
        <form v-if="this.isNotValid">
          <div class="container">
              <label>Email : </label>
              <input type="text" v-model="username" placeholder="Enter Email" required>
              <label>Password : </label>
              <input type="password" v-model="password" placeholder="Enter Password"  required>

              <label>First name : </label>
              <input type="text" v-model="fname" placeholder="Enter First Name" required>
              <label>Middle name : </label>
              <input type="text" v-model="mname" placeholder="Enter Middle Name" required>
              <label>Last name : </label>
              <input type="text" v-model="lname" placeholder="Enter Last Name" required>
              <label>Drivers License # : </label>
              <input type="text" v-model="DLnumber" placeholder="Enter DL#" required>
              <label>Phone Number : </label>
              <input type="text" v-model="phone" placeholder="Home/Mobile Phone" required>
              <label>Home Address : </label>
              <input type="text" v-model="address" placeholder="Home Address" required>
              {{ this.errorMessage }}
              <br>
              {{ this.dbError }}

              <button type="button" @click="createAccount()">Submit Application</button>
          </div>
        </form>
        <form v-else>
          <div class="container">
            <label>Verification Code : </label>
            <input type="text" v-model="code" placeholder="Enter verification code" required>
            <button type="button" @click="verifyEmail()">Submit</button>
          </div>
        </form>
    <router-link :to="{ name: 'Home'}">
      <button>Return to Homepage</button>
    </router-link>
    </body>    
  </html> 
</template> 

<script>
import Auth from "aws-amplify";
import router from "@/router";

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

      userObj: '',
      user: [],

      isRemember: false,
      isValid: false,
      isNotValid: true,
      code: '',
      errorMessage: '',
      dbError: ''
    }
  },
  methods: {
    verifyEmail() {
      Auth.verifyCurrentUserAttributeSubmit('email', this.code)
        .then(() => {
          console.log('Email verified');
          router.push('/');
        }).catch(e => {
          console.log('failed with error', e);
      });
    },
    async createAccount() {
      this.errorMessage = '';
      this.isNotValid = true;

      try {
        console.log("Initiating cognito authentication...")
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
          },
          autoSignIn: {
            enabled: true,
          }
        })
        .then(response => this.userObj = JSON.stringify(response))
        .catch(e => this.errorMessage = e)

        console.log("Pending user...")
        console.log(this.user.username)

        if(this.user.username === this.username) {
          this.isValid = true;
          this.isNotValid = false;
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = error.message;
      }

      try {
        console.log("Initiating database connection...");
        const response = fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users", {
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
        console.log("Established, user is in...");
        console.log(response);
      } catch (error) {
        console.log(error);
        this.dbError = error;
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
.container {
  padding: 25px;
  background-color: #7ed957;
}
h1 {
  text-align: center;
}
</style>