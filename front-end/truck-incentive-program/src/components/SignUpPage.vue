<template>
  <html>
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title> Sign Up Page </title>  
  </head>    
    <body>    
    <center> <h1> Driver Incentive Sign Up </h1> </center>   
        <form method="POST" action="/<your-endpoint>">
        <div class="container">   
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
            

            <input type="checkbox" checked="checked"> Remember me   
            <button type="button" class="cancelbtn"> Cancel</button>   
            <button type="submit">Sign Up</button>   
            Forgot <a href="#"> password? </a>   
            </div>   
        </form> 
    </body>    
  </html> 
</template> 

<script>
export default {
  name: 'SignUpPage',
  data: function() {
    return {
      username: '',
      password: '',
      role: '',
      isRemember: false
    }
  },
}
</script>

<style>   
    Body {  
      font-family: Calibri, Helvetica, sans-serif;  
      background-color: pink;  
    }  
    button {   
           background-color: #4CAF50;   
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
            border: 2px solid green;   
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
            background-color: lightblue;  
        }   
</style> 