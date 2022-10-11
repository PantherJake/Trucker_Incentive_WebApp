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
            
            <button type="submit" @click="getData">Login</button>
            
            <input type="checkbox" checked="checked">Remember me   
            <button type="button" class="cancelbtn">Cancel</button>   
            Forgot <a href="#"> password? </a>   
          </div>   
        </form>
    </body>
  </html> 
</template> 

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      Email: '',
      Password: '',
      isRemember: false,
      info: ''
    }
  },
  methods: {
    async getData() {
      try {
        let response = await fetch("https://niiertdkbf.execute-api.us-east-1.amazonaws.com/test/users/" + this.Email);
        this.info = JSON.parse(response.toString());
        console.log(response.fname)
      } catch (error) {
        console.log(error);
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