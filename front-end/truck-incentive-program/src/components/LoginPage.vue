<template>
  <html>
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title> Login Page </title>    
  </head>    
    <body>    
      <h1 style="align-self: center;"> Driver Incentive Login </h1>  
        <form>
          <div class="container">   
            <label>Email : </label>   
            <input type="text" v-model="Email" placeholder="Enter Email" name="Email" required>  
            <label>Password : </label>   
            <input type="password" v-model="Password" placeholder="Enter Password" name="Password" required>  
            
            <button type="submit" @click="validateLogin">Login</button>   
            
            <input type="checkbox" checked="checked">Remember me   
            <button type="button" class="cancelbtn">Cancel</button>   
            Forgot <a href="#"> password? </a>   
          </div>   
        </form> 
    </body>     
  </html> 
</template> 

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data: function() {
    return {
      Email: '',
      Password: '',
      isRemember: false,
      data: [],
      errors: []
    }
  },
  methods: {
    async validateLogin() {
      try {
        console.log(this.Email);
        console.log(this.Password);

        const res = await axios.get('https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users/7');
        this.data = res.data
        console.log(this.data);
      } catch(e) {
        this.errors.push(e);
      }
    },
  }
  // mounted() {
  //   axios
  //     .get('https://niiertdkbf.execute-api.us-east-1.amazonaws.com/prod/users/7')
  //     .then(response => {
  //       this.data = response.data
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       this.errored = true
  //     })
  // }
}
</script>

<style>   
    Body {  
      font-family: Calibri, Helvetica, sans-serif;  
      background-color: whitesmoke;  
    }  
    button {   
           background-color: purple;   
           width: 100%;  
            color: orange;   
            padding: 15px;   
            margin: 10px 0px;   
            border: none;   
            cursor: pointer;   
             }   
     form {   
            border: 3px solid #f1f1f1;   
        }   
     input[type=text], input[type=password] {   
            width: 100%;   
            margin: 8px 0;  
            padding: 12px 20px;   
            display: inline-block;   
            border: 2px solid purple;   
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
            background-color: orange;  
        }   
</style> 