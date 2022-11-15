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
            <label>Password : (At least 1 uppercase, 1 lowercase and 1 special character and at least 8 characters long)</label>
            <input type="password" v-model="password" placeholder="Enter Password"  required>

            <label>Organization ID: (needs to be a number) </label>
            <input type="text" v-model="orgid" placeholder="Enter Organization ID"  required>

            <label>First name : </label>
            <input type="text" v-model="fname" placeholder="Enter First Name" required>
            <label>Middle name : </label>
            <input type="text" v-model="mname" placeholder="Enter Middle Name" required>
            <label>Last name : </label>
            <input type="text" v-model="lname" placeholder="Enter Last Name" required>
            <label>Drivers License # : </label>
            <input type="text" v-model="DLnumber" placeholder="Enter DL#" required>
            <label>Phone Number : (need country code +1 in front)</label>
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
            {{ this.errorMessage }}
            <button type="button" @click="verifyEmail()">Submit</button>
            <button type="button" @click="resendConfirmationCode()">Resend Code</button>
          </div>
        </form>
    <router-link :to="{ name: 'Home'}">
      <button>Return to Homepage</button>
    </router-link>
    </body>    
  </html> 
</template> 

<script>
import { Auth } from "aws-amplify";
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
      orgid: '',

      userObj: '',
      user: [],
      dbObj: '',

      isRemember: false,
      isValid: false,
      isNotValid: true,
      code: '',
      errorMessage: '',
      dbError: ''
    }
  },
  methods: {
    async verifyEmail() {
      await Auth.confirmSignUp(this.username, this.code)
        .then(() => {
          console.log('Email verified');
          router.push('/');
        }).catch(e => {
          this.errorMessage = e;
          console.log('failed with error', e);
      });
    },
    async resendConfirmationCode() {
      try {
        await Auth.resendSignUp(this.username);
        console.log('code resent successfully');
      } catch (err) {
        console.log('error resending code: ', err);
      }
    },
    async createAccount() {
      this.errorMessage = '';
      this.isNotValid = true;

      try {
        console.log("Initiating database connection");
        this.dbObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
            'username': this.username
          },
          body: JSON.stringify({
            path: {},
            params: {
              querystring: {
                orgid: this.orgid,
                role_id: "3",
                fname: this.fname,
                mname: this.mname,
                lname: this.lname,
                email: this.username,
                dl_num: this.DLnumber,
                address: this.address
              },
              header: {
                username: this.username
              }
            },
          })
        }).then((response) => response.json()).catch(e => console.log(e));
      } catch (error) {
        console.log(error);
        this.dbError = "Could not establish database connection, please contact support";
      }
      console.log("Connection established")
      console.log(this.dbObj.statusCode)

      try {
        console.log("Initiating cognito authentication")
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
        }).then(response => this.userObj = JSON.stringify(response)).catch(e => this.errorMessage = e)
        if(this.userObj) this.user = JSON.parse(this.userObj)
        console.log("Cognito connection established")
        
        if(this.dbObj.statusCode === 400) {
          this.dbError = this.dbObj.body.message
        }
        if(this.user.user.username === this.username && this.dbObj.statusCode === 200) {
          console.log("User is pending")
          this.isValid = true;
          this.isNotValid = false;
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = error;
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