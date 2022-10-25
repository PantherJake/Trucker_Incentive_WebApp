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
            {{ this.authMessage }}

            <button type="button" @click="this.loginAccount()">Login</button>
            <input type="checkbox" checked="checked">Remember me<br>
            Forgot <a href="#" @click="this.loginVisible = false; this.forgotVisible = true;"> password? </a>
            <router-link :to="{ name: 'Home'}">
              <button>Return to Homepage</button>
            </router-link>
          </div>
        </form>
      <form v-show="this.forgotVisible">
          <div class="container">
            <label>Email : </label>
            <input type="text" v-model="email2" placeholder="Enter Email" required>
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
            <button type="button" @click="this.newPassword()">Change Password</button>
            <button @click="this.newVisible = false; this.loginVisible = true;">Cancel</button>
          </div>
        </form>
        <button v-show="this.isAuth" @click="pushDashboard()">Navigate to Dashboard</button>
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
      password: '',

      email2: '',
      new_password: '',
      code: '',

      info: '',
      errorMessage: '',
      authMessage: ''
    }
  },
  methods: {
    loginAccount() {
      this.errorMessage = '';
      try {
        console.log("Attempting login...");
        const user = Auth.signIn(this.email, this.password)
        console.log(user)
        console.log("Login complete")
        this.isAuth = true
      } catch (error) {
        console.log("There was an error logging in");
        console.log(error);
        this.errorMessage = error.message;
      }
    },
    forgotPassword() {
      Auth.forgotPassword(this.email2)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      this.forgotVisible = false
      this.newVisible = true
    },
    newPassword() {
      Auth.forgotPasswordSubmit(this.email2, this.code, this.new_password)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      this.newVisible = false
      this.loginVisible = true
    },
    pushDashboard() {
      router.push("/driverdashboard")
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