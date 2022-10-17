<template>
  <html>
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title> Login Page </title>    
  </head>    
    <body>    
      <img src="../assets/appLogoSmall.png"  alt=""/>
      <h1 style="align-self: center;"> Driver Incentive Login </h1>  
        <form>
          <div class="container">   
            <label>Email : </label>   
            <input type="text" v-model="Email" placeholder="Enter Email" name="Email" required>  
            <label>Password : </label>   
            <input type="password" v-model="Password" placeholder="Enter Password" name="Password" required>  
            
            <button type="submit" @click="loginAccount">Login</button>
            
            <input type="checkbox" checked="checked">Remember me   
            <button type="button" class="cancelbtn">Cancel</button>   
            Forgot <a href="#" @onclick="forgotPassword = true"> password? </a>
          </div>   
        </form>
    </body>
  </html> 
</template> 

<script>
import { Auth } from 'aws-amplify';
import router from "@/router";

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      isRemember: false,

      info: '',
      authenticating: false,
      forgotPassword: false,
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
      this.authenticating.value = true
      this.errorMessage.value = ''
      try {
        await Auth.signIn(this.email.value, this.password.value)

        this.authenticating.value = false

        await router.push('/driverdashboard')
      }
      catch (error) {
        this.authenticating.value = false

        console.log(error)

        this.errorMessage.value = error.message
      }
    },
  }
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