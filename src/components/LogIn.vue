<template>
  <html>
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title> Login Page </title>    
  </head>    
    <body>    
      <img src="../assets/appLogoSmall.png"  alt=""/>
      <h1 style="align-self: center;"> Driver Incentive Login </h1>  
        <form v-show="this.loginVisible">
          <div class="container">   
            <label>Email : </label>   
            <input type="text" v-model="email" placeholder="Enter Email" required>
            <label>Password : </label>   
            <input type="password" v-model="password" placeholder="Enter Password" required>
            {{ this.errorMessage }}
            
            <button @click="this.loginAccount">Login</button>
            <input type="checkbox" checked="checked">Remember me   
            <button type="button" class="cancelbtn">Cancel</button>   
            Forgot <a href="#" @click="this.loginVisible = false; this.forgotVisible = true;"> password? </a>
          </div>   
        </form>

        <form v-show="this.forgotVisible">
          <div class="container">
            <label>Email : </label>
            <input type="text" v-model="email2" placeholder="Enter Email" required>
            <button @click="this.forgotPassword">Send Reset Code</button>
            <button @click="this.forgotVisible = false; this.loginVisible = true;">Cancel</button>
          </div>
        </form>
        <form v-show="this.newVisible">
          <div class="container">
            <label>New Password : </label>
            <input type="text" v-model="new_password" placeholder="Enter New Password" required>
            <label>Confirmation Code (Sent to Email) : </label>
            <input type="text" v-model="code" placeholder="Confirmation Code" required>
            <button @click="this.newPassword">Change Password</button>
            <button @click="this.newVisible = false; this.loginVisible = true;">Cancel</button>
          </div>
        </form>
    </body>
  </html> 
</template> 

<script>
import { Auth } from 'aws-amplify';
import router from '@/router';

export default {
  name: 'LoginPage',
  data() {
    return {
      loginVisible: true,
      forgotVisible: false,
      newVisible: false,
      isRemember: false,
      isAuth: false,

      email: '',
      password: '',

      email2: '',
      new_password: '',
      code: '',

      info: '',
      authenticating: false,
      errorMessage: ''
    }
  },
  methods: {
    async getData() {
      try {
        const response = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/test/users", {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'username': this.Email
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        this.info = JSON.parse(response.toString());
        console.log(this.info.fname)
      } catch (error) {
        console.log(error);
      }
    },
    async loginAccount() {
      this.authenticating = true
      this.errorMessage = ''
      try {
        const user = await Auth.signIn(this.email, this.password)
        console.log(user)

        this.authenticating = false
        this.isAuth = !!(await Auth.currentAuthenticatedUser());

        if(this.isAuth) {
          await router.push('/driverdashboard')
        }
        else {
          await router.push('/login')
        }
      } catch (error) {
        this.authenticating = false

        console.log(error)
        this.errorMessage = error.message
      }
    },
    async forgotPassword() {
      Auth.forgotPassword(this.email2)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      this.forgotVisible = false
      this.newVisible = true
    },
    async newPassword() {
      Auth.forgotPasswordSubmit(this.email2, this.code, this.new_password)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      this.newVisible = false
      this.loginVisible = true
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