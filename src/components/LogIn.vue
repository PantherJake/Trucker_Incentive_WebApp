<template>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Login Page </title>
  </head>
  <body>
  <img src="../assets/appLogoSmall.png"  alt=""/>
  <h1 style="align-self: center;"> Driver Incentive Login </h1>
  <form v-show="this.loginVisible && !this.isAuth">
    <div class="container">
      <label>Email : </label>
      <input type="email" v-model="email" placeholder="Enter Email" required>
      <label>Password : </label>
      <input type="password" v-model="password" placeholder="Enter Password" required>
      {{ this.errorMessage }}
      <br>

      <button type="button" @click="this.loginAccount()">Login</button>
      <input type="checkbox" checked="checked">Remember me<br>
      <a href="#" @click="this.loginVisible = false; this.forgotVisible = true;">Forgot password? </a>
      <router-link :to="{ name: 'Home'}">
        <button>Return to Homepage</button>
      </router-link>
    </div>
  </form>
  <form v-show="this.forgotVisible">
    <div class="container">
      <label>Email : </label>
      <input type="text" v-model="email2" placeholder="Enter Email" required>
      {{ this.errorMessage }}
      <button type="button" @click="this.forgotPassword()">Send Reset Code</button>
      <button @click="this.forgotVisible = false; this.loginVisible = true;">Cancel</button>
    </div>
  </form>
  <form v-show="this.newVisible">
    <div class="container">
      <label>New Password : </label>
      <input type="text" v-model="new_password" placeholder="Enter New Password" required>
      <label>Confirmation Code (Sent to Email) : </label>
      <input type="text" v-model="code" placeholder="Confirmation Code" required>
      {{ this.errorMessage }}
      <button type="button" @click="this.newPassword()">Change Password</button>
      <button @click="this.newVisible = false; this.loginVisible = true;">Cancel</button>
    </div>
  </form>
  <button v-show="this.isAuth" @click="pushDashboard()">Navigate to Dashboard</button>
  <button v-show="this.isAuth" @click="pushLogin()">Return to Login</button>
  </body>
  </html>
</template>

<script>
import {Auth} from "aws-amplify";
import router from "@/router";

export default {
  name: 'LogIn',
  data() {
    return {
      loginVisible: true,
      forgotVisible: false,
      newVisible: false,
      isAuth: false,

      email: '',
      audit:'',
      password: '',
      userObj: '',
      user: [],
      operation: '',

      dbObj: '',
      db: [],

      email2: '',
      new_password: '',
      code: '',

      userid: '', // needs to be the user who is trying to log in...
      state: '',
      message: '',
      allowme: true,


      errorMessage: '',
    }
  },
  methods: {
    async me(){
      try {
        this.dbObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/me", {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
            'username': this.email
          },
        }).then((response) => response.json()).catch(e => console.log(e))
      } catch (error) {
        console.log(error)
        this.errorMessage="Error fetching user data from database"
      }
      if(this.user.username === this.email && this.dbObj.statusCode === 400 && this.allowme == true){
        console.log(this.email)
        console.log(this.dbObj.statusCode)
        localStorage.setItem('status', this.dbObj.statusCode)
        this.isAuth = true
      }
      else{
        this.userid = this.dbObj.body.users[`${this.email}`]["user_id"]
        // localStorage.setItem('userid', this.dbObj.body.users[`${this.email}`]["user_id"])
        localStorage.setItem('role_id', this.dbObj.body.users[`${this.email}`]["user_role_id"])
        localStorage.setItem('status', this.dbObj.statusCode)
      }


      // console.log(this.userid)
    },
    async AuditLogin(){
      try {
        try {
          this.dbObj = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/me", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
              'username': this.email
            },
          }).then((response) => response.json()).catch(e => console.log(e))
        } catch (error) {
          console.log(error)
          this.errorMessage="Error fetching user data from database"
        }
        console.log(this.dbObj.body.users)
        localStorage.setItem('status', this.dbObj.statusCode)
        this.userid = this.dbObj.body.users[`${this.email}`]["user_id"]
        localStorage.setItem('role_id', this.dbObj.body.users[`${this.email}`]["user_role_id"])

        // localStorage.setItem('userid', this.dbObj.body.users[`${this.email}`]["user_id"])
        console.log("Audit function")
        console.log(this.userid)
        console.log(this.email)
        // console.log(localStorage.getItem('userid'))
        console.log(this.userid)
        console.log(this.operation)
        // console.log("Initiating database connection for logging audit");
        this.audit = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/audits", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tbXzQvy3PQTJr0PDVlXm5qjjUaKgZVc1wbTzEkva',
            'username': this.email
          },
          body: JSON.stringify({
            path: {},
            params: {
              querystring: {
                userid: this.userid,
                operation: this.operation,
                state: this.state,
                message: this.message
              },
              path: {},
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
      console.log("Audit log:")
      console.log(this.audit.statusCode)
    },

    async loginAccount() {
      this.errorMessage = '';
      this.state = "Success"
      this.message = "Successful login" //+ String(this.user.username)
      try {
        console.log("Attempting login...");
        await Auth.signIn(this.email, this.password)
            .then(response => this.userObj = JSON.stringify(response))

            .catch(e => {
              console.log(e)
              this.errorMessage="Username or password incorrect"
              this.state = "Failure"
              this.message = this.errorMessage
              this.allowme = false
              console.log(this.email)
              this.operation = "LogIn"
              this.AuditLogin()
            })


        console.log(this.state)
        this.user = JSON.parse(this.userObj)

        this.me()
        this.operation = "LogIn"
        console.log(this.dbObj.statusCode)
        if(parseInt(localStorage.getItem('status')) === 200){
          this.AuditLogin()
        }

        if(this.user.username === this.email && parseInt(localStorage.getItem('status')) === 200) {
          console.log("Login successful...")
          this.isAuth = true
          localStorage.setItem('role_id', this.dbObj.body.users[`${this.email}`]["user_role_id"])
          localStorage.setItem('status', this.dbObj.statusCode)
        }
        if(this.user.username === this.email && parseInt(localStorage.getItem('status')) === 400 && this.allowme == true){
          console.log(this.email)
          console.log(this.dbObj.statusCode)
          localStorage.setItem('status', this.dbObj.statusCode)
          this.isAuth = true
        }
      } catch (error) {
        console.log(error)
      }

    },

    forgotPassword() {
      this.errorMessage = ''
      Auth.forgotPassword(this.email2)
          .then(data => console.log(data))
          .catch(err => this.errorMessage=err);
      this.forgotVisible = false
      this.newVisible = true
    },
    newPassword() {
      this.errorMessage = ''
      Auth.forgotPasswordSubmit(this.email2, this.code, this.new_password)
          .then(data => console.log(data))
          .catch(err => {
            console.log(err)
            this.errorMessage="Code was incorrect"
            console.log("Part 2")
          });
      this.state = "completed"
      this.message = "User " + this.email2 + " has changed their password"
      this.email = this.email2
      this.operation = "PasswordChange"
      // this.me()
      this.AuditLogin()
      this.newVisible = false
      this.loginVisible = true
    },
    pushDashboard() {
      // router.push("/driverdashboard")
      console.log("CHECK STATUS")
      console.log(localStorage.getItem('role_id'))
      console.log(this.dbObj.statusCode)
      if(parseInt(this.dbObj.statusCode) == 400){
        // console.log("Made it here")
        router.push("/driverpending")
      }
      // localStorage.removeItem('status')
      if(parseInt(localStorage.getItem('role_id')) === 3){
        localStorage.removeItem('role_id')
        router.push("/driverdashboard")
      }
      if(parseInt(localStorage.getItem('role_id')) === 2){
        localStorage.removeItem('role_id')
        router.push("/sponsordashboard")
      }
      if(parseInt(localStorage.getItem('role_id')) === 1){
        localStorage.removeItem('role_id')
        router.push("/admindashboard")
      }

    },
    pushLogin() {
      this.isAuth = false;
      this.userObj = '';
      this.user = [];
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
input[type=text], input[type=password], input[type=email] {
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