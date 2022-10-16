<template>
  <html>
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title> Application Page </title>
  </head>    
    <body>
    <amplify-authenticator></amplify-authenticator>
<!--    <img src="../assets/appLogoSmall.png"  alt=""/>-->
<!--    <h1> Driver Incentive Application </h1>-->
<!--        <form>-->
<!--        <div class="container">   -->
<!--            <label>Username : </label>   -->
<!--            <input type="text" v-model="username" placeholder="Enter Username" name="username" required>  -->
<!--            <label>Password : </label>   -->
<!--            <input type="password" v-model="password" placeholder="Enter Password" name="password" required>-->

<!--            <small id="passwordHelp" class="form-text text-muted">Password should contain-->
<!--              <span :class="has_minimum_length ? 'has_required' : ''">at least 8 characters</span>,-->
<!--              <span :class="has_lowercase ? 'has_required' : ''">one lowercase letter</span>,-->
<!--              <span :class="has_uppercase ? 'has_required' : ''">one uppercase letter</span>,-->
<!--              <span :class="has_number ? 'has_required' : ''">one number</span>, and-->
<!--              <span :class="has_special ? 'has_required' : ''">one special character.</span>-->
<!--            </small>-->

<!--            <br>-->

<!--            <label>First name: </label>-->
<!--            <input type="text" v-model="fname" placeholder="Enter First Name" name="fname" required>-->
<!--            <label>Middle name: </label>-->
<!--            <input type="text" v-model="mname" placeholder="Enter Middle Name" name="mname" required>-->
<!--            <label>Last name: </label>-->
<!--            <input type="text" v-model="lname" placeholder="Enter Last Name" name="lname" required>-->

<!--            <button type="submit">Submit Application</button>-->
<!--            <button type="button" class="cancelbtn"> Cancel</button>-->
<!--        </div>-->
<!--        </form> -->
    </body>    
  </html> 
</template> 

<script>
export default {
  name: 'ApplicationPage',
  data: function () {
    return {
      username: '',
      password: '',
      fname: '',
      mname: '',
      lname: '',
      role: '',
      isRemember: false,

      has_minimum_length: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
    }
  },
  watch: {
    password() {
      this.has_minimum_length = (this.password.length > 8);
      this.has_number = /\d/.test(this.password);
      this.has_lowercase = /[a-z]/.test(this.password);
      this.has_uppercase = /[A-Z]/.test(this.password);
      this.has_special = /[!@#$%^&*)(+=._-]/.test(this.password);
    }
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